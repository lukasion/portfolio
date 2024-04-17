<template>
	<div>
		<div class="section__container">
			<h2 class="title--x-large title--condensed" :ref="onElementVisible">
				<span v-html="$t('aboutMeTitle')"/>
			</h2>

			<button
				class="form__button form__button--dark"
				@click.prevent="skillsChartStore.toggle(true)"
			>
				<span v-html="$t('checkoutSummary')"/>
			</button>
		</div>

		<div class="code" ref="editor">
			<div class="code__preloader" v-if="loading">
				{{ $t('loading') }} <span>{{ dots }}</span>
			</div>
			<div class="code__container" v-else>
				<div data-line-nr="01" class="code__line">
					<div class="methods">class</div>
					<span class="propname">Łukasz Fujarski</span>
					<div class="methods">extends</div>
					<div class="propname">Developer</div>
					{
				</div>
				<div data-line-nr="02" class="code__line">
					<div class="dot">··</div>
					<div class="comment">
						// "Don't comment bad code – rewrite it." - Brian Kernighan.
					</div>
				</div>
				<div data-line-nr="03" class="code__line">
					<div class="dot">··</div>
					<div class="comment">
						// "Give someone a program; you frustrate them for a day; teach them how to program, and you
						frustrate them for a lifetime" – David Leinweber.
					</div>
				</div>
				<div data-line-nr="04" class="code__line"></div>
				<div data-line-nr="05" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						<div class="methods">public string&nbsp;</div>
						<span class="variable">$name</span>
						<span class="methods">;</span>
					</div>
				</div>
				<div data-line-nr="06" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						<div class="methods">public string&nbsp;</div>
						<span class="variable">$email</span>
						<span class="methods">;</span>
					</div>
				</div>
				<div data-line-nr="07" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						<div class="methods">private string&nbsp;</div>
						<span class="variable">$dayOfBirthTimestamp</span>
						<span class="methods">;</span>
					</div>
				</div>
				<div data-line-nr="08" class="code__line">
				</div>
				<div data-line-nr="09" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						<div class="methods">public function&nbsp;</div>
						<span class="methodname">__construct</span>()
					</div>
				</div>
				<div data-line-nr="10" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						{
					</div>
				</div>
				<div data-line-nr="11" class="code__line">
					<div class="dot">·....·</div>
					<span class="variable">$this<span class="arrow">-></span>name</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=
					<span
						class="string">'Łukasz Fujarski';</span>
				</div>
				<div data-line-nr="12" class="code__line">
					<div class="dot">·....·</div>
					<span class="variable">$this<span class="arrow">-></span>email</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=
					<span
						class="string">'lukasz.fujarski@gmail.com';</span>
				</div>
				<div data-line-nr="13" class="code__line">
					<div class="dot">·....·</div>
					<span class="variable">$this<span class="arrow">-></span>dayOfBirthTimestamp</span>&nbsp;= <span
					class="string">856059633;</span>
				</div>
				<div data-line-nr="14" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						}
					</div>
				</div>
				<div data-line-nr="15" class="code__line"></div>
				<div data-line-nr="16" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						<div class="methods">public function&nbsp;</div>
						<span class="methodname">workExperience</span>(): <span class="methods">array</span>
					</div>
				</div>
				<div data-line-nr="17" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						{
					</div>
				</div>
				<div data-line-nr="18" class="code__line">
					<div class="dot">······</div>
					<div class="methods">return</div>
					[
				</div>
				<div data-line-nr="19" class="code__line">
					<div class="dot">······</div>
					<div>
						&nbsp;&nbsp;&nbsp;&nbsp;'2022 - now' => 'Full Stack Developer at <a
						href="https://tech-studio.pl/"
						target="_blank">Tech-Studio
						S.C.</a>',
					</div>
				</div>
				<div data-line-nr="20" class="code__line">
					<div class="dot">······</div>
					<div>
						&nbsp;&nbsp;&nbsp;&nbsp;'2018 - 2022' => 'PHP Developer at <a href="https://tech-studio.pl/"
						                                                              target="_blank">Tech-Studio
						S.C.</a>'
					</div>
				</div>
				<div data-line-nr="21" class="code__line">
					<div class="dot">······</div>
					<div>
						];
					</div>
				</div>
				<div data-line-nr="22" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						}
					</div>
				</div>

				<div data-line-nr="23" class="code__line"></div>
				<div data-line-nr="24" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						<div class="methods">public function&nbsp;</div>
						<span class="methodname lg:tooltip"
						      data-tip="Method defines only few of the technologies I've worked with. Through the time working as web developer I've gained experience in many more programming languages, frameworks and tools.">skills</span>():
						<span
							class="methods">array</span>

					</div>
				</div>
				<div data-line-nr="25" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						{
					</div>
				</div>
				<div data-line-nr="26" class="code__line">
					<div class="dot">······</div>
					<div class="methods">return</div>
					['JavaScript', 'PHP', 'CSS', 'Laravel Framework', 'SCSS', 'Vue.js 2 & 3', 'Nuxt.js', 'Tailwind CSS',
					'Git', 'MySQL', 'Docker', 'Linux', 'Apache', 'Webpack', 'Composer', 'NPM', 'Node.js', 'Adobe
					Photoshop',
					'Microsoft Office', 'Microsoft Excel', 'Microsoft SQL Server', 'Microsoft Power BI', 'Pinia',
					'Vuex',
					'Vuetify', 'Bootstrap', 'jQuery', 'HTML', 'REST API', 'Python', 'C#', 'Jira', 'Livewire'];
				</div>
				<div data-line-nr="27" class="code__line">
					<div class="dot">··</div>
					<div class="propname">
						}
					</div>
				</div>
				<div data-line-nr="28" class="code__line">
					<div class="propname">
						}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {useSkillsChartStore} from "~/store/skillsChart";

const loading = ref(true)
const dots = ref('...')
const editor = ref(null)
const onElementVisible = inject('onElementVisible')
const skillsChartStore = useSkillsChartStore()

const handleVisibility = ([{isIntersecting}], observerElement) => {
	if (isIntersecting) {
		if (editor.value) {
			observerElement.unobserve(editor.value)
		}

		setTimeout(() => {
			loading.value = false
		}, 4000)

		setInterval(() => {
			if (dots.value === '...') {
				dots.value = ''
			} else {
				dots.value += '.'
			}
		}, 300)
	}
}
useIntersectionObserver(editor, handleVisibility)
</script>