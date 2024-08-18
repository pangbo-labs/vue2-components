<!--
Written by Bo Pang.
Copyright (C) PBLabs 2021. All rights reserved.
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
		size: { type: Number, default: -1 },
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