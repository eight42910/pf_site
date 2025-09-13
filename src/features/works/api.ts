import { getAllContents, getContentBySlug } from '@/lib/microcms';
import type { Work, WorksResponse } from './types';

const WORKS_ENDPOINT = 'works';

/**
 * Works一覧を取得
 * @param limit 取得件数
 * @param offset 取得開始位置
 * @returns Works一覧レスポンス
 */
export const getWorks = async (
  limit = 10,
  offset = 0
): Promise<WorksResponse> => {
  try {
    const response = await getAllContents(WORKS_ENDPOINT, limit, offset);
    return {
      contents: response.contents as Work[],
      totalCount: response.totalCount,
      offset: response.offset,
      limit: response.limit,
    };
  } catch (error) {
    console.error('Failed to fetch works:', error);
    throw new Error('Works取得に失敗しました');
  }
};

/**
 * 特定のWorkをスラッグで取得
 * @param slug スラッグ
 * @returns Workオブジェクト or null
 */
export const getWorkBySlug = async (slug: string): Promise<Work | null> => {
  try {
    const content = await getContentBySlug(WORKS_ENDPOINT, slug);
    return content as Work | null;
  } catch (error) {
    console.error(`Failed to fetch work with slug "${slug}":`, error);
    return null;
  }
};