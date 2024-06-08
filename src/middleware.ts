import { NextRequest, NextResponse } from 'next/server';

/**
 * Function to parse cookies from request headers
 * @param cookieHeader - The cookie header string from the request headers
 * @param name - The name of the cookie to extract
 * @returns The value of the cookie, or null if not found
 */
function parseCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
}

/**
 * Middleware function to handle requests
 * @param request - The incoming request object
 * @returns The response object, which can be a redirect or the original response
 */
export function middleware(request: NextRequest) {
  // Extract token from cookies
  const token = parseCookie(request.headers.get('Cookie'), 'auth_token');

  // List of protected routes (can be passed as a configuration)
  const protectedRoutes = [
    '/profile',
    '/dtr',
    '/achievements',
    '/settings',
    '/logout',
  ];

  // Check if the current request is to a protected route
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // If token is not present and user is trying to access a protected route
  if (!token && isProtectedRoute) {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to proceed as normal
  return NextResponse.next();
}