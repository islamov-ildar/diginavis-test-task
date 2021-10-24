<template>
	<div class="">
		<div class="top-toolbar edit-toolbar">
			<div class="top-toolbar-left">
				<router-link to="/">
					<Button icon="pi pi-arrow-left" class="p-button-rounded p-button-text" />
				</router-link>
				<div class="new-questionary-title">
					Редактирование анкеты
				</div>
			</div>
			<div class="top-toolbar-right">
				<Button label="Сохранить" id="save-btn" @click="update"/>
				<Button icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text" />
			</div>
		</div>
	<CreateQuestionary v-if="questionary" :questionary="questionary"/>
	</div>

</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQuestionary, updateQuestionary} from "@/firebase"
import CreateQuestionary from '../components/СreateQuestionary.vue'

export default {
	name: "EditQuestionary",
	components: {CreateQuestionary},
	setup() {
		const router = useRouter()
		const route = useRoute()
		const questionaryId = computed(() => route.params.id)

		const questionary = ref()
		onMounted(async () => {
			questionary.value = await getQuestionary(questionaryId.value)
		})

		const update = async () => {
			console.log(questionaryId.value);
			await updateQuestionary(questionaryId.value, {...questionary.value})
			await router.push('/')
		}

		return {
			questionary,
			update
		}
	}

}
</script>

<style scoped>
.top-toolbar-left {
	display: flex;
	align-items: center;
}
.new-questionary-title {
	font-weight: bold;
	font-size: 20px;
	margin-left: 25px;
}
.edit-toolbar {
	padding: 10px 60px 0 60px;
	margin: 10px 40px 0 40px;
}

</style>
