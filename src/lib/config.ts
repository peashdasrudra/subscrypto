// ===========================================
// Offer Configuration - Single Source of Truth
// ===========================================

export const OFFER_CONFIG = {
  product: {
    name: 'Google AI Pro',
    code: 'GOOGLE_AI_PRO_STUDENT_18M',
    tagline: 'Student Offer',
    description: '18-Month Subscription',
  },
  pricing: {
    amount: parseInt(process.env.OFFER_PRICE_BDT || process.env.NEXT_PUBLIC_OFFER_PRICE_BDT || '349', 10),
    currency: 'BDT',
    currencySymbol: '৳',
    durationMonths: parseInt(process.env.OFFER_DURATION_MONTHS || process.env.NEXT_PUBLIC_OFFER_DURATION_MONTHS || '18', 10),
    // Reference value - only display if business owner verifies this is the genuine comparable value
    referenceValue: 42000,
    referenceValueVerified: false, // Set to true only after business owner verification
  },
  payment: {
    recipientNumber: process.env.PAYMENT_RECIPIENT_NUMBER || '01533679773',
    methods: ['bKash', 'Nagad', 'Rocket'] as const,
  },
  support: {
    email: process.env.SUPPORT_EMAIL || '',
    responseTimeHours: 12,
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Google AI Pro Student Offer | 18-Month Plan — ৳349',
    description: 'Get the Google AI Pro 18-month subscription at a student-friendly price of ৳349 BDT. Access Gemini, NotebookLM, and more tools to boost your academic productivity.',
  },
} as const;

// Client-safe config (no server env vars)
export const CLIENT_OFFER_CONFIG = {
  product: OFFER_CONFIG.product,
  pricing: {
    amount: 349,
    currency: 'BDT' as const,
    currencySymbol: '৳',
    durationMonths: 18,
    referenceValue: 42000,
    referenceValueVerified: false,
  },
  payment: {
    recipientNumber: '01533679773',
    methods: ['bKash', 'Nagad', 'Rocket'] as const,
  },
  support: {
    email: '',
    responseTimeHours: 12,
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Google AI Pro Student Offer | 18-Month Plan — ৳349',
    description: 'Get the Google AI Pro 18-month subscription at a student-friendly price of ৳349 BDT.',
  },
} as const;
