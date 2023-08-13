<script setup>
	import { ref } from 'vue';

	const openNotification = ref(false);
	const notificationMessage = ref('');
	function displayNotification(data) {
		notificationMessage.value = data;
		openNotification.value = true;

		setTimeout(() => {
			openNotification.value = false;
		}, 5000);
	}
</script>

<template>
	<div
		class="fixed bg-transparent flex justify-center items-center p-1 top-0 w-screen"
		v-auto-animate="{ duration: 300 }">
		<BannerNotification
			v-if="openNotification"
			:message="notificationMessage" />
	</div>
	<router-view @displayNotification="displayNotification"></router-view>
</template>
