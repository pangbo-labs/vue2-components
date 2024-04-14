<template>
	<div class="pb-tree">
		<pb-tree-node :tree-component="treeComponent" :parent-node="null" :node-data="treeConfig.nodes[0]" />
	</div>
</template>

<script>
export default {
	name: "PbTree",
	props:
	{
		treeConfig: { type: Object, default: () => new Object() },
	},
	data: function()
	{
		return {
			selectedNode: null,
		}
	},
	computed:
	{
		treeComponent: function()
		{
			return this;
		},
	},
	methods:
	{
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