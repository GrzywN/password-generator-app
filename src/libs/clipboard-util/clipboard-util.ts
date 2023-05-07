export async function copyToClipboard(text: string): Promise<boolean> {
  if (text.length === 0) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    return false;
  }

  return true;
}
