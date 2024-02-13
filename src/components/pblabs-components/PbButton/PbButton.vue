<template>
	<pb-tooltip-anchor style="display: inline-block;">
		<button class="pb-button" :class="{ 'default-button': isDefault, 'disabled-button': isDisabled }" :style="{ 'font-size': textSize + 'px' }" @click="onClick">
			<i v-if="iconName && showIcon" class="material-symbols material-symbols-rounded button-icon">{{ iconName }}</i>
			<slot></slot>
		</button>
		<pb-tooltip v-if="$slots.tooltip"><slot name="tooltip"></slot></pb-tooltip>
	</pb-tooltip-anchor>
</template>

<script>
export default {
	
	name: "PbButton",

	props: {
		iconName:			{ type: String, default: "" },
		showIcon:			{ type: Boolean, default: true },
		showText:			{ type: Boolean, default: true },
		isDefault:			{ type: Boolean, default: false },
		isDisabled:			{ type: Boolean, default: false },
		tooltipMaxWidth:	{ type: Number, default: 250 },
		textSize:			{ type: Number, default: 13 },
	},

	data: function() {
		return {
		}
	},

	methods: {

		onClick: function( event )
		{
			console.log( event );
			if (this.isDisabled)
				return;
			this.$emit( "click" );
			return false;
		}

	}
}
</script>

<style scoped>
.pb-button {
	min-width: 80px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background: #f3f3f3;
	color: #333;
	padding: 5px 12px;
	line-height: 140%;
	user-select: none;
}

.button-icon {
	display: inline-block;
	font-size: 20px;
	font-variation-settings: 'wght' 300;
	margin-right: 4px;
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

.pb-button + .pb-button {
	margin-left: 4px;
}
</style>
