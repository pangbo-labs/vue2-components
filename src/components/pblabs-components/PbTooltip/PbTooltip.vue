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
    background-color: #555;
    color: #fff;
    padding: 8px 12px;
    line-height: 150%;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s;
    visibility:  hidden;
    margin-top: 2px;
}

.tooltip::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 20px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #555 transparent;
}

.tooltip-anchor:hover .tooltip {
    visibility: visible;
    opacity: 1;
}

.tooltip p {
    color: #fff;
    line-height: 150%;
    margin: 0 0 0 0;
}
</style>
