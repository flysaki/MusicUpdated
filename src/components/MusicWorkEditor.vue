<template>
	<div>
		<div style="height: 1.5em;" v-show="isDetailShowed"/>
		<div class="itemInLine">
			<label class="inputWithTitle workTitle">
				<span v-html="isDetailShowed ? '作品名' : artist_name" class="leftBorderLabel"></span>
				<input type="text" v-model="title" class="i-title" placeholder="作品名を入力" />
			</label>
			<label class="inputWithTitle">
				<span
						:class="isDetailShowed ? 'leftBorderLabel' : ''"
						v-html="isDetailShowed ? '発売日' : tags.toString()"
				/>
				<input type="text" v-model="release_date" placeholder="例)2000-01-01"
					class="i-date"/>
			</label>
			<label class="inputWithTitle">
				<span>詳細</span>
				<span
						class="sameWithInput"
						@click="isDetailShowed = !isDetailShowed"
						v-html="isDetailShowed ? '▲':'▼'"
				/>
			</label>
			<label class="inputWithTitle">
				<span>削除</span>
				<span
						class="sameWithInput"
						@click="$emit('delete')"
						>×</span>
			</label>
		</div>
		<div class="itemInLine" v-show="isDetailShowed">
			<label class="inputWithTitle">
				<span class="leftBorderLabel">名義</span>
				<input type="text" v-model="artist_name_input" :placeholder="artist_name_page"/>
			</label>
			<div class="inputWithTitle">
				<label class="leftBorderLabel">タグ</label>
				<div class="tags">
					<label
							v-for="tag in [['再','新曲なし'], ['参','参加'],['配','配信限定'],['ア','アナログ限定'],['編','リミックス']]"
							:key="+'_tag_'+tag[0]"
					>
						<input type="checkbox" v-model="tags" :value="tag[0]">
						<span v-html="tag[1]"/>
					</label>

				</div>
			</div>
		</div>
		<div class="itemInLine" v-show="isDetailShowed">
			<label class="inputWithTitle" style="width: 100%; height: fit-content;">
				<span class="leftBorderLabel">リンク集と備考</span>
				<textarea v-if="is_mode_edit" v-model="url_note" class="url_note" placeholder="作品の情報を確認できるURL、配信サイトまとめのURL" />
				<PrettyTextWithUrl v-if="!is_mode_edit" :raw="url_note"></PrettyTextWithUrl>
			</label>
		</div>
		<div style="height: 3em;" v-show="isDetailShowed"/>
	</div>

</template>

<script>
	import PrettyTextWithUrl from "./PrettyTextWithUrl";
	export default {
		components: {PrettyTextWithUrl},
		props: {
			workJson: {
				title: String,
				artist_name: String,
				release_date: String,
				url_note: String,
				tags: Array,

				key_in_page: Number,
			},
			is_mode_edit: Boolean,
		},
		data() {
			return {
				title: this.workJson.title,
				artist_name_input: this.workJson.artist_name,
				release_date: this.workJson.release_date,
				url_note: this.workJson.url_note,
				tags: this.workJson.tags,


				isDetailShowed: false,
				key_in_page: this.workJson.key_in_page,
			}
		},
		computed: {
			artist_name_page: function () {
				return this.$parent.$data.artistName;
			},
			artist_name: function () {
				return this.artist_name_input ? this.artist_name_input : this.artist_name_page;
			},
			workOutput: function () {
				return {
					title: this.title,
					artist_name: this.artist_name === this.artist_name_page ? '' : this.artist_name,
					release_date: this.release_date,
					url_note: this.url_note,
					tags: this.tags,
				}
			}

		},
		methods:{
		},
		created() {
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.url_note {
		width: calc(100% - 1.6em);
		font-size: inherit;
		height: 6em;
	}

	.i-title{
		width: 20em;
	}

	.i-date{
		width: 6.5em;
	}


	.tags *:hover {
		color: #42b983;
	}

</style>
