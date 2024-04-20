<template>
	<div>
		<Header white/>

		<div class="container mx-auto pt-32">
			<h1 class="text-2xl font-bold px-4">
				{{ i18n.t('blog') }}
			</h1>

			<p class="text-xl mt-4 px-4">
				{{ i18n.t('blog_subtitle') }}
			</p>

			<div class="blog__container">
				<div class="blog__articles">
					<h3 class="text-2xl mb-4">{{ i18n.t('featured_article') }}</h3>

					<article-short
						:article="articlesStore.articles[0]"
						v-if="articlesStore.articles.length > 0"
					/>
					<p v-else>
						{{ i18n.t('no_articles_found') }}
					</p>
				</div>

				<div class="blog__side">
					<h3 class="text-2xl mb-4">{{ i18n.t('recent_articles') }}</h3>

					<div class="flex flex-col gap-8">
						<template v-if="articlesStore.articles.length === 0">
							<p>{{ i18n.t('no_articles_found') }}</p>
						</template>

						<article-short
							v-for="article in articlesStore.articles"
							:article="article"
							hide-description
							column
						/>
					</div>
				</div>
			</div>
		</div>

		<Footer class="mt-24"/>
	</div>
</template>

<script setup lang="ts">
import {useArticlesStore} from "~/store/articles";

const i18n = useI18n()
const articlesStore = useArticlesStore()
await articlesStore.fetchData({
	limit: 4,
	lang: i18n.locale.value
})
</script>

<style scoped>
@import 'assets/scss/structures/_blog.scss';
</style>