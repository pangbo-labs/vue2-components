<template>
	<div class="modal-mask" v-if="showDialog" @keydown.esc="onEscKeyDown">
        <div class="dialog-box-wrapper" ref="dialogBoxFrame">
            <div class="dialog-box-body" :style="{ width: (width > 0) ? width + 'px' : (settings.width > 0 ? settings.width : DEFAULT_WIDTH) + 'px' }">
                <div class="title-bar" @mousedown="onTitleBarMouseDown">
					<pb-stack :item-spacing="20">
						<pb-stack-item class="title-text">{{ _title }}</pb-stack-item>
						<pb-stack-item :size="0">
							<div class="control-button" @click="cancelDialog()">✕</div>
						</pb-stack-item>
					</pb-stack>
                </div>
                <div style="height: 0px; border-top: 1px solid #d6d6d6;"></div>
                <div class="contents">
                    <slot name="contents"></slot>
                </div>
                <div style="height: 0px; border-top: 1px solid #d6d6d6;"></div>
                <pb-stack v-if="this.settings && !this.settings.noButtonBar" :item-spacing="30" class="button-bar">
					<pb-stack-item>
						<!-- <pb-button style="margin-right: 6px;">Help</pb-button> -->
					</pb-stack-item>
					<pb-stack-item :size="0">
						<pb-button v-for="(item, itemIndex) in buttons" :key="itemIndex"
							style="margin-left: 6px;" :is-default="item.isDefault" @click="onButtonClicked( item )">
							{{ item.text }}
						</pb-button>
					</pb-stack-item>
				</pb-stack>
            </div>
        </div>
	</div>
</template>

<script>
export default {

    name: "PbDialogBox",

    props: {
		settings:	{ type: Object, default: null },
		showDialog:	{ type: Boolean, default: false },
		title:		{ type: String, default: null },
		titleId:	{ type: String, default: null },
		width:		{ type: Number, default: 0 },
		height:		{ type: Number, default: 0 },
    },
    
    data: function() {
        return {

			DEFAULT_WIDTH: 600,

            isMoving: false,
            mouseX: 0,
            mouseY: 0,

            defaultsettings: {
                title: "",
				titleId: "",
                width: 600,
                height: 0,
                buttons: [
                    { text: "OK", isDefault: true, isOkButton: true },
                    { text: "Cancel", isCancelButton: true },
                ],
                leftButtons: [
                    { text: "Help", isHelpButton: true },
                ],
            },
        }
    },

    computed:
    {
		_title: function()
		{
			if (this.titleId)
				return this.$t( this.titleId );
			else if (this.title)
				return this.title;
			if (this.settings.titleId)
				return this.$t( this.settings.titleId );
			else
				return this.settings.title;
			return "";
		},

        buttons: function()
        {
			if (!this.settings)
				return [];

            return this.settings.buttons ? this.settings.buttons : this.defaultsettings.buttons;
        }
    },
    
    methods: {

        onButtonClicked: function( buttonConfig )
		{
			if (buttonConfig.isOkButton) {
				this.onOkClicked();
			} else if (buttonConfig.isCancelButton) {
				this.cancelDialog();
			}
		},

        endDialog: function( isCancelled ) {
            this.$emit( "update:showDialog", false );
            this.$emit( "dialog-ended", isCancelled );
        },

        cancelDialog: function() {
			this.endDialog( true );
			this.$emit( "cancel-button-clicked" );
        },

        onOkClicked: function() {
            this.$emit( "ok-button-clicked", this.okButtonClickedCallback );
        },

		okButtonClickedCallback: function( endDialog )
		{
			if (endDialog)
				this.endDialog( false );
		},

        onEscKeyDown: function() {
			console.log( "ESC pressed" );
            this.cancelDialog();
        },

        onTitleBarMouseDown: function( event ) {
            if (this.isMoving)
                return;
            this.isMoving = true;
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
            //event.target.$el.setCapture();
            document.addEventListener( "mousemove", this.onTitleBarMouseMove );
			document.addEventListener( "mouseup", this.onTitleBarMouseUp );
        },

        onTitleBarMouseUp: function() {
            if (!this.isMoving)
                return;
            //event.target.releaseCapture()
            document.removeEventListener( "mousemove", this.onTitleBarMouseMove );
			document.removeEventListener( "mouseup", this.onTitleBarMouseUp );
            this.isMoving = false;
        },

        onTitleBarMouseMove: function( event ) {
            if (!this.isMoving)
                return;

            var deltaX = event.clientX - this.mouseX;
            var deltaY = event.clientY - this.mouseY;
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            var dialogBoxFrame = this.$refs.dialogBoxFrame;
            dialogBoxFrame.style.position = "absolute";
            dialogBoxFrame.style.left = (dialogBoxFrame.offsetLeft + deltaX) + "px";
            dialogBoxFrame.style.top = (dialogBoxFrame.offsetTop + deltaY) + "px";

            console.log( "mouse x: " + deltaX + ", y: " + deltaY );
            console.log( event );
        }
    }
}
</script>

<style scoped>

.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba( 0, 0, 0, .3 );
    transition: opacity .8s ease;
}

.dialog-box-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate( -50%, -50% );
}

.dialog-box-body {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba( 0, 0, 0, .3 );
    transition: opacity .5s ease;
}

.title-bar {
    background-color: #fff;
    padding: 15px 25px 12px 25px;
}

.title-text {
    font-size: 20px;
    font-weight: 400;
    line-height: 150%;
    user-select: none;
}

.control-button {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
    width: 25px;
    height: 25px;
    border: 1px solid transparent;
	border-radius: 3px;
    color: #999;
    font-size: 14px;
    line-height: 100%;
    user-select: none;
}

.control-button:hover {
    color: #999;
    border: 1px solid #ccc;
    transition: all .3s;
}

.contents {
    background-color: #fff;
    padding: 25px 30px;
    font-size: 14px;
    font-weight: normal;
    line-height: 175%;
}

.contents p {
    margin: 0 0 10px 0;
    line-height: 170%;
}

.button-bar {
    background-color: #fff;
    display: flex;
    flex-direction: row;
    padding: 18px 30px 18px 30px;
    color: #333;
    font-weight: normal;
    line-height: 150%;
}

.modal-enter {
    opacity: 0;
}

.modal-enter dialog-box-wrapper {
    transform: scale( 1.1 );
}

</style>
