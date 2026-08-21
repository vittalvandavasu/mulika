import { AilmentInfo } from '../types';

export const AILMENT_DIRECTORIES: AilmentInfo[] = [
  {
    id: 'piles',
    name: 'Piles & Hemorrhoids',
    telugu_name: 'మూలవ్యాధి / అర్శస్సు (పైల్స్)',
    category: 'Digestive & Anorectal',
    description: 'Enlarged, inflamed, and painful vascular cushions in the lower rectum or anal canal. In Ayurveda, classified as Arshas, primarily stemming from Mandagni (sluggish digestive fire) and chronically dry Apana Vata causing hard stool passage.',
    classical_term: 'Arshas (Raktarshas / Shushkarshas)',
    dosha_involvement: 'Vata-Pitta dominant (Bleeding type) or Vata-Kapha (Hard mass type)',
    pathya_apathya: {
      recommended: [
        'Cooked Elephant Foot Yam (Kanda / Surana) with sesame oil',
        'Fresh churned buttermilk (Majjiga) with cumin and rock salt',
        'Soaked black raisins (Kishmish) and prunes',
        'Adequate warm water and high soluble fiber foods (lauki, ridge gourd, oats)'
      ],
      avoid: [
        'Excessive red chillies, raw garlic, deep-fried snacks',
        'Prolonged sitting on hard surfaces',
        'Excessive straining during defecation',
        'Dry, stale, or astringent un-oiled foods'
      ]
    },
    red_flags: [
      'Active bright red spurting arterial bleeding from the rectum',
      'Sudden excruciating unbearable perianal pain with hard bluish lump (Thrombosed external pile)',
      'Black tarry stools (Melena - indicates upper GI bleed)',
      'High fever with perianal heat and pus drainage (Abscess / Fistula)'
    ],
    indexed_remedies_count: 9
  },
  {
    id: 'headache',
    name: 'Headaches & Migraines',
    telugu_name: 'తలనొప్పి / పార్శ్వపు నొప్పి (మైగ్రేన్)',
    category: 'Headache & Neuro',
    description: 'Cranial pain ranging from tension headache, sinusitis congestion, to unilateral throbbing migraines (Ardhavabhedaka / Suryavarta). In Ayurveda, caused by irregular sleep, suppressed natural urges, eye strain, or Pitta-Vata vitiation in the head channels (Shiro-srotas).',
    classical_term: 'Shirashula / Ardhavabhedaka / Suryavarta',
    dosha_involvement: 'Vata-Pitta (Migraine/burning) or Vata-Kapha (Sinus congestion/heaviness)',
    pathya_apathya: {
      recommended: [
        'Cooling sweet fruits (sweet grapes, pomegranate, fresh coconut water)',
        'Applying cooling herbal pastes (Shunthi/Jatamansi/Vaavili lepam) to forehead',
        'Regular sleep timing and gentle oil massage (Shiroabhyanga)',
        'Drinking lukewarm water and having meals on time'
      ],
      avoid: [
        'Skipping meals or fasting excessively',
        'Direct harsh midday sun exposure without head covering',
        'Loud noise, excessive screen time in dark rooms',
        'Pungent, sour, fermented, and excessively salty foods'
      ]
    },
    red_flags: [
      'Sudden "thunderclap" severe headache (worst headache of life)',
      'Headache accompanied by stiff neck, fever, confusion, or photophobia (Meningitis sign)',
      'Headache with focal neurological deficits, slurred speech, or weakness on one side',
      'Headache following recent head trauma or progressive worsening over weeks'
    ],
    indexed_remedies_count: 8
  },
  {
    id: 'fever',
    name: 'Fevers & Chills',
    telugu_name: 'జ్వరము / చలి జ్వరం (మలేరియా, వైరల్)',
    category: 'Fevers & Immunity',
    description: 'Systemic elevation of body temperature resulting from the displacement of digestive fire (Jatharagni) into circulating tissues by Ama (toxins). Encompasses seasonal viral flu, chill-fevers (Chali Jwaram), and chronic low-grade fevers (Jeerna Jwara).',
    classical_term: 'Jwara (Vataja, Pittaja, Kaphaja, Sannipataja, Vishama Jwara)',
    dosha_involvement: 'Tridoshic with circulating Ama toxins',
    pathya_apathya: {
      recommended: [
        'Langhana (light therapeutic fasting) or warm thin rice/mung gruel (Peya/Yavagu)',
        'Boiled Shadanga paniya water (water boiled with Musta, Ushira, Ginger)',
        'Fresh Tulsi and black pepper warm infusions',
        'Adequate rest in a draft-free warm room'
      ],
      avoid: [
        'Heavy oily foods, dairy, sweets, and solid meals during acute fever spike',
        'Cold drafts, air conditioners, chilled drinks, and cold baths',
        'Physical exertion, excessive talking, or emotional stress',
        'Suppression of perspiration'
      ]
    },
    red_flags: [
      'High temperature above 103°F (39.5°C) or fever not responding to basic measures',
      'Fever accompanied by severe shortness of breath, chest pain, or blue lips',
      'Fever in infants under 3 months old',
      'Persistent fever lasting more than 48-72 hours without clear etiology (needs malaria/dengue/typhoid labs)'
    ],
    indexed_remedies_count: 7
  },
  {
    id: 'respiratory',
    name: 'Cough, Cold & Asthma',
    telugu_name: 'దగ్గు, జలుబు, ఉబ్బసము (శ్వాసకాసలు)',
    category: 'Respiratory & Cough',
    description: 'Disorders of the respiratory channels (Pranavaha Srotas) characterized by airway reactivity, spasmodic cough (Kasa), wheezing, and mucosal secretions (Kapha).',
    classical_term: 'Kasa / Shwasa / Pratishyaya',
    dosha_involvement: 'Vata and Kapha dominant',
    pathya_apathya: {
      recommended: [
        'Ginger-honey syrup, warm turmeric milk, and black pepper decoctions',
        'Steam inhalation with Tulsi or Nirgundi leaves',
        'Warm, freshly prepared light soups with cumin and garlic',
        'Sitting upright and sleeping with elevated pillows'
      ],
      avoid: [
        'Ice cream, cold refrigerated water, yogurt, bananas at night',
        'Exposure to cold winds, dust, smoke, and chemical aerosols',
        'Daytime sleeping (increases Kapha obstruction)',
        'Suppression of coughing or sneezing'
      ]
    },
    red_flags: [
      'Inability to speak in full sentences due to severe breathlessness',
      'Stridor, chest wall retraction, or cyanosis around fingernails/mouth',
      'Coughing up frank blood (Hemoptysis)',
      'Oxygen saturation dropping below 94%'
    ],
    indexed_remedies_count: 8
  },
  {
    id: 'joints',
    name: 'Joint Pain & Rheumatism',
    telugu_name: 'కీళ్ళనొప్పులు / ఆమవాతం / సంధివాతం',
    category: 'Joints & Pain',
    description: 'Pain, swelling, stiffness, and restricted movement in joints. Differentiated in Ayurveda between Amavata (autoimmune inflammatory arthritis with morning stiffness) and Sandhivata (degenerative osteoarthritis due to dry Vata).',
    classical_term: 'Amavata / Sandhivata / Kroshtukashirsha',
    dosha_involvement: 'Vata dominant with metabolic Ama (Amavata) or Vata decay (Osteoarthritis)',
    pathya_apathya: {
      recommended: [
        'Warm dry-ginger and castor oil formulations (for Amavata)',
        'Dry hot fomentation (Valuka Sweda / warm salt pouch massage)',
        'Light, easily digestible warm soups seasoned with garlic, ginger, and turmeric',
        'Gentle non-weight-bearing mobility exercises within pain-free range'
      ],
      avoid: [
        'Cold, damp environments and cold water bathing during acute flare-ups',
        'Heavy curds, black gram (urad), fermented bakery items, and cold drinks',
        'Immobilization without gentle range-of-motion movements',
        'Day sleeping after heavy meals'
      ]
    },
    red_flags: [
      'Single hot, swollen, intensely red joint with fever (Septic arthritis emergency)',
      'Joint deformity following acute trauma (fracture or dislocation)',
      'Loss of bladder or bowel control accompanying severe back/leg pain (Cauda equina syndrome)'
    ],
    indexed_remedies_count: 6
  },
  {
    id: 'jaundice',
    name: 'Jaundice & Liver Health',
    telugu_name: 'కామెర్లు / కాలేయ వ్యాధులు',
    category: 'Digestive & Liver',
    description: 'Yellow discoloration of sclera and skin caused by Pitta stagnation and hepatic canalicular impairment. Classified in Ayurveda as Kamala (Kosthashrita or Shakhashrita) resulting from excessive fiery foods, alcohol, and un-cooled anger.',
    classical_term: 'Kamala / Yakritodara / Pandu',
    dosha_involvement: 'Pitta and Rakta vitiation with sluggish Agni',
    pathya_apathya: {
      recommended: [
        'Bhumyamalaki (Nela Usiri) or Guduchi decoction with honey',
        'Sugarcane juice, sweet grapes, tender coconut water, pomegranate',
        'Easily digestible old shali rice with mung bean soup',
        'Abundant physical and mental resting'
      ],
      avoid: [
        'All oils, deep-fried snacks, ghee, and spicy pickles during active jaundice',
        'Alcohol, smoking, and heavy physical labor in hot sun',
        'Sour curds, mustard, tamarind, and fermented foods',
        'Daytime sleeping and suppression of natural urges'
      ]
    },
    red_flags: [
      'Severe abdominal distension with fluid accumulation (Ascites)',
      'Confusion, altered sleep-wake cycle, or flapping hand tremor (Hepatic encephalopathy)',
      'Vomiting blood or passing black tarry stools'
    ],
    indexed_remedies_count: 5
  },
  {
    id: 'women-health',
    name: 'Women\'s Reproductive Health',
    telugu_name: 'స్త్రీల రోగాలు / రుతుశూల / కుసుమ రోగం',
    category: 'Women\'s Health',
    description: 'Menstrual irregularities, spasmodic dysmenorrhea, abnormal vaginal discharge (leukorrhea/Shwetapradara), and post-partum recovery. Handled through tonifying and astringent herbs like Ashoka, Shatavari, and Lodhra.',
    classical_term: 'Yonivyapad / Asrigdhara / Kashtartava',
    dosha_involvement: 'Apana Vata and Pitta vitiation',
    pathya_apathya: {
      recommended: [
        'Warm Ashoka bark decoctions and Shatavari with milk',
        'Iron and calcium rich foods (dates, soaked figs, sesame seeds, cooked greens)',
        'Abdominal warmth with hot water bag during painful menses',
        'Adequate rest during the first two days of menstruation'
      ],
      avoid: [
        'Excessively spicy, pungent, and sour foods that aggravate bleeding',
        'Intense strenuous physical exhaustion during menstrual days',
        'Excessive stress and irregular eating schedules',
        'Suppression of urinary and defecation urges'
      ]
    },
    red_flags: [
      'Soaking through one or more sanitary pads every hour for consecutive hours',
      'Severe pelvic pain with fever and foul-smelling vaginal discharge',
      'Sudden sharp abdominal pain in reproductive-age female (Ectopic pregnancy risk)',
      'Post-menopausal bleeding of any amount'
    ],
    indexed_remedies_count: 5
  },
  {
    id: 'skin-wounds',
    name: 'Skin Diseases, Eczema & Wounds',
    telugu_name: 'చర్మ రోగాలు / గజ్జి, తామర, పుండ్లు',
    category: 'Skin & Wounds',
    description: 'Inflammatory dermopathy, chronic itching (Kandu), ringworm (Dadru), eczema (Vicharchika), and non-healing ulcers (Dushta Vrana). Handled via bitter blood purifiers (Raktashodhaka) such as Neem, Manjistha, Khadira, and Wild Turmeric.',
    classical_term: 'Kushta / Kshudraroga / Vrana',
    dosha_involvement: 'Pitta-Kapha vitiation residing in Twak (Skin), Rakta (Blood), and Mamsa (Muscle)',
    pathya_apathya: {
      recommended: [
        'Bitter greens (bitter gourd, neem leaves, fenugreek)',
        'Boiled Shadanga paniya or water boiled with Khadira bark',
        'Applying fresh neem and wild turmeric paste topically',
        'Wearing loose, breathable, pure cotton garments'
      ],
      avoid: [
        'Combining milk with fish or sour fruits (Viruddhahara / incompatible foods)',
        'Heavy jaggery, excessive salt, fermented batter, and curds at night',
        'Scratching lesions with dirty fingernails',
        'Chemical soaps and artificial synthetic clothes'
      ]
    },
    red_flags: [
      'Rapidly spreading redness, heat, and severe pain around a wound (Cellulitis/Necrotizing infection)',
      'Skin lesions accompanied by high fever or systemic toxicity',
      'Non-healing ulcer persisting over 4 weeks without improvement (needs biopsy)'
    ],
    indexed_remedies_count: 6
  },
  {
    id: 'urinary-calculi',
    name: 'Kidney Stones & Dysuria',
    telugu_name: 'మూత్రపిండాల్లో రాళ్ళు / మూత్రంలో మంట',
    category: 'Urinary & Renal',
    description: 'Renal colic, formation of urinary calculi (Ashmari), and painful/burning urination (Mutrakrichhra) resulting from dehydration, mineral accretion, and obstructed Apana Vata flow.',
    classical_term: 'Mutrashmari / Mutrakrichhra',
    dosha_involvement: 'Vata and Pitta dominant with crystalline Kapha binding',
    pathya_apathya: {
      recommended: [
        'Banana stem juice (Arati Doota rasam) and boiled barley water (Yava toya)',
        'Punarnava and Gokshura decoctions',
        'Drinking plenty of lukewarm boiled water throughout the day',
        'Culinary intake of kulthi (Horse gram / Ulavalu) soup'
      ],
      avoid: [
        'Excessive tomato seeds, spinach, red meat, and oxalate-heavy nuts',
        'Withholding urine when urge arises (Vegadharana)',
        'Dry hot climates without adequate rehydration',
        'Excessive alcoholic drinks and sour vinegar'
      ]
    },
    red_flags: [
      'Complete inability to pass urine (Acute urinary retention)',
      'Severe intractable flank pain radiating to groin with vomiting',
      'Visible frank blood clots in urine (Hematuria) with high fever and rigors'
    ],
    indexed_remedies_count: 5
  },
  {
    id: 'digestive-agni',
    name: 'Indigestion, Acidity & Gas',
    telugu_name: 'అజీర్ణం / కడుపు ఉబ్బరం / గ్యాస్ / పుల్లతేనుపులు',
    category: 'Digestive & Gastric',
    description: 'Impairment of gastric metabolic enzymes (Jatharagni Mandya) leading to sour belching (Amlapitta), flatulence (Anaha), and sluggish bowel evacuation.',
    classical_term: 'Ajeerna / Amlapitta / Agnimandya / Anaha',
    dosha_involvement: 'Samana Vata, Pachaka Pitta, and Kledaka Kapha imbalance',
    pathya_apathya: {
      recommended: [
        'Ginger-cumin-coriander warm tea (CCF tea) 20 mins before meals',
        'Sipping lukewarm water with meals instead of chilled beverages',
        'Eating only when genuine hunger (Kshut) is felt',
        'Adding hing (asafoetida), roasted cumin, and black salt to foods'
      ],
      avoid: [
        'Eating before the previous meal is fully digested (Adhyashana)',
        'Heavy late-night dinners directly before sleeping',
        'Carbonated sodas, deep-fried snacks, and stale leftovers',
        'Excessive mental tension or anger while eating'
      ]
    },
    red_flags: [
      'Unexplained progressive difficulty in swallowing solid food (Dysphagia)',
      'Persistent vomiting or involuntary weight loss over 1 month',
      'Severe epigastric pain radiating directly to the back'
    ],
    indexed_remedies_count: 7
  },
  {
    id: 'hair-scalp',
    name: 'Hair Fall, Dandruff & Premature Greying',
    telugu_name: 'జుట్టు రాలడం / చుండ్రు / నెరవడం',
    category: 'Hair & Scalp',
    description: 'Excessive shedding of hair follicles (Khalitya), premature graying (Palitya), and dry/flaky scalp lesions (Darunaka) driven by Pitta heat drying the scalp roots and Vata constriction.',
    classical_term: 'Khalitya / Palitya / Darunaka',
    dosha_involvement: 'Pitta aggravated at the root of hairs with Vata drying',
    pathya_apathya: {
      recommended: [
        'Bhringraj and Amla medicated coconut oil head massage',
        'Washing hair with natural reetha (soapnut) and shikakai infusion',
        'Consuming soaked almonds, amla juice, and curry leaves daily',
        'Adequate restful sleep at night'
      ],
      avoid: [
        'Excessive spicy, sour, salty, and burning foods that spike Pitta',
        'Washing hair with excessively hot boiling water',
        'Harsh chemical dyes, bleaches, and daily heated blow-drying',
        'Chronic stress and irregular night shifts'
      ]
    },
    red_flags: [
      'Sudden localized coin-shaped smooth bald patches (Alopecia areata)',
      'Severe scalp inflammation with weeping crusts, boils, and foul odor'
    ],
    indexed_remedies_count: 5
  },
  {
    id: 'dental-oral',
    name: 'Toothache, Bleeding Gums & Mouth Ulcers',
    telugu_name: 'పంటి నొప్పి / చిగుళ్ళ వాపు / నోటి పుండ్లు',
    category: 'Dental & Oral',
    description: 'Periodontal inflammation (Dantaveshta), toothache from decay (Dantashula), and burning aphthous stomatitis ulcers (Mukharoga) relieved by astringent and styptic bark rinses.',
    classical_term: 'Dantashula / Dantaveshta / Mukhadaha',
    dosha_involvement: 'Vata in dental marrow and Pitta-Rakta in gingival tissue',
    pathya_apathya: {
      recommended: [
        'Gargling with warm decoction of Triphala, Babool, or Acacia catechu (Khadira)',
        'Applying pure Clove oil or clove powder paste directly on painful cavity',
        'Oil pulling (Gandusha) with warm sesame oil for 5 minutes in the morning',
        'Chewing tender neem or babool twigs for natural antimicrobial cleaning'
      ],
      avoid: [
        'Excessive refined sugary sweets and sticky confectionery',
        'Very cold ice drinks immediately followed by hot liquids',
        'Chewing tobacco or smoking',
        'Rough brushing with hard bristles'
      ]
    },
    red_flags: [
      'Facial or submandibular swelling spreading to throat (Ludwig angina risk)',
      'High fever with inability to open mouth (Trismus)',
      'Persistent oral ulcer lasting greater than 3 weeks without healing'
    ],
    indexed_remedies_count: 4
  }
];
