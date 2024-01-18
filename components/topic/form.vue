<template>
	<div class="flex justify-center">
		<div class="max-w-[768px] w-full">
			<h3 class="font-bold text-2xl">
				{{ topicId ? 'Edit' : 'Create' }} topic

				<template v-if="topicsStore.topic?.id">
					<span class="text-sm text-gray-500">(ID: {{ topicsStore.topic.id }})</span>
				</template>
			</h3>

			<form-input
				class="w-full"
				label="Enter topic"
				placeholder="Name"
				required
				v-model="topicsStore.topic.name"
			/>

			<form-input
				type="date"
				class="w-full"
				label="Enter datetime to be generated"
				placeholder="Date"
				required
				v-model="topicsStore.topic.datetime"
			/>

			<div class="flex gap-2 mt-4">
				<nuxt-link to="/user/topics" class="btn">Cancel</nuxt-link>

				<button class="btn btn-neutral" @click.prevent="topicsStore.create()">Submit form</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {useTopicsStore} from "~/store/topics";

const topicsStore = useTopicsStore()

const props = defineProps({
	topicId: {
		type: String,
		default: null
	}
})

if (props.topicId) {
	topicsStore.fetchTopic(props.topicId)
}
</script>