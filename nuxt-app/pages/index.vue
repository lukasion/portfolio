<template>
	<div>
		<Header/>
		<SectionStart/>
		<SectionTechnologies/>
		<SectionCollab/>
		<SectionSocials/>
		<SectionCode/>

		<ModalContact :class="{ 'active': modalStore.visible }"/>
	</div>
</template>

<script setup lang="ts">
import {useModalStore} from "~/store/modal";

const modalStore = useModalStore()
</script>