<template>
	<div class="form-control">
		<label class="label">
			<span class="label-text">{{ labelComputed }}:</span>
		</label>
		<label class="input-group">
			<input
				:type="type"
				:placeholder="placeholder"
				:class="['input input-bordered', props.class]"
				:required="required"
				:value="value"
			/>
		</label>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	type: {
		type: String,
		default: 'text'
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
	},
	value: {
		type: String,
		default: null
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