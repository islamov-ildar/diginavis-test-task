<template>
			<router-link :to="{name: 'createQuestionary'}">
				<button class="btn btn-primary btn-sm me-2">
					Создать новую анкету
				</button>
		</router-link>

<div class="card mt-4">
	<table class="table m-0">
		<thead>
			<tr>
				<th scope="col">Name</th>
				<th scope="col">Email</th>
				<th scope="col">Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="{id, name, email} in questionnaires" :key="id">
				<td>{{ name }}</td>
				<td>{{ email }}</td>
				<td>
					<router-link :to="`/editQuestionary/${id}`">
						<button class="btn btn-primary btn-sm me-2">
							Edit
						</button>
					</router-link>
					<button class="btn btn-danger btn-sm" @click="deleteQuestionary(id)">
						Delete
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>
<router-view />

</template>

<script>
import { useLoadQuestionnaires } from "@/firebase";
// import { useLoadQuestionnaires, deleteQuestionary } from "@/firebase";
// import { useRouter } from 'vue-router'
export default {
// 	name: "QuestionaryList",
	setup() {
		const questionnaires = useLoadQuestionnaires()
		console.log(questionnaires);
// 		const router = useRouter()
//
		return {
			questionnaires,
// 			deleteQuestionary
		}
	}
}
</script>

<style scoped>

</style>
