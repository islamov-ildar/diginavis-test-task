<template>
	<div class="card card-body mt-4">
		<form @submit.prevent="onSubmit">

			<div class="form-group">
				<label>Название анкеты</label>
				<input v-model="form.name" class="form-control" required>
			</div>

			<div class="form-group mt-3">
				<label>Email поставщика</label>
				<input v-model="form.email" class="form-control" type="email" required>
			</div>

			<button type="submit" class="btn btn-success mt-3">
				Создать анкету
			</button>
			<router-link to="/">
					<button class="btn btn-secondary mt-3">
						Отмена
					</button>
			</router-link>
		</form>
	</div>
</template>

<script>
import { createQuestionary } from "@/firebase";
import { reactive } from "vue";
import { useRouter } from 'vue-router'


export default {
	name: "СreateQuestionary",
	setup() {
		const form = reactive({name: '', email: ''})
		const router = useRouter()

		const onSubmit = async () => {
			await createQuestionary({...form})
			await router.push('/')
			form.name = ''
			form.email = ''
		}

		return {
			form,
			onSubmit
		}
	}
}
</script>

<style scoped>

</style>
