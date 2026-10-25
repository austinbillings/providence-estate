import Image from "next/image";
import type { SiteImage } from "@/lib/cms";
import { cn } from "./ui";

/** Fills its (relatively positioned) parent with a CMS photo. */
export function Photo({
  image,
  sizes,
  priority,
  className,
  quality,
}: {
  image: SiteImage | undefined;
  sizes: string;
  priority?: boolean;
  className?: string;
  quality?: 75 | 85;
}) {
  if (!image) return null;
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={cn("object-cover", className)}
      style={image.position ? { objectPosition: image.position } : undefined}
    />
  );
}
