<template>
	<div
		class="skills-chart"
		:class="{'active': skillsChartStore.visible}"
	>
		<div class="skills-chart__container">
			<button
				class="skills-chart__close"
				@click.prevent="skillsChartStore.toggle(false)"
			>
				<icon name="material-symbols:close-small" class="w-15 h-15 text-5xl"/>
			</button>

			<div class="skills-chart__content">
				<h2 class="title--x-large title--condensed">
					<span v-html="$t('mySkillsTitle')"></span>
				</h2>

				<p class="leading-7 mt-5">
					<span style="transition-delay: .6s" v-html="$t('mySkillsDescription')"/>
				</p>

				<div v-for="item in items">
					<h3 class="title--large mt-10 mb-4">{{ item.name }}</h3>

					<table
						class="w-full shadow-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden"
					>
						<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th class="px-6 py-3">{{ $t('technologiesShort') }}</th>
							<th class="px-6 py-3">{{ $t('features') }}</th>
						</tr>
						</thead>
						<tbody v-for="technology in item.technologies">
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<td class="px-6 py-4">{{ technology.name }}</td>
							<td class="px-6 py-4">
								<div class="flex flex-wrap gap-1 gap-y-3">
									<div class="badge" v-for="feature in technology.features">
										{{ feature }}
									</div>
								</div>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {useSkillsChartStore} from "~/store/skillsChart";

const skillsChartStore = useSkillsChartStore()

const items = ref([
	{
		name: 'Frontend',
		technologies: [
			{
				name: 'Vue.js',
				features: ['Vue 2', 'Vue 3', 'Composition API', 'Options API', 'Vuex Store', 'Vue Router', 'Pinia', 'Vite', 'Webpack', 'Quasar', 'Vuetify', 'VCalendar', 'VueUse']
			},
			{
				name: 'Nuxt.js',
				features: ['Nuxt 3', 'Nuxt Mapbox', 'Nuxt Mail', 'Nuxt Icon', 'Sidebase/Nuxt Auth']
			},
			{
				name: 'Others',
				features: ['JavaScript', 'TypeScript', 'EcmaScript 6', 'Mapbox', 'Leaflet', 'OpenLayers', 'Tailwind CSS', 'Alpine.js', 'Bootstrap', 'jQuery']
			},
		]
	},
	{
		name: 'Backend',
		technologies: [
			{
				name: 'Laravel',
				features: ['Laravel 7-10', 'Livewire', 'Sanctum', 'Sail', 'Spatie', 'Passport', 'Tinker', 'Mix', 'Homestead', 'Sail', 'Queues', 'Jobs', 'MVC', 'Migrations & Seeders', 'Requests', 'Cache', 'Mails', 'Broadcasts', 'Notifications', 'Task Scheduling', 'Hashing']
			},
			{
				name: 'Livewire',
				features: ['Livewire 3']
			},
			{
				name: 'Symfony',
				features: ['Twig', 'Doctrine', 'Console', 'Forms', 'Routing', 'Validator', 'Yaml']
			},
			{
				name: 'Node.js',
				features: ['Express.js', 'Sequelize', 'REST API', 'NPM', 'PM2', 'Nodemon', 'Puppeteer', 'OpenAI', 'GCloud']
			}
		]
	},
	{
		name: 'Other',
		technologies: [
			{
				name: 'Git',
				features: ['GitHub', 'Git CLI', 'Github Copilot']
			},
			{
				name: 'Docker',
				features: ['Docker Compose', 'Docker Hub', 'Docker Desktop', 'Docker CLI', 'Dockerfile']
			},
			{
				name: 'Linux',
				features: ['Ubuntu', 'Debian', 'Fedora']
			},
			{
				name: 'Apache',
				features: ['Virtual Hosts', 'Modules', 'Configuration']
			},
			{
				name: 'Others',
				features: ['Jira', 'Trello', 'Slack', 'Jenkins', 'PhpStorm', 'VS Code', 'Postman', 'Python (PySpark, Pandas, NumPy, Matplotlib)', 'Java', 'C#'],
			}
		]
	}
])
</script>

<style lang="scss" scoped>
.skills-chart {
	@apply px-2 py-10 bg-slate-100 w-screen min-w-full z-50 translate-x-full transition-transform duration-[750ms] fixed inset-0;

	@screen md {
		@apply p-10;
	}

	&.active {
		@apply translate-x-0 duration-[600ms];
	}

	&__close {
		@apply absolute top-2 right-4;

		@screen md {
			@apply top-5 right-10;
		}
	}

	&__container {
		@apply overflow-auto h-full px-2;

		@screen md {
			@apply px-10;
		}
	}
}

.badge {
	@apply bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 h-auto;
}
</style>