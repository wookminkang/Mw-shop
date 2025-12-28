import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 이게 바로 그 cn 함수입니다!
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}