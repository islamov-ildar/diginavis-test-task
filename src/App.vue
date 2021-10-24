<template>
	<header>
		<div class="header-left">
			<img src="./assets/reka_logo.svg" alt="logo">
		</div>
		<div class="header-right">
			<div class="lang-ico">
				<img src="./assets/icons/lang.svg" alt="lang">
				<i class="pi pi-globe"></i>
			</div>
			<i class="pi pi-bell"></i>
			<i class="pi pi-user"></i>
		</div>
	</header>
	<div class="main-wrapper">
	<div class="left-bar">
		<div class="left-bar-top">
			<div class="oneMenuItem">
				<img src="./assets/icons/tenders.svg" alt="tenders">
				<span>Тендеры</span>
			</div>
			<div class="oneMenuItem">
				<img src="./assets/icons/contragents.svg" alt="contragents">
				<span>Контрагенты</span>
			</div>
			<div class="oneMenuItem">
				<img src="./assets/icons/users.svg" alt="users">
				<span>Пользователи</span>
			</div>
			<div class="oneMenuItem" id="currentMenuItem">
				<img src="./assets/icons/questionaries.svg" alt="questionaries">
				<span>Анкеты</span>
			</div>
		</div>
		<div class="left-bar-bottom">
			<div class="oneMenuItem">
				<img src="./assets/icons/help.svg" alt="help">
				<span>помощь</span>
			</div>
			<div class="oneMenuItem">
				<img src="./assets/icons/settings.svg" alt="settings">
				<span>Настройки</span>
			</div>
		</div>
	</div>
  <router-view />
	</div>
</template>

<script>
//test-task-19102021 - name of project in Firebase
</script>

<style>
@font-face {
	font-family: 'Montserrat';
	src: url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');
}

body {
	background: #E5E5E5;
	margin: 0;
}
a {
	text-decoration: none;
}
.container {
	padding: 10px 60px;
	width: 100%;
}

.card{
	display: grid;
	grid-template-columns: 9fr 3fr;
	background: #FFFFFF;
	border-radius: 16px;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	padding: 20px;
	margin: 10px 40px;
}
.card-description {
	margin-top: 4px;
	font-size: 12px;
	font-weight: 500;
}
.card-right-ico {
	margin-left: 15px;
}
.card-right {
	display: flex;
	justify-content: flex-end;
}
.top-toolbar {
	display: flex;
	justify-content: space-between;
	margin: 10px 40px;
}

#app {
	font-family: 'Montserrat', sans-serif;
	-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header-right {
	display: grid;
	grid-template-columns: 2fr 1fr 1fr;
	grid-gap: 40px;
}
.lang-ico {
	display: flex;
	align-items: center;
}
.lang-ico img {
	margin-right: 14px;
}
.left-bar span {
	text-transform: uppercase;
	color: #004CCC;
	font-weight: bold;
	font-size: 12px;
	margin-left: 15px;
}
.left-bar {
	padding: 25px 20px;
	background-color: #FFFFFF;
	box-shadow: 0 4px 16px rgba(39, 69, 104, 0.12);
	height: calc(100vh - 80px);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.oneMenuItem {
	display: flex;
	align-items: center;
	padding: 12px;
}
.main-wrapper {
	display: flex;
}
header {
	background-color: #FFFFFF;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 4px 16px rgba(39, 69, 104, 0.12);
	padding: 20px 30px 20px 20px;
	color: #004CCC;
}
#currentMenuItem {
	background: rgba(0, 76, 204, 0.1);
	border-radius: 6px;
}
</style>
