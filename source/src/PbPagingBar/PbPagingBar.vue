<template>
	<div style="display: flex; flex-direction: row;">
		<div class="paging-button prev-or-next" @click="goToPrevPage()">&lt;</div>
		<div class="paging-button" v-if="!neighbourPages.includes( firstPage )" @click="goToPage( firstPage )">{{ firstPage + 1 }}</div>
		<div class="paging-button unclickable" v-if="neighbourPages[0] > firstPage + 1">...</div>
		<div class="paging-button" v-for="(item, itemIndex) in neighbourPages" :key="itemIndex"
			:class="{ 'paging-button-current-page': item == currentPage }" @click="goToPage( item )">
			{{ item + 1 }}
		</div>
		<div class="paging-button unclickable" v-if="neighbourPages[neighbourPages.length - 1] < lastPage - 1">...</div>
		<div class="paging-button" v-if="!neighbourPages.includes( lastPage )" @click="goToPage( lastPage )">{{ lastPage + 1 }}</div>
		<div class="paging-button prev-or-next" @click="goToNextPage()">&gt;</div>
	</div>
</template>

<script>
export default {
	name: "PbPagingBar",
	props:
	{
		totalPages:		{ type: Number, default: 1 },
		currentPage:	{ type: Number, default: 0 },
	},
	data: function()
	{
		return {}
	},
	computed:
	{
		firstPage: function()
		{
			return 0;
		},

		lastPage: function()
		{
			return this.totalPages - 1;
		},

		neighbourPages: function()
		{
			let pages = new Array();

			let neighbourCount = 2;
			let surroundingPageCount = 2 * neighbourCount + 1;

			let minPageLeft = this.currentPage - neighbourCount;
			minPageLeft = Math.max( minPageLeft, 0 );
			let maxPageLeft = minPageLeft + surroundingPageCount - 1;

			let maxPageRight = this.currentPage + neighbourCount;
			maxPageRight = Math.min( maxPageRight, this.totalPages - 1 );
			let minPageRight = maxPageRight - surroundingPageCount + 1;

			let minPage = Math.max( Math.min( minPageLeft, minPageRight ), 0 );
			let maxPage = Math.min( Math.max( maxPageLeft, maxPageRight ), this.totalPages - 1 );

			for (let pageIndex = minPage; pageIndex <= maxPage; pageIndex ++)
				pages.push( pageIndex );

			return pages;
		}
	},
	methods:
	{
		goToPage: function( pageIndex )
		{
			if ((pageIndex < 0) || (pageIndex > this.totalPages - 1))
				return;
			if (pageIndex == this.currentPage)
				return;
			this.currentPage = pageIndex;
			this.$emit( "page-change", this.currentPage );
		},

		goToPrevPage: function()
		{
			if (this.currentPage > 0)
				this.goToPage( this.currentPage - 1 );
		},

		goToNextPage: function()
		{
			if (this.currentPage < this.totalPages - 1)
				this.goToPage( this.currentPage + 1 );
		}
	}
}
</script>

<style scoped>
.paging-button {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	line-height: 100%;
	min-width: 26px;
	min-height: 26px;
	border: 1px solid #999;
	border-radius: 5px;
	padding: 2px 4px;
	line-height: 100%;
	user-select: none;
	cursor: default;
	transition: all .3s;
}

.paging-button:hover {
	border: 1px solid var(--primary-color);
	transition: all .3s;
}

.paging-button + .paging-button {
	margin-left: 4px;
}

.prev-or-next {
	border: 1px solid transparent;
}

.unclickable, .unclickable:hover {
	border: 1px solid transparent;
}

.paging-button-current-page, .paging-button-current-page:hover {
	border: 1px solid var(--primary-color);
	background: var(--primary-color);
	color: #fff;
}
</style>
