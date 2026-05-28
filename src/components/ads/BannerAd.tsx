"use client";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_ID;

export function BannerAd() {
  if (!ADSENSE_CLIENT) return null;

  return (
    <div
      className="flex w-full items-center justify-center border-b bg-muted/30 py-2 min-h-[50px] md:min-h-[90px]"
      aria-hidden={!ADSENSE_CLIENT}
    >
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot=""
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
