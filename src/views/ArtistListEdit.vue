<template>
	<div class="view_list">
		<header>
			<div id="edit_control_btn_ctn">
				<span @click="add">➕</span>
				<span @click="onlineData">↓</span>
			</div>
			<h2>アーティストリスト編集</h2>
		</header>

		<main>
			<div id="listEditor">
				<form>
					<div v-for="(artist, key) in artistList" :key="key">
						<input type="text" v-model="artist.oid" placeholder="オリコンID" name="oid" />
						<input type="text" v-model="artist.name" placeholder="名前" />
						<input type="text" v-model="artist.yomi" placeholder="よみかた" />
						<router-link :to="'/edit/'+artist.oid">データへ</router-link>
					</div>
				</form>
				<p class="help">- オリコンID  https://www.oricon.co.jp/prof/256964【←この数字】</p>
			</div>
			<div id="io" v-show="artistList.length">
				<h2>アーティストリスト提出</h2>
				<div>
					<div>
						<span>1. JSON作成</span>
						<button @click="getJson">作成</button>
					</div>
					<textarea ref="ioTextarea" v-model="output_json"></textarea>
				</div>
				<div v-show="output_json.length">
					<div>2. 提出</div>
					<SubmitStep
							:oid="0"
							:textJson="output_json"
					/>
				</div>
			</div>
		</main>


	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	.view_list {
		max-width: 60em;
		margin: 1em auto;
	}

	textarea{
		width: 100%;
		height: 5em;
	}

	#io{
		width: 100%;
		margin-top: 3em;
	}

	input[name=oid]{
		width: 7em;
	}

	form > div > *{
		margin: 0 0.3em;
	}

</style>

<script>
	import SubmitStep from "../components/SubmitStep";

	export default {
		components: {SubmitStep},
		name: 'ArtistListEditor',
		data() {
			return {
				artistList: [],

				output_json: '',
			}
		},
		computed: {

		},
		created() {
			this.onlineData();
		},
		methods: {
			add: function () {
				let artist = {
					oid: '',
					name: '',
					yomi: ''
				}
				this.artistList.push(artist);
			},
			getJson: function () {
				this.output_json = JSON.stringify(
					this.artistList.slice().sort(function (a, b) {
						return a.oid - b.oid
					}),
					null, "\t");
			},
			onlineData: function () {
				let that = this;
				let d = new Date();
				d = "" + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds();
				this.axios.get(process.env.VUE_APP_URL_DATA + '0.json?time=' + d).then(function (res) {
					that.artistList = res.data;
				})
			}
		}

	}
</script>
