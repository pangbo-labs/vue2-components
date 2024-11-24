<template>
	<div ref="componentRoot" class="component">
		<div v-for="(item, itemIndex) in items" :key="itemIndex"
			class="list-item" :class="{ 'list-item-active': selection.has( item ) }" :style="{ 'display': listStyle == 'horizontal' ? 'inline-block' : 'block' }"
			@click="onItemClicked( item )">
			<slot name="item" :item="item">{{ item }}</slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "PbList",
	props:
	{
		items:			{ type: Array, default: new Array() },
		selected:		{ type: Array | Set, default: () => new Array() },
		operationMode:	{ type: String, default: "switch" },	// switch, single-select, multi-select
		itemHSpacing:	{ type: String, default: "2px" },
		itemVSpacing:	{ type: String, default: "2px" },
		listStyle:		{ type: String, default: "vertical" }, // horizontal, vertical, multi-column
	},
	model:
	{
		prop: "selected",
		event: "selection-changed",
	},
	data: function()
	{
		return {
			selection: new Set(),
		}
	},
	mounted: function()
	{
		console.log( `itemHSpacing: ${this.itemHSpacing}` );

		let componentRoot = this.$refs.componentRoot;
		if (this.listStyle == "horizontal")
		{
			componentRoot.style.setProperty( "--item-h-spacing", this.itemHSpacing );
			componentRoot.style.setProperty( "--item-v-spacing", "0px;" );
		}
		else
		{
			componentRoot.style.setProperty( "--item-h-spacing", "0px;" );
			componentRoot.style.setProperty( "--item-v-spacing", this.itemVSpacing );
		}

		let operationMode = this.operationMode.toLowerCase();
		if ((operationMode == "switch") && (this.items.length > 0))
			this.selection.add( this.items[0] );
		this.$forceUpdate();
	},
	methods:
	{
		onItemClicked: function( item )
		{
			let operationMode = this.operationMode.toLowerCase();
			if (operationMode == "switch")
			{
				if (!this.selection.has( item ))
				{
					this.selection.clear();
					this.selection.add( item );
					this.$emit( "selection-changed", this.selection );
				}
			}
			else if (operationMode == "single-select")
			{
				if (this.selection.has( item ))
				{
					this.selection.delete( item );
				}
				else // item is not selected
				{
					this.selection.clear();
					this.selection.add( item );
				}
				this.$emit( "selection-changed", this.selection );
			}
			else if (operationMode == "multi-select")
			{
				if (this.selection.has( item ))
				{
					this.selection.delete( item );
				}
				else // item is not selected
				{
					this.selection.add( item );
				}
				this.$emit( "selection-changed", this.selection );
			}
			this.$forceUpdate();
		}
	}
}
</script>

<style scoped>
.component {
	border: 1px solid rgba( 0, 0, 0, 0.2 );
	border-radius: 5px;
	padding: 7px 8px;
	overflow: scroll;
}

.list-item {
	border-radius: 3px;
	padding: 1px 8px;
	background: transparent;
	cursor: default;
}

.list-item:hover {
	background: rgba( 0, 0, 0, 0.05 );
}

.list-item + .list-item {
	margin-left: var(--item-h-spacing);
	margin-top: var(--item-v-spacing);
}

.list-item-active, .list-item-active:hover {
	background: var(--selected-background-color);
	color: var(--selected-text-color);
}
</style>