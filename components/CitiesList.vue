<template>
	<div>
		<h3 class="text-4xl mt-12 font-bold text-center">
			Strony internetowe dla klientów z całej Polski
		</h3>

		<p class="mt-8 text-center">
			Świadczę usługi tworzenia stron internetowych dla firm oraz osób prywatnych z całej Polski.
			<br/> Sprawdź ofertę tworzenia stron WWW dla klientów z innych miast:
		</p>

		<div class="flex flex-wrap gap-2 mt-8 justify-center">
			<template
				v-for="(city, key) in citiesStore.cities"
				:key="key"
			>
				<nuxt-link class="hover:bg-slate-100 border px-4 py-1 rounded-lg" :to="'/strony-internetowe/' + key">
					Strony internetowe {{ city.singular }}
				</nuxt-link>
			</template>
		</div>
	</div>
</template>

<script setup>
import {useCitiesStore} from "~/store/citites";

const citiesStore = useCitiesStore()
</script>