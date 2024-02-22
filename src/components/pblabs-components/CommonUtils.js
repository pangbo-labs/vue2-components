
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

    hasVirticalScrollBar: function( element )
    {
        return element && (element.scrollHeight > element.clientHeight) && (this.getVirticalScrollBarWidth( element ) > 0);
    },

    getVirticalScrollBarWidth: function( element )
    {
        return element ? element.offsetWidth - element.clientWidth : 0;
    },

}