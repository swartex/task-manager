import { type ClassValue, clsx } from 'clsx';
import { setHours, setMinutes } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDateTime(day: string, time: string) {
  if (!day && !time) return;

  const parsedDate = new Date(day);
  const [hours, minutes] = time.split(':').map(Number);
  const updatedDate = setMinutes(setHours(parsedDate, hours), minutes);
  const unixTime = updatedDate.getTime();

  return +unixTime;
}
