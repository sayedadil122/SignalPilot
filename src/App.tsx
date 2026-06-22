import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Toaster, toast } from 'sonner';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { AuthScreen } from './components/AuthScreen';
import { UrlAnalyzer } from './components/UrlAnalyzer';
import { AnalysisLoader } from './components/AnalysisLoader';
import { Dashboard } from './components/Dashboard';
import { ProblemThemes } from './components/ProblemThemes';
import { GapMatrix } from './components/GapMatrix';
import { Opportunities } from './components/Opportunities';
import { EvidencePack } from './components/EvidencePack';
import { ResearchProjects } from './components/ResearchProjects';
import { Settings } from './components/Settings';
import { CompareTray } from './components/CompareTray';
import { CompareModal } from './components/CompareModal';
import { ScheduleCrawls } from './components/ScheduleCrawls';
import { Home } from './components/Home';
import { PasteFeedback } from './components/PasteFeedback';
import { UploadReviews } from './components/UploadReviews';
import { ScheduledReportPreview } from './components/ScheduledReportPreview';
import { IntegrationsMCP } from './components/IntegrationsMCP';
import { supabase } from './lib/supabase';
import { analyzeCompetitorUrl } from './utils/analysisEngine';
import { signalPilotBackend } from './services/signalPilotBackend';
import type { CompetitorAnalysisResult, PlatformType, SavedProject, RecommendationType, CrawlSchedule } from './types';

function App() {
  // Global State Router
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [analyzingUrl, setAnalyzingUrl] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | 'Auto Detect'>('Auto Detect');
  const [loadingState, setLoadingState] = useState<'idle' | 'analyzing' | 'done'>('idle');
  const [currentAnalysis, setCurrentAnalysis] = useState<CompetitorAnalysisResult | null>(null);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [checkedThemeIds, setCheckedThemeIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState<boolean>(false);
  const [themeOverrides, setThemeOverrides] = useState<Record<string, { recommendation: RecommendationType; reason: string }>>(() => {
    try {
      const storedOverrides = localStorage.getItem('signalpilot_theme_overrides');
      return storedOverrides ? JSON.parse(storedOverrides) : {};
    } catch (e) {
      console.error('Error reading localStorage theme overrides', e);
      return {};
    }
  });

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setAuthLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);
    });

    void loadSession();

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>(() => {
    try {
      const storedProjects = localStorage.getItem('signalpilot_saved_projects');
      if (storedProjects) {
        return JSON.parse(storedProjects);
      } else {
        const defaultProjects: SavedProject[] = [
          {
            id: 'proj_pb_default',
            projectName: 'Productboard Review Analysis',
            url: 'https://www.g2.com/products/productboard/reviews',
            platform: 'G2',
            reviewsCount: 60,
            topComplaint: 'Manual Tagging Is Still Painful',
            lastAnalyzedDate: '2026-06-21',
            result: analyzeCompetitorUrl('https://www.g2.com/products/productboard/reviews', 'G2'),
          },
          {
            id: 'proj_canny_default',
            projectName: 'Canny Review Analysis',
            url: 'https://capterra.com/canny/reviews',
            platform: 'Capterra',
            reviewsCount: 48,
            topComplaint: 'Voting Does Not Equal Priority',
            lastAnalyzedDate: '2026-06-20',
            result: analyzeCompetitorUrl('https://canny.io/reviews', 'Capterra'),
          },
        ];
        localStorage.setItem('signalpilot_saved_projects', JSON.stringify(defaultProjects));
        return defaultProjects;
      }
    } catch (e) {
      console.error('Error reading localStorage saved projects', e);
      return [];
    }
  });

  const [schedules, setSchedules] = useState<CrawlSchedule[]>(() => {
    try {
      const storedSchedules = localStorage.getItem('signalpilot_crawls_schedules');
      if (storedSchedules) {
        return JSON.parse(storedSchedules);
      } else {
        const defaultSchedules: CrawlSchedule[] = [
          {
            id: 'sched_zom_playstore',
            projectName: 'Zomato Play Store Reviews',
            url: 'https://play.google.com/store/apps/details?id=com.application.zomato',
            platforms: ['Play Store'],
            frequency: 'Hourly',
            deduplicationEnabled: true,
            status: 'Active',
            lastRun: '15 mins ago',
            nextRun: 'In 45 mins',
          },
          {
            id: 'sched_swiggy_appstore',
            projectName: 'Swiggy App Store Reviews',
            url: 'https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989540920',
            platforms: ['App Store'],
            frequency: 'Daily',
            deduplicationEnabled: true,
            status: 'Active',
            lastRun: '10 hours ago',
            nextRun: 'Today at 12:00 AM',
          },
          {
            id: 'sched_reddit_zomato',
            projectName: 'Reddit r/india Swiggy & Zomato complaints',
            url: 'https://www.reddit.com/r/india/search/?q=zomato%20swiggy%20delivery',
            platforms: ['Reddit'],
            frequency: 'Daily',
            deduplicationEnabled: true,
            status: 'Active',
            lastRun: '2 hours ago',
            nextRun: 'In 22 hours',
          },
        ];
        localStorage.setItem('signalpilot_crawls_schedules', JSON.stringify(defaultSchedules));
        return defaultSchedules;
      }
    } catch (e) {
      console.error('Error reading localStorage crawls schedules', e);
      return [];
    }
  });

  useEffect(() => {
    let cancelled = false;

    const syncFromSupabase = async () => {
      try {
        const [remoteProjects, remoteSchedules] = await Promise.all([
          signalPilotBackend.listProjects(),
          signalPilotBackend.listSchedules(),
        ]);

        if (cancelled) return;

        if (remoteProjects.length > 0) {
          setSavedProjects(remoteProjects);
          localStorage.setItem('signalpilot_saved_projects', JSON.stringify(remoteProjects));
        }

        if (remoteSchedules.length > 0) {
          setSchedules(remoteSchedules);
          localStorage.setItem('signalpilot_crawls_schedules', JSON.stringify(remoteSchedules));
        }
      } catch (error) {
        console.warn('Supabase sync skipped. Apply the database migration to enable persistence.', error);
      }
    };

    if (session) {
      void syncFromSupabase();
    }

    return () => {
      cancelled = true;
    };
  }, [session]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }

    setCurrentAnalysis(null);
    setActiveTab('home');
    toast.success('Signed out.');
  };

  const handleSaveSchedule = (newSched: CrawlSchedule) => {
    const updated = [newSched, ...schedules];
    setSchedules(updated);
    localStorage.setItem('signalpilot_crawls_schedules', JSON.stringify(updated));
    void signalPilotBackend.saveSchedule(newSched, session?.user.id).catch((error) => {
      console.warn('Unable to save crawl schedule to Supabase.', error);
      toast.error('Saved locally. Supabase schedule sync failed.');
    });
  };

  const handleDeleteSchedule = (id: string) => {
    const updated = schedules.filter((s) => s.id !== id);
    setSchedules(updated);
    localStorage.setItem('signalpilot_crawls_schedules', JSON.stringify(updated));
    void signalPilotBackend.deleteSchedule(id).catch((error) => {
      console.warn('Unable to delete crawl schedule from Supabase.', error);
      toast.error('Deleted locally. Supabase schedule sync failed.');
    });
    toast.success('Crawl schedule deleted.');
  };

  const handleToggleStatus = (id: string) => {
    const updated = schedules.map((s) =>
      s.id === id ? { ...s, status: s.status === 'Active' ? ('Paused' as const) : ('Active' as const) } : s
    );
    const updatedSchedule = updated.find((s) => s.id === id);
    setSchedules(updated);
    localStorage.setItem('signalpilot_crawls_schedules', JSON.stringify(updated));
    if (updatedSchedule) {
      void signalPilotBackend.updateScheduleStatus(id, updatedSchedule.status).catch((error) => {
        console.warn('Unable to update crawl schedule status in Supabase.', error);
        toast.error('Updated locally. Supabase schedule sync failed.');
      });
    }
    toast.success('Crawl status updated.');
  };

  const handleRunNow = (sched: CrawlSchedule) => {
    toast.loading(`Crawling public reviews for ${sched.projectName}...`, { id: 'run-crawl' });
    setTimeout(() => {
      const crawledResult = analyzeCompetitorUrl(sched.url, 'Auto Detect', sched.deduplicationEnabled);
      setCurrentAnalysis(crawledResult);
      setActiveTab('dashboard');
      toast.dismiss('run-crawl');
      toast.success(
        `Crawl completed! Imported ${crawledResult.totalReviews} reviews. ${
          sched.deduplicationEnabled
            ? `Filtered ${crawledResult.duplicatesFilteredCount} duplicates.`
            : 'De-duplication disabled.'
        }`
      );
    }, 1500);
  };

  // Handle URL analysis trigger
  const handleAnalyze = (url: string, platform: PlatformType | 'Auto Detect') => {
    setAnalyzingUrl(url);
    setSelectedPlatform(platform);
    setLoadingState('analyzing');
    setSelectedThemeId(null);
    setSelectedOpportunityId(null);
    setCheckedThemeIds([]);
  };

  const handleAnalysisComplete = () => {
    const analysisResult = analyzeCompetitorUrl(analyzingUrl, selectedPlatform);
    setCurrentAnalysis(analysisResult);
    setLoadingState('done');
    setActiveTab('dashboard');
    toast.success(`Analysis complete! Identified ${analysisResult.themes.length} competitor themes.`);

    // Add to saved projects if not already analyzed
    const isNew = !savedProjects.some((p) => p.url.toLowerCase() === analyzingUrl.toLowerCase());
    if (isNew) {
      const name = analyzingUrl.includes('canny') ? 'Canny Review Analysis' : 'Competitor Review Analysis';
      const newProj: SavedProject = {
        id: `proj_${Date.now()}`,
        projectName: name,
        url: analyzingUrl,
        platform: analysisResult.platform,
        reviewsCount: analysisResult.totalReviews,
        topComplaint: analysisResult.themes[0]?.title || 'Multiple complaints found',
        lastAnalyzedDate: new Date().toISOString().split('T')[0],
        result: analysisResult,
      };
      const updated = [newProj, ...savedProjects];
      setSavedProjects(updated);
      localStorage.setItem('signalpilot_saved_projects', JSON.stringify(updated));
      void signalPilotBackend.saveProject(newProj, session?.user.id).catch((error) => {
        console.warn('Unable to save research project to Supabase.', error);
        toast.error('Saved locally. Supabase project sync failed.');
      });
    }
  };

  const handleRestoreProject = (project: SavedProject) => {
    setCurrentAnalysis(project.result);
    setAnalyzingUrl(project.url);
    setSelectedPlatform(project.platform);
    setLoadingState('done');
    setSelectedThemeId(null);
    setSelectedOpportunityId(null);
    setCheckedThemeIds([]);
    setActiveTab('dashboard');
    toast.success(`Restored research project: ${project.projectName}`);
  };

  const handleTrySampleProject = () => {
    const defaultProject = savedProjects.find(p => p.id === 'proj_pb_default');
    if (defaultProject) {
      handleRestoreProject(defaultProject);
    } else {
      handleAnalyze('https://www.g2.com/products/productboard/reviews', 'G2');
    }
  };

  // Override handler
  const handleSaveOverride = (themeId: string, rec: RecommendationType, reason: string) => {
    const updated = {
      ...themeOverrides,
      [themeId]: { recommendation: rec, reason },
    };
    setThemeOverrides(updated);
    localStorage.setItem('signalpilot_theme_overrides', JSON.stringify(updated));
    toast.success('Strategy recommendation override saved.');
  };

  // Compare theme selection logic
  const toggleCompareTheme = (id: string) => {
    setCheckedThemeIds((prev) =>
      prev.includes(id) ? prev.filter((tId) => tId !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const clearCompareThemes = () => {
    setCheckedThemeIds([]);
  };

  // Render core Tab content
  const renderTabContent = () => {
    if (loadingState === 'analyzing') {
      return <AnalysisLoader onComplete={handleAnalysisComplete} />;
    }

    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} onTrySampleProject={handleTrySampleProject} />;
      case 'analyzer':
        return <UrlAnalyzer onAnalyze={handleAnalyze} />;
      case 'paste':
        return <PasteFeedback onAnalyze={handleAnalyze} />;
      case 'upload':
        return <UploadReviews onAnalyze={handleAnalyze} />;
      case 'dashboard':
        return currentAnalysis ? (
          <Dashboard
            result={currentAnalysis}
            setActiveTab={setActiveTab}
            setSelectedThemeId={setSelectedThemeId}
          />
        ) : null;
      case 'themes':
        return currentAnalysis ? (
          <ProblemThemes
            themes={currentAnalysis.themes}
            checkedThemeIds={checkedThemeIds}
            toggleCompareTheme={toggleCompareTheme}
            selectedThemeId={selectedThemeId}
            setSelectedThemeId={setSelectedThemeId}
            themeOverrides={themeOverrides}
            onSaveOverride={handleSaveOverride}
          />
        ) : null;
      case 'matrix': {
        if (!currentAnalysis) return null;
        const matrixCompany = currentAnalysis.themes[0]?.id.startsWith('pb')
          ? 'Productboard'
          : currentAnalysis.themes[0]?.id.startsWith('zom')
          ? 'Zomato'
          : 'Canny';
        return <GapMatrix matrixData={currentAnalysis.gapMatrix} companyName={matrixCompany} />;
      }
      case 'opportunities':
        return currentAnalysis ? (
          <Opportunities
            opportunities={currentAnalysis.opportunities}
            setActiveTab={setActiveTab}
            setSelectedOpportunityId={setSelectedOpportunityId}
          />
        ) : null;
      case 'monitor':
        return (
          <ScheduleCrawls
            schedules={schedules}
            onSaveSchedule={handleSaveSchedule}
            onDeleteSchedule={handleDeleteSchedule}
            onToggleStatus={handleToggleStatus}
            onRunNow={handleRunNow}
            onPreviewReport={() => setActiveTab('report_preview')}
          />
        );
      case 'report_preview':
        return <ScheduledReportPreview onBack={() => setActiveTab('monitor')} />;
      case 'integrations':
        return <IntegrationsMCP />;
      case 'evidence': {
        if (!currentAnalysis) return null;
        const evidenceCompany = currentAnalysis.themes[0]?.id.startsWith('pb')
          ? 'Productboard'
          : currentAnalysis.themes[0]?.id.startsWith('zom')
          ? 'Zomato'
          : 'Canny';
        return (
          <EvidencePack
            opportunities={currentAnalysis.opportunities}
            themes={currentAnalysis.themes}
            selectedOpportunityId={selectedOpportunityId}
            setSelectedOpportunityId={setSelectedOpportunityId}
            competitorName={evidenceCompany}
          />
        );
      }
      case 'projects':
        return (
          <ResearchProjects
            projects={savedProjects}
            onRestore={handleRestoreProject}
            setActiveTab={setActiveTab}
          />
        );
      case 'settings':
        return <Settings />;
      default:
        return <UrlAnalyzer onAnalyze={handleAnalyze} />;
    }
  };

  if (authLoading) {
    return (
      <div className="auth-loading">
        <div className="pulse-spinner" />
      </div>
    );
  }

  if (!session) {
    return (
      <>
        <Toaster position="top-right" />
        <AuthScreen />
      </>
    );
  }

  return (
    <div className="app-container">
      <Toaster position="top-right" />
      
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAnalysis={!!currentAnalysis}
        userEmail={session.user.email}
        onSignOut={handleSignOut}
      />

      <main className="main-content">
        {renderTabContent()}
      </main>

      {/* Floating comparison components */}
      {currentAnalysis && (
        <>
          <CompareTray
            checkedThemeIds={checkedThemeIds}
            themes={currentAnalysis.themes}
            onClear={clearCompareThemes}
            onCompare={() => setCompareOpen(true)}
            onRemoveTheme={toggleCompareTheme}
          />
          {compareOpen && (
            <CompareModal
              themeIds={checkedThemeIds}
              themes={currentAnalysis.themes}
              onClose={() => setCompareOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
