import {defineStore} from 'pinia'

export const useSkillsChartStore = defineStore('skillsChart', () => {
    const visible: Ref<boolean> = ref(false)

    const toggle = (value: boolean) => {
        visible.value = value
    }

    return {
        visible, toggle
    }
})
