import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define a custom interface for request cookies
interface CustomRequestCookies {
  auth_token?: string;
}

/**
 * Middleware function to check if the user is authenticated using JWT.
 * If not authenticated, redirects to the login page.
 * 
 * @param {NextRequest} request - The incoming request object
 * @returns {NextResponse} - The response object
 */

export async function middleware(request: NextRequest) {
  try {
    // Check if the user is authenticated using JWT
    const cookies = request.cookies as CustomRequestCookies;
    const token = cookies.auth_token;
    if (!token) {
      // If not authenticated, redirect to the login page
      return NextResponse.redirect('/');
    }
    // If authenticated, proceed with the request
    return NextResponse.next();
  } catch (error) {
    // Handle any authentication errors
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/', request.url))
  }
}
 
export const config = {
  matcher: '/profile',
}