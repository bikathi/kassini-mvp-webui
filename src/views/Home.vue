<script setup>
	import { ref } from 'vue';
	const items = ref(['😏', '😐', '😑', '😒', '😕']);
	function removeItem(toRemove) {
		items.value = items.value.filter((item) => item !== toRemove);
	}

	function addItem() {
		items.value.push('🤣');
	}
</script>

<template>
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
