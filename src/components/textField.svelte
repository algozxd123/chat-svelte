<script lang="ts">
  export let placeholder: string = '';
  export let value: string = '';
  export let onInput: Function = () => {};
</script>

<input type="text" {placeholder} bind:value={value} on:input={(e) => onInput(value)} class="bg-transparent text-lg p-1 border border-x-0 border-t-0 border-tertiary focus:outline-none focus:border-secondary">