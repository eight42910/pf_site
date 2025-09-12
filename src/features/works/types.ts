/**
 * microCMSの画像型
 */
export interface MicroCMSImage {
  url: string;
  height: number;
  width: number;
}

/**
 * カテゴリーの型 (microCMSの'categories' APIスキーマに対応)
 */
export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  slug: string;
}

/**
 * 制作実績の型 (microCMSの'works' APIスキーマに対応)
 */
export interface Work {
  // microCMSの基本フィールド
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;

  // --- 必須フィールド ---
  title: string;
  slug: string;
  thumb: MicroCMSImage;
  body: string; // リッチエディタ
  project_type: string; // 案件種別 (例: 'クライアントワーク')
  category: Category;   // 関連付けられたカテゴリ

  // --- オプショナルフィールド ---
  excerpt?: string;
  date?: string; // 制作日
  site_url?: string; // 公開URL
}

/**
 * Works一覧APIのレスポンス型
 */
export interface WorksResponse {
  contents: Work[];
  totalCount: number;
  offset: number;
  limit: number;
}