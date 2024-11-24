<template>
	<div style="display: flex; flex-direction: row;">
		<div style="width: 250px; border-right: 1px solid #ccc; padding: 20px 20px;">
			<pb-tree :settings="tree.settings" :node-data="tree.nodes" style="font-size: 14px;" @node-selected="onTreeNodeSelected"></pb-tree>
		</div>
		<div style="flex: 1; width: 0; padding: 20px 30px; display: flex; flex-direction: column;">
			<div style="font-size: 24px;">{{ currentNode == null ? "" : currentNode.data.text }}</div>
			<router-view style="flex: 1; height: 0;" />
		</div>
	</div>
</template>

<script>
export default {
	name: "DocHome",
	data: function()
	{
		return {

			currentNode: null,

			tree: {
				nodes: [
					{
						text: "Overview",
						children: [
							{
								text: "Tree Node Text",
								children: [],
							},
							{
								text: "包含子节点的节点",
								children: [
									{
										text: "Tree Node Text",
										children: [],
									},
									{
										text: "Tree Node Text",
										children: [],
									},
								],
							},
							{
								text: "Tree Node Text",
								children: [],
							},
						],
					},
					{
						text: "Basic Components",
						children: [
							{
								text: "Button",
								routePath: "pb-button"
							},
							{
								text: "Text Field",
							},
							{
								text: "Switch",
								routePath: "pb-switch"
							},
							{
								text: "Select",
								routePath: "pb-select"
							},
							{
								text: "Table",
								routePath: "pb-table"
							},
							{
								text: "Tree",
								routePath: "pb-tree"
							},
							{
								text: "Tab Bar",
								routePath: "pb-tab-bar"
							},
							{
								text: "Form",
								routePath: "pb-form"
							},
							{
								text: "List",
								routePath: "pb-list"
							},
							{
								text: "Context Menu",
								routePath: "pb-context-menu"
							},
						],
					},
					{
						text: "Layout Components",
						children: [
							{
								text: "Stack",
							}
						],
					},
					{
						text: "Dialog Boxes",
						children: [
							{
								text: "Dialog Box",
							},
							{
								text: "Message Box",
							},
							{
								text: "Confirm Box",
							},
						],
					},
				],
			}
		}
	},
	methods:
	{
		onTreeNodeSelected: function( selectedNode )
		{
			console.log( selectedNode );
			console.log( this.$route );
			this.currentNode = selectedNode;
			if (selectedNode.data.routePath)
				this.$router.push( "/docs/" + selectedNode.data.routePath );
		}
	}
}
</script>

<style scoped>
</style>