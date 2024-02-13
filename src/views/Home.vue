<template>
	<div style="padding: 30px 30px;" @contextmenu="onRightClicked">
		<div style="margin-bottom: 20px;">Home</div>
		<pb-button @click="showAboutDialogBox">About</pb-button>

		<pb-tab-bar :tabs="tabs" style="width: 100%; margin-top: 20px;" @active-tab-changed="onActiveTabChanged" />

		<pb-context-menu ref="contextMenu" :menu-items="contextMenuItems" />

		<pb-dialog-box :show-dialog.sync="aboutDialog.isVisible" :title="aboutDialog.title" :width="650"
			@dialog-ended="aboutDialog_OnDialogEnded">
			<template v-slot:contents>
				<div style="margin-bottom: 20px; line-height: 150%;">This is an example application to demonstrate the components. This is an example application to demonstrate the components.</div>
			</template>
		</pb-dialog-box>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data: function()
	{
		return {

			tabs: [
				{ id: "systemInfo",			text: "System Info" },
				{ id: "volumes",			text: "Volumes" },
				{ id: "softwareVersions",	text: "Software Versions" },
			],

			infoType: "systemInfo",

			contextMenuItems: [
				{ text: "View",			action: null,	isDefault: true },
				{ text: "Sort By",		action: null },
				{ text: "Group By",		action: null },
				{ text: "Refresh",		action: null },
				{ text: "-",			action: null },
				{ text: "Browse Files",	action: null },
				{ text: "Run Command",	action: null },
				{ text: "-",			action: null },
				{ text: "Select All",	action: null },
				{ text: "Unselect All",	action: null },
				{ text: "-",			action: null },
				{ text: "Delete",		action: null },
				{ text: "-",			action: null },
				{ text: "Properties",	action: null },
			],

			aboutDialog: {
				isVisible: false,
				title: "About",
				form: {
					url: "",
				}
			}
		}
	},
	methods:
	{
		onActiveTabChanged: function( oldValue, newValue )
		{
			this.infoType = this.tabs[newValue].id;
		},

		onRightClicked: function( event )
		{
			this.$refs.contextMenu.showContextMenu( event );
		},

		showAboutDialogBox: function()
		{
			this.aboutDialog.isVisible = true;
		},

		aboutDialog_OnDialogEnded: function( isCancelled )
		{
			console.log( "" )

			if (isCancelled)
				return;

			// if OK clicked
			// ...
		}
	}
}
</script>
