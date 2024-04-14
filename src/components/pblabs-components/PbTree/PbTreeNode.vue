<template>
	<div>

		<div class="tree-node-selectable-area" :class="{ 'tree-node-selected': node == treeComponent.selectedNode }" @click="selectThisNode()">
			<pb-stack :style="{ 'padding-left': (treeLevel * childrenIndent) + 'px' }">
				<pb-stack-item :size="expandButtonSize">
					<i v-if="isExpandable"
						class="material-symbols material-symbols-rounded tree-node-expand-button"
						:style="{ 'font-size': expandButtonSize + 'px' }"
						@click="toggleExpanded()">
						expand_circle_right
					</i>
				</pb-stack-item>
				<pb-stack-item :size="expandButtonSpacing"></pb-stack-item>
				<pb-stack-item :size="0">
					<pb-stack>
						<pb-stack-item :size="0">
							<i class="material-symbols material-symbols-rounded tree-node-icon"
								:style="{ 'font-size': iconSize + 'px' }">
								{{ nodeData.icon }}
							</i>
						</pb-stack-item>
						<pb-stack-item :size="iconSpacing"></pb-stack-item>
						<pb-stack-item :size="0">
							<div class="tree-node-text">{{ nodeData.text }}</div>
						</pb-stack-item>
					</pb-stack>
				</pb-stack-item>
			</pb-stack>
		</div>

		<transition name="expand">
			<div v-show="isExpanded">
				<pb-tree-node v-for="(item, itemIndex) in nodeData.children" :key="itemIndex"
					:tree-component="treeComponent" :parent-node="node" :node-data="item" :tree-level="treeLevel + 1" />
			</div>
		</transition>

	</div>
</template>

<script>
import PbStackItem from '../PbStack/PbStackItem.vue'
export default {
    components: { PbStackItem },
	name: "PbTreeNode",
	props:
	{
		treeComponent:	{ type: Object, default: () => new Object() },
		parentNode:		{ type: Object, default: () => new Object() },
		nodeData:		{ type: Object, default: () => new Object() },
		treeLevel:		{ type: Number, default: 0 },
	},
	mounted: function()
	{
		this.node.parentNode = this.parentNode;
		this.node.data = this.nodeData;
	},
	data: function()
	{
		return {
			isExpanded: false,
			expandButtonSize: 20,
			expandButtonSpacing: 4,
			iconSize: 20,
			iconSpacing: 0,
			childrenIndent: 20,
			node: {}
		}
	},
	computed:
	{
		isExpandable: function()
		{
			return this.nodeData.children && (this.nodeData.children.length > 0);
		}
	},
	methods:
	{
		toggleExpanded: function()
		{
			this.isExpanded = !this.isExpanded;
		},

		selectThisNode: function()
		{
			console.log( "selectThisNode()" );
			this.treeComponent.selectNode( this.node );
		}
	}
}
</script>

<style scoped>
.tree-node-expand-button {
	display: block;
	cursor: default;
	user-select: none;
}

.tree-node-selectable-area {
	padding: 1px 5px;
	transition: all .3s;
}

.tree-node-selectable-area:hover {
	background: #eee;
	transition: all .3s;
}

.tree-node-selected, .tree-node-selected:hover {
	background: #999;
	color: #fff;
}

.tree-node-icon {
	display: block;
	user-select: none;
}

.tree-node-text {
	padding: 1px 5px;
	cursor: default;
	user-select: none;
}

.expand-enter-active, .expand-leave-active {
	transition: all 0.1s;
}

.expand-enter, .expand-leave-to {
	opacity: 0;
	transform: translateY( -50% );
}
</style>