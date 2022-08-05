<script lang="ts">
  import { alertStore, authStore } from '../../../libs/stores';
  import ChatMessage from '../../../components/chatMessage.svelte';
  import { onMount } from 'svelte';
  import { io, Socket } from 'socket.io-client';
  import { page } from '$app/stores'
  import { getMessages } from '../../../libs/api';
  import { afterUpdate, beforeUpdate } from 'svelte';

  const friendId = $page.params['id'];
  const friendUsername = $page.params['username'];
  let socket: Socket;
  let newMessage: string;
  let div: HTMLElement;
  let autoscroll: boolean;

  $: messages = [{senderId: '', receiverId: '', text: '', createdAt: ''}] 

  onMount(async () => {
    await getMessages($authStore.jwt.token, friendId)
    .then(({data}) => {
      if(data){
        messages = data;
      }
    })
    .catch(({error}) => {
      alertStore.set({message: error, type: 'error'});
    });
    socket = io('ws://localhost:3000', {
      query: {
        token: `Bearer ${$authStore.jwt.token}`
      }
    });

    socket.emit('connect_room', {
      userId: $authStore.user._id,
      friendId
    });

    socket.on('message_sent', ({data}) => {
      messages = [...messages, data];
    });
  });

  const sendMessage = () => {
    if(newMessage === '') return;
    socket.emit('send_message',{ text: newMessage, friendId });
    newMessage = '';
  };

  beforeUpdate(() => {
    autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });
</script>

<div class="flex justify-center items-center">
  <div class="mt-10 border border-tertiary rounded-md p-5 w-11/12 sm:w-9/12 lg:w-3/5 xl:w-1/2">
    <span class="text-primary text-lg">{friendUsername}</span>
    <div bind:this={div} class="h-112 my-4 border-y-2 border-secondary overflow-y-auto scroll-smooth scrollbar space-y-2 py-4 flex flex-col px-3">
      {#if messages[0].text !== ''}
        {#each messages as message}
            <ChatMessage text={message.text} senderId={message.senderId} time={message.createdAt}/>
        {/each}
      {/if}
    </div>
    <div class="flex space-x-2">
      <input bind:value={newMessage} class="bg-transparent border w-full focus:outline-primary p-2 border-tertiary" type="text">
      <button on:click={sendMessage} class="p-3 border border-primary hover:bg-primary hover:text-black">Send</button>
    </div>
  </div>
</div>