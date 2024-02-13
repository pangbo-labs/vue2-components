<template>
	<div ref="contextMenu" class="context-menu" :style="{ 'visibility': isContextMenuVisible ? 'visible' : 'hidden' }">
		<div class="dropdown-menu">
			<div v-for="(item, itemIndex) in menuItems" :key="itemIndex">
				<div v-if="item.text == '-'" class="dropdown-menu-seperator"></div>
				<div v-else class="dropdown-menu-item" :class="{ 'dropdown-menu-default-item': item.isDefault }"
					@click="onMenuItemClicked( item )">
					{{ item.text }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "PbContextMenu",
	props: {
		menuItems: { type: Array, default: [] }
	},
	data: function() {
		return {
			isContextMenuVisible: false,
			clickParameters: null,
		}
	},
	methods:
	{
		showContextMenu: function( event, clickParameters )
		{
			event.preventDefault();

			this.clickParameters = clickParameters;
			this.isContextMenuVisible = true;

			console.log( "showContextMenu" );
			console.log( `this.$refs.contextMenu.offsetWidth, offsetHeight: ${this.$refs.contextMenu.offsetWidth}, ${this.$refs.contextMenu.offsetHeight}` );
			console.log( `(event.clientX, event.clientY): ${event.clientX}, ${event.clientY}` )

			var left = event.clientX;
			var menuWidth = this.$refs.contextMenu.offsetWidth;
			if (window.innerWidth - menuWidth < event.clientX)
				left = event.clientX - menuWidth;
			this.$refs.contextMenu.style.left = left + "px";

			var top = event.clientY;
			var menuHeight = this.$refs.contextMenu.offsetHeight;
			if (window.innerHeight - menuHeight < event.clientY)
				top = event.clientY - menuHeight;
			this.$refs.contextMenu.style.top = top + "px";
			
			document.addEventListener( 'mousedown', this.onMouseDown );
			document.addEventListener( 'keydown', this.onKeyDown );
		},

		onMouseDown: function( event )
		{
			console.log( "onMouseDown" );
			console.log( this.$refs.contextMenu.offsetLeft );
			console.log( this.$refs.contextMenu.offsetWidth );

			var menuLeft = this.$refs.contextMenu.offsetLeft;
			var menuRight = menuLeft + this.$refs.contextMenu.offsetWidth - 1;
			var menuTop = this.$refs.contextMenu.offsetTop;
			var menuBottom = menuTop + this.$refs.contextMenu.offsetHeight - 1;
			if ((event.clientX < menuLeft) || (event.clientX > menuRight) ||
				(event.clientY < menuTop) || (event.clientY > menuBottom))
			{
				this.hideContextMenu();
			}
		},

		onKeyDown: function( event )
		{
			if (event.code == "Escape")
			{
				console.log( "Escape key pressed" );
				this.hideContextMenu();
			}
		},

		hideContextMenu: function( event )
		{
			this.isContextMenuVisible = false;
			document.removeEventListener( 'mousedown', this.hideContextMenu );
			document.removeEventListener( 'keydown', this.onKeyDown );
		},

		onMenuItemClicked: function( item )
		{
			this.hideContextMenu();

			if (item.action)
				item.action( this.clickParameters );
			this.clickParameters = null;
		}
	}
}
</script>

<style scoped>
.context-menu {
	position: absolute;
	left: 0px;
	top: 0px;
}

.dropdown-menu {
	background: var(--popup-menu-background);
    padding: var(--popup-menu-padding);
    width: auto;

    border: 1px solid #EBEEF5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.dropdown-menu-item {
    padding: var(--popup-menu-item-padding);
    font-size: var(--popup-menu-item-text-size);
    line-height: var(--popup-menu-item-line-height);
	color: var(--popup-menu-item-text-color);
    white-space: nowrap;
    height: auto;
	user-select: none;
}

.dropdown-menu-item:hover {
	background-color: var(--hovered-background);
	color: var(--hovered-text-color);
	font-weight: var(--hovered-text-weight);
}

.dropdown-menu-default-item, .dropdown-menu-default-item:hover {
	color: var(--popup-menu-default-item-text-color);
	font-weight: var(--popup-menu-default-item-text-weight);
}

.dropdown-menu-seperator {
	margin: 4px 0px;
	height: 1px;
	background: #e6e6e6;
}
</style>