<script lang="ts">
  import { onMount } from 'svelte';
  import Friend from '../../components/friend.svelte';
  import TextField from '../../components/textField.svelte';
  import { alertStore, authStore } from '../../libs/stores';
  import ModalContainer from '../../components/modalContainer.svelte';
  import { getFriendList, getFriendRequestList, acceptFriendRequest, sendFriendRequest, rejectFriendRequest } from '../../libs/api';

  const token = $authStore.jwt.token;

  let displaySendFriendRequestModal = 'hidden';
  let displayFriendRequestModal = 'hidden';

  let addFriendName: string = '';

  $: friends = [{ _id: '', username: '' }];
  let friendData = friends;
  $: friendRequests = [{ _id: '', username: '' }];

  const viewAddFriend = () => {
    displaySendFriendRequestModal = 'fixed';
  };
  
  const closeModal = () => {
    displaySendFriendRequestModal = 'hidden';
    displayFriendRequestModal = 'hidden';
  };

  const getFriends = async() => {
    await getFriendList(token)
    .then(({data}) => {
      if(data){
        friends = data.map((e) => {
          return {
            _id: e._id,
            username: e.username
          };
        });
        friendData = friends;
      }
    })
    .catch(({ error }) => {
      alertStore.set({ message: error, type: 'error' });
    });
  };

  onMount(async () => {
    await getFriends();
  });

  const viewFriendRequests = async () => {
    await getFriendRequestList(token)
    .then(({data}) => {
      if(data){
        friendRequests = data.map((e) => {
          return {
            _id: e._id,
            username: e.username
          };
        });

        displayFriendRequestModal = 'fixed';
      }
    })
    .catch(({ error }) => {
      alertStore.set({ message: error, type: 'error' });
    });
  };

  const addFriend = async () => {
    await sendFriendRequest(token, addFriendName)
    .then(({message}) => {
      alertStore.set({ message: message, type: 'info' });
    })
    .catch(({ error }) => {
      alertStore.set({ message: error, type: 'error' });
    });
  };

  const aproveFriendRequest = async (friendId: string) => {
    await acceptFriendRequest(token, friendId)
    .then(async ({message}) => {
      friendRequests.filter((e) => {return e._id !== friendId});
      await viewFriendRequests();
      await getFriends();
      alertStore.set({ message: message, type: 'info' });
    })
    .catch(({ error }) => {
      alertStore.set({ message: error, type: 'error' });
    });
  };

  const removeFriendRequest = async (friendId: string) => {
    await rejectFriendRequest(token, friendId)
    .then(async ({message}) => {
      friendRequests.filter((e) => {return e._id !== friendId});
      await getFriends();
      alertStore.set({ message: message, type: 'info' });
    })
    .catch(({ error }) => {
      alertStore.set({ message: error, type: 'error' });
    });
  };

  const searchFilter = (search: string) => {
    if(search === '') friends = friendData;
    else friends = friendData.filter((e) => { return e.username.includes(search) });
  };
</script>

<ModalContainer display={displaySendFriendRequestModal}>
  <div class="bg-bg p-7 flex flex-col space-y-5 text-lg">
    <TextField placeholder="Friend name" bind:value={addFriendName} />
    <button on:click={addFriend} class="border border-primary rounded-md py-2 hover:bg-primary hover:text-black">
      Add friend
      </button>
    <button on:click={closeModal} class="border border-secondary rounded-md py-2 hover:bg-secondary hover:text-black">
      Close
    </button>
  </div>
</ModalContainer>

<ModalContainer display={displayFriendRequestModal}>
  <div class="bg-bg p-7 flex flex-col space-y-5 text-lg">
    {#if friendRequests.length > 0}
      {#each friendRequests as friendRequest}
        <div class="border border-primary text-lg text-primary rounded-md py-2 px-5 space-x-2 flex items-center">
          <span class="mr-5">{friendRequest.username}</span>
          <button on:click={() => aproveFriendRequest(friendRequest._id)} class="text-3xl">
            ✅
          </button>
          <button on:click={() => removeFriendRequest(friendRequest._id)} class="text-3xl">
            ❌
          </button>
        </div>
      {/each}
    {:else}
        <span>No friend requests</span>
    {/if}

    <button on:click={closeModal} class="border border-secondary rounded-md py-2 hover:bg-secondary hover:text-black">
      Close
    </button>
  </div>
</ModalContainer>

<div class="flex flex-col justify-center items-center">
  <TextField placeholder="🔎 Search..." onInput={searchFilter} />
  <div class="flex space-x-5 mt-8">
    <button on:click={viewAddFriend} class="border border-primary rounded-md py-3 px-3 hover:text-black hover:bg-primary cursor-pointer">
      ➕ Add friend</button>
    <button on:click={viewFriendRequests} class="border border-secondary rounded-md py-3 px-3 hover:text-black hover:bg-secondary cursor-pointer">
      🔔 Friend Requests
    </button>
  </div>
  <div class="overflow-y-auto scroll-smooth scrollbar mt-6 w-96 flex flex-col space-y-5 p-5 h-112">
    {#if friends.length > 0}
      {#each friends as friend}
        <Friend username={friend.username} link={`/friends/${friend._id}`} />
      {/each}
    {:else}
      <span class="text-center text-lg text-secondary">No friends found.</span>
    {/if}
  </div>
</div>
