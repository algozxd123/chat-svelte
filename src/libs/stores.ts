import { writable } from 'svelte/store';

export const alertStore = writable({message: '', type: ''});

export const userStore = writable({
  username: '',
  email: ''
});

export const alertTypes = ['info', 'error'];