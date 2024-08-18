<!--
Written by Bo Pang.
Copyright (C) PBLabs 2021. All rights reserved.
-->

<template>
    <div class="pb-table">
        <div ref="tableHead" class="pb-table-header-row">
			<div v-if="tableConfig.showRowCheckBox" class="pb-table-header-cell" style="flex: 0; width: 40; justify-content: center;">
				<i v-if="areAllSelected" ref="selectAllCheckBox" class="material-symbols material-symbols-rounded pb-table-row-check-box" @click="toggleSelectAll()">check_box</i>
				<i v-else ref="selectAllCheckBox" class="material-symbols material-symbols-rounded pb-table-row-check-box" @click="toggleSelectAll()">check_box_outline_blank</i>
				<!-- <input ref="selectAllCheckBox" type="checkbox" @click="toggleSelectAll()"> -->
            </div>
			<div class="pb-table-header-cell" v-for="(column, columnIndex) in tableConfig.columns" :key="columnIndex"
                :style="{ 'flex': (column.width > 0) ?  ('0 0 ' + column.width + 'px') : '1 1 0', 'justify-content': column.align }"
				@click="onColumnHeaderClicked( column )">
				<pb-stack style="width: fit-content;">
					<pb-stack-item :size="0" :style="{ 'text-align': column.align }">
						<slot :name="'column_header_' + column.id" :col="column">{{ column.headerTextId ? $t( column.headerTextId ) : column.headerText }}</slot>
					</pb-stack-item>
					<pb-stack-item :size="0" v-if="sorting.column == column.id">
						<i v-if="(sorting.column == column.id) && (sorting.direction == 1)" class="material-symbols material-symbols-rounded sorting-icon">arrow_upward</i>
						<i v-if="(sorting.column == column.id) && (sorting.direction == -1)" class="material-symbols material-symbols-rounded sorting-icon">arrow_downward</i>
					</pb-stack-item>
				</pb-stack>
            </div>
        </div>
        <div ref="tableBody" class="pb-table-body" @scroll="onScroll">
			<div v-if="showMessage" class="pb-table-message" v-html="message"></div>
			<div v-else>
				<div v-for="(row, rowIndex) in tableConfig.data" :key="rowIndex">
					<div v-if="!tableConfig.filterMethord || tableConfig.filterMethord( row )" class="pb-table-data-row" :ref="makeRowRef( rowIndex )"
						:class="{ 'pb-table-data-row-selected': selectedRows.has( row ) }"
						@mousedown="onRowMouseDown( rowIndex, row, $event )"
						@click="$emit( 'row-clicked', row )"
						@dblclick="$emit( 'row-double-clicked', row )"
						@contextmenu="onTableRowRightClicked( row, $event )">
						<div v-if="tableConfig.showRowCheckBox" class="pb-table-header-cell" style="flex: 0; width: 40; justify-content: center;">
							<i v-if="selectedRows.has( row )" ref="selectAllCheckBox" class="material-symbols material-symbols-rounded pb-table-row-check-box">check_box</i>
							<i v-else ref="selectAllCheckBox" class="material-symbols material-symbols-rounded pb-table-row-check-box">check_box_outline_blank</i>
							<!-- <input type="checkbox" :checked="selectedRows.has( row )" @change="onRowCheckBoxClicked( row, $event )"> -->
						</div>
						<div class="pb-table-data-cell" v-for="(column, columnIndex) in tableConfig.columns" :key="columnIndex"
							:style="{ 'flex': (column.width > 0) ?  ('0 0 ' + column.width + 'px') : '1 1 0', 'text-align': column.align, 'user-select': column.allowSelectContents ? 'auto' : 'none' }"
							@click="$emit( 'data-cell-clicked', row, column )">
							<slot :name="'column_data_' + column.id" :row="row" :col="column">{{ column.isRowNoColumn ? (rowIndex + 1) : row[column.id] }}</slot>
						</div>
					</div>
				</div>
				<div v-if="isLoadingData" class="pb-table-message">Loading...</div>
			</div>
        </div>

        <pb-context-menu v-if="tableConfig.rowContextMenu" ref="rowContextMenu" :menu-items="tableConfig.rowContextMenu" />
    </div>
</template>

<script>
export default {
    name: "PbTable",
    props:
	{
        tableConfig: { type: Object, default: {} },
    },
    data: function()
	{
        return {
            selectedRows: new Set(),
			focusedRow: -1,
			areAllSelected: false,
			isLoadingData: false,
			showMessage: false,
			message: "",
			loadingDataContext: null,
			totalRows: -1,
			loadedRows: 0,
			topRowIndex: 0,
			topRowYOffset: 0,
			renderedRows: 0,
			renderedHeight: 0,
			defaultLoadingBatchSize: 50,
			tableBody: this.$refs.tableBody,
			sorting: {
				column: "", // column id
				direction: 1, // 1 for ascend, -1 for descend
			},
			loadingDataToken: 0,
        }
    },
	computed:
	{
		scrollHeight: function()
		{
			console.log( `scrollHeight: function()` );
			console.log( `this.$refs.tableBody: ${this.$refs.tableBody}` );
			return this.$refs.tableBody ? this.$refs.tableBody.scrollHeight : 0;
		},

		tableStyle: function()
		{
			return {
				border: this.$pbComponentStyles.PbTable.table.border,
				borderRadius: this.$pbComponentStyles.PbTable.table.borderRadius,
				background: this.$pbComponentStyles.PbTable.table.background,
			}
		},

		headerRowStyle: function()
		{
			return {
				alignItems: this.$pbComponentStyles.PbTable.headerRow.virticalAlign,
				background: this.$pbComponentStyles.PbTable.headerRow.background,
				color: this.$pbComponentStyles.PbTable.headerRow.color,
				lineHeight: this.$pbComponentStyles.PbTable.headerRow.lineHeight,
				border: this.$pbComponentStyles.PbTable.headerRow.border,
				borderLeft: this.$pbComponentStyles.PbTable.headerRow.borderLeft,
				borderRight: this.$pbComponentStyles.PbTable.headerRow.borderRight,
				borderTop: this.$pbComponentStyles.PbTable.headerRow.borderTop,
				borderBottom: this.$pbComponentStyles.PbTable.headerRow.borderBottom,
			}
		},

		dataRowStyle: function()
		{
			return {
				alignItems: this.$pbComponentStyles.PbTable.dataRow.virticalAlign,
				background: this.$pbComponentStyles.PbTable.dataRow.background,
				color: this.$pbComponentStyles.PbTable.dataRow.color,
				lineHeight: this.$pbComponentStyles.PbTable.dataRow.lineHeight,
				border: this.$pbComponentStyles.PbTable.dataRow.border,
				borderLeft: this.$pbComponentStyles.PbTable.dataRow.borderLeft,
				borderRight: this.$pbComponentStyles.PbTable.dataRow.borderRight,
				borderTop: this.$pbComponentStyles.PbTable.dataRow.borderTop,
				borderBottom: this.$pbComponentStyles.PbTable.dataRow.borderBottom,
			}
		},

		dataRowSelectedStyle: function()
		{
			return {
				background: this.$pbComponentStyles.PbTable.dataRow.selected.background,
			}
		},
	},
	watch:
	{
		scrollHeight:
		{
			handler( newValue, oldValue )
			{
				console.log( `scrollHeight changed: ${newValue}` );
				// this.checkVirticalScrollBar();
			},
			deep: true,
			immediate: false,
		},
		
		"tableBody.scrollHeight":
		{
			handler( newValue, oldValue )
			{
				console.log( `tableBody.scrollHeight changed: ${newValue}` );
				// this.checkVirticalScrollBar();
			},
			deep: true,
			immediate: true,
		},

		"tableBody.offsetHeight":
		{
			handler( newValue, oldValue )
			{
				console.log( `tableBody.offsetHeight changed: ${newValue}` );
				// this.checkVirticalScrollBar();
			},
			deep: true,
			immediate: true,
		},
	},
	mounted: function()
	{
		if ((this.tableConfig) && (this.tableConfig.initialSorting))
		{
			this.sorting = this.tableConfig.initialSorting;
		}
	},
	methods:
	{
        onRowMouseDown: function( rowIndex, rowData, event )
        {
			if (event.shiftKey)
			{
				let i;
				let rows = this.tableConfig.data;
				this.selectedRows.clear();
				if (rowIndex < this.focusedRow)
				{
					for (i = rowIndex; i <= this.focusedRow; i ++)
						this.selectedRows.add( rows[i] );
				}
				else // rowIndex >= this.focusedRow
				{
					for (i = this.focusedRow; i <= rowIndex; i ++)
						this.selectedRows.add( rows[i] );
				}
			}
			else if (event.ctrlKey)
			{
				if (this.selectedRows.has( rowData ))
					this.selectedRows.delete( rowData );
				else
					this.selectedRows.add( rowData );
				this.focusedRow = rowIndex;
			}
			else if ((this.selectedRows.size == 1) && this.selectedRows.has( rowData ))
			{
				this.selectedRows.clear();
				this.focusedRow = rowIndex;
			}
			else
			{
				this.selectedRows.clear();
				this.selectedRows.add( rowData );
				this.focusedRow = rowIndex;
			}

			this.areAllSelected = (this.selectedRows.size == this.tableConfig.data.length);
			if (this.$refs.selectAllCheckBox)
				this.$refs.selectAllCheckBox.checked = this.areAllSelected;
			
			this.$forceUpdate();
        },

        onTableRowRightClicked: function( row, event )
		{
            console.log( event );

			// var table = this.$refs.dataTable;
			// table.clearSelection();
			// table.toggleRowSelection( row, true );

			if (tableConfig.rowContextMenu) {
				this.$refs.rowContextMenu.showContextMenu( event, row );
			} else {
				this.$emit( 'row-right-clicked', row )
			}
		},

		reload: function()
		{
			if (this.isLoadingData)
			{
				console.log( "Already loading now, ignore new loading request." );
				return;
			}

			this.loadingDataContext = null;
			this.totalRows = -1;
			this.loadedRows = 0;
			this.tableConfig.data = [];
			this.loadData();
		},

		loadData: function()
		{
			console.log( `loadData(): totalRows: ${this.totalRows}, loadedRows: ${this.loadedRows}` );

			if (!this.tableConfig || !this.tableConfig.loadDataFunc)
				return;

			if ((this.totalRows >= 0) && (this.loadedRows == this.totalRows)) {
				return;
			}

			this.isLoadingData = true;
			this.message = "Loading data..."
			// this.showMessage = true;
			this.loadingDataToken = Date.now();
			var loadingBatchSize = this.tableConfig.loadingBatchSize ? this.tableConfig.loadingBatchSize : this.defaultLoadingBatchSize;
			this.tableConfig.loadDataFunc( this.loadedRows, loadingBatchSize, this.sorting, this.loadingDataContext, this.loadingDataToken, this.loadingDataCallback );
		},

		loadingDataCallback: function( isSuccessful, data, errorMessage )
		{
			this.isLoadingData = false;
			if (isSuccessful)
			{
				console.log( `loadingDataCallback(): this.totalRows: ${this.totalRows}, this.loadedRows: ${this.loadedRows}` );

				if (!data.loadingDataToken || (data.loadingDataToken != this.loadingDataToken)) {
					return;
				}

				this.loadingDataToken = 0;

				this.loadingDataContext = data.loadingDataContext;
				this.totalRows = data.totalRows;

				if (this.tableConfig.data == null)
					this.tableConfig.data = new Array();
				for (var i = 0; i < data.rowData.length; i ++)
					this.tableConfig.data.push( data.rowData[i] );

				this.loadedRows += data.rowData.length;

				if ((this.tableConfig.data == null) || (this.tableConfig.data.length == 0))
				{
					this.showMessage = true;
					this.message = "No contents";
				}
				else
				{
					this.showMessage = false;
					this.message = "";
				}

				console.log( `loadingDataCallback(): this.totalRows: ${this.totalRows}, this.loadedRows: ${this.loadedRows}` );
			}
			else // failed
			{
				this.showMessage = true;
				this.message = "<span style=\"color: #c33; text-align: center;\">Error loading data.<br>Error message: " + errorMessage + "</span>";
			}

			// after next update data to dom
			this.$nextTick( () => {
				this.$refs.tableHead.style.paddingRight = this.$commonUtils.getVirticalScrollBarWidth( this.$refs.tableBody ) + "px";
			} );
		},

		onScroll: function()
		{
			if ((this.loadedRows == this.totalRows) || this.isLoadingData)
				return;

			console.log( "onScroll()" );

			var scrollTop = this.$refs.tableBody.scrollTop;
			var viewportHeight = this.$refs.tableBody.offsetHeight;
			var firstRowRef = this.makeRowRef( 0 );
			var firstRow = this.$refs[firstRowRef][0];
			var firstRowTop = firstRow.offsetTop;
			var lastRowRef = this.makeRowRef( this.tableConfig.data.length - 1 );
			var lastRow = this.$refs[lastRowRef][0];
			var lastRowTop = lastRow.offsetTop;
			var lastRowScrollTop = lastRow.scrollTop;
			//console.log( `scrollTop: ${scrollTop}, viewportHeight: ${viewportHeight}, lastRowTop: ${lastRowTop}, lastRowScrollTop: ${lastRowScrollTop}` );
			
			if (scrollTop + viewportHeight > lastRowTop - firstRowTop)
				this.loadData();
		},

		makeRowRef: function( rowIndex )
		{
			return 'row_' + (this.topRowIndex + rowIndex);
		},

		onColumnHeaderClicked: function( column )
		{
			if (column.isRowNoColumn)
				return;

			if (this.sorting.column == column.id)
			{
				this.sorting.direction *= -1;
			}
			else
			{
				this.sorting.column = column.id;
				this.sorting.direction = 1;
			}

			this.selectedRows.clear();
			this.focusedRow = -1;

			this.reload();
		},

		onRowCheckBoxClicked: function( row, event )
		{
			console.log( "onRowCheckBoxClicked()" );
			console.log( event.target.checked );
		},

		toggleSelectAll: function()
		{
			if (this.$refs.selectAllCheckBox.checked)
			{
				for (var i = 0; i < this.tableConfig.data.length; i ++)
				{
					var row = this.tableConfig.data[i];
					this.selectedRows.add( row );
				}
			}	
			else
			{
				this.selectedRows.clear();
			}
			this.$forceUpdate();
		}
    }
}
</script>

<style scoped>
.pb-table {
    display: flex;
    flex-direction: column;

	border: var(--PbTable-table-border);
	border-radius: var(--PbTable-table-borderRadius);
	background: var(--PbTable-table-background);
}

.pb-table-header-row {
    display: flex;
    flex-direction: row;

	align-items: var(--PbTable-headerRow-virticalAlign);
	background: var(--PbTable-headerRow-background);
	color: var(--PbTable-headerRow-color);
	line-height: var(--PbTable-headerRow-lineHeight);
	border: var(--PbTable-headerRow-border);
	border-left: var(--PbTable-headerRow-border);
	border-right: var(--PbTable-headerRow-border);
	border-top: var(--PbTable-headerRow-border);
	border-bottom: var(--PbTable-headerRow-borderBottom);
}

.sorting-icon {
	display: inline-block;
	font-size: 20px;
	margin-left: 6px;
	vertical-align: top;
}

.pb-table-body {
	flex: 1;
	height: 0;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
}

.pb-table-data-row {
    display: flex;
    flex-direction: row;

	align-items: var(--PbTable-dataRow-virticalAlign);
	background: var(--PbTable-dataRow-background);
	color: var(--PbTable-dataRow-color);
	line-height: var(--PbTable-dataRow-lineHeight);
	border: var(--PbTable-dataRow-border);
	border-left: var(--PbTable-dataRow-border);
	border-right: var(--PbTable-dataRow-border);
	border-top: var(--PbTable-dataRow-border);
	border-bottom: var(--PbTable-dataRow-borderBottom);
}

.pb-table-data-row:hover {
    background: var(--PbTable-dataRow-hover-background);
}

.pb-table-data-row-selected, .pb-table-data-row-selected:hover {
    background: var(--PbTable-dataRow-selected-background);
	color: var(--PbTable-dataRow-selected-color);
}

.pb-table-header-cell {
    width: 160px;
    padding: 10px 16px;
    font-size: var(--list-view-header-font-size);
    font-weight: var(--list-view-header-font-weight);
	overflow: hidden;
    user-select: none;
	display: flex;
	flex-direction: row;
}

.pb-table-data-cell {
    width: 160px;
    padding: 10px 16px;
    font-size: var(--list-view-data-font-size);
	overflow: hidden;
    user-select: none;
}

.pb-table-message {
	flex: 1;
	height: 0;
	padding: 20px 20px;
	background: #fff;	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.pb-table-row-check-box {
	font-size: 19px;
}
</style>