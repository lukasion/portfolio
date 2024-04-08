<template>
	<section class="section__wrapper">
		<div class="section__container">
			<h2 class="title--x-large title--condensed title--slide-from-bottom" :ref="onElementVisible">
				<span v-html="$t('socialsTitle')"/>
			</h2>

			<p class="leading-7 mt-5 title--slide-from-left" :ref="onElementVisible">
				<span style="transition-delay: .6s" v-html="$t('socialsDescription')"/>
			</p>

			<div class="technology__container mt-12">
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item">
						<div>
							<Icon name="logos:github-icon" size="48px"/>
							GitHub
						</div>
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 0.6s">
						<div>
							<Icon name="logos:linkedin-icon" size="48px"/>
							LinkedIn
						</div>
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 0.9s">
						<div>
							<Icon name="logos:facebook" size="48px"/>
							Facebook
						</div>
					</span>
				</div>
				<div class="technology__item-wrapper title--slide-from-bottom" :ref="onElementVisible">
					<span class="technology__item" style="transition-delay: 1.2s">
						<div>
							<Icon name="logos:google-gmail" size="48px"/>
							Google Mail
						</div>
					</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const onElementVisible = inject('onElementVisible')
</script>