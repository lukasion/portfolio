<template>
	<UserNavbar/>

	<div class="container mx-auto mt-10">
		<div class="card shadow-md">
			<div class="card-body">
				<h1 class="text-2xl font-bold">Posts</h1>
				<p class="text-base-content">Manage your posts here.</p>

				<table class="table table-zebra border border-gray-200 rounded-md shadow"
				       v-if="articlesStore.articles.length > 0">
					<tr>
						<th>ID</th>
						<th>Prompt</th>
						<th>Content</th>
						<th>Actions</th>
					</tr>
					<tr v-for="article in articlesStore.articles">
						<td>{{ article.id }}</td>
						<td>{{ article.prompt }}</td>
						<td>{{ article.content }}</td>
						<td>
							<a class="btn btn-sm btn-ghost" :href="`/user/posts/${article.id}`">Edit</a>
						</td>
					</tr>
				</table>

				<div class="text-center">
					<a class="btn btn-ghost" href="/user/posts/create">Create new post</a>
				</div>
			</div>
		</div>
	</div>

	<UserFooter/>
</template>

<script setup>
import {useArticlesStore} from "~/store/articles.js";

definePageMeta({
	middleware: 'auth'
})

const articlesStore = useArticlesStore()
articlesStore.fetchData()
</script>