<script lang="ts">
  import { authStore } from '../libs/stores';

  export let senderId: string;
  export let text: string;
  export let time: string;
</script>

{#if senderId === $authStore.user._id}
  <div class="border border-primary rounded-md p-3 max-w-md flex flex-col self-end">
    <span class="text-md">{text}</span>
    <span class="text-sm text-tertiary mt-2 self-end">{time}</span>
  </div>
{:else}
  <div class="border border-primary rounded-md p-3 max-w-md flex flex-col self-start">
    <span class="text-md">{text}</span>
    <span class="text-sm mt-2 text-tertiary self-start">{time}</span>
  </div>
{/if}