<script setup>
	import { Icon } from '@iconify/vue';
	import { createAvatar } from '@dicebear/core';
	import { micah } from '@dicebear/collection';
	import { Carousel, Navigation, Slide } from 'vue3-carousel';
	import 'vue3-carousel/dist/carousel.css';
	const componentProps = defineProps({
		username: {
			default: 'John Doe',
			type: String,
			required: true,
		},
		bioname: {
			default: '@johny_doeny',
			type: String,
			required: true,
		},
		productDetails: {
			default:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia nihil adipisci a, inventore similique eius, fugiat earum provident, aperiam praesentium error dolore saepe dolor asperiores officiis soluta nisi ipsam nemo.',
			type: String,
			required: true,
		},
		productCost: {
			default: 2000,
			type: Number,
			required: true,
		},
		engagementCount: {
			default: 2,
			type: Number,
			required: true,
		},
		dateOfPost: {
			default: '06/08/2023 10:08AM',
			type: String,
			required: true,
		},
		postImages: {
			type: Array,
			required: false,
			default: [
				'/tobedeleted/cat_1.jpg',
				'/tobedeleted/cat_2.jpg',
				'/tobedeleted/cat_3.jpg',
				'/tobedeleted/cat_4.jpg',
				'/tobedeleted/cat_5.jpg',
			],
		},
	});

	const avatar = createAvatar(micah, {
		size: 100,
		seed: componentProps.username,
		// ... other options
	}).toDataUriSync();
</script>

<template>
	<div class="border rounded-md p-2 w-3/4 max-w-[75%]">
		<div class="flex space-x-2 items-center">
			<!-- The poster's profile picture -->
			<div class="w-14 flex justify-center items-center h-14 border-2 rounded-full">
				<img
					:src="avatar"
					alt="Avatar"
					class="w-10" />
			</div>
			<!-- The post creator's detail -->
			<div class="flex flex-col">
				<span>{{ username }}</span>
				<span>{{ bioname }}</span>
			</div>
		</div>
		<!-- The post itself -->
		<div>
			{{ productDetails }}
		</div>
		<div>
			<Carousel
				:items-to-show="2.5"
				:wrap-around="true">
				<Slide
					v-for="(img, index) in postImages"
					:key="index">
					<img
						:src="img"
						alt="post-image"
						class="object-cover rounded-lg w-96 h-52" />
				</Slide>
				<template #addons>
					<Navigation />
				</template>
			</Carousel>
		</div>
		<!-- date of the post -->
		<div class="flex justify-end">
			<span>{{ dateOfPost }}</span>
		</div>
		<div class="flex items-center justify-center space-x-4">
			<!-- TODO: In the future, other actions and stats will be shown here -->
			<!-- Cost of the posted product -->
			<span class="inline-flex items-center">
				<Icon
					icon="system-uicons:coins"
					width="20"
					class="mr-1" />
				{{ productCost }}Ksh
			</span>
			<!-- The number of engagement(determined by how many people have chat the seller on this product) -->
			<span class="inline-flex items-center">
				<Icon
					icon="system-uicons:mail-add"
					width="20"
					class="mr-1" />
				{{ engagementCount }}
			</span>
			<!-- <button class="btn btn-sm btn-circle self-end">
				<Icon
					icon="system-uicons:chevron-down"
					width="25"
					class="mr-1" />
			</button> -->
		</div>
	</div>
</template>

<style>
	.carousel__slide {
		padding: 3px;
	}

	.carousel__prev,
	.carousel__next {
		box-sizing: content-box;
		border: 2px solid white;
		background-color: wheat;
		border-radius: 999px;
	}
</style>
