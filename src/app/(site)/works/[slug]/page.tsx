import { getWorkBySlug, getWorks } from '@/features/works/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Work } from '@/features/works/types';
import Image from 'next/image';
import Link from 'next/link';

interface WorkDetailPageProps {
  params: { slug: string };
}

// 静的パラメータ生成
export async function generateStaticParams() {
  try {
    const response = await getWorks(100);
    return response.contents.map((work: Work) => ({
      slug: work.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

// メタデータ生成
export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const slug = params.slug;
  const work = await getWorkBySlug(slug);

  if (!work) {
    return { title: 'Work Not Found' };
  }

  return {
    title: work.title,
    description: work.excerpt || `${work.title}の詳細ページです。`,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const slug = params.slug;
  const work: Work | null = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* パンくずナビ */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">Home</Link>
            </li>
            <li><span className="mx-2">/</span></li>
            <li>
              <Link href="/works" className="hover:text-gray-900 dark:hover:text-gray-100">Works</Link>
            </li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900 dark:text-gray-100">{work.title}</li>
          </ol>
        </nav>

        {/* ヘッダー */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {work.title}
          </h1>
          {work.date && (
            <time className="text-gray-500 dark:text-gray-400">
              {new Date(work.date).toLocaleDateString('ja-JP')}
            </time>
          )}
        </header>

        {/* --- プロジェクト概要セクション --- */}
        <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">概要</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {work.category && (
              <div>
                <dt className="font-semibold text-gray-600 dark:text-gray-400">カテゴリ</dt>
                <dd className="mt-1 text-gray-900 dark:text-white">{work.category.name}</dd>
              </div>
            )}
            {work.project_type && (
              <div>
                <dt className="font-semibold text-gray-600 dark:text-gray-400">案件種別</dt>
                <dd className="mt-1 text-gray-900 dark:text-white">{work.project_type}</dd>
              </div>
            )}
            {work.site_url && (
              <div className="md:col-span-2">
                <dt className="font-semibold text-gray-600 dark:text-gray-400">公開URL</dt>
                <dd className="mt-1">
                  <a href={work.site_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
                    {work.site_url}
                  </a>
                </dd>
              </div>
            )}
            {work.technologies && work.technologies.length > 0 && (
              <div className="md:col-span-2">
                <dt className="font-semibold text-gray-600 dark:text-gray-400">使用技術</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {work.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-md">
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* アイキャッチ画像 */}
        {work.thumb && (
          <div className="relative mb-8 w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={work.thumb.url}
              alt={work.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        {/* コンテンツ */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {work.body && (
            <div dangerouslySetInnerHTML={{ __html: work.body }} />
          )}

          {work.excerpt && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
              <p className="text-gray-600 dark:text-gray-300">
                {work.excerpt}
              </p>
            </div>
          )}
        </div>

        {/* 戻るボタン */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link href="/works" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            ← Works一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}