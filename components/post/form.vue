<template>
	<div class="flex justify-center">
		<div class="max-w-[768px] w-full">
			<h3 class="font-bold text-2xl">
				{{ postId ? 'Edit' : 'Create' }} post
				<template v-if="articlesStore.article?.id">
					<span class="text-sm text-gray-500">(ID: {{ articlesStore.article.id }})</span>
				</template>
			</h3>

			<form-input
				class="w-full"
				label="Name of article"
				placeholder="Name"
				required
				:value="articlesStore.article?.prompt"
			/>

			<form-textarea
				class="w-full"
				label="Content"
				required
				:value="articlesStore.article?.content"
			/>

			<div class="flex gap-2">
				<nuxt-link to="/user/posts" class="btn">Cancel</nuxt-link>
				
				<button class="btn btn-neutral">Submit form</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {useArticlesStore} from "~/store/articles";

const articlesStore = useArticlesStore()

const props = defineProps({
	postId: {
		type: String,
		default: null
	}
})

if (props.postId) {
	articlesStore.fetchArticle(props.postId)
}
</script>