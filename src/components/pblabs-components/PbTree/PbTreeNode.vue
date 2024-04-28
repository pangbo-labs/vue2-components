<template>
	<div>

		<div v-if="((treeLevel == 0) && (indexInLevel > 0)) || (treeLevel > 0)" :style="{ height: treeComponent.nodeSpacing + 'px' }" />

		<div class="tree-node-selectable-area" :class="{ 'tree-node-selected': node == treeComponent.selectedNode }" :style="nodeStyle"
			@click="selectThisNode()" @dblclick="toggleExpanded()">
			<pb-stack :style="{ 'padding-left': (treeLevel * treeComponent.childrenIndent) + 'px' }">
				<pb-stack-item v-if="nodeStyle.showExpandButton" :size="treeComponent.expandButtonSize">
					<div v-if="nodeData.children && nodeData.children.length" class="tree-node-expand-button"
						:style="{ width: treeComponent.expandButtonSize + 'px', height: treeComponent.expandButtonSize + 'px' }"
						@click="toggleExpanded()">
						<svg aria-hidden="true" focusable="false" role="img"
							viewBox="0 0 12 12" width="12" height="12" fill="currentColor"
							class="tree-node-expand-button-icon"
							:style="{ 'font-size': treeComponent.expandButtonSize + 'px', 'transform': isExpanded ? 'rotateZ( 90deg )' : '' }">
							<path d="M4.7 10c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1L6.9 6 4.2 3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l3.3 3.2c.3.3.3.8 0 1.1L5.3 9.7c-.2.2-.4.3-.6.3Z"></path>
						</svg>
					</div>
				</pb-stack-item>
				<pb-stack-item v-if="nodeStyle.showExpandButton" :size="treeComponent.expandButtonSpacing"></pb-stack-item>
				<pb-stack-item :size="0">
					<div>
						<pb-stack>
							<pb-stack-item :size="0">
								<i v-if="nodeStyle.showIcon && nodeData.icon" class="material-symbols material-symbols-rounded tree-node-icon"
									:style="{ 'font-size': nodeStyle.iconSize + 'px', 'margin-right': nodeStyle.iconSpacing + 'px' }">
									{{ nodeData.icon }}
								</i>
							</pb-stack-item>
							<pb-stack-item :size="0">
								<div class="tree-node-text">{{ nodeData.text }}</div>
							</pb-stack-item>
						</pb-stack>
					</div>
				</pb-stack-item>
			</pb-stack>
		</div>

		<transition name="expand">
			<div v-show="isExpanded">
				<pb-tree-node v-for="(item, itemIndex) in nodeData.children" :key="itemIndex"
					:tree-component="treeComponent" :parent-node="node" :node-data="item" :tree-level="treeLevel + 1" :index-in-level="itemIndex" />
			</div>
		</transition>

	</div>
</template>

<script>
import CommonUtils from '../CommonUtils';

export default {
	name: "PbTreeNode",
	props:
	{
		treeComponent:	{ type: Object, default: () => null },
		parentNode:		{ type: Object, default: () => new Object() },
		nodeData:		{ type: Object, default: () => new Object() },
		treeLevel:		{ type: Number, default: 0 },
		indexInLevel:	{ type: Number, default: 0 },
	},
	mounted: function()
	{
		if (this.treeComponent == null)
		{
			console.log( "[PbTreeNode] Fatal error: treeComponent is null" );
		}

		this.node.parentNode = this.parentNode;
		this.node.data = this.nodeData;
	},
	data: function()
	{
		return {
			isExpanded: false,
			hasExpandedOnce: false,
			node: {}
		}
	},
	computed:
	{
		isExpandable: function()
		{
			return this.nodeData.children && (this.nodeData.children.length > 0);
		},

		nodeStyle: function()
		{
			let style = CommonUtils.copyObject( this.treeComponent.defaultNodeStyle );
			CommonUtils.mergeObject( style, CommonUtils.getObjectProperty( this.treeComponent.settings, "appearance.defaultNodeStyle" ) );
			CommonUtils.mergeObject( style, this.getLevelStyle( this.treeLevel ) );
			return style;
		},
	},
	methods:
	{
		getLevelStyle: function( level )
		{
			let levelStyleArray = CommonUtils.getObjectProperty( this.treeComponent.settings, "appearance.levelStyles" );
			if ((levelStyleArray == undefined) || (levelStyleArray == null))
				return null;
			for (let i = 0; i < levelStyleArray.length; i ++)
			{
				let style = levelStyleArray[i];
				if (style.level == level)
					return style;
			}
			return null;
		},

		toggleExpanded: function()
		{
			if (this.nodeData.areChildrenLoaded && this.treeComponent.settings.callbacks.loadChildren)
			{
				this.treeComponent.settings.callbacks.loadChildren( this.nodeData );
			}
			this.isExpanded = !this.isExpanded;
		},

		selectThisNode: function()
		{
			this.treeComponent.selectNode( this.node );
		},
	}
}
</script>

<style scoped>
.tree-node-expand-button {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	cursor: default;
	user-select: none;
	transition: all .3s;
}

.tree-node-expand-button-icon {
	display: block;
	cursor: default;
	user-select: none;
	transition: all .3s;
}

.tree-node-selectable-area {
	padding: 2px 4px;
	transition: all .3s;
}

.tree-node-selectable-area:hover {
	background: #eee;
	transition: all .3s;
}

.tree-node-selected, .tree-node-selected:hover {
	background: #ddd;
	color: #000;
}

.tree-node-icon {
	display: block;
	user-select: none;
}

.tree-node-text {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 0px;
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