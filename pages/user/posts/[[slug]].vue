<template>
	<post-list/>
</template>

<script setup>
import {useArticlesStore} from "~/store/articles";

const articlesStore = useArticlesStore()
articlesStore.fetchData()
</script>