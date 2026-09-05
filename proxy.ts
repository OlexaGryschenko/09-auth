// proxy.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  let isAuthenticated = false;

  try {
    const response = await checkSession();
    
    // Перевіряємо, чи об'єкт існує і чи не є він { success: false }
    if (response && response.success !== false) {
      isAuthenticated = true;
    }
  } catch {
    isAuthenticated = false;
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}



export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};