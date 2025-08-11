import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatMonths(months: number): string {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  
  if (years === 0) {
    return `${months} month${months !== 1 ? 's' : ''}`
  }
  
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`
  }
  
  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
}
