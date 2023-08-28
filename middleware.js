import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import { routerPrivate } from "./src/components/routerConstant/Constant";


export function middleware(req) {
  const token = req.cookies.get('next-auth.session-token');
  const url = req.url


  if (!token && url.includes('/admin')) {
    return NextResponse.redirect(new URL('/login', url))
  }

  if (!token && url.includes('/settings')) {
    return NextResponse.redirect(new URL('/login', url))
  }


  if (token && url.includes('/login')) {
    return NextResponse.redirect(new URL('/admin', url))
  }

  if (url.includes('/playgame/[id]')) {
    return NextResponse.redirect(new URL(`/playgame/[id]?type=teacher`, url))

  }


}



