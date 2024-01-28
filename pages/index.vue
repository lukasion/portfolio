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

		<ModalContact :class="{ 'active': modalStore.visible }"/>
	</div>
</template>

<script setup lang="ts">
import {useModalStore} from "~/store/modal";

const modalStore = useModalStore()
</script>