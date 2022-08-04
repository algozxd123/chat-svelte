import type { AuthType } from '../interfaces/api';
import { writable, type Writable } from 'svelte/store';

export const alertStore = writable({message: '', type: ''});

export const authStore: Writable<AuthType> = writable({ jwt: { token: '' }, user: { _id: '', username: '', email: '' } });

export const alertTypes = ['info', 'error'];