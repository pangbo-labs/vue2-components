<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
	<div>
		<pb-button ref="button" @click="onButtonClicked()" :custom-class="config.buttonClass">
			<div style="display: flex; flex-direction: row;">
				<div style="margin-left: 6px;">
					<slot name="button"></slot>
				</div>
				<div style="margin-left: 4px;">
					<svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-triangle-down" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display:inline-block;user-select:none;vertical-align:text-bottom;overflow:visible"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path></svg>
				</div>
			</div>
		</pb-button>
		<transition name="dropdown">
			<div v-if="isDropdownVisible" ref="popup" class="dropdown">
				<slot name="dropdown">
					<div v-if="config.dropdownType == 'Options'">
						<div v-for="(item, itemIndex) in config.dropdownOptions" :key="itemIndex" class="dropdown-option"
							:class="{ 'dropdown-option-selected': config.markSelectedOption && (itemIndex == config.selectedOption) }"
							@click="onOptionSelected( itemIndex )">
							{{ item.diaplayName }}
						</div>
					</div>
				</slot>
			</div>
		</transition>
	</div>
</template>

<script>
/*

	sampleConfig: {
		dropdownType: "Options", // "Options", "Custom"
		dropdownHorizontalAlign: "Left", // Left, Right
		dropdownOptionStyle: "nameOnly", // "nameAndDesc"
		dropdownOptions: [
			{ diaplayName: "English", value: "en-US" },
			{ diaplayName: "Chinese (Simplified)", value: "zh-CN" },
			{ diaplayName: "Chinese (Traditional)", value: "zh-TW" },
			{ diaplayName: "French", value: "fr-FR" },
			{ diaplayName: "German", value: "ge-GE" },
			{ diaplayName: "Japanese", value: "jp-JA" },
		],
		selectedOption: 0,
		markSelectedOption: true,
	},

*/

import CommonUtils from "../CommonUtils.js"

export default {
	name: "PbDropdownButton",
	props:
	{
		config: { type: Object, default: new Object() },
	},
	data: function()
	{
		return {
			isDropdownVisible: false,
			spaceBetweenScreenEdge: 20,
		}
	},
	watch:
	{
		isDropdownVisible: function( newValue, oldValue )
		{
			if (newValue) {
				document.addEventListener( 'mousedown', this.onMouseDown );
				this.$nextTick( () => {
					var button = this.$refs.button.$el;
					var buttonExtent = CommonUtils.getElementExtent( button );
					var popup = this.$refs.popup;
					if (this.config.dropdownHorizontalAlign && (this.config.dropdownHorizontalAlign == "Right"))
					{
						var left = buttonExtent.right - popup.offsetWidth;
						left = Math.max( left, this.spaceBetweenScreenEdge );
						popup.style.left = (buttonExtent.right - popup.offsetWidth) + "px";
					}
					else
					{
						var left = buttonExtent.left;
						left = Math.min( left, document.body.clientWidth - this.spaceBetweenScreenEdge - popup.offsetWidth );
						console.log( `buttonExtent.left: ${buttonExtent.left}, left: ${left}` );
						popup.style.left = left + "px";
					}
				} );
			} else {
				document.removeEventListener( 'mousedown', this.onMouseDown );
			}
		}
	},
	methods:
	{
		onButtonClicked: function()
		{
			this.isDropdownVisible = !this.isDropdownVisible;
		},

		onMouseDown: function( event )
		{
			// console.log( event );
			// console.log( `event.clientX: ${event.clientX}, event.clientY: ${event.clientY} ` );

			var button = this.$refs.button.$el;
			var buttonExtent = CommonUtils.getElementExtent( button );
			if ((event.clientX >= buttonExtent.left) && (event.clientX < buttonExtent.right) &&
				(event.clientY >= buttonExtent.top) && (event.clientY < buttonExtent.bottom))
			{
				console.log( "clicked the button" );
				event.stopPropagation();
				return;
			}

			var popup = this.$refs.popup;
			if (!popup)
				return;
			var popupExtent = CommonUtils.getElementExtent( popup );
			if ((event.clientX < popupExtent.left) || (event.clientX > popupExtent.right) ||
				(event.clientY < popupExtent.top) || (event.clientY > popupExtent.bottom))
			{
				console.log( "clicked outside of the popup" );
				this.isDropdownVisible = false;
			}
		},

		onOptionSelected: function( optionIndex )
		{
			this.isDropdownVisible = false;
			this.config.selectedOption = optionIndex;
			this.$emit( "option-selected", this.config.dropdownOptions[optionIndex] );
		},
	}
}
</script>

<style scoped>
.dropdown {
	position: absolute;
	margin-top: 5px;
	border: 1px solid #EBEEF5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	background: #fff;
	padding: 4px 4px;
}

.dropdown-enter-active, .dropdown-leave-active {
	transition: opacity 0.5s;
}

.dropdown-enter, .dropdown-leave-to {
	opacity: 0;
	transform: scaleY( 0 );
}

.dropdown-option {
    padding: var(--popup-menu-item-padding);
    font-size: var(--popup-menu-item-text-size);
    line-height: var(--popup-menu-item-line-height);
	color: var(--popup-menu-item-text-color);
	text-align: left;
    white-space: nowrap;
    height: auto;
	user-select: none;
}

.dropdown-option:hover {
	background-color: var(--hovered-background);
	color: var(--hovered-text-color);
	font-weight: var(--hovered-text-weight);
}

.dropdown-option-selected, .dropdown-option-selected:hover {
	font-weight: bold;
}
</style>