import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function RichText({ content }: { content: string }) {
  return (
    <div className="prose-rich">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
