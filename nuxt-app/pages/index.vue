<template>
	<div>
		<Header/>
		<SectionStart/>
		<SectionTechnologies/>
		<SectionSocials/>
		<SectionCode/>

		<ModalContact :class="{ 'active': modalStore.visible }"/>
	</div>
</template>

<script setup lang="ts">
import {useModalStore} from "~/store/modal";

const modalStore = useModalStore()
</script>