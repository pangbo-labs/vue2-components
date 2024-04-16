<template>
	<div class="pb-tree">
		<pb-tree-node v-for="(item, itemIndex) in nodeData" :key="itemIndex"
			:tree-component="treeComponent" :parent-node="null" :node-data="item" />
	</div>
</template>

<script>
export default {
	name: "PbTree",
	props:
	{
		settings:	{ type: Object, default: () => new Object() },
		nodeData:	{ type: Array, default: () => new Object() },
	},
	data: function()
	{
		return {
			selectedNode: null,

			expandButtonSize: 20,
			expandButtonSpacing: 2,
			showIcon: true,
			iconSize: 20,
			iconSpacing: 4,
			childrenIndent: 25,
		}
	},
	computed:
	{
		treeComponent: function()
		{
			return this;
		},
	},
	mounted: function()
	{
		this.applySettingsValues();
	},
	methods:
	{
		applySettingsValues: function()
		{
			this.expandButtonSize = this.settings.appearance && this.settings.appearance.expandButtonSize ?
				this.settings.appearance.expandButtonSize : this.expandButtonSize;
			this.expandButtonSpacing = this.settings.appearance && this.settings.appearance.expandButtonSpacing ?
				this.settings.appearance.expandButtonSpacing : this.expandButtonSpacing;
			this.showIcon = this.settings.appearance && this.settings.appearance.showIcon ?
				this.settings.appearance.showIcon : this.showIcon;
			this.iconSize = this.settings.appearance && this.settings.appearance.iconSize ?
				this.settings.appearance.iconSize : this.iconSize;
			this.iconSpacing = this.settings.appearance && this.settings.appearance.iconSpacing ?
				this.settings.appearance.iconSpacing : this.iconSpacing;
			this.childrenIndent = this.settings.appearance && this.settings.appearance.childrenIndent ?
				this.settings.appearance.childrenIndent : this.childrenIndent;
		},

		selectNode: function( node )
		{
			this.selectedNode = node;
			this.$emit( "node-selected", this.selectedNode );
			console.log( this.selectedNode );
		}
	}
}
</script>

<style scoped>
.pb-tree {
	overflow: auto;
}
</style>