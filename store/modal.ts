import {defineStore} from 'pinia'

export const useModalStore = defineStore('modal', () => {
    const visible: Ref<boolean> = ref(false)

    async function submit(form: any): Promise<void> {
        const mail = useMail()

        mail.send({
            from: 'John Doe',
            subject: 'Incredible',
            text: 'This is an incredible test message',
        })
    }

    return {
        visible, submit
    }
})
