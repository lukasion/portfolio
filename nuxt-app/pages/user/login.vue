<template>
	<UCard class="max-w-sm w-full mx-auto my-10">
		<UAuthForm
			v-if="!isAuthenticated"
			:fields="fields"
			:validate="validate"
			title="Login to Admin Panel"
			align="top"
			icon="i-heroicons-lock-closed"
			:ui="{ base: 'text-center', footer: 'text-center' }"
			@submit="onSubmit"
		>
			<template #description>
				ACP NuxtCMS
			</template>
		</UAuthForm>

		<UAuthForm
			v-else
			title="Logout of ACP"
			align="top"
			icon="i-heroicons-lock-closed"
			@submit="userStore.logout"
			:ui="{ base: 'text-center', footer: 'text-center' }"
		>
			<template #description>
				Are you sure you want to logout?
			</template>
		</UAuthForm>
	</UCard>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user";
import type {FormError} from '#ui/types'

const userStore = useUserStore()
const {isAuthenticated} = useSanctumAuth();

const fields = [{
	name: 'email',
	type: 'text',
	label: 'Email',
	placeholder: 'Enter your email'
}, {
	name: 'password',
	label: 'Password',
	type: 'password',
	placeholder: 'Enter your password'
}]

const validate = (state: any) => {
	const errors: FormError[] = []
	if (!state.email) errors.push({path: 'email', message: 'Email is required'})
	if (!state.password) errors.push({path: 'password', message: 'Password is required'})
	return errors
}

function onSubmit(data: any) {
	userStore.login(data)
}
</script>