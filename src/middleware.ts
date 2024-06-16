import { NextRequest, NextResponse } from 'next/server';
import { getCookie, removeCookie } from './utils/cookies';

/**
 * Middleware function to handle requests
 * @param request - The incoming request object
 * @returns The response object, which can be a redirect or the original response
 */
export const middleware = (request: NextRequest) => {
  // Allow the request to proceed as normal
  return NextResponse.next();
};