import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="font-display text-lg text-gold-bright mb-3 mt-5 first:mt-0 border-b border-gold pb-1">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-display text-base text-gold mb-2 mt-4 first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-sans text-[13px] font-semibold text-cream-DEFAULT mb-2 mt-3 first:mt-0 uppercase tracking-wider">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-[13px] text-cream-dim leading-relaxed mb-3 last:mb-0">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="mb-3 space-y-1 pl-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-3 space-y-1 pl-4 list-decimal">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-[13px] text-cream-dim leading-relaxed flex gap-2 before:content-['–'] before:text-gold before:shrink-0 before:mt-px list-none">
            <span>{children}</span>
          </li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-cream-DEFAULT">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-cream-dim">{children}</em>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes("language-");
          return isBlock ? (
            <code className="block bg-bg-3 border border-gold rounded-sm px-4 py-3 text-[12px] text-gold-bright font-mono leading-relaxed overflow-x-auto mb-3">
              {children}
            </code>
          ) : (
            <code className="bg-bg-3 text-gold font-mono text-[11px] px-1.5 py-0.5 rounded-sm">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="mb-3">{children}</pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-gold pl-4 my-3 text-[13px] text-cream-dim italic">
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr className="border-t border-gold my-4" />
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-bright underline underline-offset-2 transition-colors"
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-[12px] font-mono border border-gold rounded-sm">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-bg-3 text-gold text-[10px] tracking-widest uppercase">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-gold">{children}</tbody>
        ),
        th: ({ children }) => (
          <th className="px-3 py-2 text-left">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-3 py-2 text-cream-dim">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
