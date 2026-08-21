import { GlossaryTerm, MeasurementUnit, AntidoteEntry, ShodhanamEntry } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    telugu: 'అర్శస్సు (మొలలు)',
    transliteration: 'Arshas (Molalu)',
    english_medical: 'Hemorrhoids / Piles',
    description: 'Fleshy vascular vascular outgrowths or swelling in the anorectal canal causing pain, itching, or bleeding during bowel movements.',
    category: 'Digestive & Anorectal'
  },
  {
    telugu: 'భగంధరము',
    transliteration: 'Bhagandara',
    english_medical: 'Fistula-in-ano',
    description: 'An abnormal chronic track communicating between the anal canal and external perianal skin.',
    category: 'Digestive & Anorectal'
  },
  {
    telugu: 'ఆమవాతము',
    transliteration: 'Amavata',
    english_medical: 'Rheumatoid Arthritis / Inflammatory Arthropathy',
    description: 'A condition caused by the accumulation of undigested endotoxins (Ama) in joint spaces coupled with aggravated Vata dosha.',
    category: 'Musculoskeletal'
  },
  {
    telugu: 'రక్తపిత్తం',
    transliteration: 'Raktapitta',
    english_medical: 'Hemorrhagic Diathesis / Bleeding Disorder',
    description: 'A bleeding condition where blood (Rakta) is corrupted by heated Pitta, causing spontaneous bleeding from orifices (nose, rectum, urethra).',
    category: 'Hematological'
  },
  {
    telugu: 'పార్శ్వపు నొప్పి (అర్ధావభేదము)',
    transliteration: 'Parshwapu Noppi / Ardhavabhedaka',
    english_medical: 'Hemicrania / Migraine',
    description: 'Severe episodic unilateral headache often accompanied by sensitivity to light, sound, nausea, or visual aura.',
    category: 'Neurological'
  },
  {
    telugu: 'శిరశ్శూల',
    transliteration: 'Shirashula',
    english_medical: 'Cephalea / Tension Headache',
    description: 'Generalized headache and cranial pressure stemming from Vata-Pitta imbalances or sinus congestion.',
    category: 'Neurological'
  },
  {
    telugu: 'చలి జ్వరం',
    transliteration: 'Chali Jwaram',
    english_medical: 'Intermittent Rigor Fever / Malarial Symptoms',
    description: 'Fever characterized by periodic episodes of severe shivering, chills, followed by high temperature and profuse perspiration.',
    category: 'Infectious / Fevers'
  },
  {
    telugu: 'సన్నిపాత జ్వరం',
    transliteration: 'Sannipata Jwaram',
    english_medical: 'Tridoshic / Typhoid-like Toxic Fever',
    description: 'Severe acute fever with simultaneous aggravation of Vata, Pitta, and Kapha, leading to delirium, dehydration, and prostration.',
    category: 'Infectious / Fevers'
  },
  {
    telugu: 'కామల (కామెర్లు)',
    transliteration: 'Kamala (Kaamerlu)',
    english_medical: 'Jaundice / Hyperbilirubinemia / Hepatitis',
    description: 'Yellow discoloration of sclera, urine, and skin caused by impaired liver function or bile tract obstruction.',
    category: 'Hepatobiliary'
  },
  {
    telugu: 'అగ్నిమాంద్యము',
    transliteration: 'Agnimandya',
    english_medical: 'Atonic Dyspepsia / Sluggish Digestion',
    description: 'Weak digestive fire causing feeling of heaviness, bloating, delayed gastric emptying, and loss of appetite.',
    category: 'Digestive & Anorectal'
  },
  {
    telugu: 'మలబద్ధకము',
    transliteration: 'Malabaddhakamu',
    english_medical: 'Constipation',
    description: 'Infrequent, hard, or difficult bowel evacuations due to dry Apana Vata.',
    category: 'Digestive & Anorectal'
  },
  {
    telugu: 'గృధ్రసీవాతం',
    transliteration: 'Gridhrasi',
    english_medical: 'Sciatica / Lumbar Radiculopathy',
    description: 'Severe radiating shooting pain from the lower back down along the buttock, thigh, calf, and foot.',
    category: 'Musculoskeletal'
  },
  {
    telugu: 'అశ్మరి',
    transliteration: 'Ashmari',
    english_medical: 'Renal / Urolithiasis (Kidney & Bladder Stones)',
    description: 'Formation of mineral calculi in the kidneys, ureters, or bladder leading to colicky lumbar pain and hematuria.',
    category: 'Urinary & Renal'
  },
  {
    telugu: 'కుసుమ రోగం / శ్వేతప్రదరము',
    transliteration: 'Kusuma Rogam / Shwetapradara',
    english_medical: 'Leukorrhea / Gynecological Discharge',
    description: 'Excessive white or yellowish vaginal discharge stemming from reproductive tract imbalance or infection.',
    category: 'Gynecological'
  },
  {
    telugu: 'రక్తప్రదరము (ఎర్రకుసుమ)',
    transliteration: 'Raktapradara (Errakusuma)',
    english_medical: 'Menorrhagia / Dysfunctional Uterine Bleeding',
    description: 'Excessive, heavy, or prolonged menstrual bleeding.',
    category: 'Gynecological'
  },
  {
    telugu: 'బొల్లి (శ్వేతకుష్ఠు)',
    transliteration: 'Bolli (Shweta Kushtha)',
    english_medical: 'Vitiligo / Leukoderma',
    description: 'Autoimmune skin condition causing loss of melanocytes, resulting in smooth white patches on skin.',
    category: 'Dermatological'
  },
  {
    telugu: 'శ్లీపదము (బోదకాలు)',
    transliteration: 'Shleepadamu (Bodakalu)',
    english_medical: 'Elephantiasis / Filariasis',
    description: 'Chronic lymphatic obstruction causing marked swelling and hypertrophy of lower extremities.',
    category: 'Infectious / Lymphatic'
  },
  {
    telugu: 'మేహము / ప్రమేహము',
    transliteration: 'Prameha / Mehamu',
    english_medical: 'Metabolic & Urinary Disorders / Diabetes Mellitus',
    description: 'Disorders characterized by excessive urination (polyuria), glycosuria, and altered systemic metabolism.',
    category: 'Metabolic & Endocrine'
  }
];

export const MEASUREMENT_UNITS: MeasurementUnit[] = [
  {
    telugu_name: 'తులము (Tulam)',
    transliteration: 'Tulam',
    metric_equivalent: '11.5 - 12 Grams',
    category: 'weight',
    explanation: 'Standard classical Ayurvedic unit for dry herbs and powders (approximately 1 tola).'
  },
  {
    telugu_name: 'ఫలము (Palam)',
    transliteration: 'Palam',
    metric_equivalent: '35 - 48 Grams (3 to 4 Tulams)',
    category: 'weight',
    explanation: 'Often used for measuring compound formulations, ghee, or milk preparations.'
  },
  {
    telugu_name: 'సేరు (Seru)',
    transliteration: 'Seru',
    metric_equivalent: '280 Grams (Weight) / ~1 Liter (Liquid)',
    category: 'weight',
    explanation: 'Used for larger decoction water bases or bulk herbal syrups.'
  },
  {
    telugu_name: 'వీశ (Veesha)',
    transliteration: 'Veesha',
    metric_equivalent: '1400 Grams (1.4 kg / 5 Serus)',
    category: 'weight',
    explanation: 'Wholesale and bulk pharmacy measurement.'
  },
  {
    telugu_name: 'గిద్ద (Gidda / Pavu-seru)',
    transliteration: 'Gidda',
    metric_equivalent: '70 - 75 ml (Quarter Seru)',
    category: 'volume',
    explanation: 'Classical liquid dosage unit for herbal decoctions (Kashayam).'
  },
  {
    telugu_name: 'గురివింద గింజంత (Gunja / Ratti)',
    transliteration: 'Gurivinda Ginjanta',
    metric_equivalent: '120 - 125 Milligrams',
    category: 'traditional_count',
    explanation: 'Dosage comparison using the weight of a single Abrus precatorius seed for potent powders.'
  },
  {
    telugu_name: 'కుంకుడు గింజంత',
    transliteration: 'Kunkudu Ginjanta',
    metric_equivalent: '1.5 - 2 Grams',
    category: 'traditional_count',
    explanation: 'Standard bolus / pill size comparison equal to a soapnut seed.'
  },
  {
    telugu_name: 'చెంచా (Teaspoon)',
    transliteration: 'Chencha',
    metric_equivalent: '5 Milliliters / 3-5 Grams',
    category: 'volume',
    explanation: 'Modern metric translation for household spoonfuls.'
  }
];

export const ANTIDOTE_ENTRIES: AntidoteEntry[] = [
  {
    substance: 'Ummetta (Datura metel)',
    telugu_substance: 'ఉమ్మెత్త',
    antidote: 'Tamarind pulp water (Chintapandu rasam) or Brinjal astringent juice',
    telugu_antidote: 'చింతపండు, వంకాయవగరు',
    notes: 'For toxicity or excessive intake of Datura, sour tamarind drink neutralizes the anticholinergic alkaloid intoxication.'
  },
  {
    substance: 'Opium (Nallamandu)',
    telugu_substance: 'నల్లమందు',
    antidote: 'Nutmeg (Jajikaya) with Ushira (Vattiverlu) kashayam, or Fresh Ginger juice with Shunthi',
    telugu_antidote: 'జాజికాయ, వట్టివేళ్ళు కషాయం / శొంటి, అల్లం',
    notes: 'Stimulates the central nervous system and accelerates metabolic clearance of opiate depression.'
  },
  {
    substance: 'Alcohol Overintoxication (Madhyamu)',
    telugu_substance: 'మద్యం మత్తు',
    antidote: 'Alum (Patika) decoction with Coriander water (Dhaniyalu)',
    telugu_antidote: 'పటిక కషాయం, ధనియాలు',
    notes: 'Rehydrates and eliminates heat from excessive fermentation.'
  },
  {
    substance: 'Avalu (Mustard Seed overdose)',
    telugu_substance: 'ఆవాలు',
    antidote: 'Amla (Usiri) pulp and Asafoetida (Inguva)',
    telugu_antidote: 'ఉసిరిక, ఇంగువ',
    notes: 'Neutralizes excess pungent heat and gastric mucosal irritation.'
  },
  {
    substance: 'Excessive Meat Consumption Indigestion',
    telugu_substance: 'అధిక మాంసభక్షణ అజీర్ణం',
    antidote: 'Sesame seed alkali (Nuvvula Ksharam) or Raw Mango juice (Mamidi chigullu)',
    telugu_antidote: 'నువ్వుల క్షారము, మామిడి రసం',
    notes: 'Dissolves heavy proteins and restores gastric digestive secretions.'
  },
  {
    substance: 'Ganneru (Nerium oleander)',
    telugu_substance: 'గన్నేరు',
    antidote: 'Haritaki (Karakkaya) with Neem seeds (Vepa vittulu)',
    telugu_antidote: 'కరక్కాయలు, వేపవిత్తులు',
    notes: 'Strong emetic and cardiotonic antidote. Medical emergency required.'
  },
  {
    substance: 'Jilledu (Calotropis gigantea latex)',
    telugu_substance: 'జిల్లేడు పాలు',
    antidote: 'Chenchali leaves or Indigo (Neelichettu) leaf juice',
    telugu_antidote: 'చెంచలాకు - నీలిఆకు',
    notes: 'Renders Calotropis latex toxins inert when accidentally ingested.'
  },
  {
    substance: 'Nalla Jeedi (Semecarpus anacardium / Marking nut)',
    telugu_substance: 'నల్లజీడి',
    antidote: 'Ghee boiled with milk and sesame seed paste applied externally and taken internally',
    telugu_antidote: 'నెయ్యి, పాలు, నువ్వుల కల్కం',
    notes: 'Semecarpus anacardium produces corrosive urushiol blisters; cow ghee and sesame oil provide immediate lipid-phase neutralization.'
  }
];

export const SHODHANAM_ENTRIES: ShodhanamEntry[] = [
  {
    item: 'Ashwagandha (Withania somnifera)',
    telugu_item: 'అశ్వగంధ',
    method: 'Boiled in cow\'s milk (Ksheera Swedanam) for 1 hour or steamed over milk, then dried in the shade.',
    purpose: 'Removes heavy equine odor, softens harsh fibers, and augments nutritive rejuvenating potency.'
  },
  {
    item: 'Inguva / Asafoetida (Ferula foetida)',
    telugu_item: 'ఇంగువ',
    method: 'Lightly fried in pure cow\'s ghee until crispy and aromatic, then cooled.',
    purpose: 'Removes volatile digestive irritants and prevents nausea.'
  },
  {
    item: 'Ummetta Seeds (Datura metel)',
    telugu_item: 'ఉమ్మెత్త విత్తులు',
    method: 'Soaked in running stream water or lemon juice (Nimma rasam) for 1 hour, then washed and dried.',
    purpose: 'Reduces toxic tropane alkaloid concentrations before therapeutic formulation.'
  },
  {
    item: 'Shunthi / Dry Ginger (Zingiber officinale)',
    telugu_item: 'శొంఠి',
    method: 'Outer skin scraped off, smeared with wet lime (sunnam), dried under strong sun, and wiped clean before powdering.',
    purpose: 'Detoxifies outer fungal spores and enhances gastric friendliness.'
  },
  {
    item: 'Vasa / Sweet Flag (Acorus calamus)',
    telugu_item: 'వాము / వస',
    method: 'Soaked in clarified lime water (Sunnapu theta) for 1 hour, dried in shade.',
    purpose: 'Balances beta-asarone levels for neurological applications.'
  },
  {
    item: 'Jeedi Ginjalu / Marking Nut (Semecarpus)',
    telugu_item: 'జీడిగింజలు',
    method: 'Buried in brick powder or cow dung slurry for 3 days, then washed with warm water.',
    purpose: 'Absorbs caustic black pericarp oil that causes contact dermatitis.'
  }
];
