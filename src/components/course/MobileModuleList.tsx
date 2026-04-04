import Link from "next/link";
import type { ModuleWithLessons } from "@/lib/types";
import { padIndex } from "@/lib/utils";

interface Props {
  courseId: string;
  modules: ModuleWithLessons[];
}

export default function MobileModuleList({ courseId, modules }: Props) {
  return (
    <div className="lg:hidden px-6 py-8">
      {modules.map((mod, mi) => (
        <div key={mod.id} className="mb-6 border border-gold rounded-sm overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-2 border-b border-gold">
            <span className="font-mono text-[10px] text-gold-dim">{padIndex(mi + 1)}</span>
            <h3 className="text-[13px] font-semibold text-cream-DEFAULT">{mod.title}</h3>
          </div>
          <ul className="divide-y divide-gold">
            {mod.lessons.map((lesson, li) => (
              <li key={lesson.id}>
                <Link
                  href={`/courses/${courseId}/lessons/${lesson.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 text-[12px] text-muted hover:text-cream-DEFAULT hover:bg-bg-3 transition-colors"
                >
                  <span className="font-mono text-[10px] text-muted-2 w-4">{li + 1}</span>
                  <span className="flex-1 line-clamp-1">{lesson.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
