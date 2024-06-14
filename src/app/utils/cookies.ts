// Import the js-cookie library for handling cookies
import Cookies from 'js-cookie';

// Define an interface for cookie options
interface CookieOptions {
  expires?: number | Date; // Optional expiration date or number of days until expiration
  path?: string;           // Optional path where the cookie is accessible
  domain?: string;         // Optional domain where the cookie is accessible
  secure?: boolean;        // Optional flag to indicate if the cookie should be transmitted over secure protocols (HTTPS)
  sameSite?: 'strict' | 'lax' | 'none'; // Optional SameSite attribute to prevent CSRF
}

/**
 * Set a cookie with the given name, value, and options.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {CookieOptions} options - Additional options for the cookie.
 */
export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  Cookies.set(name, value, options);
};

/**
 * Get the value of a cookie by name.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string | undefined} - The value of the cookie, or undefined if not found.
 */
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

/**
 * Remove a cookie by name.
 *
 * @param {string} name - The name of the cookie to remove.
 */
export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};
