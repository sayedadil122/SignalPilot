export type SeverityLevel = 'High' | 'Medium' | 'Low';
export type RecommendationType = 'Build' | 'Validate' | 'Ignore';
export type PlatformType =
  | 'G2'
  | 'Capterra'
  | 'Reddit'
  | 'App Store'
  | 'Play Store'
  | 'Product Hunt'
  | 'TrustRadius'
  | 'Quora'
  | 'Custom Website'
  | 'Survey Forms';

export interface ReviewQuote {
  text: string;
  sourcePlatform: PlatformType;
  author?: string;
  rating?: number;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  urgency: 'High' | 'Medium' | 'Low';
}

export interface ProblemTheme {
  id: string;
  title: string;
  category: string;
  summary: string;
  mentionCount: number;
  platforms: PlatformType[];
  severity: SeverityLevel;
  confidenceScore: number; // 0-100
  opportunityScore: number; // 0-100
  problemStatement: string;
  rootCause: string;
  whyUsersCare: string;
  competitorGap: string;
  productOpportunity: string;
  suggestedFeature: string;
  quotes: ReviewQuote[];
  biasRisk: 'Low' | 'Medium' | 'High';
}

export interface OpportunityInsight {
  id: string;
  title: string;
  userPain: string;
  evidence: string;
  targetUser: string;
  whyNow: string;
  mvpFeature: string;
  impactScore: number; // 1-10
  effortScore: number; // 1-10
  confidenceScore?: number; // 0-100
  biasRisk?: 'Low' | 'Medium' | 'High';
  recommendation: RecommendationType;
}

export interface CompetitorGapRow {
  competitorName: string;
  whatUsersLike: string;
  commonComplaints: string;
  missingCapability: string;
  signalPilotOpportunity: string;
}

export interface CompetitorAnalysisResult {
  url: string;
  platform: PlatformType | 'Auto Detect';
  totalReviews: number;
  platformsCovered: PlatformType[];
  topComplaintsCount: number;
  opportunityThemesCount: number;
  highSeverityCount: number;
  positiveSignalsCount: number;
  themes: ProblemTheme[];
  opportunities: OpportunityInsight[];
  gapMatrix: CompetitorGapRow[];
  deduplicationActive?: boolean;
  duplicatesFilteredCount?: number;
}

export interface SavedProject {
  id: string;
  projectName: string;
  url: string;
  platform: PlatformType | 'Auto Detect';
  reviewsCount: number;
  topComplaint: string;
  lastAnalyzedDate: string;
  result: CompetitorAnalysisResult;
}

export interface CrawlSchedule {
  id: string;
  projectName: string;
  url: string;
  platforms: PlatformType[];
  frequency: 'Hourly' | 'Daily' | 'Weekly' | 'Monthly';
  deduplicationEnabled: boolean;
  status: 'Active' | 'Paused';
  lastRun: string;
  nextRun: string;
  targetProduct?: string;
  competitors?: string[];
  deliveryChannel?: 'Email' | 'Slack' | 'In-app';
  recipientEmail?: string;
  reportType?: string;
}

export interface AppState {
  activeTab: string;
  analyzingUrl: string;
  selectedPlatform: PlatformType | 'Auto Detect';
  loadingState: 'idle' | 'analyzing' | 'done';
  currentAnalysis: CompetitorAnalysisResult | null;
  savedProjects: SavedProject[];
  themeOverrides: Record<string, { recommendation: RecommendationType; reason: string }>;
  schedules: CrawlSchedule[];
}
