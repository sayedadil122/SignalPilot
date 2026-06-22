import type { CompetitorAnalysisResult, PlatformType } from '../types';
import { MOCK_REVIEWS, MOCK_THEMES, MOCK_OPPORTUNITIES, MOCK_GAP_MATRIX, MOCK_ZOMATO_GAP_MATRIX } from './mockData';

// Helper to detect platform from URL
export const detectPlatform = (url: string): PlatformType => {
  const lowercaseUrl = url.toLowerCase();
  
  if (lowercaseUrl.includes('g2.com')) return 'G2';
  if (lowercaseUrl.includes('capterra.com')) return 'Capterra';
  if (lowercaseUrl.includes('reddit.com')) return 'Reddit';
  if (lowercaseUrl.includes('apple.com') || lowercaseUrl.includes('appstore')) return 'App Store';
  if (lowercaseUrl.includes('play.google.com') || lowercaseUrl.includes('playstore')) return 'Play Store';
  if (lowercaseUrl.includes('producthunt.com')) return 'Product Hunt';
  if (lowercaseUrl.includes('trustradius.com')) return 'TrustRadius';
  if (lowercaseUrl.includes('quora.com')) return 'Quora';
  
  return 'Custom Website';
};

// Main Analysis Entry point (Phase 1: Simulated Analysis)
export const analyzeCompetitorUrl = (
  url: string,
  selectedPlatform: PlatformType | 'Auto Detect',
  deduplicationEnabled: boolean = true
): CompetitorAnalysisResult => {
  // Real URL scraping, platform APIs, and review extraction will be implemented in Phase 2 using backend services.
  
  // 1. Detect platform
  const detectedPlatform = selectedPlatform === 'Auto Detect' ? detectPlatform(url) : selectedPlatform;
  
  // 2. Select competitor dataset based on URL/text content
  const lowercaseInput = (url || '').toLowerCase();
  let targetCompetitor = 'Productboard';

  if (lowercaseInput.includes('canny')) {
    targetCompetitor = 'Canny';
  } else if (
    lowercaseInput.includes('zomato') ||
    lowercaseInput.includes('swiggy') ||
    lowercaseInput.includes('food') ||
    lowercaseInput.includes('delivery')
  ) {
    targetCompetitor = 'Zomato';
  } else if (lowercaseInput.includes('dovetail') || lowercaseInput.includes('research')) {
    targetCompetitor = 'Dovetail';
  } else if (
    lowercaseInput.includes('internal') ||
    lowercaseInput.includes('ticket') ||
    lowercaseInput.includes('billing') ||
    lowercaseInput.includes('invoice') ||
    lowercaseInput.includes('sales')
  ) {
    targetCompetitor = 'Internal';
  }
  
  const reviews = MOCK_REVIEWS[targetCompetitor] || MOCK_REVIEWS['Productboard'];
  const themes = MOCK_THEMES[targetCompetitor] || MOCK_THEMES['Productboard'];
  const opportunities = MOCK_OPPORTUNITIES[targetCompetitor] || MOCK_OPPORTUNITIES['Productboard'];
  const gapMatrix = targetCompetitor === 'Zomato' ? MOCK_ZOMATO_GAP_MATRIX : MOCK_GAP_MATRIX;
  
  // 3. Calculate aggregates
  const totalReviews = reviews.length * 12; // Scale for realistic dashboard counts
  const platformsCovered = Array.from(new Set(reviews.map((r) => r.platform)));
  const topComplaintsCount = themes.length;
  const opportunityThemesCount = opportunities.length;
  const highSeverityCount = themes.filter((t) => t.severity === 'High').length * 4;
  const positiveSignalsCount = reviews.filter((r) => r.sentiment === 'Positive').length * 15;
  
  const duplicatesCount = deduplicationEnabled
    ? (targetCompetitor === 'Zomato' ? 142 : 87)
    : 0;
  
  return {
    url,
    platform: detectedPlatform,
    totalReviews,
    platformsCovered,
    topComplaintsCount,
    opportunityThemesCount,
    highSeverityCount,
    positiveSignalsCount,
    themes,
    opportunities,
    gapMatrix,
    deduplicationActive: deduplicationEnabled,
    duplicatesFilteredCount: duplicatesCount,
  };
};
