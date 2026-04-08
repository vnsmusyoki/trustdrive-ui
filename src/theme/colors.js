/**
 * TrustDrive Color Theme
 * Light & Dark theme colors from Design System
 * Reference: scope.html - Section 20. Design System & Color Palette
 */

export const lightTheme = {
  // Primary Colors
  primary: {
    main: '#2563EB',      // Primary Blue - Main UI elements, buttons, links
    dark: '#1E40AF',      // Primary Dark - Dark accents, headers, hover states
    accent: '#7C3AED',    // Accent Purple - AI insights, premium features
  },

  // Backgrounds
  background: {
    main: '#F9FAFB',      // Page background, default surface
    card: '#FFFFFF',      // Cards, modals, elevated surfaces
    border: '#E5E7EB',    // Borders, dividers, subtle elements
  },

  // Text Colors
  text: {
    primary: '#111827',   // Body text, headings
    secondary: '#6B7280', // Labels, descriptions, helper text
  },

  // Status Colors
  status: {
    success: '#10B981',   // Good Driver, safe, reliable
    warning: '#F59E0B',   // Caution, needs attention
    danger: '#EF4444',    // Risk, complaints, unsafe
  },
};

export const darkTheme = {
  // Primary Colors
  primary: {
    main: '#3B82F6',      // Primary Blue - Main UI elements, buttons, links
    accent: '#8B5CF6',    // Accent Purple - AI insights, premium features
  },

  // Backgrounds
  background: {
    main: '#0B1220',      // Page background, default surface
    card: '#111827',      // Cards, modals, elevated surfaces
    border: '#1F2937',    // Borders, dividers, subtle elements
  },

  // Text Colors
  text: {
    primary: '#F9FAFB',   // Body text, headings
    secondary: '#9CA3AF', // Labels, descriptions, helper text
  },

  // Status Colors (Softer for dark theme)
  status: {
    success: '#34D399',   // Good Driver, safe, reliable
    warning: '#FBBF24',   // Caution, needs attention
    danger: '#F87171',    // Risk, complaints, unsafe
  },
};

/**
 * Color Meaning Guide - Use Consistently
 * Green → Safe, reliable driver, positive action
 * Red → Risk, complaints, unsafe, negative action
 * Purple → AI insights, intelligence, premium features
 * Blue → General UI, trust, reliability, primary actions
 */
