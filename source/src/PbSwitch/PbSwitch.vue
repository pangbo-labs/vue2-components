<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
	<div>

		<div v-if="type === 'Button'" class="button-style-switch" @click="onClicked()">
			<slot></slot>
		</div>

		<div v-if="type === 'CheckBox'" class="checkbox-style-switch" @click="onClicked()">
			<pb-stack>
				<pb-stack-item :size="22">
					<svg v-if="!state" style="display: block;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
						<path d="M3 3H15V15H3ZM4 4H14V14H4Z" style="fill-rule: evenodd; fill: green" />
					</svg>
					<svg v-if="state" style="display: block;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
						<path d="M3 3H15V15H3ZM4 4H14V14H4ZM5 9.2L8 12.2L13 7.2L11.6 5.8L8 9.4L6.4 7.8Z" style="fill-rule: evenodd; fill: green" />
					</svg>
				</pb-stack-item>
				<pb-stack-item :size="2"></pb-stack-item>
				<pb-stack-item :size="0">
					<slot></slot>
				</pb-stack-item>
			</pb-stack>
		</div>

		<div v-if="type === 'Switch'" class="switch-style-switch">
			<div style="display: flex; flex-direction: row;">
				<div style="flex: 1; width: 0;">
					<slot></slot>
				</div>
				<div style="width: 10px;"></div>
				<div @click="onClicked()">
					<div class="pb-switch-switch"
						:style="{ 'width': (switchSize * 2) + 'px', 'height': switchSize + 'px', 'border-width': switchBorderSize + 'px', 'border-color': state ? switchOnColor : switchOffColor, 'background': state ? switchOnColor : switchOffColor }">
						<div class="pb-switch-slider"
							:style="{ 'width': switchSize + 'px', 'height': switchSize + 'px', 'margin-left': state ? 'auto' : '0', 'margin-right': state ? '0' : 'auto' }" />
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	name: "PbSwitch",
	props:
	{
		type:	{ type: String, default: "CheckBox" }, // Available values: CheckBox, Button, Switch
		// state:	{ type: Boolean, default: false },
	},
	data: function()
	{
		return {
			state: false,			
			switchSize: 15,
			switchBorderSize: 3,
			switchOnColor: "#36f",
			switchOffColor: "#ccc",
		}
	},
	methods:
	{
		onClicked: function()
		{
			this.state = !this.state;
			this.$emit( "state-changed", this.state );
		}
	}
}
</script>

<style scoped>
.button-style-switch {
	padding: 3px 8px;
}

.pb-switch-switch {
	display: block;
	width: 32px;
	height: 16px;
	border: 4px solid #36f;
	border-radius: 16px;
	background: #36f;
	transition: all .3s;
}

.pb-switch-slider {
	display: block;
	width: 16px;
	height: 16px;
	background: #fff;
	border-radius: 16px;
	transition: all .3s;
}
</style>