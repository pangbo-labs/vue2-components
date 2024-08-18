<!--
Written by Bo Pang.
Copyright (C) PBLabs 2021. All rights reserved.
-->

<template>
	<div class="pb-tree">
		<pb-tree-node v-for="(item, itemIndex) in nodeData" :key="itemIndex"
			:tree-component="treeComponent" :parent-node="null" :node-data="item" :index-in-level="itemIndex" />
	</div>
</template>

<script>
import CommonUtils from '../CommonUtils';
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

			nodeSpacing: 2,
			expandButtonSize: 20,
			expandButtonSpacing: 2,
			childrenIndent: 18,

			defaultNodeStyle: {
				showExpandButton: true,
				showIcon: true,
				iconSize: 20,
				iconSpacing: 4,
			},
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
			this.nodeSpacing = CommonUtils.getObjectPropertyWithDefault( this.settings,
				"appearance.nodeSpacing", this.nodeSpacing );
			this.expandButtonSize = CommonUtils.getObjectPropertyWithDefault( this.settings,
				"appearance.expandButtonSize", this.expandButtonSize );
			this.expandButtonSpacing = CommonUtils.getObjectPropertyWithDefault( this.settings,
				"appearance.expandButtonSpacing", this.expandButtonSpacing );
		},

		getUserDefinedValue: function( object, propertyPath, defaultValue )
		{
			let value = CommonUtils.getObjectProperty( object, propertyPath );

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