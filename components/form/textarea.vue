<template>
	<div class="form-control">
		<label class="label">
			<span class="label-text">{{ labelComputed }}:</span>
		</label>
		<label class="input-group">
			<textarea
				rows="10"
				:placeholder="placeholder"
				:class="['textarea textarea-bordered', props.class]"
				:required="required"
			>{{ value }}</textarea>
		</label>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	value: {
		type: String,
		default: null
	},
	class: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	required: {
		type: Boolean,
		default: false
	}
})

const labelComputed = computed(() => {
	let label = props.label

	if (props.required) {
		label += ' *'
	}

	return label
})
</script>