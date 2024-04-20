<template>
	<div>
		<Header white/>

		<div class="container mx-auto pt-24 md:pt-32 px-4">
			<h1 class="text-2xl font-bold">
				{{ i18n.t('blog') }}
			</h1>

			<p class="text-md md:text-xl mt-4 mb-4">
				{{ i18n.t('blog_subtitle') }}
			</p>

			<div class="blog__container">
				<div class="blog__articles">
					<h3 class="text-md md:text-2xl mt-8 mb-4">
						{{ i18n.t('articles_in_category') }}: <span
						style="font-weight: 500;">{{ categoriesStore.category?.name }}</span>
					</h3>

					<div class="flex flex-col gap-12">
						<article-short
							v-for="article in articlesStore.articles"
							:article="article"
							v-if="articlesStore.articles.length > 0"
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
import {useCategoriesStore} from "~/store/categories";

const articlesStore = useArticlesStore()
const categoriesStore = useCategoriesStore()
const i18n = useI18n()
const route = useRoute()

articlesStore.fetchData({
	limit: 4,
	lang: i18n.locale.value,
	categoryId: route.params.id
})

categoriesStore.fetchCategory(route.params.id)

</script>