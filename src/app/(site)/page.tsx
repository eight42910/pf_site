import { getWorks } from "@/features/works/api";
import { WorkCard } from "@/features/works/components/WorkCard";

export default async function Home() {
  const works = await getWorks();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">制作実績</h1>
      {works.contents.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {works.contents.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">制作実績はまだありません。</p>
      )}
    </div>
  );
}
