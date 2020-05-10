<template>
	<div>
		<ol>
			<li>Githubのアカウントをお持ちでない方は、先ずサインアップしてください</li>
			<li><a :href="url_for_submit" target="_blank">Githubへ(ログイン要)↗</a></li>
			<li>※ みどりのボタン<GreenButton>Fork this repository</GreenButton>が出ていたらクリック</li>
			<li v-show="$parent.$data.is_new_data_file">ファイル名入力欄でEnterキーを押す</li>
			<li>JSONの内容を入れ替えて、下のみどりのボタン<GreenButton>{{$parent.$data.is_new_data_file ? 'Propose new file' : 'Propose file change'}}</GreenButton>をクリック<br/>※ショートカットキー「Ctrl+A すべて選択」「Ctrl+C 貼り付け」の使用を推奨します</li>
			<li>みどりのボタン<GreenButton>Create pull request</GreenButton>をクリック</li>
			<li>みどりのボタン<GreenButton>Create pull request</GreenButton>をクリック</li>
		</ol>
	</div>

</template>

<script>
	import GreenButton from '../components/GreenButton'

	export default {
		components: {GreenButton, },
		props: ['oid', 'textJson',],
		data() {
			return {
			}
		},
		computed: {
			url_for_submit: function () {
				let url;
				url = this.$parent.$data.is_new_data_file ?
						process.env.VUE_APP_URL_SUBMIT_NEW :
						process.env.VUE_APP_URL_SUBMIT_EDIT;
				url = url.replace('★', this.oid);
				url += encodeURIComponent(this.textJson);
				return url;
			},

		},
		methods: {
			test: function(){
			}
		},
		created() {
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	ol{
		margin-top: 0.2em;
	}
	li{
		margin: 0.2em;
	}

</style>
