import {defineStore} from 'pinia'
import type {RouteParamValue} from "vue-router";

export const useCategoriesStore = defineStore('categories', () => {
    const category = ref(null)

    async function fetchCategory(id: string | RouteParamValue[]): Promise<void> {
        const {data}: any = await
            useFetch(`/api/categories/${id}`)

        if (data.value) {
            category.value = data.value
        }
    }

    return {
        category,
        fetchCategory
    }
})