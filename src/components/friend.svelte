<script lang="ts">
  export let username: string;
  export let link: string;
</script>

<a href={link} class="border-2 border-tertiary shadow-md shadow-black hover:border-primary rounded-md py-5 px-5 cursor-pointer">
  <span class="text-primary">{username}</span>
</a>