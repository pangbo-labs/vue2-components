<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

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
