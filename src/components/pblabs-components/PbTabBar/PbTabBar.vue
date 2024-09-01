<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
	<div class="tab-bar-component">
		<div ref="tabBar" class="tab-bar">
			<div v-for="(item, itemIndex) in tabs" :key="itemIndex"
				class="tab-button" :class="{ 'tab-button-current': itemIndex == currentItem }"
				@click="setCurrentTab( itemIndex )">
				<div :ref="makeTabButtonRef( itemIndex )">{{ item.textId ? $t( item.textId ) : item.text }}</div>
			</div>
		</div>
		<div ref="currentIndicator" class="current-indicator"></div>
	</div>
</template>

<script>
export default {
	name: "PbTabBar",
	props:
	{
		tabs: { type: Array, default: [] }
	},
	data: function()
	{
		return {
			currentItem: 0,
		}
	},
	mounted: function()
	{
		this.$refs.currentIndicator.style.top = (0 - Math.round( this.$refs.currentIndicator.offsetHeight / 2 )) + "px";
		this.adjustCurrentIndicator();
	},
	methods:
	{
		makeTabButtonRef: function( index )
		{
			return "tabButton_" + index;
		},

		setCurrentTab: function( index )
		{
			this.currentItem = index;
		},

		adjustCurrentIndicator: function()
		{
			var currentTabRef = this.makeTabButtonRef( this.currentItem );
			var currentTab = this.$refs[currentTabRef][0];
			this.$refs.currentIndicator.style.position = "relative";
			this.$refs.currentIndicator.style.left = (currentTab.offsetLeft - this.$refs.tabBar.offsetLeft) + "px";
			this.$refs.currentIndicator.style.width = currentTab.offsetWidth + "px";
		},
	},
	watch:
	{
		currentItem: function( newValue, oldValue )
		{
			this.adjustCurrentIndicator();
			this.$emit( "active-tab-changed", oldValue, newValue );
		},

	}
}
</script>

<style scoped>
.tab-bar-component {
	margin-bottom: 10px;
}

.tab-bar {
	border-bottom: 1px solid #666;
	/* margin-bottom: 10px; */
}

.tab-button {
	display: inline-block;
	padding: 8px 16px;
	font-size: 16px;
	cursor: default;
	user-select: none;
}

.tab-button-current {
	color: var(--primary-color);
}

.current-indicator {
	width: 0px;
	height: 3px;
	background: var(--primary-color);
	position: relative;
	transition: all .2s;
}
</style>