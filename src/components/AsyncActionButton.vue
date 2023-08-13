<script setup>
	import { ref } from 'vue';
	const componentProps = defineProps({
		text: {
			type: String,
			required: true,
			default: 'Click Me',
		},
		loading: {
			type: Boolean,
			required: true,
			default: false,
		},
		buttonType: {
			type: String,
			required: false,
			default: null,
		},
	});
	const loading = ref(componentProps.loading);
</script>

<template>
	<button
		class="btn w-full"
		:type="buttonType"
		:class="
			loading
				? ['btn-circle transition-all duration-300 ease-in']
				: ['w-fit rounded-md transition-all duration-300 ease-linear']
		">
		<span v-if="!loading">{{ text }}</span>
		<span
			v-else
			class="loading loading-spinner loading-sm"></span>
	</button>
</template>
