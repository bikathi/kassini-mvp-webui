<script setup>
	import { ref } from 'vue';
	import { createAvatar } from '@dicebear/core';
	import { croodles } from '@dicebear/collection';
	const items = ref(['😏', '😐', '😑', '😒', '😕']);
	const avatar = createAvatar(croodles, {
		size: 128,
		seed: 'Solomon Kane',
		// ... other options
	}).toDataUriSync();
	function removeItem(toRemove) {
		items.value = items.value.filter((item) => item !== toRemove);
	}

	function addItem() {
		items.value.push('🤣');
	}
</script>

<template>
	<h1>Dicebear avatars</h1>
	<img
		:src="avatar"
		alt="Avatar" />
	<h5>Click emojis to remove them.</h5>
	<ul v-auto-animate="{ duration: 500 }">
		<li
			v-for="item in items"
			:key="item"
			@click="removeItem(item)">
			{{ item }}
		</li>
	</ul>
	<button
		class="dui-btn"
		@click="addItem()">
		Add item to list
	</button>
</template>
Vue
