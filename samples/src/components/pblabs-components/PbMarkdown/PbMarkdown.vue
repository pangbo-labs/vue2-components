<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
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