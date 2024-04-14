import {defineStore} from 'pinia'


export const useModalStore = defineStore('modal', () => {
    const visible: Ref<boolean> = ref(false)

    async function submit(form: any): Promise<void> {
        const {data}: any = await useFetch(`/api/contact`, {
            query: {
                name: form.name,
                email: form.email,
                message: form.message,
                phone: form.phone,
            }
        })

        if (data.value.html) {
            const mail = useMail()

            mail.send({
                from: 'kontakt@be-crafty.com',
                subject: 'Kontakt z formularza na stronie internetowej Be Crafty',
                html: data.value.html
            }).then(() => {
                visible.value = false
            })
        }
    }

    return {
        visible, submit
    }
})
