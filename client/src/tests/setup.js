import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Clean mock for window.scrollTo in JSDOM
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
});
