<template>
	<div class="app__container">
		<div
			class="app__main"
			:class="{'app__main--offseted': skillsChartStore.visible}"
		>
			<Header/>

			<SectionStart/>
			<SectionTechnologies/>

			<ClientOnly>
				<SectionCollab/>
			</ClientOnly>

			<SectionSocials/>
			<SectionCode/>

			<FooterComponent/>

		</div>

		<ModalContact :class="{ 'active': modalStore.visible }"/>
		<SkillsChart/>
	</div>
</template>

<script setup lang="ts">
import {useModalStore} from "~/store/modal";
import FooterComponent from "~/components/Footer.vue";
import SkillsChart from "~/components/SkillsChart.vue";
import {useSkillsChartStore} from "~/store/skillsChart";

const modalStore = useModalStore()
const skillsChartStore = useSkillsChartStore()
</script>

<style lang="scss" scoped>
.app {
	&__container {
		@apply flex flex-row min-h-screen overflow-x-hidden;
	}

	&__main {
		@apply w-screen min-w-full transition-transform duration-[700ms] transform translate-x-0;

		&--offseted {
			@apply -translate-x-full;
		}
	}
}
</style>
