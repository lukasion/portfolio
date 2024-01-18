<template>
	<h4 class="text-xl font-bold mb-4">List of articles to be generated</h4>
	<table class="table table-zebra border border-gray-200 rounded-md shadow">
		<thead>
		<tr>
			<th>ID</th>
			<th>Title</th>
			<th>When will be generated</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="topic in topicsStore.topics">
			<td>{{ topic.id }}</td>
			<td>{{ topic.name }}</td>
			<td>{{ topic.datetime }}</td>
		</tr>
		</tbody>
	</table>

	<div class="text-center mt-4">
		<a class="btn btn-neutral" href="/user/topics/form">Create new topic</a>
	</div>
</template>

<script setup lang="ts">
import {useTopicsStore} from "~/store/topics";

const topicsStore = useTopicsStore()
topicsStore.fetchTopics()
</script>