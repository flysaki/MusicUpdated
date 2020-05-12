<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">ホーム</router-link>
			|
			<router-link to="/list">アーティスト</router-link>
			|
			<router-link to="/import">インポート</router-link>
		</div>

		<div id="routerView">
			<router-view/>
		</div>

	</div>
</template>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

	* {
		box-sizing: border-box;
		font-family: 'Noto Sans JP', sans-serif;
		word-break: break-word;
	}

	body {
		font-size: 18px;
		margin: 1em auto;
	}

	div#app > *{
		display: inline-block;
	}

	#routerView{
		width: calc(100% - 12em);
		vertical-align: top;
	}

	#nav {
		padding: 30px;
		width: fit-content;
	}

	#nav a {
		display: block;
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #42b983;
	}

	@media (prefers-color-scheme: dark) {
		* {
			background-color: #000;
			color: #bbb;
		}

		a:link, a:visited, a:hover, a:active {
			color: #00b4ee
		}

	}

	.itemInLine {
		margin: 0.7em 0;
	}

	.itemInLine > * {
		display: inline-block;
		margin: 0 0.8em;

	}

	form input, form textarea, .sameWithInput {
		font-size: 1.3em;
		background-color: transparent;
		border: none;
		border-bottom: 2px solid;
		outline: none;
		padding-bottom: 4px;
		font-weight: 100;
	}

	form input:focus, form textarea:focus, .sameWithInput:hover {
		border-color: #42b983;
	}

	font input, .sameWithInput {
		line-height: 1.3em;
	}

	.inputWithTitle > * {
		display: block;
	}

	.inputWithTitle > *:first-child {
		line-height: 1em;
	}

	.leftBorderLabel{
		border-left: 4px solid;
		padding-left: 0.4em;
	}

	.sameWithInput {
		display: inline;
		width: 100%;
	}

	#edit_control_btn_ctn {
		display: inline-block;
		float: right;
	}

	#edit_control_btn_ctn > span, span.control_btn {
		padding: 0.1em 0.2em;
		margin: 0 0.2em;
		line-height: 1.1em;
		width: 1.5em;
		border: 1px solid;
		user-select: none;
	}

	#edit_control_btn_ctn > span:hover, span.control_btn:hover, span.control_btn_active{
		color: #42b983;
	}


</style>

<script>
	//import EditTest from "./views/EditTest";

	export default {
		components: {},
		name: 'MusicUpdated',
		props: {
			msg: String
		},
		data() {
			return {}
		},
		computed: {},
		methods: {
		}
	}
</script>
