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
				flexDirection: this.direction == "Horizontal" ? "row" : column,
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