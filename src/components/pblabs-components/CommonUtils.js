
export default {

    getElementPosition: function( element )
    {
        var x = 0;
        var y = 0;
        var tempElement = element;
        while (tempElement != null) {
            x += tempElement.offsetLeft;
            y += tempElement.offsetTop;
            tempElement = tempElement.offsetParent;
        }

        var scrollX = 0;
        var scrollY = 0;
        tempElement = element;
        while (tempElement != null) {
            scrollX += tempElement.scrollLeft;
            scrollY += tempElement.scrollTop;
            tempElement = tempElement.parentElement;
        }

        x -= scrollX;
        y -= scrollY;

        return { x: x, y: y };
    },

	getElementExtent: function( element )
	{
		var position = this.getElementPosition( element );
		return {
			left: position.x,
			top: position.y,
			right: position.x + element.offsetWidth - 1,
			bottom: position.y + element.offsetHeight - 1,
			width: element.offsetWidth,
			height: element.offsetHeight
		}
	},

    hasVirticalScrollBar: function( element )
    {
        return element && (element.scrollHeight > element.clientHeight) && (this.getVirticalScrollBarWidth( element ) > 0);
    },

    getVirticalScrollBarWidth: function( element )
    {
        return element ? element.offsetWidth - element.clientWidth : 0;
    },

	getObjectProperty: function( object, propertyPath )
	{
		if ((object == undefined) || (object == null))
			return object;
		let components = propertyPath.split( "." );
		let result = object;
		for (let i = 0; i < components.length; i ++)
		{
			let component = components[i];
			result = result[component];
			if ((result == null) || (result == undefined))
				break;
		}
		return result;
	},

	getObjectPropertyWithDefault: function( object, propertyPath, defaultValue )
	{
		let value = this.getObjectProperty( object, propertyPath );
		return this.isUndefinedOrNull( value ) ? defaultValue : value;
	},

	isUndefinedOrNull: function( object )
	{
		return ((object == undefined) || (object == null));
	},

	copyObject: function( object )
	{
		if (this.isUndefinedOrNull( object ))
			return null;

		return JSON.parse( JSON.stringify( object ) );
	},

	mergeObject: function( o1, o2 )
	{
		if (this.isUndefinedOrNull( o2 ))
			return;
		
		for (const [key, value] of Object.entries( o2 ))
		{
			if ((o1[key] == null) || (o1[key] == undefined)) {
				// new property? copy directly
				o1[key] = (typeof value != "object") ? value : this.copyObject( value );
			}
			else if (typeof value != "object") {
				// o2.key is a basic type
				o1[key] = value;
			}
			else if (typeof o1[key] != "object") {
				// o1.key is a basic type
				o1[key] = this.copyObject( value );;
			}
			else {
				this.mergeObject( o1[key], value );
			}
		}
	},

}