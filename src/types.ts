export interface AyurvedicEntry {
  id: string;
  herb: string;
  herb_full?: string;
  telugu: string;
  botanical?: string;
  source_id: 'mulika' | 'chitkalu' | 'medplants' | 'beauty';
  source_short: string;
  source_title: string;
  source_author?: string | null;
  page: number;
  ailment: string;
  ailment_telugu?: string;
  remedy: string;
  remedy_telugu?: string;
  verification_note?: string;
  category: 'Digestive & Piles' | 'Headache & Neuro' | 'Fevers & Immunity' | 'Respiratory & Cough' | 'Joints & Pain' | 'Skin & Wounds' | 'Women\'s Health' | 'General Vitality' | 'Urinary & Renal' | 'Toxicology & Antidotes';
  preparation_type?: string;
  safety_rating?: 'Safe Food/Herb' | 'Use Measured Dose' | 'Specialist/Rasashastra Caution';
}

export interface UserSubmittedRemedy {
  id: string;
  author_name: string;
  author_role?: string;
  ailment_id: string;
  ailment_name: string;
  herb_names: string[];
  title: string;
  ingredients: string[];
  preparation_instructions: string;
  dosage_usage: string;
  source_tradition?: string;
  precautions?: string;
  timestamp: number;
  upvotes: number;
  verified: false;
  verification_status: 'user-submitted';
}

export interface HerbMonograph {
  id: string;
  name: string;
  telugu: string;
  botanical: string;
  sanskrit: string;
  family: string;
  common_names: string[];
  description: string;
  rasa: string; // Taste
  virya: string; // Potency (Ushna/Sheeta)
  vipaka: string; // Post-digestive effect
  dosha_effect: string; // Vata/Pitta/Kapha effect
  parts_used: string[];
  traditional_uses: string[];
  associated_ailments: string[];
  modern_evidence: string;
  contraindications: string[];
  remedy_count: number;
}

export interface AilmentInfo {
  id: string;
  name: string;
  telugu_name: string;
  category: string;
  description: string;
  classical_term: string;
  dosha_involvement: string;
  pathya_apathya: {
    recommended: string[];
    avoid: string[];
  };
  red_flags: string[];
  indexed_remedies_count: number;
}

export interface GlossaryTerm {
  telugu: string;
  transliteration: string;
  english_medical: string;
  description: string;
  category: string;
}

export interface AntidoteEntry {
  substance: string;
  telugu_substance: string;
  antidote: string;
  telugu_antidote: string;
  notes: string;
}

export interface ShodhanamEntry {
  item: string;
  telugu_item: string;
  method: string;
  purpose: string;
}

export interface MeasurementUnit {
  telugu_name: string;
  transliteration: string;
  metric_equivalent: string;
  category: 'weight' | 'volume' | 'traditional_count';
  explanation: string;
}

export interface ReaderNote {
  id: string;
  author: string;
  herb: string;
  ailment: string;
  message: string;
  timestamp: number;
  tags?: string[];
  upvotes: number;
  book_reference?: string;
}

export interface SearchResult {
  query_understood_as: string;
  manuscript_matches: AyurvedicEntry[];
  user_submitted_matches?: UserSubmittedRemedy[];
  no_manuscript_match: boolean;
  manuscript_summary: string;
  modern_crossref: string;
  modern_sources: { title: string; url: string }[];
  safety_note: string;
  pathya_guidance?: string;
}
