<template>
	<div>

		<pb-tab-bar :tabs="tabs" style="width: 100%;" @active-tab-changed="onActiveTabChanged" />

		<div v-if="currentTabPage == 'overview'" class="pb-document">

			<pb-form :data="theForm"></pb-form>

			<pb-code-block language="html">
				<pre><textarea>
					<pb-form :data="theForm"></pb-form>
				</textarea></pre>
			</pb-code-block>

			<pb-code-block language="javascript">
				<pre><textarea>
					data: function()
					{
						return {
							theForm: {
								userName:		{ label: "User name:", value: "", placeholder: "Please input the user name" },
								password:		{ label: "Password:", type: "Password", value: "", placeholder: "Please input the password" },
								separator:		{ type: "Separator" },
								userType:		{ label: "User type:", type: "Select", value: "LocalUser", placeholder: "Please input the user type",
													options: [
														{ value: "LocalUser", label: "Local User" },
														{ value: "DomainUser", label: "Domain User" },
													] },
								email:			{ label: "Mail:" },
								description:	{ label: "Description", type: "TextArea" },
							},
						}
					}
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
export default {
	name: "PbFormDoc",
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

			theForm: {
				userName:		{ label: "User name:", value: "", placeholder: "Please input the user name" },
				password:		{ label: "Password:", type: "Password", value: "",  placeholder: "Please input the password" },
				separator:		{ type: "Separator" },
				userType:		{ label: "User type:", type: "Select", value: "LocalUser",  placeholder: "Please input the user type",
									options: [
										{ value: "LocalUser", label: "Local User" },
										{ value: "DomainUser", label: "Domain User" },
									] },
				email:			{ label: "Mail:" },
				description:	{ label: "Description", type: "TextArea" },
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
