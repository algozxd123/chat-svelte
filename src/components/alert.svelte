<script lang="ts">
  import { alertStore } from '../libs/stores';

  let color: string = 'primary';

  setTimeout(() => {
    alertStore.set({message: '', type: ''});
  }, 3000);

  console.log($alertStore.type);
  if($alertStore.type === 'info') color = 'primary';
  else if($alertStore.type === 'error') color = 'secondary';

</script>

{#if $alertStore.type === 'info'}
  <div class="fixed bottom-4 left-4 bg-primary text-black p-6 shadow-md shadow-primary">
    <span>{$alertStore.message}</span>
  </div>
{:else if $alertStore.type === 'error'}
  <div class="fixed bottom-4 left-4 bg-secondary text-black p-6 shadow-md shadow-secondary">
    <span>{$alertStore.message}</span>
  </div>
{:else}
  <div class="fixed bottom-4 left-4 bg-white text-black p-6 shadow-md shadow-white">
    <span>Unexpected Error</span>
  </div>
{/if}