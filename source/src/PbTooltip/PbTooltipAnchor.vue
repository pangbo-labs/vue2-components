<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
	<div ref="target" class="tooltip-anchor" @mousemove="onAnchorMouseMove" @mouseout="onAnchorMouseOut">
		<slot name="target"></slot>
		<div v-if="$slots.tooltip" ref="tooltip" class="tooltip"
			:style="{
				// left: tooltipLeft + 'px',
				// top: tooltipTop + 'px',
				// visibility: showTooltip ? 'visible' : 'hidden',
				// opacity: showTooltip ? 1 : 0,
				'max-width': maxTooltipWidth + 'px'
				}">
			<slot name="tooltip">Tooltip Text</slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "PbTooltipAnchor",
	props: {
        maxTooltipWidth: { type: Number, default: 250 },
    },
	data: function() {
		return {
			showTooltip: false,
			tooltipLeft: 0,
			tooltipTop: 0,
			tooltipTargetSpacing: 2,
		}
	},
	methods:
	{
		onAnchorMouseMove: function( event )
		{
			let targetElement = this.$refs.target;
			if (!targetElement)
				return;
			
			let tooltipElement = this.$refs.tooltip;
			if (!tooltipElement)
				return;

			let position = this.getElementPosition( targetElement );

			tooltipElement.style.position = "absolute";
			tooltipElement.style.left = (position.x + targetElement.offsetWidth / 2 - 30) + "px";
			tooltipElement.style.top = (position.y + targetElement.offsetHeight + this.tooltipTargetSpacing) + "px";
			tooltipElement.style.opacity = "1";
			tooltipElement.style.visibility = "visible";

			// this.tooltipLeft = position.x;
			// this.tooltipTop = (position.y + event.target.offsetHeight);
			// this.showTooltip = true;
		},

		onAnchorMouseOut: function()
		{
			// this.showTooltip = false;

			let tooltipElement = this.$refs.tooltip;
			if (!tooltipElement)
				return;

			tooltipElement.style.opacity = "0";
			tooltipElement.style.visibility = "hidden";
		},

		onTooltipMouseMove: function( event )
		{
			let tooltipElement = this.$refs.tooltip;
			if (!tooltipElement)
				return;

			tooltipElement.style.visibility = "visible";
		},

		getElementPosition: function( element )
		{
			var x = 0;
			var y = 0;
			var tempElement = element;
			while (tempElement && (tempElement != document.body)) {
				x += tempElement.offsetLeft;
				y += tempElement.offsetTop;
				tempElement = tempElement.offsetParent;
			}

			var scrollX = 0;
			var scrollY = 0;
			tempElement = element;
			while (tempElement && (tempElement != document.body)) {
				scrollX += tempElement.scrollLeft;
				scrollY += tempElement.scrollTop;
				tempElement = tempElement.parentElement;
			}

			x -= scrollX;
			y -= scrollY;

			return { x: x, y: y };
		},
	}
}
</script>

<style scoped>
.tooltip-anchor {
    cursor: default;
	display: inline-block;
}

.tooltip {
    background-color:	var(--tooltip-background);
    color:				var(--tooltip-text-color);
    padding:			var(--tooltip-padding);
	font-size:			var(--tooltip-text-size);
    line-height:		var(--tooltip-line-height);
    border-radius:		var(--tooltip-border-radius);
    position:			absolute;
    z-index:			1;
    opacity:			0;
    transition:			opacity 0.6s;
    visibility:			hidden;
    margin-top:			5px;
	left:				0px;
	top:				0px;
	text-align:			left;
}

.tooltip::after {
    content:		"";
    position:		absolute;
    bottom:			100%;
    left:			20px;
    border-width:	5px;
    border-style:	solid;
    border-color:	transparent transparent var(--tooltip-background) transparent;
}

/* .tooltip-anchor:hover .tooltip {
    visibility:		visible;
    opacity:		1;
} */

.tooltip p, .tooltip div {
    color:			var(--tooltip-text-color);
    line-height:	var(--tooltip-line-height);
    margin:			0 0 0 0;
}
</style>
