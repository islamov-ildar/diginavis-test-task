<template>
	<div class="card card-body mt-4">
		<h1>Ректирование анкеты поставщика</h1>
		<form @submit.prevent="update">

			<div class="form-group">
				<label>Название анкеты</label>
				<input v-model="form.name" class="form-control" required />
			</div>

			<div class="form-group mt-3">
				<label>Email поставщика</label>
				<input v-model="form.email" class="form-control" type="email" required />
			</div>

			<button type="submit" class="btn btn-primary mt-3">
				Сохранить анкету
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
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQuestionary, updateQuestionary} from "@/firebase"

export default {
	name: "EditQuestionary",
	setup() {
		const router = useRouter()
		const route = useRoute()
		const questionaryId = computed(() => route.params.id)

		const form = reactive({name: '', email: ''})

		onMounted(async () => {
			const questionary = await getQuestionary(questionaryId.value)
			form.name = questionary.name
			form.email = questionary.email
		})

		const update = async () => {
			console.log(questionaryId.value);
			await updateQuestionary(questionaryId.value, {...form})
			await router.push('/')
			form.name = ''
			form.email = ''
		}

		return {
			form,
			update
		}
	}

}
</script>

<style scoped>

</style>
