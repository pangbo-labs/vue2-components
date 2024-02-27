<template>
	<div style="padding: 30px 30px;" @contextmenu="onRightClicked">
		
		<pb-h-grids :config="hGridsConfig">
			<template v-slot:grid_0>
				<div style="font-size: 24px;">Home</div>
			</template>
			<template v-slot:grid_1>
				<div style="display: flex; flex-direction: row;">
					<pb-dropdown-button :config="languageDropdownConfig" @option-selected="onLanguageOptionSelected">
						<template v-slot:button>{{ languageDropdownConfig.dropdownOptions[languageDropdownConfig.selectedOption].diaplayName }}</template>
					</pb-dropdown-button>
					<pb-button style="margin-left: 8px;" @click="showAboutDialogBox">About</pb-button>
				</div>
			</template>
		</pb-h-grids>

		<pb-tab-bar :tabs="tabs" style="width: 100%; margin-top: 20px;" @active-tab-changed="onActiveTabChanged" />

		<pb-context-menu ref="contextMenu" :menu-items="contextMenuItems" />

		<pb-dialog-box :show-dialog.sync="aboutDialog.isVisible" :title="aboutDialog.title" :width="650"
			@dialog-ended="aboutDialog_OnDialogEnded">
			<template v-slot:contents>
				<div style="margin-bottom: 20px; line-height: 150%;">This is an example application to demonstrate the components. This is an example application to demonstrate the components.</div>
			</template>
		</pb-dialog-box>

		<pb-message-box ref="messageBox" />
	</div>
</template>

<script>
export default {
	name: 'Home',
	data: function()
	{
		return {

			hGridsConfig: {
				grids: [
					{ size: -1,	align: "Left" },
					{ size: 10,	align: "Right" },
				],
				gridSpacing: 20,
				showBorder: false,
			},

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
			},

			languageDropdownConfig: {
				dropdownType: "Options",
				dropdownOptionStyle: "nameOnly", // nameAndDesc
				dropdownOptions: [
					{ diaplayName: "English", value: "en-US" },
					{ diaplayName: "Chinese (Simplified)", value: "zh-CN" },
					{ diaplayName: "Chinese (Traditional)", value: "zh-TW" },
					{ diaplayName: "French", value: "fr-FR" },
					{ diaplayName: "German", value: "" },
					{ diaplayName: "Japanese", value: "jp-JA" },
				],
				selectedOption: 0,
				markSelectedOption: true,
			},
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
			//this.aboutDialog.isVisible = true;
			this.$refs.messageBox.showMessageBox( "About", "This is an example application to demonstrate the components." );
		},

		aboutDialog_OnDialogEnded: function( isCancelled )
		{
			console.log( "" )

			if (isCancelled)
				return;

			// if OK clicked
			// ...
		},

		onLanguageOptionSelected: function( option )
		{
			// this.$set( this.$i18n, "locale", option.value );
		},
	}
}
</script>
