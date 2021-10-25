<template>
	<Header v-if="!questionary"/>
	<div class="main-wrapper">
	<LeftBarAndWrapper v-if="!questionary"/>
	<div class="container">
	<div v-if="!questionary" class="top-toolbar">
		<div class="top-toolbar-left">
			<router-link to="/questionaryList">
				<Button icon="pi pi-arrow-left" class="p-button-rounded p-button-text" />
			</router-link>
			<div class="new-questionary-title">
            Новая анкета поставщика
			</div>
		</div>
		<div class="top-toolbar-right">
			<Button label="Сохранить" @click="showObj(); onSubmit()" id="save-btn"/>
			<Button icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text" />
		</div>
	</div>
	<div class="card-wrapper">

		<div class="card" id="new-questionary-name">
			<InputText type="text" placeholder="Название анкеты" v-model="defaultObj.questionaryName" />
		</div>
		<div v-if="false" class="checkbox-wrapper">
			<Checkbox id="isSampleFieldCheckbox" v-model="defaultObj.isBlocked" :binary="true" />
			<label for="isSampleFieldCheckbox"> Создать стандартный шаблон из этой анкеты</label>
		</div>
		<div @drop="onDrop($event, oneSection.sectionId)" @dragover.prevent @dragenter.prevent class="card section" v-for="oneSection of defaultObj.sections" :key="oneSection.sectionId" >
			<div class="oneField">
			<div class="card-left">
				<div class="card-header">
					<InputText v-model="oneSection.sectionName" class="oneField-input" placeholder="Название раздела"/>
				</div>
			</div>
			<div class="card-right">
				<Button icon="pi pi-copy" class="p-button-rounded p-button-text card-right-ico" @click="copySection(oneSection)"/>
				<Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text card-right-ico" @click="deleteSection(oneSection.sectionId)"/>
			</div>
			</div>

			<div @dragstart="onDragStart($event, oneField)" draggable="true" class="oneField" v-for="oneField of oneSection.fields" :key="oneField.code">
				<div class="card-left">
					<i class="pi pi-info-circle"></i>
					<InputText v-model="oneField.name" class="oneField-input" placeholder="Название поля" @focus="inFocus(oneSection.sectionId, oneField)"/>
				</div>
				<div class="card-right">
					<Button v-if="oneField.required" icon="pi pi-circle-off" class="p-button-rounded p-button-text p-button-danger card-right-ico" />
					<Button v-else icon="pi pi-circle-off" class="p-button-rounded p-button-text card-right-ico" />
					<Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text card-right-ico" @click="deleteField(oneSection.sectionId, oneField.id)"/>
				</div>
			</div>
			<div class="card-section-bottom">
			<Button label="Добавить поле" icon="pi pi-plus-circle" @click="openModal(oneSection.sectionId); setNewFieldToDefault()"/>
			</div>
		</div>

		<div class="card section">
			<div class="add-new-section">
			<Button class="p-button-help" label="Добавить раздел" icon="pi pi-plus-circle" @click="addNewSection"/>
			</div>
		</div>
	</div>
	</div>

	<Dialog header="Редактирование поля" v-model:visible="displayModal" :style="{width: '55vw'}" :modal="true">
		<div class="modal-inputs-wrapper">
		<span class="p-float-label modal-input">
            <InputText id="newFieldName" type="text" v-model="newField.name" class="modal-inputs-wide" />
            <label for="newFieldName">Имя поля</label>
		</span>
		<div class="modal-inputs-center">
		<Dropdown v-model="newField.typeOfData" :options="typeOfData" optionLabel="name" optionValue="code" placeholder="Выберите тип поля" class="newFieldDropDown"/>
		<span class="p-float-label modal-input">
            <InputText id="newFieldCode" type="text" v-model="newField.code" class="modal-inputs-wide"/>
            <label for="newFieldCode">Код</label>
		</span>
		</div>
		<span class="p-float-label modal-input">
            <InputText id="newFieldDescription" type="text" v-model="newField.description" class="modal-inputs-wide" />
            <label for="newFieldDescription">Описание</label>
		</span>
		</div>
		<div class="checkbox-wrapper">
			<Checkbox id="requiredFieldCheckbox" v-model="newField.required" :binary="true" />
			<label for="requiredFieldCheckbox"> Обязательно поле</label>
		</div>
		<template #footer>
			<Button label="Отменить" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
			<Button label="Сохранить и применить" icon="pi pi-check" @click="closeModal(); addFieldToSection()" autofocus />
		</template>
	</Dialog>
	</div>
</template>

<script>
import { createQuestionary } from "@/firebase";
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'
import Header from "@/components/partials/Header";
import LeftBarAndWrapper from "@/components/partials/LeftBarAndWrapper";


export default {
	name: "СreateQuestionary",
	components: {Header, LeftBarAndWrapper},

	props: {
		questionary: {
			type: Object,
			require: false,
		}
	},
	setup(props) {
		const form = reactive({name: '', email: ''})
		const router = useRouter()

		const onSubmit = async () => {
			await createQuestionary({...defaultObj})
			await router.push('/questionaryList')
			form.name = ''
			form.email = ''
		}

		let defaultObj = reactive({
			questionaryName: '',
			dateOfCreate: new Date().toLocaleDateString(),
			sections: [],
			isBlocked: false,
			isSampleText: 'Стандартный шаблон'
		})

		if(props.questionary) {
			defaultObj = reactive(props.questionary)
		}

		const sectionIdForPasteNewField = ref(null)

		const displayModal = ref(false);

		const openModal = (id) => {
			sectionIdForPasteNewField.value = id
			displayModal.value = true;
		};
		const closeModal = () => {
			displayModal.value = false;
		}

		let newField = ref({
			name: '',
			typeOfData: '',
			code: '',
			description: '',
			required: true,
			id: '',
			idOfParentSection: null
		})

		function setNewFieldToDefault() {
			for(let oneProps in newField.value) {
				newField.value[oneProps] = '';
			}
			newField.value.required = true
		}

		const typeOfData = ref([
			{name: 'Текст', code: 'txt'},
			{name: 'Числа', code: 'num'},
			{name: 'Документ', code: 'doc'},
		]);

		function createId() {
			return Date.now()
		}

		function addFieldToSection() {
			let tempObj = {...newField.value}
			if (tempObj.id) {
				tempObj.idOfParentSection = sectionIdForPasteNewField.value;
				for (let oneSectionIdx in defaultObj.sections) {
					if (defaultObj.sections[oneSectionIdx].sectionId === sectionIdForPasteNewField.value) {
						defaultObj.sections[oneSectionIdx].fields[defaultObj.sections[oneSectionIdx].fields.findIndex(i => i.id === oneFieldForEditId.value)] = tempObj
					}
				}
			} else {
				tempObj.id = createId()
				tempObj.idOfParentSection = sectionIdForPasteNewField.value;
				for (let oneSectionIdx in defaultObj.sections) {
					if (defaultObj.sections[oneSectionIdx].sectionId === sectionIdForPasteNewField.value) {
						defaultObj.sections[oneSectionIdx].fields.push(tempObj)
					}
				}
			}
			setNewFieldToDefault()
			console.log(defaultObj.sections)
		}

		const defaultSection = reactive(
				{ sectionName: '',
					sectionId: null,
					fields: []
				})

		function addNewSection() {
			let tempObj = JSON.parse(JSON.stringify(defaultSection))
			tempObj.sectionId = createId()
			defaultObj.sections.push(tempObj)
		}

		function showObj() {
			console.log(defaultObj)
		}

		function deleteField(sectionId, fieldId) {
			for (let oneSection in defaultObj.sections) {
				if(defaultObj.sections[oneSection].sectionId === sectionId) {
					console.log(defaultObj.sections[oneSection].fields)
					defaultObj.sections[oneSection].fields = defaultObj.sections[oneSection].fields.filter(field => field.id !== fieldId)
				}
			}
		}

		function deleteSection(sectionId) {
			console.log(sectionId);
			for (let oneSection in defaultObj.sections) {
				if(defaultObj.sections[oneSection].sectionId === sectionId) {
					console.log(defaultObj.sections[oneSection])
					setTimeout(() =>{
						defaultObj.sections = defaultObj.sections.filter(section => section.sectionId !== sectionId)
					} , 100)
				}
			}
		}

		let oneFieldForEditId = ref(null)

		function inFocus(sectionId, oneField) {
			console.log('Focused!')
			oneFieldForEditId.value = oneField.id
			openModal(sectionId);
			newField.value = {...oneField}
			console.log(newField.value);
		}

		function copySection(oneSection) {
			let tempSection = JSON.parse(JSON.stringify(oneSection))
			console.log(tempSection.sectionId)
			tempSection.sectionName = `${tempSection.sectionName} - копия`
			tempSection.sectionId = createId()
			console.log(tempSection.sectionId)
			defaultObj.sections.push(tempSection)
			console.log(defaultObj.sections);
		}

		function onDragStart(e, item) {
			console.log(e, item)
			e.dataTransfer.dropEffect = 'move'
			e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.setData('itemId', item.id.toString())
		}

		function onDrop(e, newSectionId) {
			const itemId = parseInt(e.dataTransfer.getData('itemId'))
			let oldSectionId = null
			for(let oneSection in defaultObj.sections) {
				if(defaultObj.sections[oneSection].sectionId === newSectionId) {
					for(let oneSectionSecondCycle in defaultObj.sections) {
						for(let oneFiled in defaultObj.sections[oneSectionSecondCycle].fields) {
							if(defaultObj.sections[oneSectionSecondCycle].fields[oneFiled].id === itemId) {
								oldSectionId = defaultObj.sections[oneSectionSecondCycle].fields[oneFiled].idOfParentSection
								let tempObj = {...defaultObj.sections[oneSectionSecondCycle].fields[oneFiled]}
								tempObj.idOfParentSection = newSectionId
								tempObj.id = createId()
								defaultObj.sections[oneSection].fields.push(tempObj)
							}
						}
					}
				}
			}
			deleteField(oldSectionId, itemId)
		}

		return {
			onDrop,
			onDragStart,
			copySection,
			setNewFieldToDefault,
			inFocus,
			deleteSection,
			deleteField,
			createId,
			showObj,
			addNewSection,
			addFieldToSection,
			defaultObj,
			typeOfData,
			newField,
			openModal,
			closeModal,
			displayModal,
			form,
			onSubmit
		}
	}
}
</script>

<style scoped>
.checkbox-wrapper label {
	margin-left: 5px;
}
.checkbox-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal-inputs-center {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px

}
.modal-inputs-wide {
	width: 100%;
}
.modal-inputs-wrapper {
	display: grid;
	grid-template-columns: 1fr;
}
.newFieldDropDown {
	margin-top: 20px;
	margin-bottom: 5px;
	/*width: 45%;*/
}
.modal-input {
	margin-top: 20px;
	margin-bottom: 5px;
}
.new-questionary-title {
	font-weight: bold;
	font-size: 20px;
	margin-left: 25px;
}
.top-toolbar-left {
	display: flex;
	align-items: center;
}
#save-btn {
	margin-right: 12px;
}
#new-questionary-name {
	grid-template-columns: 1fr;
}
.card.section {
	grid-template-columns: 1fr;
}
.oneField {
	display: grid;
	grid-template-columns: 11fr 1fr;
	margin: 7px 0;
}
.card-header {
	width: 100%;
}
.oneField .card-left {
	display: flex;
	align-items: center;
}
.oneField-input {
	width: 100%;
}
.card-left .pi-info-circle {
	margin-right: 10px;
}
.card-section-bottom {
	width: 35%;
	margin: 10px 0 0 10px;
}
.p-dialog .p-dialog-header {
	color: red;
	padding-bottom: 0!important;
}
</style>
