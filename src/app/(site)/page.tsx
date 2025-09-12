import { getWorks } from "@/features/works/api";

export default async function Home() {
  // サーバーサイドでデータを取得します
  const works = await getWorks();

  return (
    <div>
      <h1>制作実績</h1>
      {works.contents.length > 0 ? (
        <ul>
          {works.contents.map((work) => (
            <li key={work.id}>{work.title}</li>
          ))}
        </ul>
      ) : (
        <p>制作実績はまだありません。</p>
      )}
    </div>
  );
}
