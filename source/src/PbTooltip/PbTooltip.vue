<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
	<div class="tooltip" :style="{ 'max-width': maxWidth + 'px' }" >
        <slot></slot>
    </div>
</template>

<script>
export default {
	name: "PbTooltip",
    props: {
        maxWidth: { type: Number, default: 250 },
    },
	data: function() {
		return {
		}
	}
}
</script>

<style scoped>
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

.tooltip-anchor:hover .tooltip {
    visibility:		visible;
    opacity:		1;
}

.tooltip p {
    color:			var(--tooltip-text-color);
    line-height:	var(--tooltip-line-height);
    margin:			0 0 0 0;
}
</style>
