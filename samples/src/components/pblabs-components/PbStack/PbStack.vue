<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
	<div style="display: flex;" :style="containerStyle">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "PbStack",
	props:
	{
		direction: { type: String, default: "Horizontal" },  // Horizontal, Vertical
		padding: { type: String, default: "" },
		itemSpacing: { type: Number, default: 0 },
		alignItems: { type: String, default: "center" }, // center, top, bottom, left, right
	},
	data: function()
	{
		return {}
	},
	computed:
	{
		containerStyle: function()
		{
			return {
				flexDirection: this.direction == "Horizontal" ? "row" : "column",
				padding: this.padding,
				alignItems: (this.direction == "Horizontal" && this.alignItems) ? this.alignItems : "",
				justifyContent: (this.direction != "Horizontal" && this.alignItems) ? this.alignItems : "",
				gap: this.itemSpacing + 'px',
			};
		}
	}
}
</script>

<style scoped>
</style>