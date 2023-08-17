import { ref } from 'vue';
import { defineStore } from 'pinia';

const useActiveClientStore = defineStore('activeClientStore', () => {
	const clientDetails = ref({});

	function setClientDetails(logginDetails) {
		clientDetails.value = logginDetails;
	}

	function logoutClient() {
		clientDetails.value = {};
	}

	return {
		clientDetails,
		setClientDetails,
		logoutClient,
	};
});

export default useActiveClientStore;
