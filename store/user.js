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
        const {login} = useSanctumAuth();

        await login(userCredentials);
    }

    const logout = async () => {
        const {logout} = useSanctumAuth();

        await logout();
    }

    return {data, checkAuth, setData, login, logout}
})