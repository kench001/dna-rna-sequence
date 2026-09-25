import { useState, useCallback } from 'react';
import { copyTextToClipboard } from '../utils/formatters';

export function useClipboard(timeoutMs: number = 2000) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string, key: string = 'default') => {
      const success = await copyTextToClipboard(text);
      if (success) {
        setCopiedKey(key);
        setTimeout(() => {
          setCopiedKey((curr) => (curr === key ? null : curr));
        }, timeoutMs);
      }
      return success;
    },
    [timeoutMs]
  );

  return { copiedKey, copy, isCopied: (key: string = 'default') => copiedKey === key };
}
