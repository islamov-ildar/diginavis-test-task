<template>

	<router-view />
</template>

<script>
//test-task-19102021 - name of project in Firebase
//user@user.com
//123456


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
	display: flex;
	align-items: center;
}
.header-right > .pi {
	padding-left: 16px;
}
.header-right button {
	margin-left: 16px;
}
.lang-ico {
	display: flex;
	align-items: center;
}
.lang-ico img {
	margin-right: 8px;
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
