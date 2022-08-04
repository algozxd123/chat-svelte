<script lang="ts">
  export let display: string;
</script>

<div class="w-screen h-screen bg-black bg-opacity-25 {display} top-0">
  <div class="flex justify-center items-center h-full">
    <slot />
  </div>
</div>