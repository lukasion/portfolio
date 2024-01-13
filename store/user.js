import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const data = ref({})

    const setData = (data) => {
        this.data = data
    }

    const checkAuth = () => {
        return this.data.value
    }

    const login = async (userCredentials) => {
        console.log(userCredentials)
        const {data} = await useFetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                email: userCredentials.value.email,
                password: userCredentials.value.password
            })
        })
    }

    const logout = async () => {
    }

    return {data, checkAuth, setData, login, logout}
})