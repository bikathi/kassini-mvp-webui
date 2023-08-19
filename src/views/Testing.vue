<script setup>
	import { ref } from 'vue';
	import { createAvatar } from '@dicebear/core';
	import { croodles } from '@dicebear/collection';
	import { Icon } from '@iconify/vue';

	const avatar = createAvatar(croodles, {
		size: 128,
		seed: 'Solomon Kane',
		// ... other options
	}).toDataUriSync();

	const loading = ref(false);
	function buttonLoading() {
		loading.value = true;
		setTimeout(() => {
			loading.value = false;
		}, 5000);
	}
</script>

<template>
	<div class="w-full h-screen flex justify-center">
		<div class="w-full md:w-[45%] min-h-screen h-fit p-1 md:p-3">
			<h1>Youtube icon:</h1>
			<Icon icon="mdi:youtube" />
			<div
				class="bg-base-200 rounded-md py-2 px-3 mb-2 w-full"
				v-for="a in 5">
				<div class="flex space-x-2">
					<img
						:src="avatar"
						alt="Avatar"
						class="w-12 h-12 border-[0.5px] rounded-full" />
					<div>
						<h1>Bikathi Martin @test_name</h1>
						<h2>December 21st 2023</h2>
					</div>
				</div>
				<div class="relative space-y-1">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequuntur corporis
						delectus doloremque dolorum eos expedita facere fugit harum impedit ipsam itaque laudantium
						maiores maxime minima molestiae natus nihil nobis odit officia optio perferendis placeat quaerat
						quasi quidem quo quos repellendus repudiandae saepe sequi sint soluta sunt tempora tempore
						tenetur totam unde ut voluptates voluptatum voluptatibus voluptatum.
					</p>
					<div class="h-96 w-full">
						<img
							src="/tobedeleted/cat_1.jpg"
							alt="post-images"
							class="max-w-full w-full h-full object-cover rounded-md" />
					</div>
					<button class="dui-btn dui-btn-outline dui-btn-sm rounded-full absolute bottom-2 right-2">
						+ 5 more
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
