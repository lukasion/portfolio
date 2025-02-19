import {defineStore} from 'pinia'

export const useArticlesStore = defineStore('articles', () => {
    const articles = ref([])
    const article = ref(null)

    async function fetchData(params: object): Promise<void> {
        const {data}: any = await useFetch('/api/articles', {
            params: params
        })

        if (data.value) {
            articles.value = data.value
        }
    }

    async function fetchArticle(id: string): Promise<void> {
        const {data}: any = await
            useFetch(`/api/articles/${id}`)

        if (data.value) {
            article.value = data.value
        }
    }

    async function fetchBySlug(slug: string): Promise<object | null> {
        const {data}: any = await useFetch(`/api/articles/friendly-url/${slug}`)

        if (data.value) {
            article.value = data.value

            return data.value
        }

        return null
    }

    return {
        articles,
        article,
        fetchData,
        fetchArticle,
        fetchBySlug
    }
})