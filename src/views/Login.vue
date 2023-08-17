<script setup>
	import { reactive, ref } from 'vue';
	import useActiveClientStore from '../stores/active-client.js';
	import { ofetch } from 'ofetch';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const signinInformation = reactive({
		email: '',
		password: '',
	});
	const signInLoading = ref(false);
	const componentEmits = defineEmits(['displayNotification']);

	const activeClientStore = useActiveClientStore();
	const { setClientDetails } = activeClientStore;

	const signin = async () => {
		signInLoading.value = true;

		const response = await ofetch('http://localhost:9101/api/v1/auth/signin', {
			method: 'POST',
			body: JSON.stringify(signinInformation),
			parseResponse: JSON.parse,
		}).catch((err) => componentEmits('displayNotification', err.data.data.message));
		if (response) {
			setClientDetails(response.data);
			router.push({ name: 'Posts' });
		}

		signInLoading.value = false;
	};
</script>

<template>
	<main class="h-screen w-full flex">
		<div class="flex-grow flex space-y-1 flex-col justify-center items-center">
			<h1 class="font-inter text-3xl">Account Login</h1>
			<h2 class="font-inter text-xl">Welcome Back. Kindly Login to Your Account</h2>
			<form
				@submit.prevent="signin"
				class="flex flex-col space-y-3 w-full p-2 md:w-[50%]">
				<input
					type="email"
					placeholder="Your account email"
					v-model="signinInformation.email"
					class="input-boxes"
					required />
				<input
					type="password"
					placeholder="Password"
					v-model="signinInformation.password"
					class="input-boxes"
					required />
				<!-- Figure out correct animation for this button -->
				<button
					class="btn w-full self-center"
					type="submit"
					:class="
						signInLoading
							? ['btn-circle transition-all duration-300 ease-in']
							: ['rounded-full transition-all duration-300 ease-linear']
					">
					<span v-if="!signInLoading">Sign In</span>
					<span
						v-else
						class="loading loading-spinner loading-md"></span>
				</button>
			</form>
		</div>
	</main>
</template>
