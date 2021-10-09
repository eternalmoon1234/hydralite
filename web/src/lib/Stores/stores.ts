import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { User } from '../types/User';
export const user: Writable<User> = writable(null);
