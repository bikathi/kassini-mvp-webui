<script setup>
	import SockJS from 'sockjs-client/dist/sockjs';
	import Stomp from 'webstomp-client';
	import { provide, reactive } from 'vue';
	import useActiveClientStore from '../stores/active-client.js';

	const socket = reactive({});
	const stompClient = reactive({});
	const activeClientStore = useActiveClientStore();
	const { setJWTInSessionStorage } = activeClientStore;
	const { userID } = storeToRefs(activeClientStore);

	async function setupWSConnection() {
		socket = new SockJS('http://localhost:9101/ws-registry');
		stompClient = Stomp.over(socket);

		stompClient.connect(
			(frame) => {
				console.log('Connect Frame: ' + frame);
				stompClient.subscribe(`/user/queue/user-${userId}`, (message) => {
					receivedMessages.value.push(JSON.parse(message.body));
				});
			},
			(error) => {
				console.log(`An error occured: ${error}`);
				stompClient.subscribe(`/queue/user-${userID}`, (message) => {
					console.log(`Received message from: ${message.body}`);
					receivedMessages.value.push(JSON.parse(message.body));
				});
			},
		);
	}

	// setup where the api token is going to be kept- session storage
	await setJWTInSessionStorage().then(async () => {
		// setup web-socket connection then 'provide' the socket for any child route to inject into itself
		await setupWSConnection();
	});
</script>

<template>
	
</template>
