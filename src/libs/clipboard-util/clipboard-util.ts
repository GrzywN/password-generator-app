export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    return false
  }

  return true
}
