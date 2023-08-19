import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

const useActiveClientStore = defineStore('activeClientStore', () => {
	const clientDetails = useStorage('clientDetails', ref({}), localStorage);

	function setClientDetails(logginDetails) {
		clientDetails.value = logginDetails;
	}

	async function setJWTInSessionStorage() {
		const jwtToken = useStorage('authToken', clientDetails.value.authToken, sessionStorage);

		// remove it from the local storage
		clientDetails.value.authToken = null;
	}

	function logoutClient() {
		clientDetails.value = {};
	}

	const clientRoles = computed(() => clientDetails.value.roles);
	const userID = computed(() => clientDetails.value.userId);

	return {
		clientDetails,
		setClientDetails,
		logoutClient,
		clientRoles,
		setJWTInSessionStorage,
		userID,
	};
});

export default useActiveClientStore;
