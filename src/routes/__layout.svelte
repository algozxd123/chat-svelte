<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Alert from '../components/alert.svelte';
  import { alertStore, alertTypes } from '../libs/stores';
  import { goto } from '$app/navigation';


  let authorized = false;
  onMount(() => {
    const token = sessionStorage.getItem('token');
    if(!token && ($page.url.pathname !== '/login' && $page.url.pathname !== '/register')){
      authorized = true;
      goto('/login');
    }

    if(token && ($page.url.pathname === '/login' || $page.url.pathname === '/register')){
      authorized = true;
      goto('/');
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