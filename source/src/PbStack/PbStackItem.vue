<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
	<div :style="{ 'flex': (size > 0) ? ('0 0 ' + size + 'px') : ((size == 0) ? 'none' : '1 1 0'), 'text-align': align }">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "PbStackItem",
	props:
	{
		size: { type: Number, default: -1 }, // > 0: specified size, 0: content size, < 0: auto fill
		align: { type: String, default: "Left" },
	},
	data: function()
	{
		return {}
	}
}
</script>

<style scoped>
</style>