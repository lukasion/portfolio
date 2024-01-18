import {defineStore} from 'pinia'

export const useArticlesStore = defineStore('articles', () => {
    const articles = ref([])
    const article = ref({})

    async function fetchData() {
        const {data}: any = await useFetch('/api/articles')

        if (data.value) {
            articles.value = data.value
        }
    }

    async function fetchArticle(id: number) {
        const {data}: any = await useFetch(`/api/articles/${id}`)

        if (data.value) {
            article.value = data.value
        }
    }

    return {
        articles,
        article,
        fetchData,
        fetchArticle
    }
})