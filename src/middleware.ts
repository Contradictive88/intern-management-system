import { NextRequest, NextResponse } from 'next/server';
import { getCookie, removeCookie } from './utils/cookies';

/**
 * Middleware function to handle requests.
 * @param request - The incoming request object.
 * @returns The response object, which can be a redirect or the original response.
 */
export const middleware = (request: NextRequest): NextResponse => {
  // List of routes that require authentication
  const protectedRoutes = ['/profile', '/achievements', '/dtr', '/settings'];

  // Get the pathname from the request URL
  const { pathname } = request.nextUrl;

  // Check if the current request URL matches any of the protected routes
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If the request is for a protected route, check authentication
  if (isProtectedRoute) {
    // Get the cookie header from the request
    const cookieHeader = request.headers.get('cookie');
    const authToken = getCookie(cookieHeader, 'auth_token');

    // If no auth_token is found, respond with an authentication error
    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Authentication failed' },
        { status: 401 }
      );
    }
  }

  // For all other routes or if authentication is valid, proceed with the request
  return NextResponse.next();
};
