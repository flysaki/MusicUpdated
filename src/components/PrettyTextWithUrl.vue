<template>
	<div
			v-html="pretty"
	/>
</template>

<script>

	export default {
		components: {},
		name: 'PrettyTextWithUrl',
		props: {
			raw: String
		},
		data() {
			return {}
		},
		computed:{
			pretty: function () {
				return this.raw
					//HTMLタグを削除
					.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
					//URL → aタグ
					.replace(/(https?:\/\/[\x21-\x7e]+)/g, function ($1) {
						if ($1.match(document.domain)) {
							// ドメインが同じ場合は同じウィンドウ
							return '<a href="' + $1 + '">' + $1 + '</a>';
						} else {
							// ドメインが異なる場合は別ウィンドウ
							return '<a href="' + $1 + '" target="_blank">' + $1 + '</a>';
						}
					})
					//改行 → br
					.replace(/\n/g, '<br/>');
			}
		}
	}
</script>
