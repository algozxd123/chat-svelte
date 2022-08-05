<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Alert from '../components/alert.svelte';
  import { alertStore, alertTypes, authStore } from '../libs/stores';
  import Nav from '../components/nav.svelte';
  import { initializeContext, preventUnauthorizedAccess, setAuthStore } from '../libs/auth';

  let authorized = false;

  initializeContext();

  onMount(async () => {
    const token = localStorage.getItem('token');
    const urlPath = $page.url.pathname;
    
    preventUnauthorizedAccess(token, urlPath);

    if (token && $authStore.user._id === '') {
      await setAuthStore(token);
    }

    authorized = true;
  });
</script>

{#if authorized}
  {#if $authStore.user._id !== ''}
    <Nav />
  {/if}

  <slot />

  {#if $alertStore.message.length > 0 && alertTypes.includes($alertStore.type)}
    <Alert />
  {/if}
{/if}
