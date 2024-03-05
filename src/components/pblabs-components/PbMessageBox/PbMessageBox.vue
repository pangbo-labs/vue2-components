<template>
    <pb-dialog-box :show-dialog.sync="dialogBoxConfig.isVisible" :dialog-box-config="dialogBoxConfig" @ok-button-clicked="onOkButtonClicked"
		@dialog-ended="onDialogEnded">
		<template v-slot:contents>
			<pb-stack :item-spacing="20" align-items="center" padding="0 10px">
				<pb-stack-item :size="0">
					<i v-if="dialogBoxConfig.iconType == 'Info'" class="material-symbols material-symbols-rounded message-box-icon" style="color: #999;">info</i>
					<i v-if="dialogBoxConfig.iconType == 'Warning'" class="material-symbols material-symbols-rounded message-box-icon" style="color: #fc3;">warning</i>
					<i v-if="dialogBoxConfig.iconType == 'Error'" class="material-symbols material-symbols-rounded message-box-icon" style="color: #f66;">error</i>
					<i v-if="dialogBoxConfig.iconType == 'Question'" class="material-symbols material-symbols-rounded message-box-icon" style="color: #69f;">help</i>
				</pb-stack-item>
				<pb-stack-item>
					<div class="message-text">{{ dialogBoxConfig.message }}</div>
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
			this.dialogBoxConfig.iconType = iconType ? iconType : "Info";
			this.dialogBoxConfig.buttons = this.messageBoxButtons;
			this.dialogBoxConfig.callback = callback;
            this.dialogBoxConfig.isVisible = true;
        },

		showConfirmBox: function( title, message, callback )
        {
			this.messageBoxType = "ConfirmBox";
            this.dialogBoxConfig.title = title;
            this.dialogBoxConfig.message = message;
			this.dialogBoxConfig.iconType = "Question";
			this.dialogBoxConfig.buttons = this.confirmBoxButtons;
			this.dialogBoxConfig.callback = callback;
            this.dialogBoxConfig.isVisible = true;
        },

		onOkButtonClicked: function( okButtonClickedCallback )
		{
			okButtonClickedCallback( true );
			console.log( this.dialogBoxConfig.callback );
			if (this.dialogBoxConfig.callback) {
				if ((this.messageBoxType = "MessageBox") && this.dialogBoxConfig.callback.acknowledged) {
					this.dialogBoxConfig.callback.acknowledged( this.dialogBoxConfig.callback.callbackParam );
				}
				if ((this.messageBoxType = "ConfirmBox") && this.dialogBoxConfig.callback.confirmed) {
					this.dialogBoxConfig.callback.confirmed( this.dialogBoxConfig.callback.callbackParam );
				}
			}
		},

		onDialogEnded: function( isCancelled )
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

<style scoped>
.message-box-icon {
	display: block;
	font-size: 48px;
}

.message-text {
	line-height: 150%;
}
</style>