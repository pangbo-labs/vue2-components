<template>
	<div style="padding: 20px 20px;">

		<pb-tab-bar :tabs="tabs" style="width: 100%;" @active-tab-changed="onActiveTabChanged" />

		<div v-if="currentTabPage == 'overview'">

			<pre class="code-block" v-html="$hljs.highlight( codes.data_weekdays, { language: 'javascript' } ).value"></pre>

			<pre class="code-block" v-html="$hljs.highlight( codes.code_simplest, { language: 'html' } ).value"></pre>

			<pb-list :items="weekdays" v-model="selectedWeekdays" @selection-changed="onSelectedWeekdaysChanged"></pb-list>

			<p ref="selectedWeekdays">Selected weekdays: {{ selectedWeekdays }}</p>

			<pb-list :items="weekdays" list-style="horizontal" item-h-spacing="6px" style="margin-top: 20px;">
				<template v-slot:item="data">
					<div style="display: flex; flex-direction: row; align-items: center;">
						<input type="radio" name="valueName" style="display: block; margin: 0 0;">
						<div style="width: 4px;"></div>
						<div>{{ data.item }}</div>
					</div>
				</template>
			</pb-list>

			<h2>Navigator</h2>

			<h3>Horizontal Navigator</h3>

			<pb-list :items="weekdays" list-style="horizontal" item-h-spacing="6px" style="margin-top: 20px;"></pb-list>

			<pre class="code-block" v-html="$hljs.highlight( codes.code_horizontal_switch, { language: 'html' } ).value"></pre>

			<h3>Vertical Navigator</h3>

			<pre class="code-block" v-html="$hljs.highlight( codes.data_windows, { language: 'javascript' } ).value"></pre>

			<pre class="code-block" v-html="$hljs.highlight( codes.code_vertial_switch, { language: 'html' } ).value"></pre>

			<pb-list :items="windows" operation-mode="switch" item-v-spacing="5px" style="width: 200px; height: 400px; margin-top: 20px; border: 0px;">
				<template v-slot:item="data">
					<div style="padding: 5px 3px 3px 3px; line-height: 130%;">
						<div style="font-size: 14px; font-weight: 600; color: rgba( 0,0,0,0.9 );">{{ data.item.name }}</div>
						<div style="font-size: 12px; color: rgba( 0,0,0,0.5 );">{{ data.item.releaseDate }}</div>
					</div>
				</template>
			</pb-list>

			<h2>Single-Select List</h2>

			<pre class="code-block" v-html="$hljs.highlight( codes.code_single_select, { language: 'html' } ).value"></pre>

			<pb-list :items="windows" operation-mode="single-select" style="width: 400px; height: 400px; margin-top: 20px;">
				<template v-slot:item="data">
					<div style="padding: 3px 3px; line-height: 140%;">
						<div style="font-size: 14px; font-weight: 600; color: rgba( 0,0,0,0.9 );">{{ data.item.name }}</div>
						<div style="font-size: 12px; color: rgba( 0,0,0,0.5 );">{{ data.item.releaseDate }}</div>
					</div>
				</template>
			</pb-list>

			<h2>Multi-Select List</h2>

			<pre class="code-block" v-html="$hljs.highlight( codes.code_multi_select, { language: 'html' } ).value"></pre>

			<pb-list :items="windows" operation-mode="multi-select" style="width: 400px; height: 400px; margin-top: 20px;">
				<template v-slot:item="data">
					<div style="padding: 3px 3px; line-height: 140%;">
						<div style="font-size: 14px; font-weight: 600; color: rgba( 0,0,0,0.9 );">{{ data.item.name }}</div>
						<div style="font-size: 12px; color: rgba( 0,0,0,0.5 );">{{ data.item.releaseDate }}</div>
					</div>
				</template>
			</pb-list>

		</div>

		<div v-if="currentTabPage == 'properties'">
			<h2>Basic Properties</h2>
			<pb-table :table-config="propertyTable"></pb-table>

			<h2>Defining Columns</h2>
			<pb-table :table-config="columnDefinitionTable"></pb-table>

			<h2>Loading Table Data</h2>

			<h2>Style Properties</h2>

			<h2>Customizing Data/Header Format</h2>
		</div>

		<div v-if="currentTabPage == 'operations'">
		</div>

		<div v-if="currentTabPage == 'events'">
		</div>

		<div v-if="currentTabPage == 'moreExaples'">
		</div>

	</div>
</template>

<script>
import hljs from 'highlight.js';

export default {
	name: "PbListDoc",
	data: function()
	{
		return {

			tabs: [
				{ id: "overview",		text: "Overview" },
				{ id: "properties",		text: "Properties" },
				{ id: "operations",		text: "Operations" },
				{ id: "events",			text: "Events" },
				{ id: "moreExaples",	text: "More Examples" },
			],
			currentTabPage: 'overview',

			weekdays: [
				"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
			],

			windows: [
				{ name: "Windows 1.0", releaseDate: "November 20, 1985" },
				{ name: "Windows 2.0", releaseDate: "December 9, 1987" },
				{ name: "Windows 2.1", releaseDate: "May 27, 1988" },
				{ name: "Windows 3.0", releaseDate: "May 22, 1990" },
				{ name: "Windows 3.1", releaseDate: "April 6, 1992" },
				{ name: "Windows 95", releaseDate: "July 14, 1995" },
				{ name: "Windows 98", releaseDate: "May 15, 1998" },
				{ name: "Windows 2000", releaseDate: "December 15, 1999" },
				{ name: "Windows ME", releaseDate: "June 19, 2000" },
				{ name: "Windows XP", releaseDate: "August 24, 2001" },
				{ name: "Windows Vista", releaseDate: "November 8, 2006" },
				{ name: "Windows 7", releaseDate: "July 22, 2009" },
				{ name: "Windows 8", releaseDate: "August 1, 2012" },
				{ name: "Windows 8.1", releaseDate: "August 27, 2013" },
				{ name: "Windows 10", releaseDate: "July 15, 2015" },
				{ name: "Windows 11", releaseDate: "October 5, 2021	" },
			],

			selectedWeekdays: new Array(),

			codes: {
				data_weekdays:
					'weekdays: [\n' +
					'	"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",\n' +
					'],',

				code_simplest:
					'<pb-list :items="weekdays"></pb-list>',

				data_windows:
					'windows: [\n' +
					'	{ name: "Windows 1.0", releaseDate: "November 20, 1985" },\n' +
					'	{ name: "Windows 2.0", releaseDate: "December 9, 1987" },\n' +
					'	{ name: "Windows 2.1", releaseDate: "May 27, 1988" },\n' +
					'	{ name: "Windows 3.0", releaseDate: "May 22, 1990" },\n' +
					'	{ name: "Windows 3.1", releaseDate: "April 6, 1992" },\n' +
					'	{ name: "Windows 95", releaseDate: "July 14, 1995" },\n' +
					'	{ name: "Windows 98", releaseDate: "May 15, 1998" },\n' +
					'	{ name: "Windows 2000", releaseDate: "December 15, 1999" },\n' +
					'	{ name: "Windows ME", releaseDate: "June 19, 2000" },\n' +
					'	{ name: "Windows XP", releaseDate: "August 24, 2001" },\n' +
					'	{ name: "Windows Vista", releaseDate: "November 8, 2006" },\n' +
					'	{ name: "Windows 7", releaseDate: "July 22, 2009" },\n' +
					'	{ name: "Windows 8", releaseDate: "August 1, 2012" },\n' +
					'	{ name: "Windows 8.1", releaseDate: "August 27, 2013" },\n' +
					'	{ name: "Windows 10", releaseDate: "July 15, 2015" },\n' +
					'	{ name: "Windows 11", releaseDate: "October 5, 2021	" },\n' +
					'],',

				code_horizontal_switch:
					'<pb-list :items="weekdays" list-style="horizontal" item-h-spacing="6px" style="margin-top: 20px;"></pb-list>',

				code_vertial_switch:
					'<pb-list :items="windows" operation-mode="switch" item-v-spacing="5px" style="width: 200px; height: 400px; border: 0px;">\n' +
					'	<template v-slot:item="data">\n' +
					'		<div style="padding: 5px 3px 3px 3px; line-height: 130%;">\n' +
					'			<div style="font-size: 14px; font-weight: 600; color: rgba( 0,0,0,0.9 );">{{ data.item.name }}</div>\n' +
					'			<div style="font-size: 12px; color: rgba( 0,0,0,0.5 );">{{ data.item.releaseDate }}</div>\n' +
					'		</div>\n' +
					'	</template>\n' +
					'</pb-list>',

				code_single_select:
					'<pb-list :items="windows" operation-mode="single-select" style="width: 400px; height: 400px;">\n' +
					'	<template v-slot:item="data">\n' +
					'		<div style="padding: 3px 3px; line-height: 140%;">\n' +
					'			<div style="font-size: 14px; font-weight: 600; color: rgba( 0,0,0,0.9 );">{{ data.item.name }}</div>\n' +
					'			<div style="font-size: 12px; color: rgba( 0,0,0,0.5 );">{{ data.item.releaseDate }}</div>\n' +
					'		</div>\n' +
					'	</template>\n' +
					'</pb-list>',

				code_multi_select:
					'<pb-list :items="windows" operation-mode="multi-select" style="width: 400px; height: 400px; margin-top: 20px;">\n' +
					'	<template v-slot:item="data">\n' +
					'		<div style="padding: 3px 3px; line-height: 140%;">\n' +
					'			<div style="font-size: 14px; font-weight: 600; color: rgba( 0,0,0,0.9 );">{{ data.item.name }}</div>\n' +
					'			<div style="font-size: 12px; color: rgba( 0,0,0,0.5 );">{{ data.item.releaseDate }}</div>\n' +
					'		</div>\n' +
					'	</template>\n' +
					'</pb-list>',
			},

			propertyTable: {
				columns: [
					// { id: "name",			headerTextId: "messages.propertyTable.column_name",			width: -1,	align: "Left" },
					// { id: "type",			headerTextId: "messages.propertyTable.column_type",			width: 80,	align: "right" },
					// { id: "description",	headerTextId: "messages.propertyTable.column_description",	width: 80,	align: "right" },
					{ id: "name",				headerText: "Name",				width: 150,	align: "Left" },
					{ id: "type",				headerText: "Type",				width: 80,	align: "left" },
					{ id: "description",		headerText: "Description",		width: -1,	align: "left" },
					{ id: "availableValues",	headerText: "Available Values",	width: 120,	align: "left" },
					{ id: "defaultValue",		headerText: "Default Value",	width: 80,	align: "left" },
				],
				data: [
					{
						name: "columns",
						type: "Array",
						description: "The column definitions. See following **Defining Columns** section for details.",
					},
					{
						name: "data",
						type: "Array",
						description: "The row data of the table. Each entry is a row in the table. See following **Loading Table Data** section for details.",
						defaultValue: "null",
					},
					{
						name: "loadDataFunc",
						type: "Function",
						description: "The callback function for loading the table data. See following **Loading Table Data** section for details.",
						defaultValue: "null",
					},
					{
						name: "initialSorting",
						type: "Object",
						description: "The initial sorting options of the table.",
						defaultValue: "null",
					},
					{
						name: "showRowCheckBox",
						type: "Boolean",
						description: "Specify whether show the checkbox for each table row for selection.",
						defaultValue: "false",
					},
				],
			},

			columnDefinitionTable: {
				columns: [
					// { id: "name",			headerTextId: "messages.propertyTable.column_name",			width: -1,	align: "Left" },
					// { id: "type",			headerTextId: "messages.propertyTable.column_type",			width: 80,	align: "right" },
					// { id: "description",	headerTextId: "messages.propertyTable.column_description",	width: 80,	align: "right" },
					{ id: "name",				headerText: "Name",				width: 150,	align: "Left" },
					{ id: "type",				headerText: "Type",				width: 80,	align: "left" },
					{ id: "description",		headerText: "Description",		width: -1,	align: "left" },
					{ id: "availableValues",	headerText: "Available Values",	width: 120,	align: "left" },
					{ id: "defaultValue",		headerText: "Default Value",	width: 80,	align: "left" },
				],
				data: [
					{
						name: "id",
						type: "String",
						description: "",
					},
					{
						name: "headerText",
						type: "String",
						description: "The text of the column header.",
					},
					{
						name: "headerTextId",
						type: "String",
						description: "The globalization ID of the column header text. If `headerTextId` is specified, `headerText` will be ignored.",
					},
					{
						name: "width",
						type: "Integer",
						description: "The width of the column in pixels.",
					},
					{
						name: "align",
						type: "String",
						description: "The horizontal alignment of the contents of the column.",
						availableValues: "left, center, right (case insensitive)",
						defaultValue: "left",
					},
					{
						name: "isRowNoColumn",
						type: "Boolean",
						description: "Specify whether the column is a row number column. The component will automatically fill the content of the row number column.",
						defaultValue: "false",
					},
					{
						name: "contentType",
						type: "String",
						description: "Specify the type of the content data in this column.",
						availableValues: "plain-text, html, markdown, number, date, time, datetime (case insensitive)",
						defaultValue: "plain-text",
					},
				],
			},
		}
	},
	mounted()
	{
		hljs.highlightAll();
	},
	methods:
	{
		onActiveTabChanged: function( oldValue, newValue )
		{
			this.currentTabPage = this.tabs[newValue].id;
		},

		onSelectedWeekdaysChanged: function()
		{
			console.log( this.selectedWeekdays );
			console.log( this.$refs.selectedWeekdays );
			this.$forceUpdate();
		},
		
		setToString: function( set )
		{
			let array = Array.from( set );
			return array.join( ", " );
			// let str = "{ ";
			// let index = 0;
			// set.forEach( item => {
			// 	if (index > 0)
			// 		str += ", ";
			// 	str += 
			// } );
			// str += " }";
			// return str;
		}
	}
}
</script>

<style scoped>
h2 {
	font-size: 18px;
	font-weight: normal;
	margin-top: 30px;
}

.code-block {
	border: 1px solid transparent;
	border-radius: 5px;
	padding: 5px 15px;
	background: rgba( 0, 0, 0, 0.04 );
	overflow: scroll;
	font-family: 'Consolas', Menlo, Monaco, 'Courier New', Courier, monospace;
	font-size: 12px;
	line-height: 160%;
	tab-size: 4;
}
</style>
