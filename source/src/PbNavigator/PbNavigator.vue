<template>
	<div>
		<pb-list :items="naviItems" :list-style="direction == 'vertical' ? 'vertical' : 'horizontal'" item-h-spacing="6px"
			@selection-changed="onListSelectionChanged">
			<template v-slot:item="data">
				<div style="padding: 5px 3px 3px 3px; line-height: 130%;">
					{{ data.item.textId ? $t( data.item.textId ) : data.item.text }}
				</div>
			</template>
		</pb-list>
	</div>
</template>

<script>
export default {
	name: "PbImage",
	props: {
		direction:	{ type: String, default: "horizontal" }, // horizontal, vertical
		naviItems:	{ type: Array, default: new Array() },
	},
	methods:
	{
		onListSelectionChanged: function( newSelection )
		{
			let array = Array.from( newSelection );
			this.$emit( "active-item-changed", array[0] );
		}
	}
}
</script>

<style scoped>
</style>
