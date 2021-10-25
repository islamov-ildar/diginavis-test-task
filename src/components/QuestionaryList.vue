<template>
	<Header />
	<div class="main-wrapper">
	<LeftBarAndWrapper />
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

	<div class="card-wrapper" v-if="questionnaires">
		<div class="card" v-for="oneQuestionary in questionnaires" :key="oneQuestionary.id"
		:class="{sampleCardBackGround: oneQuestionary.isBlocked}">
			<div class="card-left">
				<div class="card-header"> {{ oneQuestionary.questionaryName }} </div>
				<div v-if="!oneQuestionary.isBlocked" class="card-description"> {{ oneQuestionary.dateOfCreate }} </div>
				<div v-if="oneQuestionary.isBlocked" class="card-description"> {{ oneQuestionary.isSampleText }} </div>
			</div>
			<div class="card-right">
				<Button icon="pi pi-copy" class="p-button-rounded p-button-text card-right-ico" @click="copyQuestionary(oneQuestionary)"/>
				<router-link :to="`/editQuestionary/${oneQuestionary.id}`">
					<Button v-if="!oneQuestionary.isBlocked" icon="pi pi-pencil" class="p-button-rounded p-button-warning p-button-text card-right-ico" />
				</router-link>
				<Button v-if="!oneQuestionary.isBlocked" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text card-right-ico" @click="deleteQuestionary(oneQuestionary.id)"/>
			</div>
		</div>
	</div>
	<router-view />
	</div>
	</div>
</template>

<script>
import {createQuestionary, useLoadQuestionnaires} from "@/firebase";
import {deleteQuestionary} from "@/firebase";
import Header from "@/components/partials/Header";
import LeftBarAndWrapper from "@/components/partials/LeftBarAndWrapper";

export default {
	components: {Header, LeftBarAndWrapper},
	setup() {
		let questionnaires = useLoadQuestionnaires()

		function copyQuestionary(questionary) {
			let tempQuestionary = {...questionary}
			delete tempQuestionary.id
			tempQuestionary.isBlocked = false
			tempQuestionary.questionaryName = `${tempQuestionary.questionaryName} - копия`
			createQuestionary({...tempQuestionary})
		}
		return {
			questionnaires,
			deleteQuestionary,
			copyQuestionary
		}
	}
}
</script>

<style scoped>
.sampleCardBackGround {
	background: rgba(104, 125, 141, 0.1);
}

</style>
