<!--
Written by Bo Pang.
Copyright (C) PBLabs 2021. All rights reserved.
-->

<template>
	<div><slot></slot></div>
</template>

<script>
export default {
	name: "PbMarkdown",
	props: {
		src: { type: String }
	},
	data: function()
	{
		return {};
	},
	mounted: function()
	{
		this.loadSrc();
	},
	methods:
	{
		loadSrc: function()
		{
			
		}
	}
}
</script>

<style scoped>
</style>