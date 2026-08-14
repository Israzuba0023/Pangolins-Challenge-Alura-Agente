import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownMessageProps {
  content: string;
  isUser?: boolean;
}

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content, isUser = false }) => {
  if (isUser) {
    return (
      <div className="text-sm leading-relaxed font-sans whitespace-pre-wrap text-[#0A0908]">
        {content}
      </div>
    );
  }

  return (
    <div className="text-sm leading-relaxed font-sans text-[#F5F2EB] space-y-3.5">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg font-bold text-white font-serif tracking-tight border-b border-[#3D3323] pb-1.5 mt-3 mb-2 flex items-center gap-2">
              <span className="text-[#D4AF37]">✦</span>
              <span>{children}</span>
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-bold text-[#FFF2B2] font-serif tracking-tight mt-3 mb-1.5 flex items-center gap-2">
              <span className="text-[#D4AF37]">▸</span>
              <span>{children}</span>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-bold text-[#F5E6B3] font-serif tracking-wide mt-2.5 mb-1 flex items-center gap-1.5">
              <span className="text-[#D4AF37]">▪</span>
              <span>{children}</span>
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mt-2 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-xs sm:text-sm text-[#E6E1D6] leading-relaxed my-1.5">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-[#FFF8DC] drop-shadow-sm">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-[#D4AF37] not-italic font-medium">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 my-2 pl-4 text-xs sm:text-sm text-[#DCD6C8] list-disc list-outside marker:text-[#D4AF37]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-2 my-2.5 pl-4 text-xs sm:text-sm text-[#DCD6C8] list-decimal list-outside marker:text-[#D4AF37] marker:font-bold">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-1">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <div className="my-3 pl-3.5 py-2 border-l-2 border-[#D4AF37] bg-[#181512]/90 rounded-r-xl text-xs sm:text-sm text-[#F5E6B3] italic">
              {children}
            </div>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 rounded-md bg-[#241E15] text-[#F5E6B3] border border-[#D4AF37]/30 text-xs font-mono">
                  {children}
                </code>
              );
            }
            return (
              <div className="my-2.5 p-3 rounded-xl bg-[#0A0908] border border-[#332A1C] text-xs font-mono text-[#DCD6C8] overflow-x-auto">
                <code>{children}</code>
              </div>
            );
          },
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-[#332A1C]">
              <table className="min-w-full divide-y divide-[#332A1C] text-xs">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#181512] text-[#F5E6B3] font-semibold">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-serif">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border-t border-[#241E15] text-[#DCD6C8]">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-3 border-t border-[#332A1C]" />
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};
