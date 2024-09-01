<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
    <div class="navi-bar">
        <div v-for="(item, itemIndex) in naviItems" :key="itemIndex" class="navi-item"
            :class="{ 'navi-item-current': itemIndex == currentItemIndex }"
            @click="onNaviItemClicked( itemIndex )">
			<i v-if="displayIcon" class="material-symbols material-symbols-rounded" style="font-size: 28px; font-variation-settings: 'wght' 300;">{{ item.icon }}</i>
            <transition name="el-fade-in-linear">
                <div v-if="displayCaption" class="navi-item-caption">{{ item.caption }}</div>
            </transition>
        </div>
        <div class="toggle-button" style="margin-top: 50px;" @click="toggleDisplayCaption()">
            <i v-if="!displayCaption" class="el-icon-d-arrow-right"></i>
            <i v-if="displayCaption" class="el-icon-d-arrow-left"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "PbVerticalNaviBar",
    props: {
        naviItems: { type: Array, default: () => [] },
		displayIcon: { type: Boolean, default: true },
		displayCaption: { type: Boolean, default: true },
    },
    data: function() {
        return {
            currentItemIndex: 0,
        }
    },
	methods: {

		onNaviItemClicked: function( index ) {
			this.currentItemIndex = index;
			var currentItem = this.naviItems[this.currentItemIndex];
			this.$router.push( currentItem.routePath );
		},

		toggleDisplayCaption: function() {
			this.displayCaption = !this.displayCaption;
		}
	}
}
</script>

<style scoped>
.navi-bar {
	padding: 30px 10px;
}

.navi-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 3px;
	padding: 6px 8px;
	color: #444;
	text-align: left;
	cursor: default;
	user-select: none;
	transition: all .3s;
}

.navi-item:hover {
	background: var(--primary-color);
	color: #fff;
	transition: all .3s;
}

.navi-item-caption {
	font-size: 13px;
	font-weight: 500;
	line-height: 150%;
	margin-left: 10px;
}

.navi-item + .navi-item {
	margin-top: 5px;
}

.navi-item-current, .navi-item-current:hover {
	background: #e9e9e9;
	color: #333;
	transition: all .3s;
}

.toggle-button {
	border-radius: 3px;
	padding: 8px 10px;
	font-size: 14px;
	cursor: default;
	user-select: none;
	transition: all .3s;
}

.toggle-button:hover {
	background: #eee;
	transition: all .3s;
}
</style>