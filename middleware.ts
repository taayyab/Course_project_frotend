import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('user')?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = [
    '/',
    '/school/login', '/school/signup', '/subscribe/payment',
    '/student/login', '/student/signup', '/subscribe/payment'
  ];
  const roleDashboards: { [key: string]: string } = {
    admin: '/admin/dashboard',
    employer: '/employer/dashboard',
    school: '/school/dashboard',
    student: '/student/dashboard',
  };

  // If the user is trying to access a public path, allow it
  if (publicPaths.includes(pathname)) {
    // If user is logged in and tries to access login/signup, redirect to their dashboard
    if (userRole && (pathname.includes('/login') || pathname.includes('/signup'))) {
      return NextResponse.redirect(new URL(roleDashboards[userRole], request.url));
    }
    return NextResponse.next();
  }

  // If no user role, redirect to home or a general login page
  if (!userRole) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to home or a general login
  }

  // Role-specific access control
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (pathname.startsWith('/employer') && userRole !== 'employer') {
    return NextResponse.redirect(new URL('/employer/login', request.url));
  }
  if (pathname.startsWith('/school') && userRole !== 'school') {
    return NextResponse.redirect(new URL('/school/login', request.url));
  }
  if (pathname.startsWith('/student') && userRole !== 'student') {
    return NextResponse.redirect(new URL('/student/login', request.url));
  }

  // If authorized, proceed
  return NextResponse.next();
}


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
