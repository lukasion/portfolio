<template>
	<table class="table table-zebra border border-gray-200 rounded-md shadow"
	       v-if="articlesStore.articles.length > 0">
		<thead>
		<tr>
			<th>ID</th>
			<th>Prompt</th>
			<th>Content</th>
			<th>Actions</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="article in articlesStore.articles">
			<td>{{ article.id }}</td>
			<td>{{ article.prompt }}</td>
			<td>{{ shorten(article.content, 150) }}</td>
			<td>
				<a class="btn btn-sm btn-ghost" :href="`/user/posts/form/${article.id}`">Edit</a>
			</td>
		</tr>
		</tbody>
	</table>

	<div class="text-center mt-4">
		<a class="btn btn-neutral" href="/user/posts/form">Create new post</a>
	</div>
</template>

<script setup>
import {useArticlesStore} from "~/store/articles";

const articlesStore = useArticlesStore()
articlesStore.fetchData()
</script>