<template>
    <div class="pb-table">
        <div ref="tableHead" class="pb-table-header-row">
            <div class="pb-table-header-cell" v-for="(column, columnIndex) in tableConfig.columns" :key="columnIndex"
                :style="{ 'flex': (column.width > 0) ?  ('0 0 ' + column.width + 'px') : '1 1 0', 'text-align': column.align }">
                <slot :name="'column_header_' + column.id" :col="column">{{ column.text }}</slot>
            </div>
        </div>
        <div ref="tableBody" class="pb-table-body">
			<div v-if="showMessage" class="pb-table-message" v-html="message"></div>
			<div v-else>
				<div v-for="(row, rowIndex) in tableConfig.data" :key="rowIndex" class="pb-table-data-row"
					:class="{ 'pb-table-data-row-selected': selectedRows.includes( row ) }"
					@mousedown="onRowMouseDown( row )"
					@click="$emit( 'row-clicked', row )"
					@dblclick="$emit( 'row-double-clicked', row )"
					@contextmenu="onTableRowRightClicked( row, $event )">
					<div class="pb-table-data-cell" v-for="(column, columnIndex) in tableConfig.columns" :key="columnIndex"
						:style="{ 'flex': (column.width > 0) ?  ('0 0 ' + column.width + 'px') : '1 1 0', 'text-align': column.align, 'user-select': column.allowSelectContents ? 'auto' : 'none' }"
						@click="$emit( 'data-cell-clicked', row, column )">
						<slot :name="'column_data_' + column.id" :row="row" :col="column">{{ row[column.id] }}</slot>
					</div>
				</div>
			</div>
        </div>

        <pb-context-menu v-if="tableConfig.rowContextMenu" ref="rowContextMenu" :menu-items="tableConfig.rowContextMenu" />
    </div>
</template>

<script>
export default {
    name: "PbTable",
    props: {
        tableConfig: { type: Object, default: {} },
    },
    data: function() {
        return {
            selectedRows: [],
			isLoadingData: false,
			showMessage: false,
			message: "",
			topRowIndex: 0,
			topRowYOffset: 0,
			renderedRows: 0,
			renderedHeight: 0,
        }
    },
    methods: {
        onRowMouseDown: function( rowData )
        {
            console.log( rowData );
            this.selectedRows = [];
            this.selectedRows.push( rowData );
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

		loadData: function()
		{
			if (!this.tableConfig || !this.tableConfig.loadDataFunc)
				return;

			this.isLoadingData = true;
			this.message = "Loading data..."
			this.showMessage = true;
			this.tableConfig.loadDataFunc( this.loadingDataCallback );
		},

		loadingDataCallback: function( isSuccessful, errorMessage )
		{
			this.isLoadingData = false;
			if (isSuccessful)
			{
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
    }
}
</script>

<style scoped>
.pb-table {
    background: #eee;
    border: 1px solid #eee;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

.pb-table-header-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 140%;
    background: #fff;
    margin-bottom: 1px;
    background: #f7f6f3;
    color: #37352f;
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
    align-items: center;
    line-height: 140%;
    background: #fff;
    margin-bottom: 1px;
}

.pb-table-data-row:hover {
    background: #f9f9f9;
}

.pb-table-data-row-selected, .pb-table-data-row-selected:hover {
    background: #eeeef9;
}

.pb-table-header-cell {
    width: 160px;
    padding: 10px 16px;
    font-size: var(--list-view-header-font-size);
    font-weight: var(--list-view-header-font-weight);
    user-select: none;
}

.pb-table-data-cell {
    width: 160px;
    padding: 10px 16px;
    font-size: var(--list-view-data-font-size);
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
</style>