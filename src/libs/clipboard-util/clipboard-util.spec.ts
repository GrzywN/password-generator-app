/**
 * @jest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import { copyToClipboard } from './clipboard-util';

describe('copyToClipboard', () => {
  it('should copy text to clipboard successfully', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        async writeText() {
          return await Promise.resolve({});
        },
      },
      writable: true,
    });

    const text = 'Lorem ipsum dolor sit amet';
    const result = await copyToClipboard(text);

    expect(result).toBe(true);
  });

  it('should return false when copying text fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        async writeText() {
          return await Promise.reject(new Error('Copying text failed.'));
        },
      },
      writable: true,
    });

    const text = 'Lorem ipsum dolor sit amet';
    const result = await copyToClipboard(text);

    expect(result).toBe(false);
  });
});
