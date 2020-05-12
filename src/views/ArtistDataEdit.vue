<template>
	<div class="view_edit">
		<header>
			<div id="edit_control_btn_ctn">
				<span @click="is_mode_edit = !is_mode_edit" :class="{control_btn_active: is_mode_edit}">編集モード</span>
				<span @click="is_show_help = !is_show_help" :class="{control_btn_active: is_show_help}">？</span>
				<span @click="showAllDetailSwitch(false)">▲</span>
				<span @click="showAllDetailSwitch(true)">▼</span>
				<span @click="musicWorkAdd()">＋</span>
			</div>
			<h2>アーティストデータ{{is_mode_edit ? ' - 編集' : ''}}</h2>
		</header>
		<form>
			<p class="help" style="white-space: pre"
			v-show="is_show_help"
			v-html="
'再 = 新曲なし\n'+
'参 = ほかの名義（キャラソン、歌唱参加/楽曲収録など）\n'+
'配 = 配信限定\n'+
'ア = アナログ限定\n'+
'リ = 新曲はリミックス曲のみ\n'+
'最新作登録日 = 最新作(新曲あり)情報を追加したとき、その日付。書式は2020-05-03\n'+
'チェック実行日 = 新曲情報チェックを行ったとき、その日付。書式は2020-05-06'"></p>
			<div id="edit_artist">
				<label>
					<span>アーティスト</span>
					<input v-model="artistName" type="text" placeholder="※HPからのコピペを推奨" />
				</label>
				<label>
					<span>ID</span>
					<input v-model="artistId" type="text" placeholder="オリコンID" style="width: 5em;"/>
				</label>
				<span
						:class="{control_btn: true, control_btn_active: is_show_artist_detail}"
						@click="is_show_artist_detail = !is_show_artist_detail"
				>！</span>
			</div>
			<div id="edit_artist_info" v-show="is_show_artist_detail">
				<label>
					<span>最新作登録日</span>
					<input v-model="dateUpdated" type="text" class="input_date"/>
				</label>
				<label>
					<span>チェック実行日</span>
					<input v-model="dateChecked" type="text" class="input_date"/>
				</label>
				<div class="inputWithTitle" style="width: 100%; height: fit-content;">
					<span class="leftBorderLabel">アーティスト リンク集と備考</span>
					<PrettyTextWithUrl
							v-show="!is_mode_edit"
							:raw="artistNoteUrls"

					/>
					<textarea
							class="url_note"
							placeholder="そのアーティストの新作情報元となるサイトのURL、及び説明"
							v-model="artistNoteUrls"
							v-show="is_mode_edit"
					/>
				</div>
			</div>
			<div id="edit_work_list">
				<MusicWorkEditor
						v-for="work in musicWorksDesc"
						:key="artistId + '_w' + work.key_in_page"
						:work-json="work"
						ref="musicWorks"

						@delete="musicWorkRemove(work.key_in_page)"
				/>
			</div>
		</form>
		<div id="io" v-show="is_mode_edit">
			<h2>データ提出</h2>
			<div>
				<div>1. JSONを作成</div>
				<label>
					<input type="checkbox" v-model="is_user_added"/>
					<span>今回は最新作を<b>登録</b>しました</span>
				</label>
				<label>
					<input type="checkbox" v-model="is_user_checked"/>
					<span>新作情報チェックしました</span>
				</label>
				<button @click="getJson">作成</button>
				<textarea cols="100" rows="8" ref="ioTextarea" v-model="output_json"></textarea>
			</div>
			<div>
				<div>2. JSONを提出</div>
				<SubmitStep
						:oid="artistId"
						:textJson="output_json"
						v-show="output_json.length"
				/>
			</div>
		</div>


	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#io{
		margin-top: 3em;
	}

	.view_edit {
		max-width: 60em;
		margin: 0 auto;
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
		border-top: 1px solid #42b983;
		border-bottom: 1px solid #42b983;
		padding-bottom: 0.5em;
	}

	.url_note {
		width: calc(100% - 1.6em);
		font-size: inherit;
		height: 6em;
	}

	label.workTitle {
		width: 60%;
	}

	label.workTitle > * {
		width: 100%;
	}

	input.input_date {
		width: 6.5em;
	}

	.tags *:hover {
		color: #42b983;
	}

</style>

<script>
	import MusicWorkEditor from "../components/MusicWorkEditor";
	import SubmitStep from "../components/SubmitStep";
	import PrettyTextWithUrl from "../components/PrettyTextWithUrl";

	export default {
		components: {PrettyTextWithUrl, MusicWorkEditor, SubmitStep,},
		name: 'ArtistDataEditor',
		props: {
			msg: String
		},
		data() {
			return {
				artistId: this.$route.params.oid,

				artistName: '',
				musicWorks: [],
				dateUpdated: '',
				dateChecked: '',
				artistNoteUrls: '',

				output_json: '',
				is_show_artist_detail: false,
				is_user_added: false,
				is_user_checked: false,
				key_in_page_current: 0,
				is_new_data_file: false,

				is_mode_edit: false,
				is_show_help: false,
			}
		},
		computed: {
			musicWorksDesc: function () {
				return this.musicWorks.slice().reverse();
			},
		},
		created() {
			let route = this.$route;
			let jsonRaw = "{}";
			let that = this;

			if(route.params.oid) {								//ArtistListから
				let d = new Date();
				d = "" + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds();
				let artistId = route.params.oid;

				this.axios.get(
					process.env.VUE_APP_URL_DATA + artistId + '.json?time=' + d,
					{ timeout : 1500 }
				).then(function (res) {
					jsonRaw = JSON.stringify(res.data);
					that.importJson(jsonRaw);
				}).catch(function (error) {
					if(error.response.status === 404){
						that.is_new_data_file = true;
					}
				})
			} else{
				if(route.params.jsonRaw){								//Importから
					that.importJson(jsonRaw);
				}
			}
		},
		methods: {
			importJson: function (jsonRaw) {
				let inputArtistData = JSON.parse(jsonRaw);

				/*if (
					!inputArtistData.name
					|| !inputArtistData.name.length
				) {
					alert('nameの書式を確認してください');
				}
				if (
					!inputArtistData.musicWorks
					|| !inputArtistData.musicWorks.length
				) {
					alert('musicWorksの書式を確認してください');
				}
				if (
					!inputArtistData.dateUpdated
					|| !inputArtistData.dateUpdated.match(/\d{4}-\d{2}-\d{2}/)
				) {
					alert('dateUpdatedの書式を確認してください');
				}
				if (
					!inputArtistData.dateChecked
					|| !inputArtistData.dateChecked.match(/\d{4}-\d{2}-\d{2}/)
				) {
					alert('dateCheckedの書式を確認してください');
				}*/

				this.artistName = inputArtistData.name;
				this.artistNoteUrls = inputArtistData.note_urls;
				this.musicWorks = [];
				this.dateUpdated = inputArtistData.dateUpdated;
				this.dateChecked = inputArtistData.dateChecked;

				inputArtistData.musicWorks.sort(this.musicWorkSort);
				inputArtistData.musicWorks.reverse();
				for (let i = 0; i < inputArtistData.musicWorks.length; i++) {
					let work = inputArtistData.musicWorks[i];
					this.musicWorkAdd({
						title: work.title,
						artist_name: work.artist_name === this.artistName ? '' : work.artist_name,
						release_date: work.release_date,
						url_note: work.url_note,
						tags: work.tags,
					});
				}
			},
			getJson: function () {
				let outputArtistData = {
					name: '',
					note_urls: '',
					musicWorks: [],
					dateUpdated: '',
					dateChecked: '',
				}

				//name
				outputArtistData.name = this.artistName;

				//note_urls
				outputArtistData.note_urls = this.artistNoteUrls;

				//musicWorks
				outputArtistData.musicWorks=[];
				if(this.$refs.musicWorks && this.$refs.musicWorks.length){
					this.$refs.musicWorks.sort(this.musicWorkSort);
					for (let i = 0; i < this.$refs.musicWorks.length; i++) {
						let work = this.$refs.musicWorks[i];
						outputArtistData.musicWorks.push(work.workOutput);
					}
				}

				let today = new Date();
				today =
					today.getFullYear()
					+ "-" + (today.getMonth() + 1).toString().padStart(2, '0')
					+ "-" + today.getDate().toString().padStart(2, '0');
				//dateUpdated
				outputArtistData.dateUpdated = this.is_user_added ? today : this.dateUpdated;

				//dateChecked
				outputArtistData.dateChecked = this.is_user_checked ? today : this.dateChecked;

				this.output_json = JSON.stringify(outputArtistData, null, "\t");
			},
			musicWorkSort: function (a, b) {
				if (a.release_date === b.release_date) {
					return 0;
				} else if (a.release_date > b.release_date) {
					return -1;
				} else {
					return 1;
				}
			},
			showAllDetailSwitch: function (flag) {
				this.$refs.musicWorks.forEach(function (work) {
					work.isDetailShowed = flag;
				})
			},
			musicWorkAdd: function (workInput) {
				let work = workInput ? workInput : {
					title: '',
					artist_name: '',
					release_date: '',
					url_note: '',
					tags: [],
				};
				work.key_in_page = this.key_in_page_current++;
				this.musicWorks.push(work);
			},
			musicWorkRemove: function (key) {
				let index = this.musicWorks.findIndex(work => work.key_in_page === key);
				this.musicWorks.splice(index, 1);
			}
		}
	}
</script>
