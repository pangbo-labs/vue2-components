<template>
	<div style="display: flex; flex-direction: row;">
		<div style="width: 250px; border-right: 1px solid #ccc; padding: 20px 20px;">
			<pb-tree :settings="tree.settings" :node-data="tree.nodes" style="font-size: 18px;"></pb-tree>
		</div>
		<router-view style="flex: 1; width: 0;" />
	</div>
</template>

<script>
export default {
	name: "SamplesHome",
	data: function()
	{
		return {
			tree: {
				settings: {
					appearance: {
						defaultNodeStyle: {
							showExpandButton: true,
							showIcon: true,
							iconSize: 20,
							iconSpacing: 4,
							childrenIndent: 24,

							cssClassName: "tree-node",
							cssClassNameSelected: "tree-node-selected",
							
							fontFamily: "",
							fontSize: "",
							fontWeight: "",
							color: "",
							
							normal:
							{
								border: "",
								background: "",
								color: "",
							},
							selected:
							{
								border: "",
								background: "",
								color: "",
							},
							hover:
							{
								border: "",
								background: "",
								color: "",
							},
						},
					}
				},
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
						text: "Tree Node Text",
						areChildrenLoaded: false,
					},
					{
						text: "Tree Node Text",
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