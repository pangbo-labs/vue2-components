<template>
	<div>
		<pb-button @click="onButtonClicked()">
			<slot name="button"></slot>
		</pb-button>
		<transition name="dropdown">
			<div v-if="isDropdownVisible" class="dropdown">
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
		}
	},
	methods:
	{
		onButtonClicked: function()
		{
			this.isDropdownVisible = !this.isDropdownVisible;
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
	margin-top: 6px;
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