<script lang="ts">
  import { authStore } from '../libs/stores';
</script>

<div class="flex justify-center items-center mt-48">
  <h1 class="text-secondary text-3xl">Welcome <span class="text-primary">{$authStore.user.username}</span> !</h1>
</div>