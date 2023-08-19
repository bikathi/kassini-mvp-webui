<script setup>
	import SockJS from 'sockjs-client/dist/sockjs';
	import Stomp from 'webstomp-client';
	import { ref, onMounted } from 'vue';
	import useActiveClientStore from '../stores/active-client.js';
	import { storeToRefs } from 'pinia';

	const socket = ref({});
	const stompClient = ref({});
	const activeClientStore = useActiveClientStore();
	const { setJWTInSessionStorage } = activeClientStore;
	const { userID } = storeToRefs(activeClientStore);

	async function setupWSConnection() {
		socket.value = new SockJS('http://localhost:9101/ws-registry');
		stompClient.value = Stomp.over(socket);

		stompClient.value.connect(
			{
				Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
			},
			(frame) => {
				stompClient.value.subscribe(`/queue/user-${userID.value}`, (message) => {
					console.log(`Received message: ${message}`);
				});
			},
			(error) => {
				console.log(`An error occured: ${error}`);
				// wait a couple of seconds then retry the request recurssion
				setTimeout(async () => {
					await setupWSConnection();
				}, 4000);
				stompClient.value.subscribe(`/queue/user-${userID.value}`, (message) => {
					console.log(`Received message from: ${message.body}`);
					receivedMessages.value.push(JSON.parse(message.body));
				});
			},
		);
	}

	// TODO: Get this initialization out of the on-mounted lifecycle to take TRUE <Suspense> usage
	onMounted(async () => {
		// move JWT into session storage
		await setJWTInSessionStorage().then(async () => {
			// connect to websocket
			await setupWSConnection();
		});
	});
</script>
