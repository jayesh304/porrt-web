import { NextResponse } from "next/server";
import supabase from "@/supabase";

export async function middleware({ req }: { req: any }) {
  const res = NextResponse.next();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  // if user is signed in and the current path is / redirect the user to /account
  if (
    session?.user &&
    (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/auth")
  ) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/auth", "/account"],
};