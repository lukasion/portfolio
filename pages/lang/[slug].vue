<script setup>
import {onMounted} from 'vue'

const {setLocale} = useI18n()

const route = useRoute()
const router = useRouter()
const lang = route.params.slug

onMounted(() => {
	setLocale(lang)

	window.location = '/'
})
</script>