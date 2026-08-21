import { UserSubmittedRemedy } from '../types';

export const INITIAL_USER_REMEDIES: UserSubmittedRemedy[] = [
  {
    id: 'user-rem-1',
    author_name: 'Dr. Venkat Rao (Ayurveda enthusiast)',
    author_role: 'Home Practitioner',
    ailment_id: 'piles',
    ailment_name: 'Piles & Hemorrhoids (Arshas)',
    herb_names: ['Surana (Elephant Yam)', 'Buttermilk', 'Black Pepper', 'Cumin'],
    title: 'Surana (Kanda) Chutney with Roasted Cumin for Bleeding Piles',
    ingredients: [
      'Fresh Elephant Yam (Kanda) - 100g, boiled thoroughly with tamarind water to eliminate itchiness',
      'Fresh churned buttermilk (Majjiga) - 1 glass',
      'Roasted Cumin (Jeera) powder - 1/2 teaspoon',
      'Saindhava Lavana (Rock salt) - 1 pinch',
      'Sesame oil - 1 teaspoon for seasoning'
    ],
    preparation_instructions: 'Cube the yam and boil in water with tamarind paste for 15 minutes, drain water completely. Lightly sauté the cooked cubes in sesame oil with cumin seeds. Mash into a smooth paste.',
    dosage_usage: 'Take 2 tablespoons of this warm paste mixed with rice and freshly churned buttermilk once daily at lunchtime for 14 days.',
    source_tradition: 'Godavari delta family folk formulation passed through 3 generations',
    precautions: 'Do not eat raw yam under any circumstances. Avoid red chillies while taking this remedy.',
    timestamp: Date.now() - 86400000 * 4,
    upvotes: 24,
    verified: false,
    verification_status: 'user-submitted'
  },
  {
    id: 'user-rem-2',
    author_name: 'Savitri Amma',
    author_role: 'Rayalaseema Traditional Elder',
    ailment_id: 'headache',
    ailment_name: 'Headaches & Migraines (Ardhavabhedaka)',
    herb_names: ['Vaavili (Nirgundi)', 'Dry Ginger (Shunthi)', 'Castor Oil'],
    title: 'Warm Nirgundi Leaf Poultice & Castor Oil Massage for Migraine',
    ingredients: [
      'Fresh Vaavili (Nirgundi) leaves - 1 handful',
      'Pure castor oil (Aamudam) - 1 tablespoon',
      'Dry ginger powder (Shunthi churna) - 1/4 teaspoon'
    ],
    preparation_instructions: 'Gently warm the castor oil and Nirgundi leaves in an iron ladle until soft and aromatic. Let it cool until comfortably warm. Mash leaves into a thick paste with dry ginger.',
    dosage_usage: 'Apply the warm paste over the temples and forehead before resting in a quiet, dark room for 45 minutes. Wipe off with a warm damp cloth.',
    source_tradition: 'Rayalaseema village folk practice',
    precautions: 'Keep away from the eyes. Do not apply on broken skin or eczema lesions.',
    timestamp: Date.now() - 86400000 * 7,
    upvotes: 19,
    verified: false,
    verification_status: 'user-submitted'
  },
  {
    id: 'user-rem-3',
    author_name: 'Ravi Kumar',
    author_role: 'Ayurveda Student',
    ailment_id: 'fever',
    ailment_name: 'Fevers & Chills (Chali Jwaram)',
    herb_names: ['Tippateega (Guduchi)', 'Tulsi', 'Black Pepper', 'Honey'],
    title: 'Guduchi & Tulsi Fresh Decoction (Kashayam) for Viral Fever Recovery',
    ingredients: [
      'Fresh Tippateega stem (crushed) - 2 inch piece',
      'Fresh Krishna Tulsi leaves - 7 leaves',
      'Whole black pepper (Maricha) - 3 corns crushed',
      'Water - 2 cups',
      'Raw pure honey - 1 teaspoon'
    ],
    preparation_instructions: 'Boil crushed Guduchi stem, Tulsi leaves, and black pepper in 2 cups of water over low heat until reduced to 1/2 cup. Strain and let cool until lukewarm, then stir in honey.',
    dosage_usage: 'Drink 50ml lukewarm twice daily morning and evening on an empty stomach for 3 to 5 days.',
    source_tradition: 'Nagarjuna Ayurvedic College student field note',
    precautions: 'Never add honey to boiling hot liquid (Ayurvedic contraindication: Ama creation). Avoid during acute dehydration.',
    timestamp: Date.now() - 86400000 * 2,
    upvotes: 31,
    verified: false,
    verification_status: 'user-submitted'
  },
  {
    id: 'user-rem-4',
    author_name: 'Ananya Sharma',
    author_role: 'Wellness Researcher',
    ailment_id: 'joints',
    ailment_name: 'Joint Pain & Rheumatism (Amavata)',
    herb_names: ['Nalleru (Cissus)', 'Garlic', 'Sesame Oil', 'Dry Ginger'],
    title: 'Nalleru (Bone Setter) & Garlic Medicated Oil for Knee Stiffness',
    ingredients: [
      'Tender Nalleru stems (fibers stripped) - 50g',
      'Garlic cloves (crushed) - 10 cloves',
      'Pure cold-pressed sesame oil (Nuvvula nune) - 150ml',
      'Dry ginger powder - 1 teaspoon'
    ],
    preparation_instructions: 'Slowly simmer the stripped Nalleru stem pieces and crushed garlic in sesame oil on low heat until water moisture evaporates and the herbs turn golden brown. Filter into a clean glass bottle.',
    dosage_usage: 'Warm a small quantity and gently massage over stiff joints in clockwise circular motions twice daily, followed by hot fomentation.',
    source_tradition: 'Telangana herbalist tradition',
    precautions: 'Wear gloves when cleaning raw Nalleru to avoid temporary skin irritation caused by calcium oxalate raphides.',
    timestamp: Date.now() - 86400000 * 10,
    upvotes: 15,
    verified: false,
    verification_status: 'user-submitted'
  },
  {
    id: 'user-rem-5',
    author_name: 'Bhavani Devi',
    author_role: 'Home Practitioner',
    ailment_id: 'respiratory',
    ailment_name: 'Cough, Cold & Asthma (Kasa/Shwasa)',
    herb_names: ['Addasaram (Vasaka)', 'Pippali', 'Honey'],
    title: 'Vasaka Leaf Juice with Long Pepper & Honey for Spasmodic Cough',
    ingredients: [
      'Fresh Vasaka (Addasaram) leaves - 5 large leaves',
      'Long pepper (Pippali) fine powder - 1 pinch (approx 250mg)',
      'Raw organic honey - 1 teaspoon'
    ],
    preparation_instructions: 'Wash leaves and pound in a mortar pestle with 1 teaspoon of warm water. Squeeze through clean muslin cloth to collect fresh juice (approx 10ml). Mix with Pippali powder and honey.',
    dosage_usage: 'Lick slowly twice daily after food for stubborn dry or productive cough for 4 to 6 days.',
    source_tradition: 'Coastal Andhra family tradition',
    precautions: 'Do not give to infants under 1 year old due to raw honey restrictions. Use measured pinch of Pippali.',
    timestamp: Date.now() - 86400000 * 1,
    upvotes: 28,
    verified: false,
    verification_status: 'user-submitted'
  }
];
