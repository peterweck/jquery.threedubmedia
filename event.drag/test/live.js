module("Live Delegation");

$.each(["draginit","dragstart","drag","dragend"],function( i, type ){
	
	test('"'+ type+'"',function(){
		
		expect( i ? 5 : 1 );
		
		if ( !i ){
			ok( true, 'Not supported for this event type.');
			return;
		}
		
		// set up the delegation
		$(document).on( type, '.drag', function( event ){
			count += 1;
			equal( this, $drag[0], event.type+" target" );
		});
		// local refs
		var count = 0,
		// add a div to test the delegation
		$drag = $('<div class="drag" />').appendTo( document.body );
		
		// check triggering of the event handlers
		ok( $drag.trigger( type ), '.trigger("'+ type +'")');
		equal( count, 1, "event was triggered");
	
		// simulate a complete drag
		$drag
			.fire("mousedown",{ pageX:50, pageY:50 })
			.fire("mousemove",{ pageX:51, pageY:51 })
			.fire("mouseup",{ pageX:51, pageY:51 })
			.fire("click",{ pageX:51, pageY:51 });
		
		// check the event handler counts
		equal( count, 2, "event was delegated");

		// remove delegation
		$(document).off( type, '.drag' );
		$drag.remove();
	});
});
