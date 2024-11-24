<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Repository location: https://github.com/pangbo-labs/vue2-components
-->

<template>
    <pb-dialog-box :show-dialog.sync="dialogBoxConfig.isVisible" :settings="dialogBoxConfig"
		@ok-button-clicked="onOkButtonClicked" @cancel-button-clicked="onCancelButtonClicked">
		<template v-slot:contents>
			<pb-stack :item-spacing="20" align-items="center" padding="0 10px">
				<pb-stack-item :size="0">
					<i v-if="dialogBoxConfig.iconType == 'InfoIcon'" class="material-symbols material-symbols-rounded message-box-icon" style="color: #999;">info</i>
					<i v-if="dialogBoxConfig.iconType == 'WarningIcon'" class="material-symbols material-symbols-rounded message-box-icon" style="color: #fc3;">warning</i>
					<i v-if="dialogBoxConfig.iconType == 'ErrorIcon'" class="material-symbols material-symbols-rounded message-box-icon" style="color: #f66;">error</i>
					<i v-if="dialogBoxConfig.iconType == 'QuestionIcon'" class="material-symbols material-symbols-rounded message-box-icon" style="color: #69f;">help</i>
				</pb-stack-item>
				<pb-stack-item>
					<div class="message-text" v-html="dialogBoxConfig.message"></div>
				</pb-stack-item>
			</pb-stack>
		</template>
	</pb-dialog-box>
</template>

<script>
export default {
    name: "PbMessageBox",
    data: function()
    {
        return {
            dialogBoxConfig: {
				isVisible: false,
                title: "",
				message: "",
				iconType: "Question", // Info, Warning, Error, Question
                width: 600,
                maxHeight: 0,
				buttons: null,
				callback: null,
            },

			messageBoxType: "MessageBox", // MessageBox, ConfirmBox

			messageBoxButtons: [
				{ text: "OK", isDefault: true, isOkButton: true },
			],

			confirmBoxButtons: [
				{ text: "Yes", isDefault: true, isOkButton: true },
				{ text: "No", isCancelButton: true },
			],
        }
    },
    methods:
    {
		showMessageBox: function( title, message, iconType, callback )
        {
			this.messageBoxType = "MessageBox";
            this.dialogBoxConfig.title = title;
            this.dialogBoxConfig.message = message;
			this.dialogBoxConfig.iconType = iconType ? iconType : "InfoIcon";
			this.dialogBoxConfig.buttons = this.messageBoxButtons;
			this.dialogBoxConfig.callback = callback;
            this.dialogBoxConfig.isVisible = true;
        },

		showConfirmBox: function( title, message, callback )
        {
			this.messageBoxType = "ConfirmBox";
            this.dialogBoxConfig.title = title;
            this.dialogBoxConfig.message = message;
			this.dialogBoxConfig.iconType = "QuestionIcon";
			this.dialogBoxConfig.buttons = this.confirmBoxButtons;
			this.dialogBoxConfig.callback = callback;
            this.dialogBoxConfig.isVisible = true;
        },

		onOkButtonClicked: function( okButtonClickedCallback )
		{
			okButtonClickedCallback( true );
			if (this.dialogBoxConfig.callback) {
				if ((this.messageBoxType = "MessageBox") && this.dialogBoxConfig.callback.acknowledged) {
					this.dialogBoxConfig.callback.acknowledged( this.dialogBoxConfig.callback.callbackParam );
				}
				if ((this.messageBoxType = "ConfirmBox") && this.dialogBoxConfig.callback.confirmed) {
					this.dialogBoxConfig.callback.confirmed( this.dialogBoxConfig.callback.callbackParam );
				}
			}
		},

		onCancelButtonClicked: function()
		{
			console.log( this.dialogBoxConfig.callback );
			if (this.dialogBoxConfig.callback) {
				if ((this.messageBoxType = "ConfirmBox") && this.dialogBoxConfig.callback.denied) {
					this.dialogBoxConfig.callback.denied( this.dialogBoxConfig.callback.callbackParam );
				}
			}
		},
    }
}
</script>

<style scoped>
.message-box-icon {
	display: block;
	font-size: 48px;
}

.message-text {
	font-size: 13px;
	line-height: 150%;
}
</style>