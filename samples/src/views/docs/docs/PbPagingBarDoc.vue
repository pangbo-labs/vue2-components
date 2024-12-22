<template>
	<div>

		<pb-tab-bar :tabs="tabs" style="width: 100%;" @active-tab-changed="onActiveTabChanged" />

		<div v-if="currentTabPage == 'overview'" class="pb-document">

			<div class="pb-doc-block">
				<pb-paging-bar :total-pages="1" style="margin-top: 32px;"></pb-paging-bar>
			</div>

			<pb-code-block language="html">
				<pre><textarea>
					<pb-paging-bar :total-pages="1"></pb-paging-bar>
				</textarea></pre>
			</pb-code-block>

			<div class="pb-doc-block">
				<pb-paging-bar :total-pages="3" style="margin-top: 32px;"></pb-paging-bar>
			</div>
			
			<pb-code-block language="html">
				<pre><textarea>
					<pb-paging-bar :total-pages="3"></pb-paging-bar>
				</textarea></pre>
			</pb-code-block>

			<div class="pb-doc-block">
				<pb-paging-bar :total-pages="25" :current-page="9"></pb-paging-bar>
			</div>
			
			<pb-code-block language="html">
				<pre><textarea>
					<pb-paging-bar :total-pages="25" :current-page="9"></pb-paging-bar>
				</textarea></pre>
			</pb-code-block>

		</div>

		<div v-if="currentTabPage == 'properties'" class="pb-document">

			<h2>Properties</h2>

			<pb-table :table-config="propertyTable"></pb-table>

			<h2>Events</h2>

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
	name: "PbPagingBarDoc",
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
				userName: { label: "User name:", value: "", placeholder: "Please input the user name" },
				password: { label: "Password:", type: "Password", value: "",  placeholder: "Please input the password" },
				userType: { label: "User type:", type: "Select", value: "LocalUser",  placeholder: "Please input the user type",
							options: [
								{ value: "LocalUser", label: "Local User" },
								{ value: "DomainUser", label: "Domain User" },
							] },
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
						name: "total-pages",
						type: "Number",
						description: "",
						defaultValue: "1",
					},
					{
						name: "current-page",
						type: "Function",
						description: "The index of the current page. Starts from 0.",
						availableValues: "[ 0, total-pages - 1 ]",
						defaultValue: "0",
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
