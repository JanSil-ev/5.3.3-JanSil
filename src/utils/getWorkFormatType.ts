export const getWorkFormatType = (formatName: string): 'office' | 'remote' | 'hybrid' | 'default' => {
  const lower = formatName.toLowerCase();
  if (lower.includes('офис')) return 'office';
  if (lower.includes('удал')) return 'remote';
  if (lower.includes('гибрид')) return 'hybrid';
  return 'default';
};
