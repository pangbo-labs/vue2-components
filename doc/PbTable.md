# PbTable

This document will cover following aspects of the `PbTable`:

- Configuration
- Data
- Operations
- Events

## Configuration

### `columns`

Array of column definitions. For example:

```javascript
columns: [
    { id: "no",            headerTextId: "messages.column_no",            width: 30,   align: "center" },
    { id: "name",          headerTextId: "messages.column_name",          width: -1,   align: "Left" },
    { id: "modifiedTime",  headerTextId: "messages.column_modifiedTime",  width: 160,  align: "Left" },
    { id: "type",          headerTextId: "messages.column_type",          width: 160,  align: "Left" },
    { id: "size",          headerTextId: "messages.column_size",          width: 100,  align: "right" },
],
```

Following table describes each field in detail.

| Property Name | Description                                                  |
| :------------ | :----------------------------------------------------------- |
| `id`          | ID of the column. If `dataField` is not specified, `id` will be used as data field name to choose data to show in the column. |
| `headerText` | The text shown on the column header. |
| `headerTextId` | The string ID for localized string of the column header text. If both `headerText` and `headerTextId` are specified, `headerTextId` will be use to get localized string and `headerText` will be ignored. |
| `width` | The width of the column in pixels. `0` stands for fitting the content, `-1` stands for using all the available space. Multiple columns whose width are `-1` split the available space evenly. |
| `align` | The horizontal alignment of the contents. Available values are `left`, `center` and `right`. |
| `sortable` | Whether the column is sortable. If the column is sortable, clicking the column header will make the column the new sort column, and if the `loadDataFunc` is specified, it will be called to get data with the new sorting options. |
| `isRowNoColumn` | Whether the column is a row no column. If the column is a row number column, its content will be filled with the row number automatically. |

### `loadingDataFunction`

The function used to load data when `PbTable.reload()` is called. If `loadingDataFunction` is not specified, invocation to `PbTable.reload()` has no effect.

The signature of the loading function is:

```javascript
function( start, recordCount, sorting, loadingDataContext, loadingDataToken, loadingDataCallback )
```
| Parameter | Description |
| :-- | : -- |
| `start` | The index of the first row. |
| `recordCount` | How many records to load. |
| `sorting` | The sorting option, it has two sub fields:<br />- `sortingColumn`: The ID of the column<br />- `sortingDirection`: The direction of the sorting, `1` stands for ascending and `-1` stands for descending. |
| `loadingDataContext` | The context data of the loading data action, for instance, the back end caches the result data and only returned part of it, the next loading action can use the context data to find the cached data. |
| `loadingDataToken` | A later triggered loading data action may return data early. To guarantee the table only shows the data returned by the later triggered loading data action, PbTable uses a token to identify the data. The implementer just pass the token to the callback without change along with the returned data. |
| `loadingDataCallback` | The callback function to tell PbTable the loading data result. |

The signature of the loading data callback is:

```javascript
loadingDataCallback( isSuccessful, data, error )
```

where `data` has following fields:

```javascript
{
    loadingDataToken: ...,   // the loading data token passed to the loading data function
    loadingDataContext: ...  // the context data of the loading data action
    totalRows: ...,          // how many row are there totally
    rowData: ...             // array of row data
}
```



A sample implementation of the loading data function:

```javascript
loadJenkinsServiceBreaks: function( start, recordCount, sorting, loadingDataContext, loadingDataToken, loadingDataCallback )
{
    this.$axios.post( "/api/jenkins-health/get-jenkins-service-breaks", {
        jenkinsServiceid: this.jenkinsServiceId,
        sortingOption: sorting,
    } )
    .then( response => {
        console.log( response.data );
        loadingDataCallback( true, {
            loadingDataToken: loadingDataToken,
            totalRows: response.data.length,
            rowData: response.data } );
    })
    .catch( error => {
        console.log( error );
        this.$showMessage( "Load Deleted Jobs", this.getErrorMessage( error ), "ErrorIcon" );
        loadingDataCallback( false, null, error );
    });
},
```

### `loadingDataText` 



### `loadingDataTextId`



### `noContentText`



### `noContentTextId`



### `contextMenu`



## Data

### `rowData`

An array of objects each stands for the row data of the table. The row data of the table can be set before the data got rendered. It can also be left as an empty array and specify the `loadingDataFunction`, then call `PbTable.reload()` which will then invoke the loading data function and fill `data` when the function returns.

### `selectedRows`

The array of selected rows. You can add data rows into this array to make them selected in the table. When user selected the row by mouse clicking or by checking the check box, `PbTable` will add those selected row into the array.

### 

## Operations

### `load()`

### `refresh()`

### `selectRow( row )`

### `selectAll()`

### `unselectAll()`

### `getSortOption()`

### `setSortOption( column, direction )`



## Events

### `row-clicked`

### `row-right-clicked`

### `column-header-clicked`

### `column-header-right-clicked`



