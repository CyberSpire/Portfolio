/**
 * Vercel Web Analytics Initialization
 * 
 * This module initializes Vercel Web Analytics for tracking visitor data and page views.
 * The inject() function adds the tracking script to the application.
 * 
 * Note: This should be called once in the app on the client side.
 */

import { inject } from '@vercel/analytics';

/**
 * Initialize Vercel Web Analytics
 * This function should be called once when the app mounts
 */
export const initializeAnalytics = () => {
  try {
    inject();
  } catch (error) {
    console.error('Failed to initialize Vercel Web Analytics:', error);
  }
};
