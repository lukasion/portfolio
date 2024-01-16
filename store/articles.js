import {defineStore} from 'pinia'

export const useArticlesStore = defineStore('articles', () => {
    const articles = ref([])

    async function fetchData() {
        const {data} = await useFetch('/api/articles')

        if (!data) return

        data.value.forEach((article) => {
            if (articles.value.find((a) => a.id === article.id)) return
            
            articles.value.push(article)
        })
    }

    return {articles, fetchData}
})