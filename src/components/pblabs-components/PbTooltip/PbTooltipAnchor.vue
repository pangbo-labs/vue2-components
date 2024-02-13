<template>
	<div class="tooltip-anchor">
        <slot></slot>
	</div>
</template>

<script>
export default {
	name: "PbTooltipAnchor",
	data: function() {
		return {
		}
	}
}
</script>

<style scoped>
.tooltip-anchor {
    cursor: default;
	display: inline-block;
}
</style>
