import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { User } from '../types/User';
import type { Projects } from '../types/Projects';

export const user: Writable<User | null> = writable(null);
export const projects: Writable<Projects | null> = writable(null);
