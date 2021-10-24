<template>
	<div class="container">
	<div class="top-toolbar">
		<span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText type="text" placeholder="Поиск" />
		</span>
		<router-link :to="{name: 'createQuestionary'}" id="add-new-btn">
			<Button label="Новая анкета" icon="pi pi-plus-circle" />
		</router-link>
	</div>
	<div class="card-wrapper">
		<div class="card">
			<div class="card-left">
				<div class="card-header">Анкета для тендера по металлопрокат</div>
				<div class="card-description">11.04.2020</div>
			</div>
			<div class="card-right">
				<Button icon="pi pi-copy" class="p-button-rounded p-button-text card-right-ico" />
				<Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text card-right-ico" />
				<Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text card-right-ico" />
			</div>
		</div>
	</div>

	<div class="card-wrapper">
		<div class="card" v-for="{id, dateOfCreate, questionaryName} in questionnaires" :key="id">
			<div class="card-left">
				<div class="card-header"> {{ questionaryName }} </div>
				<div class="card-description"> {{ dateOfCreate }} </div>
			</div>
			<div class="card-right">
				<Button icon="pi pi-copy" class="p-button-rounded p-button-text card-right-ico" />
				<router-link :to="`/editQuestionary/${id}`">
					<Button icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text card-right-ico" />
				</router-link>
				<Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text card-right-ico" @click="deleteQuestionary(id)"/>
			</div>
		</div>
	</div>
	<router-view />
	</div>

<!--	<div class="card mt-4">-->
<!--		<table class="table m-0">-->
<!--			<thead>-->
<!--			<tr>-->
<!--				<th scope="col">Name</th>-->
<!--				<th scope="col">Email</th>-->
<!--				<th scope="col">Action</th>-->
<!--			</tr>-->
<!--			</thead>-->
<!--			<tbody>-->
<!--			<tr v-for="{id, name, email} in questionnaires" :key="id">-->
<!--				<td>{{ name }}</td>-->
<!--				<td>{{ email }}</td>-->
<!--				<td>-->
<!--					<router-link :to="`/editQuestionary/${id}`">-->
<!--						<button class="btn btn-primary btn-sm me-2">-->
<!--							Edit-->
<!--						</button>-->
<!--					</router-link>-->
<!--					<button class="btn btn-danger btn-sm" @click="deleteQuestionary(id)">-->
<!--						Delete-->
<!--					</button>-->
<!--				</td>-->
<!--			</tr>-->
<!--			</tbody>-->
<!--		</table>-->
<!--	</div>-->
</template>

<script>
import { useLoadQuestionnaires } from "@/firebase";
import {deleteQuestionary} from "@/firebase";
export default {
	setup() {
		const questionnaires = useLoadQuestionnaires()

		return {
			questionnaires,
			deleteQuestionary
		}
	}
}
</script>

<style scoped>


</style>
