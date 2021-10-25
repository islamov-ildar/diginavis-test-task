<template>
		<div class="left-bar">
			<div class="left-bar-top">
				<div class="oneMenuItem">
					<img src="../../assets/icons/tenders.svg" alt="tenders">
					<span>Тендеры</span>
				</div>
				<div class="oneMenuItem">
					<img src="../../assets/icons/contragents.svg" alt="contragents">
					<span>Контрагенты</span>
				</div>
				<div class="oneMenuItem">
					<img src="../../assets/icons/users.svg" alt="users">
					<span>Пользователи</span>
				</div>
				<div class="oneMenuItem" id="currentMenuItem">
					<img src="../../assets/icons/questionaries.svg" alt="questionaries">
					<span>Анкеты</span>
				</div>
			</div>
			<div class="left-bar-bottom">
				<div class="oneMenuItem">
					<img src="../../assets/icons/help.svg" alt="help">
					<span>помощь</span>
				</div>
				<div class="oneMenuItem">
					<img src="../../assets/icons/settings.svg" alt="settings">
					<span>Настройки</span>
				</div>
			</div>
		</div>
		<router-view />
</template>

<script>
export default {
	name: "LeftBarAndWrapper"
}
</script>

<style scoped>

</style>
