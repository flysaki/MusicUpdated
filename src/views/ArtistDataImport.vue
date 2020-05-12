<template>
	<div class="view_edit">

		<div id="io">

			<div>
				<textarea cols="100" rows="8" ref="ioTextarea" v-model="inputTextArea"></textarea>
			</div>

			<div>
				<label>JSONをインポート</label>
				<button @click="importJson">インポート</button>
				<button @click="testData">ダミーデータを入れる</button>
			</div>
		</div>


	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.view_edit {
		max-width: 60em;
		margin: 1em auto;
	}

	.view_edit > form > * {
		margin-bottom: 1em;
	}

	#edit_artist *, #edit_artist_info * {
		margin-right: 0.5em;
	}

	#edit_artist_info > * {
		margin-top: 0.6em;
	}

	#edit_artist_info {
		border: 1px solid #42b983;
	}

	label.workTitle {
		width: 60%;
	}

	label.workTitle > * {
		width: 100%;
	}

	.tags *:hover {
		color: #42b983;
	}

</style>

<script>

	export default {
		components: {},
		name: 'ArtistDataImport',
		data() {
			return {
				inputTextArea: '',
			}
		},
		computed: {

		},
		methods: {
			importJson: function () {
				this.$router.push({
					name: 'Edit',
					params: {
						jsonRaw: this.inputTextArea
					}
				})
			},
			testData: function () {
				this.inputTextArea = '{"name":"","note_urls":"","musicWorks":[],"dateUpdated":"1970-01-01","dateChecked":"1970-01-01"}';
			}
		}
	}
</script>
