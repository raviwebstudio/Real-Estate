import Image from "next/image";

import { cn } from "@/lib/utils";

export function PropertyGallery({
  images,
}: {
  images: {
    id: string;
    url: string;
    alt: string;
    orientation: string;
  }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={cn(
            "relative overflow-hidden rounded-[26px] border border-black/5 bg-white",
            image.orientation === "LANDSCAPE" || index === 0
              ? "md:col-span-2 aspect-[16/9]"
              : "aspect-[4/5]",
          )}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
