import { NextRequest, NextResponse } from 'next/server';
import { getCookie, removeCookie } from './utils/cookies';

/**
 * Middleware function to handle requests
 * @param request - The incoming request object
 * @returns The response object, which can be a redirect or the original response
 */
export const middleware = (request: NextRequest) => {
  // Extract token from cookies using the getCookie function
  const token = getCookie(request.headers.get('Cookie'), 'auth_token');

  // Check if the token is present
  if (token) {
    // If token is present and user is trying to access a protected route
    const protectedRoutes = [
      '/profile',
      '/dtr',
      '/achievements',
      '/settings',
      '/logout',
    ];
    const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

    // If token is present and user is trying to access a protected route
    if (isProtectedRoute) {
      return NextResponse.next(); // Allow the request to proceed as normal
    }

    // If token is present and user is on '/'
    if (request.nextUrl.pathname === '/') {
      // Redirect to profile
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }

  // If token is not present or user is trying to access a protected route without a valid token
  if (!token) {
    removeCookie('auth_token');

    // Redirect to the login page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to proceed as normal
  return NextResponse.next();
};