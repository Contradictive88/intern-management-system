import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { removeCookie } from './app/utils/cookies';
/**
 * Parses cookies from the cookie header
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
 * Check if the JWT token has expired
 * @param token - The JWT token string
 * @returns True if the token has expired, otherwise false
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decodedToken: any = jwtDecode(token);

    // Get the expiration time from the token
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

    // Check if the current time is past the expiration time
    return Date.now() > expirationTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Treat decoding errors as expired tokens
  }
}

/**
 * Middleware function to handle requests
 * @param request - The incoming request object
 * @returns The response object, which can be a redirect or the original response
 */
export const middleware = (request: NextRequest) => {
  // Extract token from cookies using the parseCookie function
  const token = parseCookie(request.headers.get('Cookie'), 'auth_token');

  // List of protected routes
  const protectedRoutes = [
    '/profile',
    '/dtr',
    '/achievements',
    '/settings',
    '/logout',
  ];

  // Check if the current request is to a protected route
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  // If token is not present and user is trying to access a protected route
  if (!token && isProtectedRoute) {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If token is present, not expired, and user is on '/'
  if (token && !isTokenExpired(token) && request.nextUrl.pathname === '/') {
    // Redirect to profile
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Allow the request to proceed as normal
  return NextResponse.next();
};