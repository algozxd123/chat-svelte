<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Alert from '../components/alert.svelte';
  import { alertStore, alertTypes, userStore } from '../libs/stores';
  import { goto } from '$app/navigation';
  import { getContext, setContext } from 'svelte';
  import { getUser } from '../libs/api';

  let authorized = false;

  if (!getContext('user')) setContext('user', userStore);

  onMount(async () => {
    const token = localStorage.getItem('token');

    if (!token && $page.url.pathname !== '/login' && $page.url.pathname !== '/register') {
      authorized = true;
      goto('/login');
    }

    if (token && ($page.url.pathname === '/login' || $page.url.pathname === '/register')) {
      authorized = true;
      goto('/');
    }

    if (token) {
      if ($userStore.username == '') {
        const userData = await getUser(token);
        userStore.set({
          id: userData._id,
          username: userData.username,
          email: userData.email
        });
      }
    }
    authorized = true;
  });
</script>

{#if authorized}
  <slot />

  {#if $alertStore.message.length > 0 && alertTypes.includes($alertStore.type)}
    <Alert />
  {/if}
{/if}
