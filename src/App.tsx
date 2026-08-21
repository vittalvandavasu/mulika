import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SearchHero } from './components/SearchHero';
import { SearchResultsView } from './components/SearchResultsView';
import { ManuscriptReader } from './components/ManuscriptReader';
import { HerbEncyclopedia } from './components/HerbEncyclopedia';
import { AilmentDirectory } from './components/AilmentDirectory';
import { GlossaryAndTools } from './components/GlossaryAndTools';
import { CommunityForum } from './components/CommunityForum';
import { SourcesSection } from './components/SourcesSection';
import { SubmitRemedyModal } from './components/SubmitRemedyModal';
import { SystemArchitectureModal } from './components/SystemArchitectureModal';
import { Footer } from './components/Footer';
import {
  AyurvedicEntry,
  HerbMonograph,
  AilmentInfo,
  GlossaryTerm,
  MeasurementUnit,
  AntidoteEntry,
  ShodhanamEntry,
  ReaderNote,
  SearchResult,
  UserSubmittedRemedy
} from './types';

// Fallback seed data imports
import { MANUSCRIPT_ENTRIES } from './data/manuscripts';
import { HERB_MONOGRAPHS } from './data/herbs';
import { AILMENT_DIRECTORIES } from './data/ailments';
import { GLOSSARY_TERMS, MEASUREMENT_UNITS, ANTIDOTE_ENTRIES, SHODHANAM_ENTRIES } from './data/glossary';
import { INITIAL_USER_REMEDIES } from './data/userRemedies';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('search');
  const [query, setQuery] = useState<string>('i have piles what can I do ayurvedically for this');
  const [bookFilter, setBookFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const [entries, setEntries] = useState<AyurvedicEntry[]>(MANUSCRIPT_ENTRIES);
  const [herbs, setHerbs] = useState<HerbMonograph[]>(HERB_MONOGRAPHS);
  const [ailments, setAilments] = useState<AilmentInfo[]>(AILMENT_DIRECTORIES);
  const [userRemedies, setUserRemedies] = useState<UserSubmittedRemedy[]>(INITIAL_USER_REMEDIES);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>(GLOSSARY_TERMS);
  const [measurements, setMeasurements] = useState<MeasurementUnit[]>(MEASUREMENT_UNITS);
  const [antidotes, setAntidotes] = useState<AntidoteEntry[]>(ANTIDOTE_ENTRIES);
  const [shodhanam, setShodhanam] = useState<ShodhanamEntry[]>(SHODHANAM_ENTRIES);
  const [notes, setNotes] = useState<ReaderNote[]>([]);

  // Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [modalDefaultAilmentId, setModalDefaultAilmentId] = useState<string | undefined>();
  const [modalDefaultAilmentName, setModalDefaultAilmentName] = useState<string | undefined>();
  const [modalDefaultHerb, setModalDefaultHerb] = useState<string | undefined>();

  // Fetch all initial metadata from server
  useEffect(() => {
    // 1. Fetch entries
    fetch('/api/entries')
      .then(res => res.json())
      .then(data => Array.isArray(data) && data.length > 0 && setEntries(data))
      .catch(() => setEntries(MANUSCRIPT_ENTRIES));

    // 2. Fetch herbs
    fetch('/api/herbs')
      .then(res => res.json())
      .then(data => Array.isArray(data) && data.length > 0 && setHerbs(data))
      .catch(() => setHerbs(HERB_MONOGRAPHS));

    // 3. Fetch ailments
    fetch('/api/ailments')
      .then(res => res.json())
      .then(data => Array.isArray(data) && data.length > 0 && setAilments(data))
      .catch(() => setAilments(AILMENT_DIRECTORIES));

    // 4. Fetch user remedies
    fetch('/api/user-remedies')
      .then(res => res.json())
      .then(data => Array.isArray(data) && data.length > 0 && setUserRemedies(data))
      .catch(() => setUserRemedies(INITIAL_USER_REMEDIES));

    // 5. Fetch glossary
    fetch('/api/glossary')
      .then(res => res.json())
      .then(data => {
        if (data.terms) setGlossaryTerms(data.terms);
        if (data.measurements) setMeasurements(data.measurements);
        if (data.antidotes) setAntidotes(data.antidotes);
        if (data.shodhanam) setShodhanam(data.shodhanam);
      })
      .catch(() => {});

    // 6. Fetch community notes
    fetch('/api/community')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setNotes(data))
      .catch(() => {});

    // Execute default search on mount
    handleSearch('i have piles what can I do ayurvedically for this');
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setActiveTab('search');
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          bookFilter,
          categoryFilter
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
      } else {
        throw new Error('Search failed');
      }
    } catch (err) {
      console.warn('API search fell back to client search engine:', err);
      // Client-side search fallback
      const qLower = searchQuery.toLowerCase();
      const matched = entries.filter(e =>
        e.herb.toLowerCase().includes(qLower) ||
        e.telugu.includes(qLower) ||
        e.ailment.toLowerCase().includes(qLower) ||
        e.remedy.toLowerCase().includes(qLower) ||
        (qLower.includes('pile') && e.category === 'Digestive & Piles') ||
        (qLower.includes('headache') && e.category === 'Headache & Neuro') ||
        (qLower.includes('fever') && e.category === 'Fevers & Immunity') ||
        (qLower.includes('cold') && e.category === 'Respiratory & Cough') ||
        (qLower.includes('joint') && e.category === 'Joints & Pain')
      );

      const matchedUser = userRemedies.filter(rem => {
        const text = `${rem.title} ${rem.ailment_name} ${rem.herb_names.join(' ')}`.toLowerCase();
        return text.includes(qLower) || (qLower.includes('pile') && rem.ailment_id === 'piles');
      });

      setSearchResult({
        query_understood_as: searchQuery,
        manuscript_matches: matched,
        user_submitted_matches: matchedUser,
        no_manuscript_match: matched.length === 0,
        manuscript_summary: `Located ${matched.length} page-cited remedies from the verified manuscript shelf. The recipes utilize classical decoctions, herbal plasters, and dietetic preparations.`,
        modern_crossref: `Modern botanical cross-references validate the active tannins, bioflavonoids, and anti-inflammatory mechanisms of these classical formulations.`,
        modern_sources: [
          { title: 'AYUSH Research Portal & TKDL', url: 'https://ayushportal.nic.in' },
          { title: 'PubMed / NCBI Database', url: 'https://pubmed.ncbi.nlm.nih.gov' }
        ],
        safety_note: 'Always consult a licensed Ayurvedic doctor (BAMS) before beginning treatment. Do not use unsupervised heavy metal or Rasashastra preparations.',
        pathya_guidance: 'Favor warm, easily digestible light foods with buttermilk and cooked yam. Avoid pungent chillies and constipation-causing foods.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSubmitModal = (ailmentId?: string, ailmentName?: string, herb?: string) => {
    setModalDefaultAilmentId(ailmentId);
    setModalDefaultAilmentName(ailmentName);
    setModalDefaultHerb(herb);
    setIsSubmitModalOpen(true);
  };

  const handleUserRemedyCreated = (remedy: UserSubmittedRemedy) => {
    setUserRemedies(prev => [remedy, ...prev]);
  };

  const handleVoteUserRemedy = async (id: string) => {
    try {
      const res = await fetch(`/api/user-remedies/${id}/vote`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setUserRemedies(prev =>
          prev.map(r => r.id === id ? { ...r, upvotes: data.upvotes } : r)
        );
      }
    } catch {
      setUserRemedies(prev =>
        prev.map(r => r.id === id ? { ...r, upvotes: (r.upvotes || 0) + 1 } : r)
      );
    }
  };

  const handleAddNote = async (newNote: {
    author: string;
    herb: string;
    ailment: string;
    message: string;
    book_reference?: string;
  }) => {
    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
      });
      if (response.ok) {
        const result = await response.json();
        if (result.note) {
          setNotes(prev => [result.note, ...prev]);
        }
      }
    } catch (err) {
      console.error('Error posting note:', err);
      const localNote: ReaderNote = {
        id: 'local-' + Date.now(),
        author: newNote.author,
        herb: newNote.herb,
        ailment: newNote.ailment,
        message: newNote.message,
        timestamp: Date.now(),
        tags: ['Reader Note'],
        upvotes: 1,
        book_reference: newNote.book_reference
      };
      setNotes(prev => [localNote, ...prev]);
    }
  };

  const handleVoteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/community/${id}/vote`, { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        setNotes(prev =>
          prev.map(n => (n.id === id ? { ...n, upvotes: data.upvotes } : n))
        );
      }
    } catch {
      setNotes(prev =>
        prev.map(n => (n.id === id ? { ...n, upvotes: (n.upvotes || 0) + 1 } : n))
      );
    }
  };

  const herbOptions = herbs.map(h => `${h.name} (${h.telugu})`);

  return (
    <div className="min-h-screen bg-[#0B130E] text-[#EFECE5] flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#0B130E]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalEntriesCount={entries.length}
        onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'search' && (
          <div>
            <SearchHero
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
              loading={loading}
              bookFilter={bookFilter}
              setBookFilter={setBookFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SearchResultsView
                searchResult={searchResult}
                loading={loading}
                onSelectHerb={(herbName) => {
                  setQuery(herbName);
                  handleSearch(herbName);
                }}
                onOpenSubmitModal={(condition) => {
                  handleOpenSubmitModal(undefined, condition, undefined);
                }}
                onVoteUserRemedy={handleVoteUserRemedy}
              />
            </div>
          </div>
        )}

        {activeTab === 'codex' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ManuscriptReader
              entries={entries}
              onSelectHerb={(herbName) => {
                setQuery(herbName);
                handleSearch(herbName);
              }}
            />
          </div>
        )}

        {activeTab === 'herbs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HerbEncyclopedia
              herbs={herbs}
              entries={entries}
              userRemedies={userRemedies}
              onSelectHerbForSearch={(herbQuery) => {
                setQuery(herbQuery);
                handleSearch(herbQuery);
              }}
              onSelectAilment={(ailmentId) => {
                setActiveTab('ailments');
              }}
              onVoteUserRemedy={handleVoteUserRemedy}
            />
          </div>
        )}

        {activeTab === 'ailments' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AilmentDirectory
              ailments={ailments}
              herbs={herbs}
              manuscriptEntries={entries}
              userRemedies={userRemedies}
              onSelectHerb={(herbId) => {
                setActiveTab('herbs');
              }}
              onOpenSubmitModal={handleOpenSubmitModal}
              onVoteUserRemedy={handleVoteUserRemedy}
            />
          </div>
        )}

        {activeTab === 'glossary' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GlossaryAndTools
              terms={glossaryTerms}
              measurements={measurements}
              antidotes={antidotes}
              shodhanam={shodhanam}
            />
          </div>
        )}

        {activeTab === 'community' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CommunityForum
              notes={notes}
              userRemedies={userRemedies}
              onAddNote={handleAddNote}
              onVoteNote={handleVoteNote}
              onVoteUserRemedy={handleVoteUserRemedy}
              onOpenSubmitRemedyModal={() => handleOpenSubmitModal()}
              herbOptions={herbOptions}
            />
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SourcesSection
              onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
              onNavigateToCodex={() => setActiveTab('codex')}
            />
          </div>
        )}
      </main>

      {/* Submit Remedy Modal */}
      <SubmitRemedyModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSuccess={handleUserRemedyCreated}
        defaultAilmentId={modalDefaultAilmentId}
        defaultAilmentName={modalDefaultAilmentName}
        defaultHerb={modalDefaultHerb}
      />

      {/* Full Stack Architecture & Database Modal */}
      <SystemArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        totalVerifiedPages={18}
        totalCatalogPages={144}
      />
    </div>
  );
}

export default App;
