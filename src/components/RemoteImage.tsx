import type { HTMLAttributeReferrerPolicy } from "react";
import Image, { type ImageProps } from "next/image";

const WEBFLOW_CDN = "cdn.prod.website-files.com";

type RemoteImageProps = ImageProps & {
  referrerPolicy?: HTMLAttributeReferrerPolicy;
};

export const RemoteImage = (props: RemoteImageProps) => {
  const { src, unoptimized, referrerPolicy, ...rest } = props;

  if (!src) return null;

  const isWebflow =
    typeof src === "string" && src.includes(WEBFLOW_CDN);

  return (
    <Image
      src={src}
      unoptimized={unoptimized ?? isWebflow}
      referrerPolicy={referrerPolicy ?? (isWebflow ? "no-referrer" : undefined)}
      {...rest}
    />
  );
};
