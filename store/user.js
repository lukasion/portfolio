import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const data = ref({})

    const setData = (data) => {
        this.data = data
    }

    return {data, setData}
})