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
                <div v-if="displayCaption" class="navi-item-caption">{{ item.captionId ? $t( item.captionId ) : item.caption }}</div>
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
        naviItems:		{ type: Array, default: () => [] },
		parentPath:		{ type: String, default: "" },
		displayIcon:	{ type: Boolean, default: true },
		displayCaption:	{ type: Boolean, default: true },
    },
    data: function() {
        return {
			currentItemIndex: 0,
        }
    },
	mounted: function()
	{
		console.log( `PbVerticalNaviBar.mounted(): route path: ${this.$route.path}` );
		let routePath = this.combinePaths( this.$route.path, "" ); // add '/' to the path
		let itemIndex = 0;
		let matchedIndex = -1;
		let matchedNaviItemPath = null;
		for (let item of this.naviItems)
		{
			let naviItemPath = this.combinePaths( this.parentPath, item.routePath, "" );
			if (routePath.startsWith( naviItemPath ))
			{
				console.log( `matchedNaviItemPath: '${matchedNaviItemPath}'` );
				if ((matchedIndex < 0) || (naviItemPath.length > matchedNaviItemPath.length))
				{
					matchedIndex = itemIndex;
					matchedNaviItemPath = naviItemPath;
				}
			}
			itemIndex ++;
		};
		this.currentItemIndex = matchedIndex;
	},
	methods: {

		setCurrentItem: function( itemIndex )
		{
			this.currentItemIndex = itemIndex;
		},

		navigate: function( itemIndex )
		{
			this.onNaviItemClicked( itemIndex );
		},

		onNaviItemClicked: function( index )
		{
			if (!this.naviItems[index].routePath)
				return;
			this.currentItemIndex = index;
			var currentItem = this.naviItems[this.currentItemIndex];
			this.$router.push( this.combineRelativePath( this.parentPath, currentItem.routePath ) );
		},

		combineRelativePath: function( parentPath, childPath )
		{
			if (!parentPath || !parentPath.trim())
				return childPath;
			if (childPath.startsWith( "/" ))
				return childPath;
			let tempPath = parentPath.trim();
			if (!tempPath.endsWith( "/" ))
				tempPath += "/";
			return tempPath + childPath;
		},

		toggleDisplayCaption: function() {
			this.displayCaption = !this.displayCaption;
		},

		setCurrentItemByRoutePath: function( routePath )
		{
			let itemIndex = this.findIndexByRoutePath( routePath );
			if (itemIndex >= 0)
				this.currentItemIndex = itemIndex;
		},

		findIndexByRoutePath: function( routePath )
		{
			for (var i = 0; i < this.naviItems.length; i ++)
			{
				if (this.naviItems[i].routePath == routePath)
					return i;
			}
			return -1;
		},

		combinePaths: function( paths )
		{
			let result = "";
			let pathIndex = 0;
			for (let path of arguments)
			{
				if ((pathIndex > 0) && !result.endsWith( "/" ))
					result += "/";
				result = path.startsWith( "/" ) ? path : result + path;
				pathIndex ++;
			}
			return result;
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
	border-radius: 5px;
	padding: 6px 8px;
	color: var(--text-color);
	font-weight: var(--text-weight);
	text-align: left;
	cursor: default;
	user-select: none;
	transition: all .3s;
}

.navi-item:hover {
	background: var(--hovered-background-color);
	color: var(--hovered-text-color);
	font-weight: var(--hovered-text-weight);
	transition: all .3s;
}

.navi-item-caption {
	font-size: 13px;
	font-weight: 500;
	line-height: 150%;
	color: inherit;
	margin-left: 10px;
	margin-right: 2px;
}

.navi-item + .navi-item {
	margin-top: 5px;
}

.navi-item-current, .navi-item-current:hover {
	background: var(--primary-color);
	color: #fff; /* var(--selected-text-color) */;
	font-weight: var(--selected-text-weight);
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