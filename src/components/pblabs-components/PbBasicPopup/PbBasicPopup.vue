<template>
	<div v-show="isPopupVisible" ref="popup" class="basic-popup">
		<slot>This is the basic popup.</slot>
	</div>
</template>

<script>
import CommonUtils from "../CommonUtils.js"

export default {
	name: "PbBasicPopup",
	props:
	{
		// positioning
		
		positioningMode:	{ type: String, default: "mouse-pointer" },		// mouse-pointer, element
		positionToPoint:	{ type: String, default: "bottom-right" },		// up-left, up-right, bottom-left, bottom-right
		// positioningElement:	{ type: String, default: "" },					// the ref name of the element
		positionToElement:	{ type: String, default: "bottom" },			// left, right, up, bottom
		alignToElement:		{ type: String, default: "left" },				// left, right, up, bottom, center
		syncElementSize:	{ type: Boolean, default: false },

		// showing

		showWhen:			{ type: Array, default: () => [ "right-clicked" ] },	// right-clicked, clicked, mouse-over
		triggerElement:		{ type: String, default: "document" },					// document, previous-sibling
		mouseOverDelay:		{ type: Number, default: 0 },							// in milliseconds

		// hiding

		hideWhen:			{ type: Array, default: () => [ "clicked-outside" ] },	// clicked-outside, clicked-element
	},
	data: function()
	{
		return {
			isPopupVisible: false,
			spaceBetweenScreenEdge: 20,
			spaceBetweenElement: 5,
		}
	},
	mounted: function()
	{
		console.log( "PbBasicPopup.mounted():" );
		console.log( this );

		if (this.triggerElement === "document") {
			this.triggerElementObj = document;
		}
		else if (this.triggerElement === "previous-sibling") {
			this.triggerElementObj = this.$el.previousSibling;
		}
		else {
			this.triggerElementObj = null;
			console.log( `Invalide trigger-element: ${this.triggerElement}` );
			return;
		}

		if (this.positioningMode === "element") {
			this.positioningElement = this.$el.previousSibling;
		}

		if (this.showWhen.includes( "right-clicked" )) {
			console.log( "Add event handler for 'contextmenu'");
			this.triggerElementObj.addEventListener( 'contextmenu', this.onContextMenuEvent );
		}

		if (this.showWhen.includes( "clicked" )) {
			console.log( "Add event handler for 'mousedown'");
			this.triggerElementObj.addEventListener( 'mousedown', this.onMouseDown );
		}
	},
	unmounted: function()
	{
		if (this.showWhen.includes( "right-clicked" )) {
			this.triggerElement.removeEventListener( 'contextmenu', this.showThePopup );
		}

		if (this.showWhen.includes( "clicked" )) {
			this.triggerElement.removeEventListener( 'mousedown', this.showThePopup );
		}
	},
	watch:
	{
		// isPopupVisible: function( newValue, oldValue )
		// {
		// 	if (newValue && (this.positioningMode === "element"))
		// 	{
		// 		this.$nextTick( () => {
		// 			var button = this.$refs.button.$el;
		// 			var buttonExtent = CommonUtils.getElementExtent( this.positioningElement );
		// 			var popup = this.$refs.popup;
		// 			if (this.config.dropdownHorizontalAlign && (this.config.dropdownHorizontalAlign == "Right"))
		// 			{
		// 				var left = buttonExtent.right - popup.offsetWidth;
		// 				left = Math.max( left, this.spaceBetweenScreenEdge );
		// 				popup.style.left = (buttonExtent.right - popup.offsetWidth) + "px";
		// 			}
		// 			else
		// 			{
		// 				var left = buttonExtent.left;
		// 				left = Math.min( left, document.body.clientWidth - this.spaceBetweenScreenEdge - popup.offsetWidth );
		// 				console.log( `buttonExtent.left: ${buttonExtent.left}, left: ${left}` );
		// 				popup.style.left = left + "px";
		// 			}
		// 		} );
		// 	}
		// }
	},
	methods:
	{
		showThePopup: function()
		{
			this.isPopupVisible = true;

			document.addEventListener( 'mousedown', this.onMouseDown );
			document.addEventListener( 'keydown', this.onKeyDown );
		},

		hideThePopup: function()
		{
			this.isPopupVisible = false;

			document.removeEventListener( 'mousedown', this.onMouseDown );
			document.removeEventListener( 'keydown', this.onKeyDown );
		},

		onContextMenuEvent: function( event )
		{
			event.preventDefault( true );
			this.calculatePopupPosition( event );
			this.showThePopup();
		},

		onMouseDown: function( event )
		{
			if (!this.isPopupVisible)
			{
				event.preventDefault( true );
				this.calculatePopupPosition( event );
				this.showThePopup();
			}
			else
			{
				var popupLeft = this.$refs.popup.offsetLeft;
				var popupRight = popupLeft + this.$refs.popup.offsetWidth - 1;
				var pupupTop = this.$refs.popup.offsetTop;
				var popupBottom = pupupTop + this.$refs.popup.offsetHeight - 1;
				if ((event.clientX < popupLeft) || (event.clientX > popupRight) ||
					(event.clientY < pupupTop) || (event.clientY > popupBottom))
				{
					this.hideThePopup();
				}
			}
		},

		onKeyDown: function( event )
		{
			if (event.code == "Escape")
			{
				console.log( "Escape key pressed" );
				this.hideThePopup();
			}
		},

		calculatePopupPosition: function( mouseEvent )
		{
			var popup = this.$refs.popup;
			if (!popup)
				return;

			var popupLeft = 0;
			var popupTop = 0;

			if (this.positioningMode === 'mouse-pointer')
			{
				popupLeft = mouseEvent.clientX;
				var popupWidth = popup.offsetWidth;
				if (window.innerWidth - popupWidth < mouseEvent.clientX)
					popupLeft = mouseEvent.clientX - popupWidth;

				popupTop = mouseEvent.clientY;
				var popupHeight = popup.offsetHeight;
				if (window.innerHeight - popupHeight < mouseEvent.clientY)
					popupTop = mouseEvent.clientY - popupHeight;
			}
			else if (this.positioningMode === "element")
			{
				var positioningElement = this.$el.previousSibling;
				var elementExtent = CommonUtils.getElementExtent( positioningElement );
				console.log( elementExtent );
				if ((this.positionToElement === "top") || (this.positionToElement === "bottom"))
				{
					if (this.positionToElement === "top") {
						popupTop = elementExtent.top - this.spaceBetweenElement;
					} else {
						popupTop = elementExtent.bottom + this.spaceBetweenElement;
					}

					if (this.alignToElement === "left") {
						popupLeft = elementExtent.left;
					}
					else if (this.alignToElement === "right") {
						popupLeft = elementExtent.right - popup.offsetWidth;
					}
					else { // center
						var elementCenter = (elementExtent.right - elementExtent.left) / 2;
						var popupHalfWidth = popup.offsetWidth / 2;
						popupLeft = elementCenter - popupHalfWidth;
					}
				}
				if (this.syncElementSize) {
					console.log( `elementExtent.width: ${elementExtent.width}` );
					popup.style.width = elementExtent.width + "px";
				}
			}

			popup.style.left = popupLeft + "px";
			popup.style.top = popupTop + "px";
		}

	}
}
</script>

<style scoped>
.basic-popup {
	position: absolute;
	left: 0px;
	top: 0px;
	z-index: 999;

	background: var(--popup-menu-background);
    padding: var(--popup-menu-padding);
    width: auto;

    border: 1px solid #EBEEF5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>