import type { FaqItem } from "@/lib/types";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="panel p-5">
          <summary className="cursor-pointer list-none font-medium text-ink">
            {item.question}
          </summary>
          <p className="mt-3 text-sm leading-7 text-taupe">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
