<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
	<div>
		<div style="border: 1px solid #ccc; border-radius: 3px; padding: 4px 8px;">
			<div style="display: flex; flex-direction: row;">
				<div style="margin-left: 6px; flex: auto;">
					{{ selectedOption ? selectedOption.displayText : "" }}
				</div>
				<div style="margin-left: 4px; flex: 1; width: 0;">
					<svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-triangle-down"
						viewBox="0 0 16 16" width="16" height="16" fill="currentColor"
						style="display:inline-block;user-select:none;vertical-align:text-bottom;overflow:visible">
						<path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path>
					</svg>
				</div>
			</div>
		</div>
		<pb-basic-popup ref="popup" trigger-element="previous-sibling" :show-when="[ 'right-clicked', 'clicked' ]" positioning-mode="element" :sync-element-size="true">
			<div v-if="dropdownType == 'Options'">
				<div v-for="(item, itemIndex) in testOptions" :key="itemIndex">
					<div v-if="item.value == '-'" class="dropdown-menu-seperator"></div>
					<div v-else class="dropdown-option"
						:class="{ 'dropdown-option-selected': selectedOption && (item.value == selectedOption.value) }"
						@click="onOptionSelected( itemIndex )">
						{{ item.displayText }}
					</div>
				</div>
			</div>
		</pb-basic-popup>
	</div>
</template>

<script>
export default {
	name: "PbSelect",
	props:
	{
		options: { type: Array, default: null },
	},
	data: function()
	{
		return {
			dropdownType: "Options",

			testOptions: [
				{ value: "last24Hours", displayText: "Last 24 Hours", description: "" },
				{ value: "last7Days", displayText: "Last 7 Days", description: "" },
				{ value: "last30Days", displayText: "Last 30 Days", description: "" },
				{ value: "last90Days", displayText: "Last 90 Days", description: "" },
				{ value: "-" }, // seperator
				{ value: "customized", displayText: "Customized", description: "" },
			],
			value: "last24Hours",
			selectedOption: null,

			isDropdownVisible: false,
			spaceBetweenScreenEdge: 20,
		}
	},
	mounted: function()
	{
		this.selectedOption = this.findOptionByValue( this.value );
	},
	methods:
	{
		findOptionByValue: function( value )
		{
			if (!value || (value.trim().length == 0))
				return null;

			for (var i = 0; i < this.testOptions.length; i ++)
			{
				var option = this.testOptions[i];
				if (option.value == value)
					return option;
			}

			return null;
		},

		onOptionSelected: function( optionIndex )
		{
			this.$refs.popup.hideThePopup();
			this.selectedOption = this.testOptions[optionIndex];
			this.value = this.selectedOption.value;
			this.$emit( "option-selected", this.selectedOption );
		},
	}
}
</script>

<style scoped>
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

.dropdown-menu-seperator {
	margin: 4px 0px;
	height: 1px;
	background: #e6e6e6;
}
</style>