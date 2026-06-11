import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface NoticiaMarkdownContentProps {
  content: string;
  className?: string;
}

export function NoticiaMarkdownContent({
  content,
  className,
}: NoticiaMarkdownContentProps) {
  return (
    <article className={cn("noticia-markdown", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
