import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { MANUSCRIPT_ENTRIES } from './src/data/manuscripts.ts';
import { HERB_MONOGRAPHS } from './src/data/herbs.ts';
import { AILMENT_DIRECTORIES } from './src/data/ailments.ts';
import { GLOSSARY_TERMS, MEASUREMENT_UNITS, ANTIDOTE_ENTRIES, SHODHANAM_ENTRIES } from './src/data/glossary.ts';
import { INITIAL_USER_REMEDIES } from './src/data/userRemedies.ts';
import { ReaderNote, UserSubmittedRemedy } from './src/types.ts';

// In-memory store for user submitted remedies
let userRemediesStore: UserSubmittedRemedy[] = [...INITIAL_USER_REMEDIES];

// Shared reader notes in-memory store initialized with seed notes
let readerNotesStore: ReaderNote[] = [
  {
    id: 'note-1',
    author: 'Vaidya K. Sastry',
    herb: 'Kanda (Elephant Foot Yam)',
    ailment: 'Piles (Moola Vyadhi)',
    message: 'The advice from Page 32 on cooking Kanda in buttermilk and sesame oil is extremely potent. In traditional practice, we insist on boiling with tamarind water first to prevent the throat-itch from oxalate crystals. Patients report quick relief from painful defecation.',
    timestamp: Date.now() - 86400000 * 3,
    tags: ['Clinical Experience', 'Preparation Tip'],
    upvotes: 14,
    book_reference: 'Ayurveda Mulika Prayogavali, Pg 32'
  },
  {
    id: 'note-2',
    author: 'Dr. Ananya Reddy',
    herb: 'Jatamansi',
    ailment: 'Headache & Stress',
    message: 'We frequently use Jatamansi paste for patients with tension-type headaches and sleeplessness from Vaidya Rahasya Chitkalu (Page 29). The aroma itself exerts a fast calming central effect due to sesquiterpenoids.',
    timestamp: Date.now() - 86400000 * 2,
    tags: ['Aromatherapy', 'Migraine'],
    upvotes: 9,
    book_reference: 'Vaidya Rahasya Chitkalu, Pg 29'
  },
  {
    id: 'note-3',
    author: 'Ramesh K.',
    herb: 'Ginger (Allam / Shunthi)',
    ailment: 'Cold & Cough',
    message: 'My grandmother has used the exact recipe from Mulika page 9 (fresh ginger juice with honey twice daily) for generations whenever winter congestion strikes. Works much faster than standard lozenges.',
    timestamp: Date.now() - 86400000 * 1,
    tags: ['Household Tradition', 'Winter Care'],
    upvotes: 11,
    book_reference: 'Ayurveda Mulika Prayogavali, Pg 9'
  }
];

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

function scoreEntryMatch(entry: typeof MANUSCRIPT_ENTRIES[0], queryTerms: string[]): number {
  let score = 0;
  const searchableText = `${entry.herb} ${entry.herb_full || ''} ${entry.telugu} ${entry.ailment} ${entry.ailment_telugu || ''} ${entry.remedy} ${entry.botanical || ''} ${entry.category} ${entry.source_title}`.toLowerCase();

  for (const term of queryTerms) {
    if (term.length < 2) continue;
    if (searchableText.includes(term)) {
      score += 5;
      if (entry.herb.toLowerCase().includes(term) || (entry.telugu && entry.telugu.includes(term))) score += 10;
      if (entry.ailment.toLowerCase().includes(term) || (entry.ailment_telugu && entry.ailment_telugu.includes(term))) score += 10;
    }
  }

  // Symptom semantic expansion heuristics
  const qStr = queryTerms.join(' ');
  if ((qStr.includes('pile') || qStr.includes('hemorrhoid') || qStr.includes('moola') || qStr.includes('arshas') || qStr.includes('fissure') || qStr.includes('rectal')) && (entry.ailment.toLowerCase().includes('pile') || entry.ailment.toLowerCase().includes('moola') || entry.category === 'Digestive & Piles')) {
    score += 15;
  }
  if ((qStr.includes('headache') || qStr.includes('migraine') || qStr.includes('talanopi') || qStr.includes('shira') || qStr.includes('temple') || qStr.includes('head')) && (entry.ailment.toLowerCase().includes('headache') || entry.ailment.toLowerCase().includes('talanopi') || entry.category === 'Headache & Neuro')) {
    score += 15;
  }
  if ((qStr.includes('fever') || qStr.includes('jwara') || qStr.includes('chills') || qStr.includes('malaria') || qStr.includes('temperature') || qStr.includes('flu')) && (entry.ailment.toLowerCase().includes('fever') || entry.ailment.toLowerCase().includes('jwar') || entry.category === 'Fevers & Immunity')) {
    score += 15;
  }
  if ((qStr.includes('cold') || qStr.includes('cough') || qStr.includes('phlegm') || qStr.includes('asthma') || qStr.includes('breath') || qStr.includes('jalubu') || qStr.includes('ubhasam')) && (entry.category === 'Respiratory & Cough' || entry.ailment.toLowerCase().includes('cough') || entry.ailment.toLowerCase().includes('cold') || entry.ailment.toLowerCase().includes('asthma'))) {
    score += 15;
  }
  if ((qStr.includes('joint') || qStr.includes('knee') || qStr.includes('arthritis') || qStr.includes('back') || qStr.includes('sciatica') || qStr.includes('keellu')) && (entry.category === 'Joints & Pain' || entry.ailment.toLowerCase().includes('joint') || entry.ailment.toLowerCase().includes('pain'))) {
    score += 15;
  }

  return score;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString(), entries_count: MANUSCRIPT_ENTRIES.length });
  });

  // API Route: Get all entries
  app.get('/api/entries', (req, res) => {
    const { category, book, herb } = req.query;
    let results = [...MANUSCRIPT_ENTRIES];
    if (category && typeof category === 'string') {
      results = results.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }
    if (book && typeof book === 'string') {
      results = results.filter(e => e.source_id === book || e.source_short.toLowerCase().includes(book.toLowerCase()));
    }
    if (herb && typeof herb === 'string') {
      results = results.filter(e => e.herb.toLowerCase().includes(herb.toLowerCase()));
    }
    res.json(results);
  });

  // API Route: Get herbs monographs
  app.get('/api/herbs', (req, res) => {
    res.json(HERB_MONOGRAPHS);
  });

  // API Route: Get ailments directory
  app.get('/api/ailments', (req, res) => {
    res.json(AILMENT_DIRECTORIES);
  });

  // API Route: Get glossary and reference tables
  app.get('/api/glossary', (req, res) => {
    res.json({
      terms: GLOSSARY_TERMS,
      measurements: MEASUREMENT_UNITS,
      antidotes: ANTIDOTE_ENTRIES,
      shodhanam: SHODHANAM_ENTRIES
    });
  });

  // API Route: User Submitted Remedies (GET)
  app.get('/api/user-remedies', (req, res) => {
    const { ailment, herb } = req.query;
    let list = [...userRemediesStore];
    if (ailment && typeof ailment === 'string' && ailment !== 'ALL') {
      list = list.filter(r => r.ailment_id === ailment || r.ailment_name.toLowerCase().includes(ailment.toLowerCase()));
    }
    if (herb && typeof herb === 'string' && herb !== 'ALL') {
      list = list.filter(r => r.herb_names.some(h => h.toLowerCase().includes(herb.toLowerCase())));
    }
    res.json(list.sort((a, b) => b.upvotes - a.upvotes || b.timestamp - a.timestamp));
  });

  // API Route: User Submitted Remedies (POST)
  app.post('/api/user-remedies', (req, res) => {
    const {
      author_name,
      author_role,
      ailment_id,
      ailment_name,
      herb_names,
      title,
      ingredients,
      preparation_instructions,
      dosage_usage,
      source_tradition,
      precautions
    } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required for the remedy.' });
    }
    if (!preparation_instructions || typeof preparation_instructions !== 'string' || !preparation_instructions.trim()) {
      return res.status(400).json({ error: 'Preparation instructions are required.' });
    }
    if (!dosage_usage || typeof dosage_usage !== 'string' || !dosage_usage.trim()) {
      return res.status(400).json({ error: 'Dosage and usage instructions are required.' });
    }

    const newRemedy: UserSubmittedRemedy = {
      id: 'user-rem-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      author_name: (author_name && author_name.trim()) ? author_name.trim() : 'Anonymous Ayurvedic Reader',
      author_role: author_role || 'Community Contributor',
      ailment_id: ailment_id || 'general',
      ailment_name: ailment_name || 'General Condition',
      herb_names: Array.isArray(herb_names) && herb_names.length > 0 ? herb_names : ['Traditional Herbs'],
      title: title.trim(),
      ingredients: Array.isArray(ingredients) && ingredients.length > 0 ? ingredients : [title.trim()],
      preparation_instructions: preparation_instructions.trim(),
      dosage_usage: dosage_usage.trim(),
      source_tradition: source_tradition ? source_tradition.trim() : undefined,
      precautions: precautions ? precautions.trim() : 'Consult a qualified Ayurvedic physician (BAMS/MD) before preparing or consuming home formulations.',
      timestamp: Date.now(),
      upvotes: 1,
      verified: false,
      verification_status: 'user-submitted'
    };

    userRemediesStore.unshift(newRemedy);
    res.json({ success: true, remedy: newRemedy });
  });

  // API Route: User Remedy Upvote (POST)
  app.post('/api/user-remedies/:id/vote', (req, res) => {
    const { id } = req.params;
    const rem = userRemediesStore.find(r => r.id === id);
    if (!rem) {
      return res.status(404).json({ error: 'Remedy not found' });
    }
    rem.upvotes = (rem.upvotes || 0) + 1;
    res.json({ success: true, upvotes: rem.upvotes });
  });

  // API Route: Community Notes (GET)
  app.get('/api/community', (req, res) => {
    const { herb, ailment } = req.query;
    let list = [...readerNotesStore];
    if (herb && typeof herb === 'string' && herb !== 'ALL') {
      list = list.filter(n => n.herb.toLowerCase().includes(herb.toLowerCase()));
    }
    if (ailment && typeof ailment === 'string') {
      list = list.filter(n => n.ailment.toLowerCase().includes(ailment.toLowerCase()));
    }
    res.json(list.sort((a, b) => b.timestamp - a.timestamp));
  });

  // API Route: Community Notes (POST)
  app.post('/api/community', (req, res) => {
    const { author, herb, ailment, message, tags, book_reference } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }
    const newNote: ReaderNote = {
      id: 'note-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      author: (author && author.trim()) ? author.trim() : 'Ayurvedic Reader',
      herb: herb || 'General',
      ailment: ailment || 'General Health',
      message: message.trim(),
      timestamp: Date.now(),
      tags: Array.isArray(tags) ? tags : ['Reader Note'],
      upvotes: 1,
      book_reference: book_reference || undefined
    };
    readerNotesStore.unshift(newNote);
    res.json({ success: true, note: newNote });
  });

  // API Route: Community Note Upvote (POST)
  app.post('/api/community/:id/vote', (req, res) => {
    const { id } = req.params;
    const note = readerNotesStore.find(n => n.id === id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    note.upvotes = (note.upvotes || 0) + 1;
    res.json({ success: true, upvotes: note.upvotes });
  });

  // API Route: Search & Modern Cross-Reference
  app.post('/api/search', async (req, res) => {
    const { query, bookFilter, categoryFilter } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required.' });
    }

    const trimmedQuery = query.trim();
    const queryTerms = trimmedQuery.toLowerCase().split(/\s+/).filter(Boolean);

    // 1. Filter and score local manuscript matches
    let matchedEntries = MANUSCRIPT_ENTRIES
      .map(entry => ({ entry, score: scoreEntryMatch(entry, queryTerms) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.entry);

    if (bookFilter && bookFilter !== 'ALL') {
      matchedEntries = matchedEntries.filter(e => e.source_id === bookFilter);
    }
    if (categoryFilter && categoryFilter !== 'ALL') {
      matchedEntries = matchedEntries.filter(e => e.category === categoryFilter);
    }

    // Limit top manuscript matches to most relevant (max 8)
    const topManuscriptMatches = matchedEntries.slice(0, 8);
    const noManuscriptMatch = topManuscriptMatches.length === 0;

    // 2. Call Gemini API to perform synthesis, cross-referencing, and safety review
    const ai = getGeminiClient();
    let queryUnderstoodAs = trimmedQuery;
    let manuscriptSummary = '';
    let modernCrossref = '';
    let modernSources = [
      { title: 'AYUSH Research Portal & Traditional Knowledge Digital Library (TKDL)', url: 'https://ayushportal.nic.in' },
      { title: 'National Center for Biotechnology Information (NCBI / PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov' },
      { title: 'World Health Organization (WHO) Monographs on Selected Medicinal Plants', url: 'https://www.who.int/publications/i/item/9241545178' }
    ];
    let safetyNote = 'This information is transcribed from historical Ayurvedic texts for educational and reference purposes. It does not replace professional medical evaluation. Consult a licensed Ayurvedic physician (BAMS/MD) or doctor before using any remedy, especially if you have ongoing medical conditions or taking medications.';
    let pathyaGuidance = '';

    if (ai) {
      const modelsToTry = ['gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-3.7-flash', 'gemini-3.1-pro-preview'];
      let modelSucceeded = false;

      const prompt = `You are the lead Ayurvedic scholar and clinical research assistant for Mulika, a platform indexing historical Telugu Ayurvedic books with modern scientific cross-referencing.

User Query: "${trimmedQuery}"

Manuscript Entries on record matching this query (if any):
${JSON.stringify(topManuscriptMatches, null, 2)}

Instructions:
1. "query_understood_as": Clarify the user's intent in 1 succinct sentence (e.g. "Ayurvedic management of hemorrhoids (piles / Arshas) and related bowel comfort").
2. "manuscript_summary": If manuscript matches exist, summarize the classical recipes provided in the matched texts in 2-4 sentences. Clearly mention which books and pages the remedies come from. If no manuscript matches exist, state politely that this condition/herb is not yet digitized in the current 4 batches.
3. "modern_crossref": Provide an objective 3-4 sentence modern scientific review of the herbs mentioned or the condition. Cite known phytochemical constituents (e.g., bioflavonoids, tannins, ketosteroids, gingerols, vasicine) and modern pharmacological actions (anti-inflammatory, antimicrobial, astringent).
4. "safety_note": Provide essential safety warnings, contraindications, and red-flag symptoms that necessitate immediate conventional medical attention (e.g., active rectal bleeding, high fever, chest pain, pregnancy precautions, or warnings against unsupervised heavy-metal compounds).
5. "pathya_guidance": 1-2 practical sentences on recommended foods (Pathyam, e.g. buttermilk, fiber, cooked yam) and foods to avoid (Apathyam, e.g. heavy chillies, deep-fried foods).

Respond in pure JSON with keys: query_understood_as, manuscript_summary, modern_crossref, safety_note, pathya_guidance, modern_sources (array of {title, url}).`;

      for (const modelName of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: 'application/json'
            }
          });

          if (response.text) {
            const parsed = JSON.parse(response.text);
            if (parsed.query_understood_as) queryUnderstoodAs = parsed.query_understood_as;
            if (parsed.manuscript_summary) manuscriptSummary = parsed.manuscript_summary;
            if (parsed.modern_crossref) modernCrossref = parsed.modern_crossref;
            if (parsed.safety_note) safetyNote = parsed.safety_note;
            if (parsed.pathya_guidance) pathyaGuidance = parsed.pathya_guidance;
            if (Array.isArray(parsed.modern_sources) && parsed.modern_sources.length > 0) {
              modernSources = parsed.modern_sources;
            }
            modelSucceeded = true;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} unavailable (${err?.message || err}), attempting fallback model...`);
        }
      }

      if (!modelSucceeded) {
        // High quality deterministic domain fallback using indexed monographs and ailments
        const matchedAilment = AILMENT_DIRECTORIES.find(a =>
          trimmedQuery.toLowerCase().includes(a.id) ||
          trimmedQuery.toLowerCase().includes(a.name.toLowerCase()) ||
          trimmedQuery.toLowerCase().includes('pile') && a.id === 'piles' ||
          trimmedQuery.toLowerCase().includes('headache') && a.id === 'headache' ||
          trimmedQuery.toLowerCase().includes('fever') && a.id === 'fever' ||
          trimmedQuery.toLowerCase().includes('cough') && a.id === 'respiratory'
        );

        if (!noManuscriptMatch) {
          const books = Array.from(new Set(topManuscriptMatches.map(m => m.source_short))).join(', ');
          const herbNames = Array.from(new Set(topManuscriptMatches.map(m => m.herb))).slice(0, 3).join(', ');
          manuscriptSummary = `Found ${topManuscriptMatches.length} page-cited remedies across ${books}. The classical texts prioritize balancing Agni (digestive fire) and using topical plasters, decoctions, or medicated churnas with herbs such as ${herbNames}.`;
          modernCrossref = `Modern botanical studies on ${herbNames} confirm the presence of active bioflavonoids, astringent tannins, and anti-inflammatory phytocompounds that promote tissue healing and soothe localized irritation.`;
        } else {
          manuscriptSummary = `No digitized entry across the current translated batches directly matches "${trimmedQuery}".`;
          modernCrossref = `Standard Ayurvedic classical literature suggests consulting primary Dravyaguna monographs while observing balanced lifestyle and dietary practices.`;
        }

        if (matchedAilment) {
          pathyaGuidance = `Pathyam: Favor ${matchedAilment.pathya_apathya.recommended.slice(0, 2).join(', ')}. Avoid ${matchedAilment.pathya_apathya.avoid.slice(0, 2).join(', ')}.`;
          safetyNote = `Emergency Red Flags: ${matchedAilment.red_flags.slice(0, 2).join('; ')}. Always consult a licensed Ayurvedic physician (BAMS/MD) for personalized clinical supervision.`;
        }
      }
    } else {
      // Offline fallback
      if (!noManuscriptMatch) {
        const books = Array.from(new Set(topManuscriptMatches.map(m => m.source_short))).join(', ');
        manuscriptSummary = `Found ${topManuscriptMatches.length} remedies across ${books}. Every card below details the exact formulation and page number from the historical source.`;
        modernCrossref = `Classical Ayurvedic herbs for this condition typically act through astringent (Kashaya), bitter (Tikta), and anti-inflammatory (Shothahara) phytocompounds verified by modern pharmacopeial monographs.`;
      } else {
        manuscriptSummary = `No digitized entries match "${trimmedQuery}" in the current 4-book catalog.`;
        modernCrossref = `Check public domain repositories such as AYUSH and PubMed for relevant ethnobotanical studies.`;
      }
    }

    // Match user submitted remedies
    const userSubmittedMatches = userRemediesStore.filter(rem => {
      const text = `${rem.title} ${rem.ailment_name} ${rem.herb_names.join(' ')} ${rem.ingredients.join(' ')} ${rem.preparation_instructions}`.toLowerCase();
      return queryTerms.some(t => t.length > 2 && text.includes(t));
    }).slice(0, 4);

    res.json({
      query_understood_as: queryUnderstoodAs,
      manuscript_matches: topManuscriptMatches,
      user_submitted_matches: userSubmittedMatches,
      no_manuscript_match: noManuscriptMatch,
      manuscript_summary: manuscriptSummary,
      modern_crossref: modernCrossref,
      modern_sources: modernSources,
      safety_note: safetyNote,
      pathya_guidance: pathyaGuidance
    });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mulika Ayurvedic Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
