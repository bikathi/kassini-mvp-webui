import { reactive } from 'vue';
import { defineStore } from 'pinia';

const useActiveClientStore = defineStore('activeClientStore', () => {
	const clientDetails = reactive({});

	function setClientDetails(logginDetails) {
		clientDetails = logginDetails;
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
