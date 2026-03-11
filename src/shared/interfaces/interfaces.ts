import type { Rate } from "@/features/home/interfaces/rate.interface";

export interface SSEResponse {
  message: string;
  rate: Rate;
  timestamp: string;
}