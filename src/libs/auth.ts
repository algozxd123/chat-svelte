import { goto } from '$app/navigation';
import { getContext, setContext } from 'svelte';
import { getUser } from './api';
import { authStore } from './stores';

const initializeContext = () => {
  if (!getContext('user')) setContext('user', authStore);
}

const preventUnauthorizedAccess = (token: string | null, urlPath: string) => {
  const guestRoutes = ['/login', '/register'];

  if (token && guestRoutes.includes(urlPath)) goto('/');
  if (!token && !guestRoutes.includes(urlPath)) goto('/login');
};

const setAuthStore = async (token: string) => {
  await getUser(token)
  .then(({data}) => {
    if(data){
      authStore.set({
        user: {
          _id: data._id,
          username: data.username,
          email: data.email
        },
        jwt: {
          token
        }
      });
    }
  })
  .catch((response) => {
    console.log(response);
    localStorage.removeItem('token');
    goto('/login');
  });
};

export { initializeContext, preventUnauthorizedAccess, setAuthStore };