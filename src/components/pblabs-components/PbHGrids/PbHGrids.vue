<template>
    <div style="display: flex; flex-direction: row; align-items: center; border: 0px solid #ccc;"
         :style="{ 'padding': config.padding ? config.padding : '', 'border-width': config.showBorder ? '1px' : '0px' }">
		<div v-for="(item, itemIndex) in config.grids" :key="itemIndex" class="grid"
			:style="{ 'flex': (item.size > 0) ? ('0 0 ' + item.size + 'px') : ((item.size == 0) ? 'none' : '1 1 0'), 'text-align': item.align, 'margin-left': (itemIndex > 0) ? config.gridSpacing + 'px' : '0', 'border-width': config.showBorder ? '1px' : '0px' }">
			<slot :name="'grid_' + itemIndex"></slot>
		</div>
	</div>
</template>

<script>
export default {
    name: "PbHGrids",
    props:
    {
        config: { type: Object, default: { grids: [] } },
    },
    data: function()
    {
        return {
            defaultConfig: {
                padding: "",
				grids: [
					{ size: -1,	align: "Left" },
					{ size: 0,	align: "Right" },
				],
                gridSpacing: 0,
                showBorder: false,
			},
        }
    }
}
</script>

<style scoped>
.grid {
    border: 0px solid #ccc;
}
</style>