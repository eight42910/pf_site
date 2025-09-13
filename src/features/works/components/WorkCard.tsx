import Link from 'next/link';
import Image from 'next/image';
import type { Work } from '../types';

interface Props {
  work: Work;
}

export const WorkCard = ({ work }: Props) => {
  return (
    <Link href={`/works/${work.slug}`} className="group block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={work.thumb.url}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
                {work.category && (
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            {work.category.name}
          </p>
        )}
        <h3 className="mt-2 font-bold text-lg text-gray-900 dark:text-white">
          {work.title}
        </h3>
      </div>
    </Link>
  );
};
