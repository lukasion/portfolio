import {defineStore} from 'pinia'

export const useTopicsStore = defineStore('topics', () => {
    const topics = ref([])
    const topic = ref({
        name: '',
        datetime: '',
    })

    async function fetchTopics(id: string): Promise<void> {
        const {data}: any = await useFetch(`/api/topics`)

        if (data.value) {
            topics.value = data.value
        }
    }

    async function fetchTopic(id: string): Promise<void> {
        const {data}: any = await useFetch(`/api/topics/${id}`)

        if (data.value) {
            topic.value.name = data.value.name
            topic.value.datetime = data.value.datetime
        }
    }

    async function create(): Promise<void> {
        const {data}: any = await useFetch(`/api/topics`, {
            method: 'POST',
            body: {
                name: topic.value.name,
                datetime: topic.value.datetime,
            }
        })

        if (data.value) {
            topic.value = data.value
        }
    }

    return {
        topic,
        topics,
        fetchTopic,
        fetchTopics,
        create,
    }
})