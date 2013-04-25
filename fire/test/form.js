module("Form Events");

// test each of the following events
$.each([
	"focus","blur","change",
	"submit","select","reset"
],function( i, type ){
	// test each event type
	test( '"'+ type +'"', function(){
		expect( 0 );
		
		// custom event properties
		var props = {
			//keyCode: Math.round( Math.random() * 256 ),
			//charCode: Math.round( Math.random() * 256 ),
			ctrlKey: Math.round( Math.random() ) ? true : false, 
			altKey: Math.round( Math.random() ) ? true : false, 
			shiftKey: Math.round( Math.random() ) ? true : false 
		},
		// new test element
		$div = $('<div/>').appendTo( document.body );
		// test the document too for bubbling
		$div.add( document ).bind( type, function( ev ){
			
			equal( ev.currentTarget, this, "event.currentTarget");
			equal( ev.target, $div[0], "event.target" );
			equal( ev.type, type, "event.type" );
	
			equal( ev.ctrlKey, props.ctrlKey, "event.ctrlKey" );
			equal( ev.altKey, props.altKey, "event.altKey" );
			equal( ev.shiftKey, props.shiftKey, "event.shiftKey" );
			equal( ev.metaKey, props.metaKey, "event.metaKey" );
			equal( ev.bubbles, props.bubbles, "event.bubbles" );
		});
		
		// make sure that metaKey and ctrlKey are equal
		props.metaKey = props.ctrlKey;
		// fire the event with bubbling
		props.bubbles = true;
		$div.fire( type, props );
		
		// fire the event without bubbling
		props.bubbles = false;
		$div.fire( type, props );
	
		// cleanup
		$( document ).unbind( type );
		$div.remove();
	});
});
