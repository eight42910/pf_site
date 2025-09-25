# 初学者向けガイド

このリポジトリは Next.js と microCMS を使って制作実績サイトを作るテンプレートです。React コンポーネントで画面を作り、ヘッドレス CMS から取得したデータを表示します。以下では、初めて触れる人が全体像をつかめるように流れや用語を噛み砕いて説明します。

## 全体の動き
1. ブラウザでページにアクセスすると Next.js がサーバー側で `getWorks` を呼び出します。
2. `getWorks` は `src/lib/microcms.ts` のクライアントを通じて microCMS の `works` API から JSON を取得します。
3. 受け取ったデータを `WorkCard` コンポーネントなどに渡し、Tailwind CSS で整えた UI として表示します。
4. 詳細ページでは `getWorkBySlug` が slug（URL の一部）を使って対象データを 1 件だけ取得します。

## ディレクトリの見方
- `src/app` : ページとレイアウト。`(site)` フォルダが公開サイトのルートです。
- `src/features/works` : 制作実績に関する API 呼び出し・型・UI コンポーネントをまとめています。
- `src/components` : 複数のページで使うヘッダーやフッターなど共通パーツ。
- `src/lib` : microCMS クライアントなど外部サービス連携のラッパー。
- `src/styles` : グローバル CSS と Tailwind のレイヤー設定。
- `docs` : 補助資料を置く場所（空のこともあります）。

## 開発を始める手順
1. Node.js をインストール（推奨 LTS）。
2. `.env.local` を作り、microCMS の `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY`、サイト URL を設定。
3. `npm install` で依存関係を取得。
4. `npm run dev` を実行し、`http://localhost:3000` をブラウザで確認。
5. 変更を加えたら `npm run lint` と `npm run build` で動作確認を行います。

## 画面を編集するには
- 文言や構成を変えたい場合は該当するページコンポーネント（例: `src/app/(site)/page.tsx`）を編集します。
- カード表示や API の仕様を変更したい場合は `src/features/works` 配下を確認します。
- CMS 上の内容を変えれば、再ビルド後にサイトへ自動反映されます。データ構造を変えたときは対応する TypeScript の型も更新しましょう。

## 用語ミニ辞典
- **Next.js**: React アプリを高速に作るためのフレームワーク。サーバー側でデータ取得ができる点が特徴です。
- **microCMS**: 管理画面で記事や実績を登録し、API で取得できるヘッドレス CMS。
- **Tailwind CSS**: クラス名でデザインを組み立てる CSS フレームワーク。`className` にユーティリティクラスを並べてスタイルを指定します。
- **Slug**: URL に使われる短く分かりやすい文字列。例: `/works/my-first-project` の `my-first-project`。
