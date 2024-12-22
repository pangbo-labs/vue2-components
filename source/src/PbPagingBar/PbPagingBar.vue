<template>
	<div style="display: flex; flex-direction: row;">
		<div class="button-grid">
			<div class="paging-button prev-or-next" @click="goToPrevPage()">
				<svg viewBox="-100 -100 201 201" style="width: var(--pagingBar-button-width); height: var(--pagingBar-button-height);" xmlns="http://www.w3.org/2000/svg">
					<!-- <rect x="-100" y="-100" width="201" height="201" style="fill: none; stroke: red; stroke-width: 1;" />
					<line x1="-100" y1="0" x2="100" y2="0" style="stroke: red; stroke-width: 1;" />
					<line x1="0" y1="-100" x2="0" y2="100" style="stroke: red; stroke-width: 1;" /> -->
					<polyline points="30,50 -30,0 30,-50" style="fill: none; stroke: rgba( 0, 0, 0, 0.5 ); stroke-width: 15;"></polyline>
				</svg>
			</div>
		</div>
		<div class="button-grid" v-if="!neighbourPages.includes( firstPage )">
			<div class="paging-button" @click="goToPage( firstPage )">{{ firstPage + 1 }}</div>
		</div>
		<div class="button-grid" v-if="neighbourPages[0] > firstPage + 1">
			<div class="paging-button unclickable">...</div>
		</div>
		<div class="button-grid" v-for="(item, itemIndex) in neighbourPages" :key="itemIndex">
			<div class="paging-button"
				:class="{ 'paging-button-current-page': item == currentPage }" @click="goToPage( item )">
				{{ item + 1 }}
			</div>
		</div>
		<div class="button-grid" v-if="neighbourPages[neighbourPages.length - 1] < lastPage - 1">
			<div class="paging-button unclickable">...</div>
		</div>
		<div class="button-grid" v-if="!neighbourPages.includes( lastPage )">
			<div class="paging-button" @click="goToPage( lastPage )">{{ lastPage + 1 }}</div>
		</div>
		<div class="button-grid">
			<div class="paging-button prev-or-next" @click="goToNextPage()">
				<svg viewBox="-100 -100 201 201" style="width: var(--pagingBar-button-width); height: var(--pagingBar-button-height);" xmlns="http://www.w3.org/2000/svg">
					<polyline points="-30,50 30,0 -30,-50" style="fill: none; stroke: rgba( 0, 0, 0, 0.5 ); stroke-width: 15;"></polyline>
				</svg>
			</div>
		</div>
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
			this.$emit( "page-changed", this.currentPage );
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
.button-grid {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.paging-button {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	min-width: var(--pagingBar-button-width);
	min-height: var(--pagingBar-button-height);
	border: var(--pagingBar-button-border);
	border-radius: var(--pagingBar-button-border-radius);
	padding: var(--pagingBar-button-padding);
	background: var(--pagingBar-button-background);
	color: var(--pagingBar-button-text-color);
	font-size: var(--pagingBar-button-font-size);
	line-height: 100%;
	user-select: none;
	cursor: default;
	transition: all .3s;
}

.paging-button:hover {
	border: 1px solid var(--primary-color);
	transition: all .3s;
}

.button-grid + .button-grid {
	margin-left: var(--pagingBar-button-spacing);
}

.prev-or-next {
	border: 1px solid transparent;
}

.unclickable, .unclickable:hover {
	border: 1px solid transparent;
}

.paging-button-current-page, .paging-button-current-page:hover {
	min-width: var(--pagingBar-button-current-page-width);
	min-height: var(--pagingBar-button-current-page-height);
	padding: var(--pagingBar-button-current-page-padding);
	font-size: var(--pagingBar-button-current-page-font-size);
	font-weight: var(--pagingBar-button-current-page-font-weight);
	border: var(--pagingBar-button-current-page-border);
	border-radius: var(--pagingBar-button-current-page-border-radius);
	background: var(--pagingBar-button-current-page-background);
	color: var(--pagingBar-button-current-page-text-color);
}
</style>
