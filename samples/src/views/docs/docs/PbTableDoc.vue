<template>
	<div>

		<pb-tab-bar :tabs="tabs" style="width: 100%;" @active-tab-changed="onActiveTabChanged" />

		<div v-if="currentTabPage == 'overview'" class="pb-document">

			<pb-table :table-config="windowsVersionsTableConfig"></pb-table>

			<pb-code-block language="html">
				<pre><textarea>
					<template>
						<div>
							...
							<pb-table :table-config="windowsVersionsTableConfig"></pb-table>
							...
						</div>
					</template>
				</textarea></pre>
			</pb-code-block>

			<pb-code-block language="javascript">
				<pre><textarea>
					import Windows from '@/data/Windows.js'
					...
					data: function()
					{
						return {
							windowsVersionsTableConfig: {
								columns: [
									{ id: "name",			headerText: "Name",			width: -1,	align: "Left" },
									{ id: "codeName",		headerText: "Code Name",	width: -1,	align: "left" },
									{ id: "releaseDate",	headerText: "Release Date",	width: 200,	align: "left" },
									{ id: "version",		headerText: "Version",		width: 120,	align: "left" },
									{ id: "architecture",	headerText: "Architecture",	width: -1,	align: "left" },
								],
								data: Windows.windowsVersions,
							},
						}
					}
				</textarea></pre>
			</pb-code-block>

			<p class="pb-doc-block">
				Windows.js
			</p>

			<pb-code-block language="javascript">
				<pre><textarea>
					export default {
					
						windowsVersions: [
							{
								name:			"Windows 1.01",
								codeName:		"Interface Manager",
								releaseDate:	"1985-11-20",
								version:		"1.01",
								architecture:	"x86-16",
							},
							{
								name:			"Windows 3.0",
								codeName:		"",
								releaseDate:	"1990-05-22",
								version:		"3.00",
								architecture:	"x86-16,IA-32",
							},
							{
								name:			"Windows 3.1",
								codeName:		"",
								releaseDate:	"1992-04-06",
								version:		"3.10",
								architecture:	"x86-16,IA-32",
							},
							{
								name:			"Windows 95",
								codeName:		"Chicago",
								releaseDate:	"1995-08-24",
								version:		"4.00",
								architecture:	"IA-32",
							},
						],

					}
				</textarea></pre>
			</pb-code-block>

			<h2 class="pb-doc-block">Customizing Data</h2>

			<pb-table :table-config="windowsVersionsTableConfig">

				<template v-slot:column_data_codeName="data">
					<div>{{ data.row.codeName ? data.row.codeName : "-" }}</div>
				</template>

				<template v-slot:column_data_architecture="data">
					<ul>
						<li v-for="(item, itemIndex) in data.row.architecture.split( ',' )" :key="itemIndex">
							{{ item.trim() }}
						</li>
					</ul>
				</template>

			</pb-table>

			<pb-code-block language="html">
				<pre><textarea v-pre>
					<template>
						<div>
							...
							<pb-table :table-config="windowsVersionsTableConfig">

								<template v-slot:column_data_codeName="data">
									<div>{{ data.row.codeName ? data.row.codeName : "-" }}</div>
								</template>

								<template v-slot:column_data_architecture="data">
									<ul>
										<li v-for="(item, itemIndex) in data.row.architecture.split( ',' )" :key="itemIndex">
											{{ item.trim() }}
										</li>
									</ul>
								</template>

							</pb-table>
							...
						</div>
					</template>
				</textarea></pre>
			</pb-code-block>

			<p class="pb-doc-block">
				The format of the template slot name is <code>column_data_&lt;COLUMN-ID&gt;</code>
			</p>

			<pb-code-block language="html">
				<pre><textarea>
					column_data_<COLUMN-ID>
				</textarea></pre>
			</pb-code-block>

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
import Windows from '@/data/Windows.js'

export default {
	name: "PbTableDoc",
	data: function()
	{
		return {

			windowsVersions: Windows.windowsVersions,

			windowsVersionsTableConfig: {
				columns: [
					{ id: "name",			headerText: "Name",			width: -1,	align: "Left" },
					{ id: "codeName",		headerText: "Code Name",	width: -1,	align: "left" },
					{ id: "releaseDate",	headerText: "Release Date",	width: 200,	align: "left" },
					{ id: "version",		headerText: "Version",		width: 120,	align: "left" },
					{ id: "architecture",	headerText: "Architecture",	width: -1,	align: "left" },
				],
				data: Windows.windowsVersions,
			},

			tabs: [
				{ id: "overview",		text: "Overview" },
				{ id: "properties",		text: "Properties" },
				{ id: "operations",		text: "Operations" },
				{ id: "events",			text: "Events" },
				{ id: "moreExaples",	text: "More Examples" },
			],
			currentTabPage: 'overview',

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
	methods:
	{
		onActiveTabChanged: function( oldValue, newValue )
		{
			this.currentTabPage = this.tabs[newValue].id;
		},
	}
}
</script>

<style scoped>
h2 {
	font-size: 18px;
	font-weight: normal;
	margin-top: 30px;
}
</style>
