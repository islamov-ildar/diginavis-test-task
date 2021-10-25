<template>
	<header>
		<div class="header-left">
			<img src="../../assets/reka_logo.svg" alt="logo">
		</div>
		<div class="header-right">
			<div class="lang-ico">
				<img src="../../assets/icons/lang.svg" alt="lang">
				<i class="pi pi-globe"></i>
			</div>
			<i class="pi pi-bell"></i>
			<i class="pi pi-user"></i>
			<Button label="Выход" class="p-button-sm p-button-danger" @click="signOut"/>
		</div>
	</header>
</template>

<script>
import firebase from "firebase/compat";
import 'firebase/auth';
import { useRouter } from "vue-router";

export default {
	name: "Header",
	setup() {
		const router = useRouter()
		async function signOut() {
			console.log('Выход из аккаунта')
			try {
				const data = await firebase.auth().signOut()
				await console.log(data)
				await router.push('/')
			} catch(err) {
				console.log(err)
			}
		}

		// const signOut = async () => {
		// 	await firebase.auth().signOut()
		// 	// await console.log(data)
		// 	await router.push('/')
		// }

		return {
			signOut
		}
	}
}
</script>

<style scoped>

</style>
