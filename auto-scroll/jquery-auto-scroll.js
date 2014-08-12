/*

You can use it in your "drag" handler like so... 

$( window ).autoScroll( event ); 

Or use it on any other scrollable element. Instead of an event, you 
can pass in an object literal with top/left properties or an array 
with x (0) and y (1) coordinates. A second argument could be included 
to set additional options for controlling the effect: "buffer" - the 
closeness to en edge to begin scrolling, or "distance" - the number of 
pixels to scroll for each method call. 

On Apr 14, 10:43 am, "le.p...@gmail.com" <le.p...@gmail.com> wrote: 
> Hi there, 
> 
> First would like to say this is an awesome plugin. I'm having a little 
> issue on trying to drag an element to a drop location which is not in 
> view. In other words, dragging an element so that the page is able to 
> scroll. Have you came across this? 
> Thanks in advanced. 
> 
> Paul

 */
jQuery.fn.autoScroll = function( arg, opts ) { 
    opts = opts || {}; 
    // the main element 
    var elem = this[0]; 
    // the coordinates to calculate 
    var XX = arg.pageX || arg.left || arg[0] || 0; 
    var YY = arg.pageY || arg.top || arg[1] || 0;
    // the optional options... 
    var buffer = opts.buffer || 100; // pixels from edge 
    var dist = opts.distance || 20; // pixels to scroll per call 
    // page/document scrolling... 
    var page = !elem.ownerDocument || jQuery.nodeName(elem, 'html'); 
    // the element to utilize 
    var $elem = page ? jQuery( window ) : this.eq(0); 
    // the parameters to modify... 
    var top = $elem.scrollTop();
    var left = $elem.scrollLeft(); 
    // attributes to calculate position 
    var offset = page ? { top: 0, left: 0 } : $elem.offset(); 
    // calculate buffer zones 
    var south = YY - offset.top - ( page ? top : 0 ); 
    var north = $elem.height() + offset.top - YY - ( page ? top : 0 ); 
    var east = XX - offset.left - ( page ? left : 0 ); 
    var west = $elem.width() + offset.left - XX - ( page ? left : 0 ); 
    // calculate the distance to move... 
    var vert = south < buffer ? -dist : north < buffer ? dist : 0; 
    var hori = east < buffer ? -dist : west < buffer ? dist : 0; 
    // set the vertical scroll 
    if ( vert !== 0 ) {
        $elem.scrollTop( top + vert );
    } 
    // set the horizontal scroll 
    if ( hori !== 0 ) {
        $elem.scrollLeft( left + hori );
    } 
    // preserve jquery chain... 
    return this; 
}; 
