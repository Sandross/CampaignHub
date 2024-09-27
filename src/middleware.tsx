import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;

  if (!token && !req.nextUrl.pathname.startsWith('/login')) {
    console.log('Redirecionando para /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|_next|favicon.ico).*)'],
};
