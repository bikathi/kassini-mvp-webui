<script setup>
	import { Icon } from '@iconify/vue';
	import { useRoute } from 'vue-router';
	import { computedAsync } from '@vueuse/core';

	const inAppPages = [
		{ text: 'Posts', icon: 'system-uicons:home-alt', to: 'Posts' },
		{
			text: 'Subscriptions',
			icon: 'system-uicons:users',
			to: 'Subscriptions',
		},
		{
			text: 'Accounting',
			icon: 'system-uicons:coins',
			to: 'Accounting',
		},
		{
			text: 'Chats',
			icon: 'system-uicons:thread',
			to: 'Messages',
		},
	];
	const route = useRoute();
	const activePageName = computedAsync(async () => {
		return route.name;
	});
</script>

<template>
	<main class="h-screen flex justify-center">
		<div class="h-screen w-full lg:w-[55%] flex flex-col">
			<div class="h-[12%]">
				<div class="flex justify-between py-1">
					<h1 class="text-3xl tracking-wide font-inter">
						{{ activePageName }}
					</h1>
					<div class="dropdown dropdown-left">
						<label
							tabindex="0"
							class="btn btn-circle">
							<Icon
								icon="system-uicons:menu-horizontal"
								width="25" />
						</label>
						<ul
							tabindex="0"
							class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-200/50">
							<li>
								<router-link :to="{ name: 'Login' }"
									>Logout</router-link
								>
							</li>
							<li>
								<router-link :to="{ name: 'Settings' }"
									>Settings</router-link
								>
							</li>
						</ul>
					</div>
				</div>
				<div class="flex justify-around">
					<router-link
						v-for="(page, index) in inAppPages"
						:key="index"
						:to="{ name: page.to }"
						class="inline-flex flex-col items-center w-full"
						:class="route.name === page.to ? 'border-b-2' : ''">
						<Icon
							:icon="page.icon"
							width="25" />
						{{ page.text }}
					</router-link>
				</div>
			</div>
			<div class="flex-grow">
				<!-- the dashboard views go here -->
				<router-view></router-view>
			</div>
		</div>
	</main>
</template>
