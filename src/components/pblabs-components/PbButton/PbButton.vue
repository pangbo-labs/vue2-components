<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
	<pb-tooltip-anchor style="display: inline-block;" class="the-component">
		<button :class="[ customClass ? customClass : 'pb-button', { 'default-button': isDefault, 'disabled-button': isDisabled } ]"
			:style="{ 'font-size': textSize + 'px' }" @click="onClick">
			<div v-if="iconName && showIcon" class="button-icon-div">
				<i v-if="iconType == 'GoogleSymbol'" class="material-symbols material-symbols-rounded button-icon">{{ iconName }}</i>
				<img v-else-if="iconType == 'ImageFile'" class="button-icon">
				<div v-else></div>
			</div>
			<slot>Button</slot>
		</button>
		<pb-tooltip v-if="$slots.tooltip"><slot name="tooltip"></slot></pb-tooltip>
	</pb-tooltip-anchor>
</template>

<script>
export default {
	
	name: "PbButton",

	props: {
		iconName:			{ type: String, default: "" },
		iconType:			{ type: String, default: "GoogleSymbol" }, // GoogleSymbol, ImageFile
		showIcon:			{ type: Boolean, default: true },
		showText:			{ type: Boolean, default: true },
		isDefault:			{ type: Boolean, default: false },
		isDisabled:			{ type: Boolean, default: false },
		tooltipMaxWidth:	{ type: Number, default: 250 },
		textSize:			{ type: Number, default: 13 },
		customClass:		{ type: String, default: null },
	},

	data: function() {
		return {
		}
	},

	methods: {

		onClick: function( event )
		{
			// console.log( event );
			if (this.isDisabled)
				return;
			this.$emit( "click" );
			return false;
		}

	}
}
</script>

<style scoped>
.the-component + .the-component {
	margin-left: 5px;
}

.pb-button {
	min-width: 80px;
	min-height: 30px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background: #f3f3f3;
	color: #333;
	padding: 5px 12px;
	line-height: 140%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	user-select: none;
}

.button-icon-div {
	display: inline-block;
	margin-right: 4px;
}

.button-icon {
	display: block;
	font-size: 20px;
	font-variation-settings: 'wght' 300;
}

.pb-button:hover {
	background: #f3f3f3;
	transition: all .2s;
}

.pb-button:active {
    background-color: #ececec;
}

.default-button {
	background: #47f;
	border: 1px solid #47f;
	color: #fff;
}

.default-button:hover {
	background: #69f;
	border: 1px solid #69f;
	transition: all .3s;
}

.disabled-button, .disabled-button:hover, .disabled-button:active {
	background: #eee;
	color: #999;
}
</style>
