<template>
    <pb-dialog-box :show-dialog.sync="dialogBoxConfig.isVisible" :dialog-box-config="dialogBoxConfig" @ok-button-clicked="onOkButtonClicked"
		@dialog-ended="onDialogEnded">
		<template v-slot:contents>
			<div style="margin-bottom: 20px; line-height: 150%;">{{ dialogBoxConfig.message }}</div>
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
                width: 600,
                maxHeight: 0,
                buttons: [
                    { text: "OK", isDefault: true, isOkButton: true },
                ],
            },
        }
    },
    methods:
    {
		showMessageBox: function( title, message )
        {
            this.dialogBoxConfig.title = title;
            this.dialogBoxConfig.message = message;
            this.dialogBoxConfig.isVisible = true;
        },

		onOkButtonClicked: function( okButtonClickedCallback )
		{
			okButtonClickedCallback( true );
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