<script setup>
	import { computed, reactive, ref } from 'vue';
	import countiesAndConstituencies from '../data/county-info.js';
	import { computedAsync } from '@vueuse/core';
	import { ofetch } from 'ofetch';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const signupInformation = reactive({
		firstName: '',
		lastName: '',
		bioName: '@',
		email: '',
		password: '',
		phoneNumber: '',
		location: {
			county: '',
			constituency: '',
		},
		roles: ['buyer'],
	});
	const counties = computed(() => {
		let names = [];
		countiesAndConstituencies.forEach((county) => names.push(county.name));

		return names;
	});
	const constituenciesToList = computedAsync(async () => {
		if (signupInformation.location.county !== '') {
			return countiesAndConstituencies.find(
				(county) => county.name === signupInformation.location.county,
			).constituencies;
		}
	});
	const roleSellerSelected = ref(false);
	const signupLoading = ref(false);
	const componentEmits = defineEmits(['displayNotification']);

	const signup = async () => {
		signupLoading.value = true;
		await ofetch('http://localhost:9101/api/v1/auth/signup', {
			method: 'POST',
			body: JSON.stringify(signupInformation),
		})
			.then((response) => {
				componentEmits('displayNotification', response.message);
				router.push({ name: 'Login' });
			})
			.catch((err) =>
				componentEmits('displayNotification', err.data.message),
			);
		signupLoading.value = false;
	};
</script>

<template>
	<main class="h-screen w-full flex">
		<div class="flex-grow flex flex-col justify-center items-center">
			<h1>Account Creation</h1>
			<h2>To Get Started, Create an Account</h2>
			<form
				@submit.prevent="signup"
				class="flex flex-col space-y-3 w-full p-2 md:w-[65%]">
				<div class="flex space-x-3 w-full">
					<input
						type="text"
						placeholder="First Name"
						class="input-boxes w-1/2"
						v-model="signupInformation.firstName"
						required />
					<input
						type="text"
						placeholder="Last Name"
						class="input-boxes w-1/2"
						v-model="signupInformation.lastName"
						required />
				</div>
				<input
					type="text"
					placeholder="Bio Name"
					v-model="signupInformation.bioName"
					class="input-boxes"
					required />
				<input
					type="email"
					placeholder="Email Address"
					v-model="signupInformation.email"
					class="input-boxes"
					required />
				<input
					type="password"
					placeholder="Password"
					v-model="signupInformation.password"
					class="input-boxes"
					required />
				<input
					type="tel"
					placeholder="Phone Number"
					class="input-boxes"
					v-model="signupInformation.phoneNumber"
					required />
				<div class="flex space-x-3 w-full">
					<select
						class="select select-bordered w-1/2 input-boxes outline-none"
						v-model="signupInformation.location.county">
						<option
							disabled
							selected>
							Choose Your County?
						</option>
						<option
							v-for="(county, index) in counties"
							:key="index"
							class="bg-red-500">
							{{ county }}
						</option>
					</select>
					<select
						class="select select-bordered w-1/2 input-boxes outline-none"
						v-model="signupInformation.location.constituency">
						<option
							disabled
							selected>
							Choose Your Constituency?
						</option>
						<option
							v-for="(
								constituency, index
							) in constituenciesToList"
							:key="index"
							class="bg-red-500">
							{{ constituency }}
						</option>
					</select>
				</div>
				<div>
					<h1 class="w-full text-start">Signing Up As</h1>
					<div class="flex justify-around">
						<div
							v-for="(img, index) in [
								'/buyer-pic.svg',
								'/seller-pic.svg',
							]"
							:key="index"
							class="rounded-xl m-1 p-2 cursor-pointer text-center"
							:class="
								roleSellerSelected && index === 1
									? 'bg-red-500 border-primary-focus'
									: 'border border-primary-focus'
							"
							@click="
								() => {
									addSellerRole = () => {
										signupInformation.roles.push('seller');
										roleSellerSelected = true;
									};

									removeSellerRole = () => {
										signupInformation.roles.pop();
										roleSellerSelected = false;
									};
									if (index === 1) {
										signupInformation.roles.length === 1
											? addSellerRole()
											: removeSellerRole();
									}
								}
							">
							<img
								:src="img"
								alt="role-pic"
								class="h-20 md:h-28" />
							{{ index === 1 ? 'Seller' : 'Buyer' }}
						</div>
					</div>
				</div>
				<div class="flex">
					<AsyncActionButton
						text="Create Account"
						:loading="signupLoading"
						buttonType="submit" />
				</div>
			</form>
		</div>
	</main>
</template>
