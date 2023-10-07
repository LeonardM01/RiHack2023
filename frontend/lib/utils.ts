import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { animationURLS } from "@/constants/animations"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateProgress(progress: number): string {
  return animationURLS[Math.floor(progress * 100 / 12)]
}
