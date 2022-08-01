<script lang="ts">
  import { login } from '../libs/api';
  import { alertStore } from '../libs/stores';
  import { goto } from '$app/navigation';

  let email: string = 'gabriel3@gmail.com';
  let password: string = '12345678';

  const submit = async () => {
    const data = await login(email, password);
    if(data.error) alertStore.set({message: data.error, type: 'error'});
    else {
      email = '';
      password = '';
      localStorage.setItem('token', data.jwt.token);
      goto('/');
    }
  };
</script>

<div class="w-screen h-screen flex justify-center items-center">
  <form class="border border-tertiary flex flex-col p-10 shadow-md shadow-black">
    <span class="text-3xl self-center mb-10 text-secondary border-b-2 pb-4 border-secondary">Login</span>
    <div class="flex flex-col mb-6 space-y-1">
      <label for="email" class="text-white text-xl">Email:</label>
      <input bind:value={email} type="email" name="email" id="email" class="bg-transparent text-lg p-1 border border-x-0 border-t-0 border-tertiary focus:outline-none focus:border-secondary">
    </div>
    <div class="flex flex-col mb-6 space-y-1">
      <label for="password" class="text-white text-xl">Password:</label>
      <input bind:value={password} type="password" name="password" id="password" min="8" class="bg-transparent text-lg p-1 border border-x-0 border-t-0 border-tertiary focus:outline-none focus:border-secondary">
    </div>
    <input on:click|preventDefault={submit} type="submit" value="Login" class="border border-primary hover:bg-primary hover:text-black py-2 cursor-pointer mt-4">
    <span class="text-md mt-6">Don't have an account? <a href="/register" class="text-primary">Sign in.</a></span>
  </form>
</div>