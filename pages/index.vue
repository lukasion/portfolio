<template>
	<div>
		<Header/>

		<SectionStart/>
		<SectionTechnologies/>

		<ClientOnly>
			<SectionCollab/>
		</ClientOnly>

		<SectionSocials/>
		<SectionCode/>

		<FooterComponent/>

		<ModalContact :class="{ 'active': modalStore.visible }"/>
	</div>
</template>

<script setup lang="ts">
import {useModalStore} from "~/store/modal";
import FooterComponent from "~/components/Footer.vue";

const modalStore = useModalStore()
</script>