<template>
	<div style="display: flex; flex-direction: row;">
		<div style="width: 250px; border-right: 1px solid #ccc; padding: 20px 20px;">
			<pb-tree :settings="tree.settings" :node-data="tree.nodes" style="font-size: 14px;"></pb-tree>
		</div>
		<router-view style="flex: 1; width: 0;" />
	</div>
</template>

<script>
export default {
	name: "DocumentationHome",
	data: function()
	{
		return {
			tree: {
				nodes: [
					{
						text: "Tree Node Text",
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
							},
							{
								text: "Text Field",
							},
							{
								text: "Switch",
							},
							{
								text: "Select",
							},
							{
								text: "Table",
							},
							{
								text: "Tree",
							},
							{
								text: "Tab Bar",
							},
							{
								text: "Form",
							},
							{
								text: "Context Menu",
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

	}
}
</script>

<style scoped>
</style>