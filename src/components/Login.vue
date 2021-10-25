<template>
	<div class="login-wrapper">
		<div class="p-fluid form-wrapper">
			<span class="form-wrapper-title">Войти</span>
			<div class="p-field">
				<InputText
						id="firstname"
						v-model="data.email"
						type="text"
						placeholder="Логин"
				/>
				<span class="focus-input" />
			</div>
			<div class="p-field">
				<InputText
						id="lastname"
						v-model="data.password"
						type="password"
						placeholder="Пароль"
				/>
				<span class="focus-input" />
			</div>
			<Button
					label="ВОЙТИ"
					class="p-button-raised"
					@click="sendData"
			/>
		</div>
	</div>
</template>

<script>
import {reactive} from "vue";
// import * as firebase from "firebase/compat";
import firebase from "firebase/compat";
import 'firebase/auth';
import {useRouter} from "vue-router";

export default {
	name: "Login",
	setup() {
		const router = useRouter()
		const data = reactive({
			email: '',
			password: ''
		})

		async function sendData() {
			try {
				const val = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
				console.log(val);
				await router.push('/questionaryList')
			} catch (err) {
				console.log(err)
			}

		}

		return {
			sendData,
			data
		}
	}
}
</script>

<style scoped>
.form-wrapper {
	width: 325px;
	margin-top: -80px;
}

.form-wrapper-title {
	font-size: 30px;
	line-height: 1.2;
	text-align: center;
	width: 100%;
	display: block;
	margin-bottom: 0.5rem;
}

.p-field {
	margin-bottom: 0.5rem;
}

.login-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

body {
	margin: 0;
	line-height: 1.5;
	-webkit-text-size-adjust: 100%;
	-webkit-tap-highlight-color: transparent;
	font-weight: 300;
	font-size: 14px;
}

</style>
