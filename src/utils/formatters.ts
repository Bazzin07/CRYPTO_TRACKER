export const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 10000) {
    return `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  if (value >= 100) {
    return `$${value.toFixed(2)}`;
  }
  if (value >= 1) {
    return `$${value.toFixed(2)}`;
  }
  return `$${value.toFixed(6)}`;
};

export const formatNumber = (value: number): string => {
  if (value === 0) return '∞';
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPercentage = (value: number): string => {
  const formattedValue = value.toFixed(2);
  return value >= 0 ? `+${formattedValue}%` : `${formattedValue}%`;
};