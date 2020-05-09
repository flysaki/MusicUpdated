<template>
	<div class="view_list">

		<div id="edit_control_btn_ctn">
			<span @click="add">➕</span>
			<span @click="onlineData">↓</span>
		</div>

		<div id="listEditor">
			<div v-for="(artist, key) in artistList" :key="key">
				<input type="text" v-model="artist.oid" placeholder="オリコンID" />
				<input type="text" v-model="artist.name" placeholder="名前" />
				<input type="text" v-model="artist.yomi" placeholder="よみかた" />
				<router-link :to="'/edit/'+artist.oid">→</router-link>
			</div>
		</div>

		<div id="io" v-show="artistList.length">
			<div>
				<button @click="getJson">JSON作成</button>
			</div>
			<div>
				<textarea ref="ioTextarea"></textarea>
			</div>
		</div>


	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.view_list {
		max-width: 60em;
		margin: 1em auto;
	}

	.view_list * {
		font-size: 1em;
	}

	.view_list > form > * {
		margin-bottom: 1em;
	}

	#edit_control_btn_ctn {
		display: inline-block;
		float: right;
		user-select: none;
	}

	#edit_control_btn_ctn > span {
		padding: 0.1em 0.2em;
		margin: 0 0.2em;
		line-height: 1.1em;
		width: 1.5em;
		border: 1px solid;
	}

	#edit_control_btn_ctn > span:hover {
		color: #42b983;
	}

	textarea{
		width: 100%;
		height: 5em;
	}

	#io{
		width: 100%;
		margin-top: 3em;
	}

</style>

<script>

	export default {
		components: {},
		name: 'ArtistListEditor',
		data() {
			return {
				artistList: [],
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
				this.$refs.ioTextarea.value = JSON.stringify(
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
