import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname =
      pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
