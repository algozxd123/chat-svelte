<script>
import { goto } from '$app/navigation';

  import { page } from '$app/stores';
import { authStore } from '../libs/stores';

  $: links = [
    {
      path: '/',
      text: 'Home',
      active: $page.url.pathname == '/'
    },
    {
      path: '/friends',
      text: 'Friends',
      active: $page.url.pathname.includes('/friends')
    },
  ];

  const logout = () => {
    localStorage.removeItem('token');
    authStore.set({ jwt: { token: '' }, user: { _id: '', username: '', email: '' } });
    goto('/login');
  };
</script>

<nav class="flex justify-end mx-12 my-4">
  <ul class="flex space-x-10 text-xl text-secondary">
    {#each links as link}
      {#if link.active}
        <li>
          <a href={link.path} class="text-primary">{link.text}</a>
        </li>
      {:else}
        <li>
          <a href={link.path}>{link.text}</a>
        </li>
      {/if}
    {/each}
    <li>
      <a href={undefined} on:click={logout} class="cursor-pointer">Logout</a>
    </li>
  </ul>
</nav>