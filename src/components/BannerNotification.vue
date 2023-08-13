<script setup>
	const componentProps = defineProps({
		message: {
			type: String,
			required: true,
			default: 'Sample Message',
		},
	});
</script>

<template>
	<div class="alert alert-info w-fit text-center">
		<h1>{{ message }}</h1>
	</div>
</template>
