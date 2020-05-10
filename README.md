# MusicUpdated -ミュージックアップデーテッド-
「あのアーティストの新曲出た？」

## コンセプト
ユーザー参加型、アーティスト新曲情報のチェック/発信サービス

## ブランチ構成の説明
- ブランチ：master 【エンジニア向け】
エディター、Vue.jsソースファイル
- ブランチ：gh-pages
  - data/muupフォルダ 【ユーザー向け】
    アーティスト音楽情報（コンテンツ編集の提出先、JSON形式）
  - その他【管理者向け】  
    ビルド済みWebエディター（GitHub Pages用）    
- ウェブアプリ： Github Pages 【ユーザー向け】  
  上記「アーティスト音楽情報」のJSONのエディター

## お問い合わせフォーム
[https://github.com/flysaki/MusicUpdated/issues/14](https://github.com/flysaki/MusicUpdated/issues/14)

## アーティストリスト 0.json の説明
```json
[
	{
		"oid": "169712",
		"name": "モーニング娘。",
		"yomi": "もーにんぐむすめ。"
	},
    …
]
```
- oid オリ◯ン アーティストID（https://www.oricon.co.jp/prof/256964【←この数字】/）
- name アーティスト名（HPからのコピーペースト推奨）
- yomi よみがな

## アーティストデータ xxxxxx.json の説明
```json
{
	"name": "アーティスト名（HPからのコピペ推奨）",
	"note_urls": "作品リリース情報元URLと備考",
	"musicWorks": [
		{
			"title": "作品名（CDタイトルなど、タイアップ情報不要、コピペ推奨）",
			"artist_name": "名義、コピペ推奨、アーティストと同様のときは空欄",
			"release_date": "日付、書式は2020-01-08",
			"url_note": "作品の情報を確認できるURL、配信サイトまとめのURL",
			"tags": [
				"参",  //ほかの名義、キャラソン、歌唱参加/楽曲収録などのとき使う
				"配",  //配信限定
				"ア",  //アナログ限定
				"リ",  //新曲はリミックス曲のみ
				"再",  //全てのon vocal音源がリリース済み
			]
		},
		…
	],
	"dateUpdated": "最新作(新曲あり)情報を追加したとき、その日付。書式は2020-05-03",
	"dateChecked": "新曲情報チェックを行ったとき、その日付。書式は2020-05-06"
}
```
