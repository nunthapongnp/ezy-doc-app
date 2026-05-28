"use client";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_ID;

export function SidebarAd() {
  if (!ADSENSE_CLIENT) return null;

  return (
    <aside className="hidden lg:flex w-[300px] shrink-0 flex-col border-l bg-muted/20 p-4">
      <div className="sticky top-20 flex h-[250px] w-[300px] items-center justify-center rounded border border-dashed border-muted-foreground/30 bg-muted/40 text-xs text-muted-foreground">
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: 300, height: 250 }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot=""
        />
      </div>
    </aside>
  );
}
