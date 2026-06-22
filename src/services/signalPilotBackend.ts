import { supabase } from '../lib/supabase';
import type { CrawlSchedule, PlatformType, SavedProject } from '../types';

type ProjectRow = {
  id: string;
  user_id?: string | null;
  project_name: string;
  url: string;
  platform: PlatformType | 'Auto Detect';
  reviews_count: number;
  top_complaint: string;
  last_analyzed_date: string;
  result: SavedProject['result'];
};

type CrawlScheduleRow = {
  id: string;
  user_id?: string | null;
  project_name: string;
  url: string;
  platforms: PlatformType[];
  frequency: CrawlSchedule['frequency'];
  deduplication_enabled: boolean;
  status: CrawlSchedule['status'];
  last_run: string;
  next_run: string;
  target_product: string | null;
  competitors: string[] | null;
  delivery_channel: CrawlSchedule['deliveryChannel'] | null;
  recipient_email: string | null;
  report_type: string | null;
};

const toSavedProject = (row: ProjectRow): SavedProject => ({
  id: row.id,
  projectName: row.project_name,
  url: row.url,
  platform: row.platform,
  reviewsCount: row.reviews_count,
  topComplaint: row.top_complaint,
  lastAnalyzedDate: row.last_analyzed_date,
  result: row.result,
});

const toProjectRow = (project: SavedProject, userId?: string) => ({
  id: project.id,
  user_id: userId ?? null,
  project_name: project.projectName,
  url: project.url,
  platform: project.platform,
  reviews_count: project.reviewsCount,
  top_complaint: project.topComplaint,
  last_analyzed_date: project.lastAnalyzedDate,
  result: project.result,
});

const toCrawlSchedule = (row: CrawlScheduleRow): CrawlSchedule => ({
  id: row.id,
  projectName: row.project_name,
  url: row.url,
  platforms: row.platforms,
  frequency: row.frequency,
  deduplicationEnabled: row.deduplication_enabled,
  status: row.status,
  lastRun: row.last_run,
  nextRun: row.next_run,
  targetProduct: row.target_product ?? undefined,
  competitors: row.competitors ?? undefined,
  deliveryChannel: row.delivery_channel ?? undefined,
  recipientEmail: row.recipient_email ?? undefined,
  reportType: row.report_type ?? undefined,
});

const toCrawlScheduleRow = (schedule: CrawlSchedule, userId?: string) => ({
  id: schedule.id,
  user_id: userId ?? null,
  project_name: schedule.projectName,
  url: schedule.url,
  platforms: schedule.platforms,
  frequency: schedule.frequency,
  deduplication_enabled: schedule.deduplicationEnabled,
  status: schedule.status,
  last_run: schedule.lastRun,
  next_run: schedule.nextRun,
  target_product: schedule.targetProduct ?? null,
  competitors: schedule.competitors ?? [],
  delivery_channel: schedule.deliveryChannel ?? null,
  recipient_email: schedule.recipientEmail ?? null,
  report_type: schedule.reportType ?? null,
});

export const signalPilotBackend = {
  async listProjects(): Promise<SavedProject[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('id, project_name, url, platform, reviews_count, top_complaint, last_analyzed_date, result')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return (data as ProjectRow[]).map(toSavedProject);
  },

  async saveProject(project: SavedProject, userId?: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .upsert(toProjectRow(project, userId), { onConflict: 'id' });

    if (error) throw error;
  },

  async listSchedules(): Promise<CrawlSchedule[]> {
    const { data, error } = await supabase
      .from('crawl_schedules')
      .select(
        'id, project_name, url, platforms, frequency, deduplication_enabled, status, last_run, next_run, target_product, competitors, delivery_channel, recipient_email, report_type'
      )
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return (data as CrawlScheduleRow[]).map(toCrawlSchedule);
  },

  async saveSchedule(schedule: CrawlSchedule, userId?: string): Promise<void> {
    const { error } = await supabase
      .from('crawl_schedules')
      .upsert(toCrawlScheduleRow(schedule, userId), { onConflict: 'id' });

    if (error) throw error;
  },

  async deleteSchedule(id: string): Promise<void> {
    const { error } = await supabase.from('crawl_schedules').delete().eq('id', id);

    if (error) throw error;
  },

  async updateScheduleStatus(id: string, status: CrawlSchedule['status']): Promise<void> {
    const { error } = await supabase.from('crawl_schedules').update({ status }).eq('id', id);

    if (error) throw error;
  },
};
