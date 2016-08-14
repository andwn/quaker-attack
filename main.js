
//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=false;

//Start us up!
//
window.onload=function( e ){

	if( RESIZEABLE_CANVAS ){
		window.onresize=function( e ){
			var canvas=document.getElementById( "GameCanvas" );

			//This vs window.innerWidth, which apparently doesn't account for scrollbar?
			var width=document.body.clientWidth;
			
			//This vs document.body.clientHeight, which does weird things - document seems to 'grow'...perhaps canvas resize pushing page down?
			var height=window.innerHeight;			

			canvas.width=width;
			canvas.height=height;
		}
		window.onresize( null );
	}
	
	game_canvas=document.getElementById( "GameCanvas" );
	game_console=document.getElementById( "GameConsole" );
	
	
	try{
		bb_Init();
		bb_Main();
	}catch( ex ){
		if( ex ) alert( ex );
		return;
	}
	
	if( game_runner!=null ){
		game_runner();
	}
}

//Globals
var game_canvas;
var game_console;
var game_runner;

//${METADATA_BEGIN}
var META_DATA="[angel_verdana.png];type=image/png;width=256;height=256;\n[gfx/back1.png];type=image/png;width=800;height=600;\n[gfx/die.png];type=image/png;width=3520;height=240;\n[gfx/logo.png];type=image/png;width=480;height=205;\n[gfx/lolwut.png];type=image/png;width=96;height=128;\n[gfx/morshuface.png];type=image/png;width=61;height=81;\n[gfx/qa/elmo.png];type=image/png;width=128;height=148;\n[gfx/qa/foe.png];type=image/png;width=107;height=96;\n[gfx/qa/hamtaro.png];type=image/png;width=768;height=96;\n[gfx/qa/hippo.png];type=image/png;width=1232;height=117;\n[gfx/qa/mj.png];type=image/png;width=68;height=56;\n[gfx/qa/pokemon.png];type=image/png;width=2000;height=2080;\n[gfx/qa/quaker.png];type=image/png;width=126;height=96;\n[gfx/qa/quaker2.png];type=image/png;width=126;height=96;\n[gfx/qa/troll.png];type=image/png;width=118;height=96;\n[gfx/qa/troll2.png];type=image/png;width=118;height=96;\n[gfx/qa/weegee.png];type=image/png;width=98;height=119;\n[mojo_font.png];type=image/png;width=864;height=13;\n[sfx/die.ogg];type=audio/ogg;length=13801;hertz=22050;\n[sfx/elmo.ogg];type=audio/ogg;length=14645;hertz=22050;\n[sfx/explode.ogg];type=audio/ogg;length=7628;hertz=22050;\n[sfx/fire.ogg];type=audio/ogg;length=79202;hertz=44100;\n[sfx/fuck.ogg];type=audio/ogg;length=7145;hertz=22050;\n[sfx/mj.ogg];type=audio/ogg;length=17897;hertz=22050;\n[sfx/purple.ogg];type=audio/ogg;length=30185;hertz=22050;\n[sfx/weegee.ogg];type=audio/ogg;length=57321;hertz=22050;\n";

//${METADATA_END}
function getMetaData( path,key ){	
	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

function loadString( path ){
	if( path=="" ) return "";
//${TEXTFILES_BEGIN}
		else if( path=="angel_verdana.txt" ) return "id,x,y,width,height,xoffset,yoffset,xadvance,page,chnl\r\n32,185,111,3,3,-1,26,9,0,15\r\n33,16,95,5,21,3,7,10,0,15\r\n34,123,111,10,9,1,6,12,0,15\r\n35,77,50,18,21,1,7,21,0,15\r\n36,0,0,16,27,1,6,17,0,15\r\n37,96,27,26,21,1,7,28,0,15\r\n38,186,23,20,21,0,7,19,0,15\r\n39,134,111,5,9,1,6,7,0,15\r\n40,47,0,10,27,1,6,12,0,15\r\n41,58,0,10,27,1,6,12,0,15\r\n42,42,113,14,14,1,6,17,0,15\r\n43,22,95,18,18,2,10,21,0,15\r\n44,77,113,7,10,1,22,9,0,15\r\n45,154,111,10,4,1,17,12,0,15\r\n46,148,111,5,6,2,22,9,0,15\r\n47,116,0,13,26,-1,6,12,0,15\r\n48,96,71,15,21,1,7,17,0,15\r\n49,203,67,13,21,2,7,17,0,15\r\n50,112,71,15,21,1,7,17,0,15\r\n51,0,73,15,21,1,7,17,0,15\r\n52,204,45,16,21,0,7,17,0,15\r\n53,32,73,15,21,1,7,17,0,15\r\n54,80,72,15,21,1,7,17,0,15\r\n55,48,73,15,21,1,7,17,0,15\r\n56,64,73,15,21,1,7,17,0,15\r\n57,16,73,15,21,1,7,17,0,15\r\n58,249,89,5,17,3,11,12,0,15\r\n59,247,23,7,21,2,11,12,0,15\r\n60,105,93,17,17,2,10,21,0,15\r\n61,105,111,17,9,2,14,21,0,15\r\n62,87,94,17,17,2,10,21,0,15\r\n63,217,67,13,21,1,7,14,0,15\r\n64,154,0,24,24,1,7,26,0,15\r\n65,123,27,20,21,-1,7,18,0,15\r\n66"+
",238,45,16,21,2,7,18,0,15\r\n67,96,49,18,21,0,7,18,0,15\r\n68,151,49,17,21,2,7,20,0,15\r\n69,159,71,14,21,2,7,16,0,15\r\n70,174,69,14,21,2,7,15,0,15\r\n71,207,23,19,21,0,7,20,0,15\r\n72,221,45,16,21,2,7,20,0,15\r\n73,0,95,9,21,1,7,11,0,15\r\n74,243,67,11,21,0,7,12,0,15\r\n75,115,49,17,21,2,7,18,0,15\r\n76,189,67,13,21,2,7,14,0,15\r\n77,20,51,18,21,2,7,22,0,15\r\n78,128,71,15,21,2,7,19,0,15\r\n79,144,27,20,21,0,7,20,0,15\r\n80,144,71,14,21,2,7,16,0,15\r\n81,95,0,20,26,0,7,20,0,15\r\n82,39,51,18,21,2,7,18,0,15\r\n83,187,45,16,21,1,7,18,0,15\r\n84,0,51,19,21,-1,7,16,0,15\r\n85,133,49,17,21,1,7,19,0,15\r\n86,165,25,20,21,-1,7,18,0,15\r\n87,69,28,26,21,0,7,26,0,15\r\n88,58,51,18,21,0,7,18,0,15\r\n89,227,23,19,21,-1,7,16,0,15\r\n90,169,47,17,21,1,7,18,0,15\r\n91,79,0,9,27,2,6,12,0,15\r\n92,130,0,13,26,0,6,12,0,15\r\n93,69,0,9,27,1,6,12,0,15\r\n94,57,113,19,12,1,7,21,0,15\r\n95,165,111,19,3,-1,28,17,0,15\r\n96,140,111,7,7,3,4,17,0,15\r\n97,188,91,15,17,0,11,16,0,15\r\n98,32,28,15,22,1,6,16,0,15\r\n99,204,89,14,17,0,11,14,0,15\r\n100,16,28,15,22,0,6,16,0,15\r\n101,140,93,15,17,0,11,15,"+
"0,15\r\n102,243,0,12,22,-1,6,9,0,15\r\n103,227,0,15,22,0,11,16,0,15\r\n104,48,28,14,22,1,6,16,0,15\r\n105,10,95,5,21,1,7,7,0,15\r\n106,144,0,9,26,-1,7,9,0,15\r\n107,211,0,15,22,1,6,15,0,15\r\n108,63,28,5,22,1,6,7,0,15\r\n109,41,95,23,17,2,11,25,0,15\r\n110,219,89,14,17,1,11,16,0,15\r\n111,123,93,16,17,0,11,16,0,15\r\n112,0,28,15,22,1,11,16,0,15\r\n113,195,0,15,22,0,11,16,0,15\r\n114,30,114,11,17,1,11,11,0,15\r\n115,234,89,14,17,0,11,14,0,15\r\n116,231,67,11,21,-1,7,10,0,15\r\n117,0,117,14,17,1,11,16,0,15\r\n118,156,93,15,17,0,11,15,0,15\r\n119,65,95,21,17,0,11,21,0,15\r\n120,172,93,15,17,0,11,15,0,15\r\n121,179,0,15,22,0,11,15,0,15\r\n122,15,117,14,17,0,11,14,0,15\r\n123,17,0,14,27,1,6,17,0,15\r\n124,89,0,5,27,4,6,12,0,15\r\n125,32,0,14,27,2,6,17,0,15\r\n126,85,113,19,9,1,14,21,0,15\r\n\r\nfirst,second,amount\r\n39,65,-1\r\n45,65,-1\r\n45,74,-1\r\n45,84,-2\r\n45,86,-1\r\n45,87,-1\r\n45,88,-1\r\n45,89,-2\r\n45,118,-1\r\n45,120,-1\r\n45,121,-1\r\n45,122,-1\r\n46,44,-2\r\n46,45,-2\r\n65,45,-1\r\n65,84,-2\r\n65,86,-1\r\n65,87,-1\r\n65,89,-1\r\n65,118,-1\r\n65,121,-1\r\n66,84,-1\r\n67,45,-1\r\n68,44,-1\r\n68,46,-1\r\n"+
"68,84,-1\r\n70,44,-4\r\n70,46,-4\r\n70,58,-1\r\n70,63,1\r\n70,65,-1\r\n70,97,-1\r\n70,101,-1\r\n70,111,-1\r\n75,45,-1\r\n75,97,-1\r\n75,101,-1\r\n75,111,-1\r\n75,117,-1\r\n75,118,-1\r\n75,119,-1\r\n75,121,-1\r\n76,39,-2\r\n76,45,-2\r\n76,74,1\r\n76,84,-2\r\n76,86,-1\r\n76,87,-1\r\n76,89,-2\r\n76,118,-1\r\n76,121,-1\r\n79,84,-1\r\n80,44,-4\r\n80,46,-4\r\n80,65,-1\r\n80,97,-1\r\n80,101,-1\r\n80,111,-1\r\n82,45,-1\r\n82,84,-1\r\n82,97,-1\r\n82,101,-1\r\n82,111,-1\r\n82,121,-1\r\n84,44,-4\r\n84,45,-2\r\n84,46,-4\r\n84,58,-3\r\n84,63,1\r\n84,65,-2\r\n84,67,-1\r\n84,71,-1\r\n84,79,-1\r\n84,84,-1\r\n84,97,-3\r\n84,99,-3\r\n84,101,-3\r\n84,103,-3\r\n84,111,-3\r\n84,114,-3\r\n84,115,-2\r\n84,117,-3\r\n84,118,-3\r\n84,119,-3\r\n84,121,-3\r\n84,122,-2\r\n86,44,-4\r\n86,45,-1\r\n86,46,-4\r\n86,58,-1\r\n86,65,-1\r\n86,97,-1\r\n86,101,-1\r\n86,111,-1\r\n86,117,-1\r\n86,121,-1\r\n87,44,-4\r\n87,45,-1\r\n87,46,-3\r\n87,58,-1\r\n87,65,-1\r\n87,97,-1\r\n87,101,-1\r\n87,111,-1\r\n87,114,-1\r\n87,117,-1\r\n87,121,-1\r\n88,45,-1\r\n88,97,-1\r\n88,101,-1\r\n88,111,-1\r\n88,121,-1\r\n89,44,-4\r\n89,45,-2\r\n89,46,-4\r\n89,58,-3\r\n89,65,-1\r\n89,97,-2\r\n89,100,-2\r\n89,101,-2\r\n89,103,-2\r\n89,109,-1\r\n89,110,-1\r\n89,11"+
"1,-2\r\n89,112,-1\r\n89,113,-2\r\n89,114,-1\r\n89,115,-1\r\n89,117,-1\r\n89,118,-1\r\n90,45,-1\r\n90,97,-1\r\n90,101,-1\r\n90,111,-1\r\n90,119,-1\r\n90,121,-1\r\n99,84,-1\r\n101,84,-2\r\n102,34,1\r\n102,39,1\r\n102,41,1\r\n102,42,1\r\n102,44,-2\r\n102,45,-1\r\n102,46,-2\r\n102,63,1\r\n102,92,1\r\n102,93,1\r\n102,125,1\r\n107,45,-1\r\n114,44,-4\r\n114,46,-4\r\n116,45,-1\r\n118,44,-2\r\n118,45,-1\r\n118,46,-2\r\n118,97,-1\r\n119,44,-1\r\n119,46,-1\r\n120,45,-1\r\n121,44,-2\r\n121,45,-1\r\n121,46,-2\r\n121,97,-1\r\n";
		else if( path=="motd.txt" ) return "Awesome morning, awesome game!\r\nNow with 649 Pokemon!\r\nIt's Hamtaro time!\r\nForget Little Debbie!\r\nEat your damn oatmeal.\r\nHA! HA! I'm using the internet!!!1\r\nWhy're the 5th generation Pokemon so BIG?\r\nIf SQL = Sequel, does PQL = Prequel?\r\nBURNINATE!";
		else if( path=="lang/en/again.txt" ) return "Okay\r\nActually...\r\n";
		else if( path=="lang/en/back.txt" ) return "Back";
		else if( path=="lang/en/failure.txt" ) return "There was an error submitting your score";
		else if( path=="lang/en/highscore.txt" ) return "Highscores";
		else if( path=="lang/en/how.txt" ) return "How to Play\r\n\r\nUse the mouse to move around.\r\n\r\nClick to breathe fire. Breathing fire uses energy,\r\nwhich will recharge automatically when you stop.\r\n\r\nPressing space will use a \"bomb\". You only have 3!\r\n\r\nTry to kill as many enemies as possible to obtain\r\nscore, and avoid the Pokemon they throw at you.\r\n\r\nWhen all of your health runs out, the game ends.\r\n\r\nAlso, press Esc to pause.\r\n";
		else if( path=="lang/en/insane.txt" ) return "Maximum length is 16\r\nMinimum length is 3\r\nAlphanumeric only (Sorry Bobby Tables)\r\n\r\n";
		else if( path=="lang/en/name.txt" ) return "Enter your name:\r\n";
		else if( path=="lang/en/next.txt" ) return "Next";
		else if( path=="lang/en/ok.txt" ) return "Ok";
		else if( path=="lang/en/pause.txt" ) return "Paused\r\n\r\nClick your face\r\nto resume\r\n";
		else if( path=="lang/en/previous.txt" ) return "Previous";
		else if( path=="lang/en/submit.txt" ) return "Submit\r\nCancel";
		else if( path=="lang/en/success.txt" ) return "Score submitted!";
		else if( path=="lang/en/title.txt" ) return "Start\r\nHighscore\r\nHow to Play";
		else if( path=="lang/en/version.txt" ) return "Quaker Attack";
		return "";

//${TEXTFILES_END}
}

function loadImage( path,onloadfun ){
	var ty=getMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;

	var image=new Image();
	
	image.meta_width=parseInt( getMetaData( path,"width" ) );
	image.meta_height=parseInt( getMetaData( path,"height" ) );
	image.onload=onloadfun;
	image.src="data/"+path;
	
	return image;
}

function loadAudio( path ){
	var audio=new Audio( "data/"+path );
	return audio;
}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var err_info="";
var err_stack=[];

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	var str="";
	push_err();
	err_stack.reverse();
	for( var i=0;i<err_stack.length;++i ){
		str+=err_stack[i]+"\n";
	}
	err_stack.reverse();
	pop_err();
	return str;
}

function print( str ){
	if( game_console ){
		game_console.value+=str+"\n";
	}
	if( window.console!=undefined ){
		window.console.log( str );
	}
}

function error( err ){
	throw err;
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_array( arr,index ){
	if( index>=0 && index<arr.length ) return arr;
	error( "Array index out of range" );
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=false;
   return res;
}

function resize_number_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=0;
   return res;
}

function resize_string_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]='';
   return res;
}

function resize_array_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=[];
   return res;
}

function resize_object_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=null;
   return res;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_starts_with( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_ends_with( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}



// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

var dead=false;

var KEY_LMB=1;
var KEY_RMB=2;
var KEY_MMB=3;
var KEY_TOUCH0=0x180;

function eatEvent( e ){
	if( e.stopPropagation ){
		e.stopPropagation();
		e.preventDefault();
	}else{
		e.cancelBubble=true;
		e.returnValue=false;
	}
}

function keyToChar( key ){
	switch( key ){
	case 8:
	case 9:
	case 13:
	case 27:
	case 32:
		return key;
	case 33:
	case 34:
	case 35:
	case 36:
	case 37:
	case 38:
	case 39:
	case 40:
	case 45:
		return key | 0x10000;
	case 46:
		return 127;
	}
	return 0;
}

//***** gxtkApp class *****

function gxtkApp(){

	this.graphics=new gxtkGraphics( this,game_canvas );
	this.input=new gxtkInput( this );
	this.audio=new gxtkAudio( this );

	this.loading=0;
	this.maxloading=0;

	this.updateRate=0;
	
	this.startMillis=(new Date).getTime();
	
	this.suspended=false;
	
	var app=this;
	var canvas=game_canvas;
	
	function gxtkMain(){
		canvas.onkeydown=function( e ){
			app.input.OnKeyDown( e.keyCode );
			var chr=keyToChar( e.keyCode );
			if( chr ) app.input.PutChar( chr );
			if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<124) ) eatEvent( e );
		}

		canvas.onkeyup=function( e ){
			app.input.OnKeyUp( e.keyCode );
		}

		canvas.onkeypress=function( e ){
			if( e.charCode ){
				app.input.PutChar( e.charCode );
			}else if( e.which ){
				app.input.PutChar( e.which );
			}
		}

		canvas.onmousedown=function( e ){
			app.input.OnKeyDown( KEY_LMB );
			eatEvent( e );
		}
		
		canvas.onmouseup=function( e ){
			app.input.OnKeyUp( KEY_LMB );
			eatEvent( e );
		}
		
		canvas.onmouseout=function( e ){
			app.input.OnKeyUp( KEY_LMB );
			eatEvent( e );
		}

		canvas.onmousemove=function( e ){
			var x=e.clientX+document.body.scrollLeft;
			var y=e.clientY+document.body.scrollTop;
			var c=canvas;
			while( c ){
				x-=c.offsetLeft;
				y-=c.offsetTop;
				c=c.offsetParent;
			}
			app.input.OnMouseMove( x,y );
			eatEvent( e );
		}

		canvas.onfocus=function( e ){
			//app.InvokeOnResume();
		}
		
		canvas.onblur=function( e ){
			//app.InvokeOnSuspend();
		}

		canvas.focus();

		app.InvokeOnCreate();
		app.InvokeOnRender();
	}
	
	game_runner=gxtkMain;
}

var timerSeq=0;

gxtkApp.prototype.SetFrameRate=function( fps ){

	var seq=++timerSeq;
	
	if( !fps ) return;
	
	var app=this;
	var updatePeriod=1000.0/fps;
	var nextUpdate=(new Date).getTime()+updatePeriod;
	
	function timeElapsed(){
		if( seq!=timerSeq ) return;

		var time;		
		var updates=0;

		for(;;){
			nextUpdate+=updatePeriod;

			app.InvokeOnUpdate();
			if( seq!=timerSeq ) return;
			
			if( nextUpdate>(new Date).getTime() ) break;
			
			if( ++updates==7 ){
				nextUpdate=(new Date).getTime();
				break;
			}
		}
		app.InvokeOnRender();
		if( seq!=timerSeq ) return;
			
		var delay=nextUpdate-(new Date).getTime();
		setTimeout( timeElapsed,delay>0 ? delay : 0 );
	}
	
	setTimeout( timeElapsed,updatePeriod );
}

gxtkApp.prototype.IncLoading=function(){
	++this.loading;
	if( this.loading>this.maxloading ) this.maxloading=this.loading;
	if( this.loading==1 ) this.SetFrameRate( 0 );
}

gxtkApp.prototype.DecLoading=function(){
	--this.loading;
	if( this.loading!=0 ) return;
	this.maxloading=0;
	this.SetFrameRate( this.updateRate );
}

gxtkApp.prototype.GetMetaData=function( path,key ){
	return getMetaData( path,key );
}

gxtkApp.prototype.Die=function( ex ){
	dead=true;
	this.audio.OnSuspend();
	if( ex ) alert( ex+"\n"+stackTrace() );
	throw ex;
}

gxtkApp.prototype.InvokeOnCreate=function(){
	if( dead ) return;
	
	try{
		this.OnCreate();
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnUpdate=function(){
	if( dead || this.suspended || !this.updateRate || this.loading ) return;
	
	try{
		this.input.BeginUpdate();
		this.OnUpdate();		
		this.input.EndUpdate();
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnSuspend=function(){
	if( dead || this.suspended ) return;
	
	try{
		this.suspended=true;
		this.OnSuspend();
		this.audio.OnSuspend();
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnResume=function(){
	if( dead || !this.suspended ) return;
	
	try{
		this.audio.OnResume();
		this.OnResume();
		this.suspended=false;
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnRender=function(){
	if( dead || this.suspended ) return;
	
	try{
		this.graphics.BeginRender();
		if( this.loading ){
			this.OnLoading();
		}else{
			this.OnRender();
		}
		this.graphics.EndRender();
	}catch( ex ){
		this.Die( ex );
	}
}

//***** GXTK API *****

gxtkApp.prototype.GraphicsDevice=function(){
	return this.graphics;
}

gxtkApp.prototype.InputDevice=function(){
	return this.input;
}

gxtkApp.prototype.AudioDevice=function(){
	return this.audio;
}

gxtkApp.prototype.AppTitle=function(){
	return document.URL;
}

gxtkApp.prototype.LoadState=function(){
	//use cookies for file:// URLS in FF and IE...
	if( document.URL.toLowerCase().substr(0,7)=="file://" &&
			(navigator.userAgent.indexOf( "Firefox" )!=-1 || navigator.userAgent.indexOf( "MSIE" )!=-1) ){
		var bits=document.cookie.split( ";" )
		if( bits.length!=1 ) return "";
		bits=bits[0].split( "=" );
		if( bits.length!=2 || bits[0]!=".mojostate" ) return "";
		return unescape( bits[1] );
	}else{
		var state=localStorage.getItem( ".mojostate@"+document.URL );
		if( state ) return state;
	}
	return "";
}

gxtkApp.prototype.SaveState=function( state ){
	//use cookies for file:// URLS in FF and IE...
	if( document.URL.toLowerCase().substr(0,7)=="file://" &&
			(navigator.userAgent.indexOf( "Firefox" )!=-1 || navigator.userAgent.indexOf( "MSIE" )!=-1) ){
		var exdate=new Date();
		exdate.setDate( exdate.getDate()+3650 );
		document.cookie=".mojostate="+escape( state )+"; expires="+exdate.toUTCString()
	}else{
		localStorage.setItem( ".mojostate@"+document.URL,state );
	}
}

gxtkApp.prototype.LoadString=function( path ){
	return loadString( path );
}

gxtkApp.prototype.SetUpdateRate=function( fps ){
	this.updateRate=fps;
	
	if( !this.loading ) this.SetFrameRate( fps );
}

gxtkApp.prototype.MilliSecs=function(){
	return ((new Date).getTime()-this.startMillis)|0;
}

gxtkApp.prototype.Loading=function(){
	return this.loading;
}

gxtkApp.prototype.OnCreate=function(){
}

gxtkApp.prototype.OnUpdate=function(){
}

gxtkApp.prototype.OnSuspend=function(){
}

gxtkApp.prototype.OnResume=function(){
}

gxtkApp.prototype.OnRender=function(){
}

gxtkApp.prototype.OnLoading=function(){
}

//***** gxtkGraphics class *****

function gxtkGraphics( app,canvas ){
	this.app=app;
	this.canvas=canvas;
	this.gc=canvas.getContext( '2d' );
	this.color="rgb(255,255,255)"
	this.alpha=1.0;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.gc.save();
}

gxtkGraphics.prototype.EndRender=function(){
	this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.canvas.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.canvas.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	
	var app=this.app;
	
	function onloadfun(){
		app.DecLoading();
	};

	app.IncLoading();

	var image=loadImage( path,onloadfun );
	if( image ) return new gxtkSurface( image,this );

	app.DecLoading();
	return null;
}

gxtkGraphics.prototype.DestroySurface=function( surface ){
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;			//Safari Kludge!
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;			//Safari Kludge!
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( surface.image.complete ) this.gc.drawImage( surface.image,x,y );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;	//Safari Kludge!
	//
	if( surface.image.complete ) this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
}

//***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

//***** GXTK API *****

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

//***** Class gxtkInput *****

function gxtkInput( app ){
	this.app=app;
	this.keyStates=new Array( 512 );
	this.charQueue=new Array( 32 );
	this.charPut=0;
	this.charGet=0;
	this.mouseX=0;
	this.mouseY=0;
	this.joyX=0;
	this.joyY=0;
	this.joyZ=0;
	this.accelX=0;
	this.accelY=0;
	this.accelZ=0;
	for( var i=0;i<512;++i ){
		this.keyStates[i]=0;
	}
}

gxtkInput.prototype.BeginUpdate=function(){
}

gxtkInput.prototype.EndUpdate=function(){
	for( var i=0;i<512;++i ){
		this.keyStates[i]&=0x100;
	}
	this.charGet=0;
	this.charPut=0;
}

gxtkInput.prototype.OnKeyDown=function( key ){
	if( (this.keyStates[key]&0x100)==0 ){
		this.keyStates[key]|=0x100;
		++this.keyStates[key];	
	}
}

gxtkInput.prototype.OnKeyUp=function( key ){
	this.keyStates[key]&=0xff;
}

gxtkInput.prototype.PutChar=function( char ){
	if( this.charPut-this.charGet<32 ){
		this.charQueue[this.charPut & 31]=char;
		this.charPut+=1;
	}
}

gxtkInput.prototype.OnMouseMove=function( x,y ){
	this.mouseX=x;
	this.mouseY=y;
}

//***** GXTK API *****

gxtkInput.prototype.KeyDown=function( key ){
	if( key>0 && key<512 ){
		if( key==KEY_TOUCH0 ) key=KEY_LMB;
		return this.keyStates[key] >> 8;
	}
	return 0;
}

gxtkInput.prototype.KeyHit=function( key ){
	if( key>0 && key<512 ){
		if( key==KEY_TOUCH0 ) key=KEY_LMB;
		return this.keyStates[key] & 0xff;
	}
	return 0;
}

gxtkInput.prototype.GetChar=function(){
	if( this.charPut!=this.charGet ){
		var char=this.charQueue[this.charGet & 31];
		this.charGet+=1;
		return char;
	}
	return 0;
}

gxtkInput.prototype.MouseX=function(){
	return this.mouseX;
}

gxtkInput.prototype.MouseY=function(){
	return this.mouseY;
}

gxtkInput.prototype.JoyX=function( index ){
	return this.joyX;
}

gxtkInput.prototype.JoyY=function( index ){
	return this.joyY;
}

gxtkInput.prototype.JoyZ=function( index ){
	return this.joyZ;
}

gxtkInput.prototype.TouchX=function( index ){
	return this.mouseX;
}

gxtkInput.prototype.TouchY=function( index ){
	return this.mouseY;
}

gxtkInput.prototype.AccelX=function(){
	return 0;
}

gxtkInput.prototype.AccelY=function(){
	return 0;
}

gxtkInput.prototype.AccelZ=function(){
	return 0;
}


//***** gxtkChannel class *****
function gxtkChannel(){
	this.audio=null;
	this.sample=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
}

//***** gxtkAudio class *****
function gxtkAudio( app ){
	this.app=app;
	this.okay=typeof(Audio)!="undefined";
	this.nextchan=0;
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.OnSuspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.audio ) chan.audio.pause();
	}
}

gxtkAudio.prototype.OnResume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.audio ) chan.audio.play();
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	var audio=loadAudio( path );
	if( audio ) return new gxtkSample( audio );
	return null;
}

gxtkAudio.prototype.DestroySample=function( sample ){
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];
	
	if( chan.sample==sample && chan.audio ){	//&& !chan.audio.paused ){
		chan.audio.loop=(flags&1)!=0;
		chan.audio.volume=chan.volume;
		try{
			chan.audio.currentTime=0;
		}catch(ex){
		}
		chan.audio.play();
		return;
	}

	if( chan.audio ) chan.audio.pause();
	
	var audio=sample.AllocAudio();
	
	if( audio ){
		for( var i=0;i<33;++i ){
			if( this.channels[i].audio==audio ){
				this.channels[i].audio=null;
				break;
			}
		}
		audio.loop=(flags&1)!=0;
		audio.volume=chan.volume;
		audio.play();
	}
	
	chan.audio=audio;
	chan.sample=sample;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	if( chan.audio ) chan.audio.pause();
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.audio && !chan.audio.paused && !chan.audio.ended ) return 1;
	return 0;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.audio ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.DestroySample( this.music );
		this.music=null;
	}
}

gxtkAudio.prototype.MusicState=function(){

	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){

	this.SetVolume( 32,volume );
}

//***** gxtkSample class *****

function gxtkSample( audio ){
	this.audio=audio;
	this.insts=new Array( 8 );
}

gxtkSample.prototype.AllocAudio=function(){
	for( var i=0;i<8;++i ){
		var audio=this.insts[i];
		if( audio ){
			//Ok, this is ugly but seems to work best...no idea how/why!
			if( audio.paused ){
				if( audio.currentTime==0 ) return audio;
				audio.currentTime=0;
			}else if( audio.ended ){
				audio.pause();
			}
		}else{
			audio=new Audio( this.audio.src );
			this.insts[i]=audio;
			return audio;
		}
	}
	return null;
}
function bbappApp(){
	Object.call(this);
}
function bbappnew(){
	bbappdevice=bbappnew2.call(new bbappAppDevice,this);
	return this;
}
bbappApp.prototype.bbOnCreate=function(){
	return 0;
}
bbappApp.prototype.bbOnUpdate=function(){
	return 0;
}
bbappApp.prototype.bbOnSuspend=function(){
	return 0;
}
bbappApp.prototype.bbOnResume=function(){
	return 0;
}
bbappApp.prototype.bbOnRender=function(){
	return 0;
}
bbappApp.prototype.bbOnLoading=function(){
	return 0;
}
function bbquakerQuaker(){
	bbappApp.call(this);
	this.bbscene=null;
}
bbquakerQuaker.prototype=extend_class(bbappApp);
function bbquakernew(){
	bbappnew.call(this);
	return this;
}
bbquakerQuaker.prototype.bbOnCreate=function(){
	bbgraphicsDefaultFlags=1;
	bbappSetUpdateRate(60);
	bbresource2LoadResources("qa");
	bbrandomSeed=(function(){return (new Date()).getTime();})();
	bbglobalsScoreSuccess([["DERP"]]);
	this.bbscene=(bbscenenew2.call(new bbsceneSceneTitle));
	return 0;
}
bbquakerQuaker.prototype.bbOnUpdate=function(){
	var bbnewScene=this.bbscene.bbUpdate();
	if(bbnewScene!=null){
		this.bbscene=bbnewScene;
	}
	return 0;
}
bbquakerQuaker.prototype.bbOnLoading=function(){
	bbgraphicsDrawText("Derp",10.000000,10.000000,0.000000,0.000000);
	return 0;
}
bbquakerQuaker.prototype.bbOnRender=function(){
	bbgraphicsCls(0.000000,0.000000,0.000000);
	this.bbscene.bbDraw();
	return 0;
}
function bbappAppDevice(){
	gxtkApp.call(this);
	this.bbapp=null;
}
bbappAppDevice.prototype=extend_class(gxtkApp);
function bbappnew2(bbapp){
	this.bbapp=bbapp;
	bbgraphicsSetGraphicsContext(bbgraphicsnew.call(new bbgraphicsGraphicsContext,this.GraphicsDevice()));
	bbinputSetInputDevice(this.InputDevice());
	bbaudioSetAudioDevice(this.AudioDevice());
	return this;
}
function bbappnew3(){
	return this;
}
bbappAppDevice.prototype.OnCreate=function(){
	bbgraphicsSetFont(null,32);
	return this.bbapp.bbOnCreate();
}
bbappAppDevice.prototype.OnUpdate=function(){
	return this.bbapp.bbOnUpdate();
}
bbappAppDevice.prototype.OnSuspend=function(){
	return this.bbapp.bbOnSuspend();
}
bbappAppDevice.prototype.OnResume=function(){
	return this.bbapp.bbOnResume();
}
bbappAppDevice.prototype.OnRender=function(){
	bbgraphicsBeginRender();
	var bbr=this.bbapp.bbOnRender();
	bbgraphicsEndRender();
	return bbr;
}
bbappAppDevice.prototype.OnLoading=function(){
	bbgraphicsBeginRender();
	var bbr=this.bbapp.bbOnLoading();
	bbgraphicsEndRender();
	return bbr;
}
function bbgraphicsGraphicsContext(){
	Object.call(this);
	this.bbdevice=null;
	this.bbdefaultFont=null;
	this.bbfont=null;
	this.bbfirstChar=0;
	this.bbmatrixSp=0;
	this.bbix=1.000000;
	this.bbiy=.0;
	this.bbjx=.0;
	this.bbjy=1.000000;
	this.bbtx=.0;
	this.bbty=.0;
	this.bbtformed=0;
	this.bbmatDirty=0;
	this.bbcolor_r=.0;
	this.bbcolor_g=.0;
	this.bbcolor_b=.0;
	this.bbalpha=.0;
	this.bbblend=0;
	this.bbscissor_x=.0;
	this.bbscissor_y=.0;
	this.bbscissor_width=.0;
	this.bbscissor_height=.0;
	this.bbmatrixStack=new_number_array(192);
}
function bbgraphicsnew(bbdevice){
	this.bbdevice=bbdevice;
	return this;
}
function bbgraphicsnew2(){
	return this;
}
var bbgraphicscontext;
function bbgraphicsSetGraphicsContext(bbgc){
	bbgraphicscontext=bbgc;
	return 0;
}
var bbinputdevice;
function bbinputSetInputDevice(bbdev){
	bbinputdevice=bbdev;
	return 0;
}
var bbaudiodevice;
function bbaudioSetAudioDevice(bbdev){
	bbaudiodevice=bbdev;
	return 0;
}
var bbappdevice;
function bb_Main(){
	bbquakernew.call(new bbquakerQuaker);
	return 0;
}
function bbresourceResource(){
	Object.call(this);
	this.bbnode=null;
	this.bbrefs=1;
}
function bbresourcenew(){
	return this;
}
bbresourceResource.prototype.bbRegister=function(bbtype){
	var bblist=object_downcast((bbresourceresources.bbValueForKey(bbboxesnew3.call(new bbboxesStringObject,bbtype))),bblistList);
	if(!((bblist)!=null)){
		bblist=bblistnew.call(new bblistList);
		bbresourceresources.bbInsert((bbboxesnew3.call(new bbboxesStringObject,bbtype)),bblist);
	}
	this.bbnode=bblist.bbAddLast(this);
	return 0;
}
bbresourceResource.prototype.bbRetain=function(){
	this.bbrefs+=1;
	return 0;
}
function bbgraphicsImage(){
	bbresourceResource.call(this);
	this.bbsurface=null;
	this.bbwidth=0;
	this.bbheight=0;
	this.bbframes=[];
	this.bbflags=0;
	this.bbtx=.0;
	this.bbty=.0;
	this.bbsource=null;
}
bbgraphicsImage.prototype=extend_class(bbresourceResource);
var bbgraphicsDefaultFlags;
function bbgraphicsnew3(){
	bbresourcenew.call(this);
	return this;
}
bbgraphicsImage.prototype.bbSetHandle=function(bbtx,bbty){
	this.bbtx=bbtx;
	this.bbty=bbty;
	this.bbflags=this.bbflags&-2;
	return 0;
}
bbgraphicsImage.prototype.bbApplyFlags=function(bbiflags){
	this.bbflags=bbiflags;
	if((this.bbflags&2)!=0){
		var bb=this.bbframes;
		var bb2=0;
		while(bb2<bb.length){
			var bbf=bb[bb2];
			bb2=bb2+1;
			bbf.bbx+=1;
		}
		this.bbwidth-=2;
	}
	if((this.bbflags&4)!=0){
		var bb3=this.bbframes;
		var bb4=0;
		while(bb4<bb3.length){
			var bbf2=bb3[bb4];
			bb4=bb4+1;
			bbf2.bby+=1;
		}
		this.bbheight-=2;
	}
	if((this.bbflags&1)!=0){
		this.bbSetHandle((this.bbwidth)/2.0,(this.bbheight)/2.0);
	}
	if(this.bbframes.length==1 && this.bbframes[0].bbx==0 && this.bbframes[0].bby==0 && this.bbwidth==this.bbsurface.Width() && this.bbheight==this.bbsurface.Height()){
		this.bbflags|=65536;
	}
	return 0;
}
bbgraphicsImage.prototype.bbLoad=function(bbpath,bbnframes,bbiflags){
	this.bbsurface=bbgraphicscontext.bbdevice.LoadSurface(bbpath);
	if(!((this.bbsurface)!=null)){
		return null;
	}
	this.bbRegister("mojo.graphics.Image");
	this.bbwidth=((this.bbsurface.Width()/bbnframes)|0);
	this.bbheight=this.bbsurface.Height();
	this.bbframes=new_object_array(bbnframes);
	for(var bbi=0;bbi<bbnframes;bbi=bbi+1){
		this.bbframes[bbi]=bbgraphicsnew4.call(new bbgraphicsFrame,bbi*this.bbwidth,0);
	}
	this.bbApplyFlags(bbiflags);
	return this;
}
bbgraphicsImage.prototype.bbGrab=function(bbx,bby,bbiwidth,bbiheight,bbnframes,bbiflags,bbsource){
	bbsource.bbRetain();
	this.bbsource=bbsource;
	this.bbsurface=bbsource.bbsurface;
	this.bbRegister("mojo.graphics.Image");
	this.bbwidth=bbiwidth;
	this.bbheight=bbiheight;
	this.bbframes=new_object_array(bbnframes);
	var bbix=bbx+bbsource.bbframes[0].bbx;
	var bbiy=bby+bbsource.bbframes[0].bby;
	for(var bbi=0;bbi<bbnframes;bbi=bbi+1){
		if(bbix+this.bbwidth>bbsource.bbwidth){
			bbix=bbsource.bbframes[0].bbx;
			bbiy+=this.bbheight;
		}
		if(bbix+this.bbwidth>bbsource.bbwidth || bbiy+this.bbheight>bbsource.bbheight){
			error("Image frame outside surface");
		}
		this.bbframes[bbi]=bbgraphicsnew4.call(new bbgraphicsFrame,bbix,bbiy);
		bbix+=this.bbwidth;
	}
	this.bbApplyFlags(bbiflags);
	return this;
}
bbgraphicsImage.prototype.bbGrabImage=function(bbx,bby,bbwidth,bbheight,bbframes,bbflags){
	if(this.bbframes.length!=1){
		return null;
	}
	return (bbgraphicsnew3.call(new bbgraphicsImage)).bbGrab(bbx,bby,bbwidth,bbheight,bbframes,bbflags,this);
}
bbgraphicsImage.prototype.bbWidth=function(){
	return this.bbwidth;
}
bbgraphicsImage.prototype.bbHeight=function(){
	return this.bbheight;
}
bbgraphicsImage.prototype.bbFrames=function(){
	return this.bbframes.length;
}
function bblistList(){
	Object.call(this);
	this.bb_head=bblistnew2.call(new bblistNode);
}
function bblistnew(){
	return this;
}
bblistList.prototype.bbAddLast=function(bbdata){
	return bblistnew3.call(new bblistNode,this.bb_head,this.bb_head.bb_pred,bbdata);
}
bblistList.prototype.bbClear=function(){
	this.bb_head=bblistnew2.call(new bblistNode);
	return 0;
}
bblistList.prototype.bbObjectEnumerator=function(){
	return bblistnew4.call(new bblistEnumerator,this);
}
bblistList.prototype.bbEquals=function(bblhs,bbrhs){
	return ((bblhs==bbrhs)?1:0);
}
bblistList.prototype.bbRemoveEach=function(bbvalue){
	var bbnode=this.bb_head.bb_succ;
	while(bbnode!=this.bb_head){
		bbnode=bbnode.bb_succ;
		if((this.bbEquals(bbnode.bb_pred.bb_data,bbvalue))!=0){
			bbnode.bb_pred.bbRemove();
		}
	}
	return 0;
}
bblistList.prototype.bbRemove=function(bbvalue){
	this.bbRemoveEach(bbvalue);
	return 0;
}
bblistList.prototype.bbCount=function(){
	var bbn=0;
	var bbnode=this.bb_head.bb_succ;
	while(bbnode!=this.bb_head){
		bbnode=bbnode.bb_succ;
		bbn+=1;
	}
	return bbn;
}
function bbboxesStringObject(){
	Object.call(this);
	this.bbvalue="";
}
function bbboxesnew(bbvalue){
	this.bbvalue=String(bbvalue);
	return this;
}
function bbboxesnew2(bbvalue){
	this.bbvalue=String(bbvalue);
	return this;
}
function bbboxesnew3(bbvalue){
	this.bbvalue=bbvalue;
	return this;
}
function bbboxesnew4(){
	return this;
}
function bbmapMap(){
	Object.call(this);
	this.bbroot=null;
}
function bbmapnew(){
	return this;
}
bbmapMap.prototype.bbCompare=function(bblhs,bbrhs){
	return 0;
}
bbmapMap.prototype.bbFindNode=function(bbkey){
	var bbnode=this.bbroot;
	while((bbnode)!=null){
		var bbcmp=this.bbCompare(bbkey,bbnode.bbkey);
		if(bbcmp>0){
			bbnode=bbnode.bbright;
		}else{
			if(bbcmp<0){
				bbnode=bbnode.bbleft;
			}else{
				return bbnode;
			}
		}
	}
	return bbnode;
}
bbmapMap.prototype.bbGet=function(bbkey){
	var bbnode=this.bbFindNode(bbkey);
	if((bbnode)!=null){
		return bbnode.bbvalue;
	}
	return null;
}
bbmapMap.prototype.bbValueForKey=function(bbkey){
	return this.bbGet(bbkey);
}
bbmapMap.prototype.bbRotateLeft=function(bbnode){
	var bbchild=bbnode.bbright;
	bbnode.bbright=bbchild.bbleft;
	if((bbchild.bbleft)!=null){
		bbchild.bbleft.bbparent=bbnode;
	}
	bbchild.bbparent=bbnode.bbparent;
	if((bbnode.bbparent)!=null){
		if(bbnode==bbnode.bbparent.bbleft){
			bbnode.bbparent.bbleft=bbchild;
		}else{
			bbnode.bbparent.bbright=bbchild;
		}
	}else{
		this.bbroot=bbchild;
	}
	bbchild.bbleft=bbnode;
	bbnode.bbparent=bbchild;
	return 0;
}
bbmapMap.prototype.bbRotateRight=function(bbnode){
	var bbchild=bbnode.bbleft;
	bbnode.bbleft=bbchild.bbright;
	if((bbchild.bbright)!=null){
		bbchild.bbright.bbparent=bbnode;
	}
	bbchild.bbparent=bbnode.bbparent;
	if((bbnode.bbparent)!=null){
		if(bbnode==bbnode.bbparent.bbright){
			bbnode.bbparent.bbright=bbchild;
		}else{
			bbnode.bbparent.bbleft=bbchild;
		}
	}else{
		this.bbroot=bbchild;
	}
	bbchild.bbright=bbnode;
	bbnode.bbparent=bbchild;
	return 0;
}
bbmapMap.prototype.bbInsertFixup=function(bbnode){
	while(((bbnode.bbparent)!=null) && bbnode.bbparent.bbcolor==-1 && ((bbnode.bbparent.bbparent)!=null)){
		if(bbnode.bbparent==bbnode.bbparent.bbparent.bbleft){
			var bbuncle=bbnode.bbparent.bbparent.bbright;
			if(((bbuncle)!=null) && bbuncle.bbcolor==-1){
				bbnode.bbparent.bbcolor=1;
				bbuncle.bbcolor=1;
				bbuncle.bbparent.bbcolor=-1;
				bbnode=bbuncle.bbparent;
			}else{
				if(bbnode==bbnode.bbparent.bbright){
					bbnode=bbnode.bbparent;
					this.bbRotateLeft(bbnode);
				}
				bbnode.bbparent.bbcolor=1;
				bbnode.bbparent.bbparent.bbcolor=-1;
				this.bbRotateRight(bbnode.bbparent.bbparent);
			}
		}else{
			var bbuncle2=bbnode.bbparent.bbparent.bbleft;
			if(((bbuncle2)!=null) && bbuncle2.bbcolor==-1){
				bbnode.bbparent.bbcolor=1;
				bbuncle2.bbcolor=1;
				bbuncle2.bbparent.bbcolor=-1;
				bbnode=bbuncle2.bbparent;
			}else{
				if(bbnode==bbnode.bbparent.bbleft){
					bbnode=bbnode.bbparent;
					this.bbRotateRight(bbnode);
				}
				bbnode.bbparent.bbcolor=1;
				bbnode.bbparent.bbparent.bbcolor=-1;
				this.bbRotateLeft(bbnode.bbparent.bbparent);
			}
		}
	}
	this.bbroot.bbcolor=1;
	return 0;
}
bbmapMap.prototype.bbSet=function(bbkey,bbvalue){
	var bbnode=this.bbroot;
	var bbparent=null;
	var bbcmp=0;
	while((bbnode)!=null){
		bbparent=bbnode;
		bbcmp=this.bbCompare(bbkey,bbnode.bbkey);
		if(bbcmp>0){
			bbnode=bbnode.bbright;
		}else{
			if(bbcmp<0){
				bbnode=bbnode.bbleft;
			}else{
				bbnode.bbvalue=bbvalue;
				return 0;
			}
		}
	}
	bbnode=bbmapnew3.call(new bbmapNode,bbkey,bbvalue,-1,bbparent);
	if(!((bbparent)!=null)){
		this.bbroot=bbnode;
		return 0;
	}
	if(bbcmp>0){
		bbparent.bbright=bbnode;
	}else{
		bbparent.bbleft=bbnode;
	}
	this.bbInsertFixup(bbnode);
	return 0;
}
bbmapMap.prototype.bbInsert=function(bbkey,bbvalue){
	return this.bbSet(bbkey,bbvalue);
}
bbmapMap.prototype.bbContains=function(bbkey){
	return this.bbFindNode(bbkey)!=null;
}
function bbmapStringMap(){
	bbmapMap.call(this);
}
bbmapStringMap.prototype=extend_class(bbmapMap);
function bbmapnew2(){
	bbmapnew.call(this);
	return this;
}
bbmapStringMap.prototype.bbCompare=function(bblhs,bbrhs){
	var bbl=object_downcast((bblhs),bbboxesStringObject).bbvalue;
	var bbr=object_downcast((bbrhs),bbboxesStringObject).bbvalue;
	if(bbl<bbr){
		return -1;
	}
	return ((bbl>bbr)?1:0);
}
var bbresourceresources;
function bbmapNode(){
	Object.call(this);
	this.bbkey=null;
	this.bbright=null;
	this.bbleft=null;
	this.bbvalue=null;
	this.bbcolor=0;
	this.bbparent=null;
}
function bbmapnew3(bbkey,bbvalue,bbcolor,bbparent){
	this.bbkey=bbkey;
	this.bbvalue=bbvalue;
	this.bbcolor=bbcolor;
	this.bbparent=bbparent;
	return this;
}
function bbmapnew4(){
	return this;
}
function bblistNode(){
	Object.call(this);
	this.bb_succ=null;
	this.bb_pred=null;
	this.bb_data=null;
}
function bblistnew2(){
	this.bb_succ=this;
	this.bb_pred=this;
	return this;
}
function bblistnew3(bbsucc,bbpred,bbdata){
	this.bb_succ=bbsucc;
	this.bb_pred=bbpred;
	this.bb_succ.bb_pred=this;
	this.bb_pred.bb_succ=this;
	this.bb_data=bbdata;
	return this;
}
bblistNode.prototype.bbRemove=function(){
	this.bb_succ.bb_pred=this.bb_pred;
	this.bb_pred.bb_succ=this.bb_succ;
	return 0;
}
function bbgraphicsFrame(){
	Object.call(this);
	this.bbx=0;
	this.bby=0;
}
function bbgraphicsnew4(bbx,bby){
	this.bbx=bbx;
	this.bby=bby;
	return this;
}
function bbgraphicsnew5(){
	return this;
}
function bbgraphicsLoadImage(bbpath,bbframeCount,bbflags){
	return (bbgraphicsnew3.call(new bbgraphicsImage)).bbLoad(bbpath,bbframeCount,bbflags);
}
function bbgraphicsLoadImage2(bbpath,bbframeWidth,bbframeHeight,bbframeCount,bbflags){
	var bbatlas=(bbgraphicsnew3.call(new bbgraphicsImage)).bbLoad(bbpath,1,0);
	if((bbatlas)!=null){
		return bbatlas.bbGrabImage(0,0,bbframeWidth,bbframeHeight,bbframeCount,bbflags);
	}
	return null;
}
function bbgraphicsSetFont(bbfont,bbfirstChar){
	if(!((bbfont)!=null)){
		if(!((bbgraphicscontext.bbdefaultFont)!=null)){
			bbgraphicscontext.bbdefaultFont=bbgraphicsLoadImage("mojo_font.png",96,2);
		}
		bbfont=bbgraphicscontext.bbdefaultFont;
		bbfirstChar=32;
	}
	bbgraphicscontext.bbfont=bbfont;
	bbgraphicscontext.bbfirstChar=bbfirstChar;
	return 0;
}
var bbgraphicsrenderDevice;
function bbgraphicsSetMatrix(bbix,bbiy,bbjx,bbjy,bbtx,bbty){
	bbgraphicscontext.bbix=bbix;
	bbgraphicscontext.bbiy=bbiy;
	bbgraphicscontext.bbjx=bbjx;
	bbgraphicscontext.bbjy=bbjy;
	bbgraphicscontext.bbtx=bbtx;
	bbgraphicscontext.bbty=bbty;
	bbgraphicscontext.bbtformed=((bbix!=1.000000 || bbiy!=0.000000 || bbjx!=0.000000 || bbjy!=1.000000 || bbtx!=0.000000 || bbty!=0.000000)?1:0);
	bbgraphicscontext.bbmatDirty=1;
	return 0;
}
function bbgraphicsSetMatrix2(bbm){
	bbgraphicsSetMatrix(bbm[0],bbm[1],bbm[2],bbm[3],bbm[4],bbm[5]);
	return 0;
}
function bbgraphicsSetColor(bbr,bbg,bbb){
	bbgraphicscontext.bbcolor_r=bbr;
	bbgraphicscontext.bbcolor_g=bbg;
	bbgraphicscontext.bbcolor_b=bbb;
	bbgraphicscontext.bbdevice.SetColor(bbr,bbg,bbb);
	return 0;
}
function bbgraphicsSetAlpha(bbalpha){
	bbgraphicscontext.bbalpha=bbalpha;
	bbgraphicscontext.bbdevice.SetAlpha(bbalpha);
	return 0;
}
function bbgraphicsSetBlend(bbblend){
	bbgraphicscontext.bbblend=bbblend;
	bbgraphicscontext.bbdevice.SetBlend(bbblend);
	return 0;
}
function bbgraphicsDeviceWidth(){
	return bbgraphicscontext.bbdevice.Width();
}
function bbgraphicsDeviceHeight(){
	return bbgraphicscontext.bbdevice.Height();
}
function bbgraphicsSetScissor(bbx,bby,bbwidth,bbheight){
	bbgraphicscontext.bbscissor_x=bbx;
	bbgraphicscontext.bbscissor_y=bby;
	bbgraphicscontext.bbscissor_width=bbwidth;
	bbgraphicscontext.bbscissor_height=bbheight;
	bbgraphicscontext.bbdevice.SetScissor(((bbx)|0),((bby)|0),((bbwidth)|0),((bbheight)|0));
	return 0;
}
function bbgraphicsBeginRender(){
	bbgraphicsrenderDevice=bbgraphicscontext.bbdevice;
	bbgraphicscontext.bbmatrixSp=0;
	bbgraphicsSetMatrix(1.000000,0.000000,0.000000,1.000000,0.000000,0.000000);
	bbgraphicsSetColor(255.000000,255.000000,255.000000);
	bbgraphicsSetAlpha(1.000000);
	bbgraphicsSetBlend(0);
	bbgraphicsSetScissor(0.000000,0.000000,(bbgraphicsDeviceWidth()),(bbgraphicsDeviceHeight()));
	return 0;
}
function bbgraphicsEndRender(){
	bbgraphicsrenderDevice=null;
	return 0;
}
function bbappSetUpdateRate(bbhertz){
	return bbappdevice.SetUpdateRate(bbhertz);
}
function bbangelfontAngelFont(){
	Object.call(this);
	this.bbiniText="";
	this.bbkernPairs=bbmapnew2.call(new bbmapStringMap);
	this.bbchars=new_object_array(256);
	this.bbheight=0;
	this.bbheightOffset=9999;
	this.bbimage=null;
	this.bbname="";
	this.bbxOffset=0;
	this.bbuseKerning=true;
}
var bbangelfonterror;
var bbangelfontcurrent;
bbangelfontAngelFont.prototype.bbLoadFont=function(bburl){
	bbangelfonterror="";
	bbangelfontcurrent=this;
	this.bbiniText=bbappLoadString(bburl+".txt");
	var bblines=this.bbiniText.split(String.fromCharCode(10));
	var bb=bblines;
	var bb2=0;
	while(bb2<bb.length){
		var bbline=bb[bb2];
		bb2=bb2+1;
		if(string_starts_with(bbline,"id,") || bbline==""){
			continue;
		}
		if(string_starts_with(bbline,"first,")){
			continue;
		}
		var bbdata=bbline.split(",");
		bbangelfonterror+=String(bbdata.length)+",";
		if(bbdata.length>0){
			if(bbdata.length==3){
				this.bbkernPairs.bbInsert((bbboxesnew3.call(new bbboxesStringObject,String.fromCharCode(parseInt(bbdata[0]))+"_"+String.fromCharCode(parseInt(bbdata[1])))),bbkernpairnew.call(new bbkernpairKernPair,parseInt(bbdata[0]),parseInt(bbdata[1]),parseInt(bbdata[2])));
			}else{
				if(bbdata.length>=8){
					this.bbchars[parseInt(bbdata[0])]=bbcharnew.call(new bbcharChar,parseInt(bbdata[1]),parseInt(bbdata[2]),parseInt(bbdata[3]),parseInt(bbdata[4]),parseInt(bbdata[5]),parseInt(bbdata[6]),parseInt(bbdata[7]));
					var bbch=this.bbchars[parseInt(bbdata[0])];
					if(bbch.bbheight>this.bbheight){
						this.bbheight=bbch.bbheight;
					}
					if(bbch.bbyOffset<this.bbheightOffset){
						this.bbheightOffset=bbch.bbyOffset;
					}
				}
			}
		}
	}
	this.bbimage=bbgraphicsLoadImage(bburl+".png",1,bbgraphicsDefaultFlags);
	this.bbimage.bbSetHandle(0.000000,0.000000);
}
var bbangelfont_list;
function bbangelfontnew(bburl){
	if(bburl!=""){
		this.bbLoadFont(bburl);
		this.bbname=bburl;
		bbangelfont_list.bbInsert((bbboxesnew3.call(new bbboxesStringObject,bburl)),this);
	}
	return this;
}
function bbangelfontGetCurrent(){
	return bbangelfontcurrent;
}
bbangelfontAngelFont.prototype.bbDrawText=function(bbtxt,bbx,bby){
	var bbprevChar="";
	this.bbxOffset=0;
	for(var bbi=0;bbi<bbtxt.length;bbi=bbi+1){
		var bbasc=bbtxt.charCodeAt(bbi);
		var bbac=this.bbchars[bbasc];
		var bbthisChar=String.fromCharCode(bbasc);
		if(bbac!=null){
			if(this.bbuseKerning){
				var bbkey=bbprevChar+"_"+bbthisChar;
				if(this.bbkernPairs.bbContains(bbboxesnew3.call(new bbboxesStringObject,bbkey))){
					this.bbxOffset+=object_downcast((this.bbkernPairs.bbGet(bbboxesnew3.call(new bbboxesStringObject,bbkey))),bbkernpairKernPair).bbamount;
				}
			}
			bbac.bbDraw(this.bbimage,bbx+this.bbxOffset,bby);
			this.bbxOffset+=bbac.bbxAdvance;
			bbprevChar=bbthisChar;
		}
	}
}
bbangelfontAngelFont.prototype.bbTextWidth=function(bbtxt){
	var bbprevChar="";
	var bbwidth=0;
	for(var bbi=0;bbi<bbtxt.length;bbi=bbi+1){
		var bbasc=bbtxt.charCodeAt(bbi);
		var bbac=this.bbchars[bbasc];
		var bbthisChar=String.fromCharCode(bbasc);
		if(bbac!=null){
			if(this.bbuseKerning){
				var bbkey=bbprevChar+"_"+bbthisChar;
				if(this.bbkernPairs.bbContains(bbboxesnew3.call(new bbboxesStringObject,bbkey))){
					bbwidth+=object_downcast((this.bbkernPairs.bbGet(bbboxesnew3.call(new bbboxesStringObject,bbkey))),bbkernpairKernPair).bbamount;
				}
			}
			bbwidth+=bbac.bbxAdvance;
			bbprevChar=bbthisChar;
		}
	}
	return bbwidth;
}
bbangelfontAngelFont.prototype.bbDrawText2=function(bbtxt,bbx,bby,bbalign){
	this.bbxOffset=0;
	var bb=bbalign;
	if(bb==1){
		this.bbDrawText(bbtxt,bbx-((this.bbTextWidth(bbtxt)/2)|0),bby);
	}else{
		if(bb==2){
			this.bbDrawText(bbtxt,bbx-this.bbTextWidth(bbtxt),bby);
		}else{
			if(bb==0){
				this.bbDrawText(bbtxt,bbx,bby);
			}
		}
	}
}
bbangelfontAngelFont.prototype.bbGetChars=function(){
	return this.bbchars;
}
bbangelfontAngelFont.prototype.bbDrawWidth=function(bbtxt,bbx,bby,bbwidth){
	var bbprevChar="";
	var bbFUCK=0.000000;
	var bbcharScale=bbwidth/(this.bbTextWidth(bbtxt));
	var bbcharChop=((this.bbTextWidth(bbtxt))-bbwidth)/(bbtxt.length);
	for(var bbi=0;bbi<bbtxt.length;bbi=bbi+1){
		var bbasc=bbtxt.charCodeAt(bbi);
		var bbac=this.bbchars[bbasc];
		var bbthisChar=String.fromCharCode(bbasc);
		if(bbac!=null){
			if(this.bbuseKerning){
				var bbkey=bbprevChar+"_"+bbthisChar;
				if(this.bbkernPairs.bbContains(bbboxesnew3.call(new bbboxesStringObject,bbkey))){
					bbFUCK+=(object_downcast((this.bbkernPairs.bbGet(bbboxesnew3.call(new bbboxesStringObject,bbkey))),bbkernpairKernPair).bbamount)-bbcharChop;
				}
			}
			bbac.bbDraw2(this.bbimage,(((bbx)+bbFUCK)|0),bby,bbcharScale);
			bbFUCK+=(bbac.bbxAdvance)-bbcharChop;
			bbprevChar=bbthisChar;
		}
	}
}
function bbappLoadString(bbpath){
	return bbappdevice.LoadString(bbpath);
}
function bbkernpairKernPair(){
	Object.call(this);
	this.bbfirst="";
	this.bbsecond="";
	this.bbamount=0;
}
function bbkernpairnew(bbfirst,bbsecond,bbamount){
	this.bbfirst=String(bbfirst);
	this.bbsecond=String(bbsecond);
	this.bbamount=bbamount;
	return this;
}
function bbkernpairnew2(){
	return this;
}
function bbcharChar(){
	Object.call(this);
	this.bbx=0;
	this.bby=0;
	this.bbwidth=0;
	this.bbheight=0;
	this.bbxOffset=0;
	this.bbyOffset=0;
	this.bbxAdvance=0;
}
function bbcharnew(bbx,bby,bbw,bbh,bbxoff,bbyoff,bbxadv){
	this.bbx=bbx;
	this.bby=bby;
	this.bbwidth=bbw;
	this.bbheight=bbh;
	this.bbxOffset=bbxoff;
	this.bbyOffset=bbyoff;
	this.bbxAdvance=bbxadv;
	return this;
}
function bbcharnew2(){
	return this;
}
bbcharChar.prototype.bbDraw=function(bbfontImage,bblinex,bbliney){
	bbgraphicsDrawImageRect(bbfontImage,(bblinex+this.bbxOffset),(bbliney+this.bbyOffset),this.bbx,this.bby,this.bbwidth,this.bbheight,0);
	return 0;
}
bbcharChar.prototype.bbDraw2=function(bbfontImage,bblinex,bbliney,bbscale){
	bbgraphicsDrawImageRect2(bbfontImage,(bblinex+this.bbxOffset),(bbliney+this.bbyOffset),this.bbx,this.bby,this.bbwidth,this.bbheight,0.000000,bbscale,1.0,0);
	return 0;
}
var bbresource2Font;
function bbresource2TGFX(){
	Object.call(this);
	this.bbQuaker=null;
	this.bbQuaker2=null;
	this.bbPoke=null;
	this.bbHam=null;
	this.bbHip=null;
	this.bbWeegee=null;
	this.bbElmo=null;
	this.bbFOE=null;
	this.bbTroll=null;
	this.bbTroll2=null;
	this.bbMJ=null;
	this.bbBack=null;
	this.bbLolwut=null;
	this.bbMFace=null;
	this.bbDie=null;
	this.bbLogo=null;
	//this.bbOkay=null;
	//this.bbActually=null;
}
function bbresource2new(bbdir){
	this.bbQuaker=bbgraphicsLoadImage("gfx/"+bbdir+"/quaker.png",1,bbgraphicsDefaultFlags);
	this.bbQuaker2=bbgraphicsLoadImage("gfx/"+bbdir+"/quaker2.png",1,bbgraphicsDefaultFlags);
	this.bbPoke=bbgraphicsLoadImage("gfx/"+bbdir+"/pokemon.png",1,bbgraphicsDefaultFlags);
	this.bbHam=bbgraphicsLoadImage("gfx/"+bbdir+"/hamtaro.png",8,bbgraphicsDefaultFlags);
	this.bbHip=bbgraphicsLoadImage("gfx/"+bbdir+"/hippo.png",11,bbgraphicsDefaultFlags);
	this.bbWeegee=bbgraphicsLoadImage("gfx/"+bbdir+"/weegee.png",1,bbgraphicsDefaultFlags);
	this.bbElmo=bbgraphicsLoadImage("gfx/"+bbdir+"/elmo.png",1,bbgraphicsDefaultFlags);
	this.bbFOE=bbgraphicsLoadImage("gfx/"+bbdir+"/foe.png",1,bbgraphicsDefaultFlags);
	this.bbTroll=bbgraphicsLoadImage("gfx/"+bbdir+"/troll.png",1,bbgraphicsDefaultFlags);
	this.bbTroll2=bbgraphicsLoadImage("gfx/"+bbdir+"/troll2.png",1,bbgraphicsDefaultFlags);
	this.bbMJ=bbgraphicsLoadImage("gfx/"+bbdir+"/mj.png",2,bbgraphicsDefaultFlags);
	this.bbBack=bbgraphicsLoadImage("gfx/back1.png",1,bbgraphicsDefaultFlags);
	this.bbLolwut=bbgraphicsLoadImage("gfx/lolwut.png",1,bbgraphicsDefaultFlags);
	this.bbMFace=bbgraphicsLoadImage("gfx/morshuface.png",1,bbgraphicsDefaultFlags);
	this.bbDie=bbgraphicsLoadImage("gfx/die.png",11,bbgraphicsDefaultFlags);
	this.bbLogo=bbgraphicsLoadImage("gfx/logo.png",1,bbgraphicsDefaultFlags);
	//this.bbOkay=bbgraphicsLoadImage("gfx/okay.png",1,bbgraphicsDefaultFlags);
	//this.bbActually=bbgraphicsLoadImage("gfx/actually.png",1,bbgraphicsDefaultFlags);
	return this;
}
function bbresource2new2(){
	return this;
}
var bbresource2gfx;
function bbresource2TSFX(){
	Object.call(this);
	this.bbPurple=null;
	this.bbElmo=null;
	this.bbMJ=null;
	this.bbWeegee=null;
	this.bbFuck=null;
	this.bbBomb=null;
	this.bbFire=null;
	this.bbExplode=null;
}
function bbresource2new3(bbdir){
	var bbext=".ogg";
	this.bbPurple=bbaudioLoadSound("sfx/purple"+bbext);
	this.bbElmo=bbaudioLoadSound("sfx/elmo"+bbext);
	this.bbMJ=bbaudioLoadSound("sfx/mj"+bbext);
	this.bbWeegee=bbaudioLoadSound("sfx/weegee"+bbext);
	this.bbFuck=bbaudioLoadSound("sfx/fuck"+bbext);
	this.bbBomb=bbaudioLoadSound("sfx/die"+bbext);
	this.bbFire=bbaudioLoadSound("sfx/fire"+bbext);
	this.bbExplode=bbaudioLoadSound("sfx/explode"+bbext);
	return this;
}
function bbresource2new4(){
	return this;
}
function bbaudioSound(){
	bbresourceResource.call(this);
	this.bbsample=null;
}
bbaudioSound.prototype=extend_class(bbresourceResource);
function bbaudionew(bbsample){
	bbresourcenew.call(this);
	this.bbsample=bbsample;
	if((bbsample)!=null){
		this.bbRegister("mojo.audio.Sound");
	}
	return this;
}
function bbaudionew2(){
	bbresourcenew.call(this);
	return this;
}
function bbaudioLoadSound(bbpath){
	var bbsample=bbaudiodevice.LoadSample(bbpath);
	if((bbsample)!=null){
		return bbaudionew.call(new bbaudioSound,bbsample);
	}
	return null;
}
var bbresource2SFX;
function bbresource2LoadResources(bbdir){
	bbresource2Font=bbangelfontnew.call(new bbangelfontAngelFont,"");
	bbresource2Font.bbLoadFont("angel_verdana");
	bbresource2gfx=bbresource2new.call(new bbresource2TGFX,bbdir);
	bbresource2SFX=bbresource2new3.call(new bbresource2TSFX,bbdir);
	return 0;
}
var bbrandomSeed;
var bbglobalsHighscores;
var bbglobalsscoreFinished;
function bbglobalsScoreSuccess(bbscores){
	bbglobalsHighscores=[["#FAILED",""]];
	if(bbscores[0][0]=="DERP"){
		return;
	}
	bbglobalsHighscores=bbscores;
	bbglobalsscoreFinished=true;
}
function bbsceneSceneBase(){
	Object.call(this);
}
function bbscenenew(){
	return this;
}
bbsceneSceneBase.prototype.bbUpdate=function(){
	return null;
}
bbsceneSceneBase.prototype.bbDraw=function(){
	return 0;
}
function bbsceneSceneTitle(){
	bbsceneSceneBase.call(this);
	this.bbversion="";
	this.bbpokemon=null;
	this.bbmotd=[];
	this.bbmotdIndex=0;
	this.bbmenuID=0;
	this.bbtitleMenu=null;
	this.bbhowText="";
}
bbsceneSceneTitle.prototype=extend_class(bbsceneSceneBase);
bbsceneSceneTitle.prototype.bbSwitchMenu=function(bbmID){
	this.bbmenuID=bbmID;
	var bb=this.bbmenuID;
	if(bb==0){
		this.bbtitleMenu=bbmenunew.call(new bbmenuMenu,400,380,"title");
		this.bbhowText="";
	}else{
		if(bb==1){
			this.bbtitleMenu=bbmenunew.call(new bbmenuMenu,700,560,"back");
			this.bbhowText=bbappLoadString("lang/"+bbglobalsuserLang+"/how.txt");
		}
	}
	return 0;
}
function bbscenenew2(){
	bbscenenew.call(this);
	bbresource2gfx.bbPoke.bbSetHandle(40.000000,40.000000);
	this.bbversion=bbappLoadString("lang/"+bbglobalsuserLang+"/version.txt");
	this.bbpokemon=bblistnew.call(new bblistList);
	this.bbmotd=bbappLoadString("motd.txt").split("\n");
	this.bbmotdIndex=((bbrandomRnd3(this.bbmotd.length))|0);
	this.bbSwitchMenu(0);
	return this;
}
bbsceneSceneTitle.prototype.bbUpdate=function(){
	var bb=this.bbmenuID;
	if(bb==0){
		var bba=this.bbtitleMenu.bbUpdate();
		var bb2=bba;
		if(bb2==1){
			return (bbscenenew3.call(new bbsceneSceneGame));
		}else{
			if(bb2==2){
				return (bbscenenew4.call(new bbsceneSceneScore));
			}else{
				if(bb2==3){
					this.bbSwitchMenu(1);
				}
			}
		}
	}else{
		if(bb==1){
			if(this.bbtitleMenu.bbUpdate()>0){
				this.bbSwitchMenu(0);
			}
		}
	}
	var bb3=this.bbpokemon.bbObjectEnumerator();
	while(bb3.bbHasNext()){
		var bbb=object_downcast((bb3.bbNextObject()),bbenemyTBullet);
		bbb.bbUpdate();
	}
	if(this.bbpokemon.bbCount()<12){
		var bbside=((bbrandomRnd3(4.000000))|0);
		var bbpx=.0;
		var bbpy=.0;
		var bbangle=.0;
		var bbpxs=.0;
		var bbpys=.0;
		var bbp=null;
		var bb4=bbside;
		if(bb4==0){
			bbpx=-40.000000;
			bbpy=bbrandomRnd2(40.000000,560.000000);
		}else{
			if(bb4==1){
				bbpx=840.000000;
				bbpy=bbrandomRnd2(40.000000,560.000000);
			}else{
				if(bb4==2){
					bbpx=bbrandomRnd2(40.000000,760.000000);
					bbpy=-40.000000;
				}else{
					if(bb4==3){
						bbpx=bbrandomRnd2(40.000000,760.000000);
						bbpy=640.000000;
					}
				}
			}
		}
		bbangle=(Math.atan2(bbpx-400.000000,bbpy-300.000000)*R2D);
		bbangle+=-40.000000+bbrandomRnd3(81.000000);
		bbpxs=Math.sin((bbangle)*D2R)*4.000000;
		bbpys=Math.cos((bbangle)*D2R)*4.000000;
		this.bbpokemon.bbAddLast(bbenemyMake(bbpx,bbpy,-bbpxs,-bbpys));
	}
	return null;
}
bbsceneSceneTitle.prototype.bbDraw=function(){
	var bb=this.bbpokemon.bbObjectEnumerator();
	while(bb.bbHasNext()){
		var bbb=object_downcast((bb.bbNextObject()),bbenemyTBullet);
		bbb.bbDraw();
		if(bbb.bbX<-40.000000 || bbb.bbX>840.000000 || bbb.bbY<-40.000000 || bbb.bbY>640.000000){
			this.bbpokemon.bbRemove(bbb);
		}
	}
	if(this.bbmenuID==0){
		bbgraphicsDrawImage(bbresource2gfx.bbLogo,400.000000,200.000000,0);
		bbgraphicsDrawText(this.bbmotd[this.bbmotdIndex],480.000000,320.000000,0.000000,0.000000);
	}
	this.bbtitleMenu.bbDraw();
	bbsimpletextboxDraw(this.bbhowText,400,30,800,1);
	bbgraphicsDrawText(this.bbversion+" v1.0 (r18) - 2011-04-13",10.000000,580.000000,0.000000,0.000000);
	return 0;
}
var bbglobalsuserLang;
function bbenemyTBullet(){
	Object.call(this);
	this.bbXSpd=.0;
	this.bbX=.0;
	this.bbYSpd=.0;
	this.bbY=.0;
	this.bbRotationSpeed=1.000000+bbrandomRnd()*3.000000;
	this.bbRotation=bbrandomRnd2(0.000000,359.000000);
	this.bbIndex=((bbrandomRnd3(650.000000))|0);
	this.bbImgX=0;
	this.bbImgY=0;
	this.bbHitBoxRadius=12;
}
bbenemyTBullet.prototype.bbUpdate=function(){
	this.bbX+=this.bbXSpd;
	this.bbY+=this.bbYSpd;
	this.bbRotation+=this.bbRotationSpeed;
	if(this.bbX<-40.000000 || this.bbX>840.000000 || this.bbY<-40.000000 || this.bbY>640.000000){
		bbglobalsBullets.bbRemove(this);
	}
	return 0;
}
function bbenemynew(){
	return this;
}
function bbenemyMake(bbX,bbY,bbXSpd,bbYSpd){
	var bbobj=bbenemynew.call(new bbenemyTBullet);
	bbobj.bbX=bbX;
	bbobj.bbY=bbY;
	bbobj.bbXSpd=bbXSpd;
	bbobj.bbYSpd=bbYSpd;
	bbobj.bbImgX=80*bbobj.bbIndex;
	while(bbobj.bbImgX>=2000){
		bbobj.bbImgY+=80;
		bbobj.bbImgX-=2000;
	}
	return bbobj;
}
bbenemyTBullet.prototype.bbDraw=function(){
	bbgraphicsDrawImageRect2(bbresource2gfx.bbPoke,this.bbX,this.bbY,this.bbImgX,this.bbImgY,80,80,this.bbRotation,1.000000,1.000000,0);
	return 0;
}
bbenemyTBullet.prototype.bbExplode=function(){
	if(!bbglobalsMuteSFX){
		bbaudioPlaySound(bbresource2SFX.bbExplode,0,0);
	}
	for(var bbi=0;bbi<=4;bbi=bbi+1){
		bbglobalsExplosion.bbAddLast(bbfireMake2(this.bbX,this.bbY,bbrandomRnd3(256.000000),bbrandomRnd3(256.000000),bbrandomRnd3(256.000000)));
	}
	bbglobalsBullets.bbRemove(this);
	return 0;
}
function bbrandomRnd(){
	bbrandomSeed=bbrandomSeed*1664525+1013904223|0;
	return (((bbrandomSeed/4)|0)&1073741823)/1073741824.000000;
}
function bbrandomRnd2(bblow,bbhigh){
	return bbrandomRnd3(bbhigh-bblow)+bblow;
}
function bbrandomRnd3(bbrange){
	return bbrandomRnd()*bbrange;
}
function bbmenuMenu(){
	Object.call(this);
	this.bbX=0;
	this.bbY=0;
	this.bbNSel=0;
	this.bbText=[];
	this.bbHovering=false;
	this.bbCSel=0;
}
function bbmenunew(bbXX,bbYY,bbfile){
	this.bbX=bbXX;
	this.bbY=bbYY;
	var bbstr=bbappLoadString("lang/"+bbglobalsuserLang+"/"+bbfile+".txt");
	var bbdata=bbstr.split("\n");
	this.bbNSel=bbdata.length;
	this.bbText=new_string_array(this.bbNSel);
	for(var bbi=0;bbi<=this.bbNSel-1;bbi=bbi+1){
		this.bbText[bbi]=bbdata[bbi];
	}
	return this;
}
function bbmenunew2(){
	return this;
}
bbmenuMenu.prototype.bbUpdate=function(){
	this.bbHovering=false;
	if(bbinputMouseX()>(this.bbX-100) && bbinputMouseY()>(this.bbY) && bbinputMouseX()<(this.bbX+100) && bbinputMouseY()<(this.bbY+this.bbNSel*28)){
		this.bbHovering=true;
		this.bbCSel=((Math.floor((bbinputMouseY()-(this.bbY))/28.000000))|0);
		if((bbinputMouseHit(0))!=0){
			return this.bbCSel+1;
		}
	}
	return 0;
}
bbmenuMenu.prototype.bbDraw=function(){
	for(var bbi=0;bbi<=this.bbNSel-1;bbi=bbi+1){
		if(this.bbHovering && this.bbCSel==bbi){
			bbgraphicsSetAlpha(0.5);
			bbgraphicsSetColor(127.000000,255.000000,191.000000);
			bbgraphicsDrawRect((this.bbX-100),(this.bbY+bbi*28),200.000000,28.000000);
			bbgraphicsSetAlpha(1.000000);
			bbgraphicsSetColor(255.000000,255.000000,255.000000);
		}
		bbresource2Font.bbDrawText2(this.bbText[bbi],this.bbX,this.bbY-4+bbi*28,1);
	}
}
function bbgraphicsPushMatrix(){
	var bbsp=bbgraphicscontext.bbmatrixSp;
	bbgraphicscontext.bbmatrixStack[bbsp+0]=bbgraphicscontext.bbix;
	bbgraphicscontext.bbmatrixStack[bbsp+1]=bbgraphicscontext.bbiy;
	bbgraphicscontext.bbmatrixStack[bbsp+2]=bbgraphicscontext.bbjx;
	bbgraphicscontext.bbmatrixStack[bbsp+3]=bbgraphicscontext.bbjy;
	bbgraphicscontext.bbmatrixStack[bbsp+4]=bbgraphicscontext.bbtx;
	bbgraphicscontext.bbmatrixStack[bbsp+5]=bbgraphicscontext.bbty;
	bbgraphicscontext.bbmatrixSp=bbsp+6;
	return 0;
}
function bbgraphicsTransform(bbix,bbiy,bbjx,bbjy,bbtx,bbty){
	var bbix2=bbix*bbgraphicscontext.bbix+bbiy*bbgraphicscontext.bbjx;
	var bbiy2=bbix*bbgraphicscontext.bbiy+bbiy*bbgraphicscontext.bbjy;
	var bbjx2=bbjx*bbgraphicscontext.bbix+bbjy*bbgraphicscontext.bbjx;
	var bbjy2=bbjx*bbgraphicscontext.bbiy+bbjy*bbgraphicscontext.bbjy;
	var bbtx2=bbtx*bbgraphicscontext.bbix+bbty*bbgraphicscontext.bbjx+bbgraphicscontext.bbtx;
	var bbty2=bbtx*bbgraphicscontext.bbiy+bbty*bbgraphicscontext.bbjy+bbgraphicscontext.bbty;
	bbgraphicsSetMatrix(bbix2,bbiy2,bbjx2,bbjy2,bbtx2,bbty2);
	return 0;
}
function bbgraphicsTransform2(bbcoords){
	var bbout=new_number_array(bbcoords.length);
	for(var bbi=0;bbi<bbcoords.length-1;bbi=bbi+2){
		var bbx=bbcoords[bbi];
		var bby=bbcoords[bbi+1];
		bbout[bbi]=bbx*bbgraphicscontext.bbix+bby*bbgraphicscontext.bbjx+bbgraphicscontext.bbtx;
		bbout[bbi+1]=bbx*bbgraphicscontext.bbiy+bby*bbgraphicscontext.bbjy+bbgraphicscontext.bbty;
	}
	return bbout;
}
function bbgraphicsTranslate(bbx,bby){
	bbgraphicsTransform(1.000000,0.000000,0.000000,1.000000,bbx,bby);
	return 0;
}
function bbgraphicsValidateMatrix(){
	if((bbgraphicscontext.bbmatDirty)!=0){
		bbgraphicscontext.bbdevice.SetMatrix(bbgraphicscontext.bbix,bbgraphicscontext.bbiy,bbgraphicscontext.bbjx,bbgraphicscontext.bbjy,bbgraphicscontext.bbtx,bbgraphicscontext.bbty);
		bbgraphicscontext.bbmatDirty=0;
	}
	return 0;
}
function bbgraphicsPopMatrix(){
	var bbsp=bbgraphicscontext.bbmatrixSp-6;
	bbgraphicsSetMatrix(bbgraphicscontext.bbmatrixStack[bbsp+0],bbgraphicscontext.bbmatrixStack[bbsp+1],bbgraphicscontext.bbmatrixStack[bbsp+2],bbgraphicscontext.bbmatrixStack[bbsp+3],bbgraphicscontext.bbmatrixStack[bbsp+4],bbgraphicscontext.bbmatrixStack[bbsp+5]);
	bbgraphicscontext.bbmatrixSp=bbsp;
	return 0;
}
function bbgraphicsDrawImage(bbimage,bbx,bby,bbframe){
	var bbf=bbimage.bbframes[bbframe];
	if((bbgraphicscontext.bbtformed)!=0){
		bbgraphicsPushMatrix();
		bbgraphicsTranslate(bbx-bbimage.bbtx,bby-bbimage.bbty);
		bbgraphicsValidateMatrix();
		if((bbimage.bbflags&65536)!=0){
			bbgraphicscontext.bbdevice.DrawSurface(bbimage.bbsurface,0.000000,0.000000);
		}else{
			bbgraphicscontext.bbdevice.DrawSurface2(bbimage.bbsurface,0.000000,0.000000,bbf.bbx,bbf.bby,bbimage.bbwidth,bbimage.bbheight);
		}
		bbgraphicsPopMatrix();
	}else{
		bbgraphicsValidateMatrix();
		if((bbimage.bbflags&65536)!=0){
			bbgraphicscontext.bbdevice.DrawSurface(bbimage.bbsurface,bbx-bbimage.bbtx,bby-bbimage.bbty);
		}else{
			bbgraphicscontext.bbdevice.DrawSurface2(bbimage.bbsurface,bbx-bbimage.bbtx,bby-bbimage.bbty,bbf.bbx,bbf.bby,bbimage.bbwidth,bbimage.bbheight);
		}
	}
	return 0;
}
function bbgraphicsRotate(bbangle){
	bbgraphicsTransform(Math.cos((bbangle)*D2R),-Math.sin((bbangle)*D2R),Math.sin((bbangle)*D2R),Math.cos((bbangle)*D2R),0.000000,0.000000);
	return 0;
}
function bbgraphicsScale(bbx,bby){
	bbgraphicsTransform(bbx,0.000000,0.000000,bby,0.000000,0.000000);
	return 0;
}
function bbgraphicsDrawImage2(bbimage,bbx,bby,bbrotation,bbscaleX,bbscaleY,bbframe){
	var bbf=bbimage.bbframes[bbframe];
	bbgraphicsPushMatrix();
	bbgraphicsTranslate(bbx,bby);
	bbgraphicsRotate(bbrotation);
	bbgraphicsScale(bbscaleX,bbscaleY);
	bbgraphicsTranslate(-bbimage.bbtx,-bbimage.bbty);
	bbgraphicsValidateMatrix();
	if((bbimage.bbflags&65536)!=0){
		bbgraphicscontext.bbdevice.DrawSurface(bbimage.bbsurface,0.000000,0.000000);
	}else{
		bbgraphicscontext.bbdevice.DrawSurface2(bbimage.bbsurface,0.000000,0.000000,bbf.bbx,bbf.bby,bbimage.bbwidth,bbimage.bbheight);
	}
	bbgraphicsPopMatrix();
	return 0;
}
function bbgraphicsDrawText(bbtext,bbx,bby,bbxalign,bbyalign){
	if(!((bbgraphicscontext.bbfont)!=null)){
		return 0;
	}
	var bbw=bbgraphicscontext.bbfont.bbWidth();
	var bbh=bbgraphicscontext.bbfont.bbHeight();
	bbx-=(bbw*bbtext.length)*bbxalign;
	bby-=(bbh)*bbyalign;
	for(var bbi=0;bbi<bbtext.length;bbi=bbi+1){
		var bbch=bbtext.charCodeAt(bbi)-bbgraphicscontext.bbfirstChar;
		if(bbch>=0 && bbch<bbgraphicscontext.bbfont.bbFrames()){
			bbgraphicsDrawImage(bbgraphicscontext.bbfont,bbx+(bbi*bbw),bby,bbch);
		}
	}
	return 0;
}
function bbgraphicsCls(bbr,bbg,bbb){
	bbgraphicsrenderDevice.Cls(bbr,bbg,bbb);
	return 0;
}
function bbinputMouseX(){
	return bbinputdevice.MouseX();
}
function bbinputMouseY(){
	return bbinputdevice.MouseY();
}
function bbinputMouseHit(bbbutton){
	return bbinputdevice.KeyHit(1+bbbutton);
}
function bbsceneSceneGame(){
	bbsceneSceneBase.call(this);
	this.bbpauseStr="";
	this.bbpaused=false;
}
bbsceneSceneGame.prototype=extend_class(bbsceneSceneBase);
function bbscenenew3(){
	bbscenenew.call(this);
	bbglobalsPlayer=bbplayernew.call(new bbplayerTPlayer);
	bbglobalsFire.bbClear();
	bbglobalsExplosion.bbClear();
	bbglobalsEnemies.bbClear();
	bbglobalsBullets.bbClear();
	bbglobalsSmoke.bbClear();
	bbglobalsTime=0;
	this.bbpauseStr=bbappLoadString("lang/"+bbglobalsuserLang+"/pause.txt");
	return this;
}
bbsceneSceneGame.prototype.bbUpdate=function(){
	if(this.bbpaused){
		if((bbinputMouseHit(0))!=0){
			if(bbinputMouseX()>bbglobalsPlayer.bbX-30.000000 && bbinputMouseX()<bbglobalsPlayer.bbX+30.000000 && bbinputMouseY()>bbglobalsPlayer.bbY-30.000000 && bbinputMouseY()<bbglobalsPlayer.bbY+30.000000){
				this.bbpaused=false;
			}
		}
	}else{
		if((bbinputKeyHit(27))!=0){
			this.bbpaused=true;
		}
		bbglobalsSpawnEnemies();
		if((bbglobalsPlayer.bbUpdate())!=0){
			return (bbscenenew5.call(new bbsceneSceneScore,bbglobalsPlayer.bbScore,((bbglobalsTime/60)|0)));
		}
		var bb=bbglobalsEnemies.bbObjectEnumerator();
		while(bb.bbHasNext()){
			var bbe=object_downcast((bb.bbNextObject()),bbenemyTEnemy);
			bbe.bbUpdate();
		}
		bbglobalsLastBullet+=1;
		var bb2=bbglobalsFire.bbObjectEnumerator();
		while(bb2.bbHasNext()){
			var bbf=object_downcast((bb2.bbNextObject()),bbfireTFire);
			bbf.bbUpdate();
		}
		var bb3=bbglobalsBullets.bbObjectEnumerator();
		while(bb3.bbHasNext()){
			var bbb=object_downcast((bb3.bbNextObject()),bbenemyTBullet);
			bbb.bbUpdate();
		}
		var bb4=bbglobalsExplosion.bbObjectEnumerator();
		while(bb4.bbHasNext()){
			var bbe2=object_downcast((bb4.bbNextObject()),bbfireTExplode);
			bbe2.bbUpdate();
		}
		var bb5=bbglobalsSmoke.bbObjectEnumerator();
		while(bb5.bbHasNext()){
			var bbs=object_downcast((bb5.bbNextObject()),bbfireTSmoke);
			bbs.bbUpdate();
		}
		bbglobalsTime+=1;
	}
	return null;
}
bbsceneSceneGame.prototype.bbDraw=function(){
	bbglobalsUpdateScenery();
	bbglobalsPlayer.bbDraw();
	var bb=bbglobalsEnemies.bbObjectEnumerator();
	while(bb.bbHasNext()){
		var bbe=object_downcast((bb.bbNextObject()),bbenemyTEnemy);
		bbe.bbDraw();
	}
	var bb2=bbglobalsFire.bbObjectEnumerator();
	while(bb2.bbHasNext()){
		var bbf=object_downcast((bb2.bbNextObject()),bbfireTFire);
		bbf.bbDraw();
	}
	var bb3=bbglobalsBullets.bbObjectEnumerator();
	while(bb3.bbHasNext()){
		var bbb=object_downcast((bb3.bbNextObject()),bbenemyTBullet);
		bbb.bbDraw();
	}
	var bb4=bbglobalsExplosion.bbObjectEnumerator();
	while(bb4.bbHasNext()){
		var bbe2=object_downcast((bb4.bbNextObject()),bbfireTExplode);
		bbe2.bbDraw();
	}
	var bb5=bbglobalsSmoke.bbObjectEnumerator();
	while(bb5.bbHasNext()){
		var bbs=object_downcast((bb5.bbNextObject()),bbfireTSmoke);
		bbs.bbDraw();
	}
	for(var bbi=0;bbi<=bbglobalsPlayer.bbBombs-1;bbi=bbi+1){
		bbgraphicsDrawImage2(bbresource2gfx.bbMFace,(16+bbi*32),18.000000,0.000000,0.45,0.45,0);
	}
	bbgraphicsSetColor(0.000000,0.000000,0.000000);
	bbgraphicsSetAlpha(0.5);
	bbgraphicsDrawRect(280.000000,6.000000,240.000000,28.000000);
	bbgraphicsSetAlpha(1.000000);
	bbgraphicsSetColor(255.000000,255.000000,255.000000);
	bbresource2Font.bbDrawText2("Score: "+String(bbglobalsPlayer.bbScore),400,4,1);
	bbgraphicsSetColor(127.000000,127.000000,127.000000);
	bbgraphicsDrawRect(696.000000,2.000000,102.000000,14.000000);
	bbgraphicsSetColor(255.000000-(bbglobalsPlayer.bbHealth)*2.5,(bbglobalsPlayer.bbHealth)*2.5,0.000000);
	bbgraphicsDrawRect(697.000000,3.000000,(bbglobalsPlayer.bbHealth),12.000000);
	bbgraphicsSetColor(127.000000,127.000000,127.000000);
	bbgraphicsDrawRect(696.000000,18.000000,102.000000,14.000000);
	bbgraphicsSetColor((255-bbglobalsPlayer.bbEnergy),0.000000,255.000000);
	bbgraphicsDrawRect(697.000000,19.000000,(bbglobalsPlayer.bbEnergy)/2.5,12.000000);
	bbgraphicsSetColor(255.000000,255.000000,255.000000);
	if(this.bbpaused){
		bbgraphicsSetColor(0.000000,0.000000,0.000000);
		bbgraphicsSetAlpha(0.4);
		bbgraphicsDrawRect(200.000000,150.000000,400.000000,300.000000);
		bbgraphicsSetAlpha(1.000000);
		bbgraphicsSetColor(255.000000,255.000000,255.000000);
		bbsimpletextboxDraw(this.bbpauseStr,400,240,800,1);
	}
	return 0;
}
function bbplayerTPlayer(){
	Object.call(this);
	this.bbX=400.000000;
	this.bbY=80.000000;
	this.bbDead=false;
	this.bbExplodeTime=0;
	this.bbXS=0.000000;
	this.bbYS=0.000000;
	this.bbRotSpd=0.0;
	this.bbRot=0.0;
	this.bbHealth=100;
	this.bbBreathingFire=false;
	this.bbBombUsed=0;
	this.bbEnergy=0;
	this.bbBombs=3;
	this.bbHitBoxRadius=48;
	this.bbScore=0;
}
function bbplayernew(){
	return this;
}
bbplayerTPlayer.prototype.bbUpdate=function(){
	if(this.bbDead){
		if(this.bbY>=500.000000){
			if(this.bbExplodeTime==0){
				for(var bbi=0;bbi<=20;bbi=bbi+1){
					bbglobalsExplosion.bbAddLast(bbfireMake2(bbrandomRnd2(this.bbX-100.000000,this.bbX+101.000000),bbrandomRnd2(this.bbY-100.000000,this.bbY+51.000000),255.000000,bbrandomRnd3(256.000000),0.000000));
				}
				var bb=bbglobalsEnemies.bbObjectEnumerator();
				while(bb.bbHasNext()){
					var bbe=object_downcast((bb.bbNextObject()),bbenemyTEnemy);
					bbe.bbHealth=-1;
				}
			}
			this.bbExplodeTime+=1;
			if(this.bbExplodeTime>100){
				return 1;
			}
		}else{
			this.bbXS+=-this.bbXS/300.0;
			this.bbYS+=0.1;
			this.bbX+=this.bbXS;
			this.bbY+=this.bbYS;
			this.bbRot+=this.bbRotSpd;
		}
	}else{
		if(this.bbHealth<=0){
			this.bbHealth=0;
			this.bbDead=true;
			this.bbXS=bbrandomRnd2(1.000000,4.000000);
			if(this.bbX>400.000000){
				this.bbXS=-this.bbXS;
			}
			this.bbYS=bbrandomRnd2(-1.000000,1.000000);
			this.bbRotSpd=bbrandomRnd2(-1.000000,2.000000)*10.000000;
			return 0;
		}
		this.bbBreathingFire=false;
		this.bbXS=bbinputMouseX()-this.bbX;
		this.bbYS=bbinputMouseY()-this.bbY;
		var bbfuck=Math.sqrt(this.bbYS*this.bbYS+this.bbXS*this.bbXS);
		if(bbfuck>30.000000){
			var bbangle=(Math.atan2(this.bbYS,this.bbXS)*R2D);
			this.bbXS=30.000000*Math.cos((bbangle)*D2R);
			this.bbYS=30.000000*Math.sin((bbangle)*D2R);
		}
		this.bbX+=this.bbXS;
		this.bbY+=this.bbYS;
		if(this.bbX<80.000000){
			this.bbX=80.000000;
		}else{
			if(this.bbX>720.000000){
				this.bbX=720.000000;
			}
		}
		if(this.bbY<86.000000){
			this.bbY=86.000000;
		}else{
			if(this.bbY>400.000000){
				this.bbY=400.000000;
			}
		}
		if(this.bbBombUsed==0){
			if(!bbglobalsWaitForClick){
				if((bbinputMouseDown(0))!=0){
					if(this.bbEnergy>0){
						this.bbBreathingFire=true;
						if((bbinputMouseHit(0))!=0){
							if(!bbglobalsMuteSFX){
								bbaudioPlaySound(bbresource2SFX.bbFire,0,0);
							}
						}
						this.bbEnergy-=1;
						bbglobalsFire.bbAddLast(bbfireMake(this.bbX-16.000000+bbrandomRnd()*31.000000,this.bbY+15.000000+bbrandomRnd()*10.000000));
					}
				}else{
					if(this.bbEnergy<250){
						this.bbEnergy+=1;
					}
					if(((bbinputKeyHit(32))!=0) && this.bbBombs>0){
						this.bbBombs-=1;
						this.bbBombUsed=1;
						bbglobalsBullets.bbClear();
						if(!bbglobalsMuteSFX){
							bbaudioPlaySound(bbresource2SFX.bbBomb,0,0);
						}
					}
				}
			}else{
				if(!((bbinputMouseDown(0))!=0)){
					bbglobalsWaitForClick=false;
				}
			}
			var bb2=bbglobalsBullets.bbObjectEnumerator();
			while(bb2.bbHasNext()){
				var bbb=object_downcast((bb2.bbNextObject()),bbenemyTBullet);
				var bbdx=bbb.bbX-this.bbX;
				var bbdy=bbb.bbY-this.bbY;
				var bbr=(this.bbHitBoxRadius+bbb.bbHitBoxRadius);
				if(bbdx*bbdx+bbdy*bbdy<bbr*bbr){
					if(!bbglobalsMuteSFX){
						bbaudioPlaySound(bbresource2SFX.bbFuck,0,0);
					}
					this.bbHealth-=15;
					bbb.bbExplode();
				}
			}
		}else{
			this.bbBombUsed+=1;
			bbglobalsBullets.bbClear();
			var bb3=bbglobalsEnemies.bbObjectEnumerator();
			while(bb3.bbHasNext()){
				var bbe2=object_downcast((bb3.bbNextObject()),bbenemyTEnemy);
				bbe2.bbHealth-=1;
				if(bbe2.bbHealth<=0){
					bbglobalsPlayer.bbScore+=bbe2.bbScore;
					bbe2.bbExplode();
					bbglobalsEnemies.bbRemove(bbe2);
				}
			}
			if(this.bbBombUsed>=200){
				this.bbBombUsed=0;
			}
		}
	}
	return 0;
}
bbplayerTPlayer.prototype.bbDraw=function(){
	if(this.bbDead){
		if(this.bbY<500.000000){
			bbgraphicsDrawImage2(bbresource2gfx.bbQuaker,this.bbX,this.bbY,this.bbRot,1.0,1.0,0);
		}
	}else{
		if(this.bbBreathingFire){
			bbgraphicsDrawImage(bbresource2gfx.bbQuaker2,this.bbX,this.bbY,0);
		}else{
			bbgraphicsDrawImage(bbresource2gfx.bbQuaker,this.bbX,this.bbY,0);
		}
	}
	return 0;
}
var bbglobalsPlayer;
function bbfireTFire(){
	Object.call(this);
	this.bbX=.0;
	this.bbY=.0;
	this.bbXSpd=.0;
	this.bbYSpd=.0;
	this.bbHealth=0;
	this.bbLife=0;
	this.bbradius=16.000000+bbrandomRnd3(12.000000);
	this.bbColor=((bbrandomRnd3(256.000000))|0);
}
function bbfirenew(){
	return this;
}
function bbfireMake(bbX,bbY){
	var bbobj=bbfirenew.call(new bbfireTFire);
	bbobj.bbX=bbX+bbrandomRnd2(-2.000000,3.000000);
	bbobj.bbY=bbY+bbrandomRnd2(-2.000000,3.000000);
	bbobj.bbXSpd=-1.000000+bbrandomRnd()*2.000000;
	bbobj.bbYSpd=19.000000+bbrandomRnd()*2.000000;
	bbobj.bbHealth=1;
	bbobj.bbLife=60;
	return bbobj;
}
bbfireTFire.prototype.bbDestroy=function(){
	bbglobalsFire.bbRemove(this);
	return 0;
}
bbfireTFire.prototype.bbUpdate=function(){
	this.bbYSpd-=this.bbY/800.000000;
	this.bbX+=this.bbXSpd;
	this.bbY+=this.bbYSpd;
	this.bbLife-=1;
	if(this.bbLife<=0 || this.bbYSpd<0.000000){
		this.bbDestroy();
	}
	return 0;
}
bbfireTFire.prototype.bbDraw=function(){
	bbgraphicsSetColor(255.000000,(this.bbColor),0.000000);
	bbgraphicsSetAlpha(1.0-this.bbY/800.000000);
	bbgraphicsDrawCircle(this.bbX,this.bbY,this.bbradius-4.000000);
	bbgraphicsDrawCircle(this.bbX,this.bbY,this.bbradius);
	bbgraphicsSetAlpha(1.000000);
	bbgraphicsSetColor(255.000000,255.000000,255.000000);
	return 0;
}
var bbglobalsFire;
function bbfireTExplode(){
	Object.call(this);
	this.bbX=.0;
	this.bbY=.0;
	this.bbColorR=0;
	this.bbColorG=0;
	this.bbColorB=0;
	this.bbXSpd=-5.000000+bbrandomRnd()*10.000000;
	this.bbFriction=bbrandomRnd()/3.000000;
	this.bbGravity=0.1+bbrandomRnd()/4.000000;
	this.bbYSpd=-1.000000-bbrandomRnd()*5.000000;
	this.bbLife=40;
	this.bbradius=4.000000+bbrandomRnd()*8.000000;
}
function bbfirenew2(){
	return this;
}
function bbfireMake2(bbX,bbY,bbCR,bbCG,bbCB){
	var bbobj=bbfirenew2.call(new bbfireTExplode);
	bbobj.bbX=bbX;
	bbobj.bbY=bbY;
	bbobj.bbColorR=((bbCR)|0);
	bbobj.bbColorG=((bbCG)|0);
	bbobj.bbColorB=((bbCB)|0);
	return bbobj;
}
bbfireTExplode.prototype.bbUpdate=function(){
	if(this.bbXSpd>0.000000){
		this.bbXSpd-=this.bbFriction;
	}else{
		if(this.bbXSpd<0.000000){
			this.bbXSpd+=this.bbFriction;
		}
	}
	this.bbYSpd+=this.bbGravity;
	if(this.bbYSpd>5.000000){
		this.bbYSpd=5.000000;
	}
	this.bbX+=this.bbXSpd;
	this.bbY+=this.bbYSpd;
	this.bbLife-=1;
	if(this.bbLife<=0){
		bbglobalsExplosion.bbRemove(this);
	}
	return 0;
}
bbfireTExplode.prototype.bbDraw=function(){
	bbgraphicsSetColor((this.bbColorR),(this.bbColorG),(this.bbColorB));
	bbgraphicsSetAlpha((this.bbLife)/40.0);
	bbgraphicsDrawCircle(this.bbX,this.bbY,this.bbradius);
	bbgraphicsSetColor(255.000000,255.000000,255.000000);
	bbgraphicsSetAlpha(1.000000);
	return 0;
}
var bbglobalsExplosion;
function bbenemyTEnemy(){
	Object.call(this);
	this.bbID=0;
	this.bbFrames=0;
	this.bbImage=null;
	this.bbX=.0;
	this.bbXSpd=0.000000;
	this.bbHealth=0;
	this.bbY=540.000000;
	this.bbFrameLength=6;
	this.bbHitBoxRadius=40;
	this.bbScore=10;
	this.bbGravity=0.000000;
	this.bbYSpd=0.000000;
	this.bbFrameTime=0;
	this.bbFrame=0;
	this.bbHitScore=1;
}
function bbenemynew2(){
	return this;
}
function bbenemyMake2(bbid){
	var bbobj=bbenemynew2.call(new bbenemyTEnemy);
	bbobj.bbID=bbid;
	var bb=bbid;
	if(bb==0){
		bbobj.bbFrames=8;
		bbobj.bbImage=bbresource2gfx.bbHam;
		bbobj.bbX=-48.000000;
		bbobj.bbXSpd=2.000000+bbrandomRnd()*2.000000;
		bbobj.bbHealth=20;
	}else{
		if(bb==1){
			bbobj.bbFrames=8;
			bbobj.bbImage=bbresource2gfx.bbHam;
			bbobj.bbX=848.000000;
			bbobj.bbXSpd=-2.000000-bbrandomRnd()*2.000000;
			bbobj.bbHealth=20;
		}else{
			if(bb==2){
				bbobj.bbFrames=11;
				bbobj.bbImage=bbresource2gfx.bbHip;
				bbobj.bbX=-56.000000;
				bbobj.bbY=546.000000;
				bbobj.bbFrameLength=4;
				bbobj.bbXSpd=4.000000+bbrandomRnd()*3.000000;
				bbobj.bbHealth=40;
				bbobj.bbHitBoxRadius=44;
				bbobj.bbScore=25;
				if(!bbglobalsMuteSFX){
					bbaudioPlaySound(bbresource2SFX.bbPurple,0,0);
				}
			}else{
				if(bb==3){
					bbobj.bbFrames=11;
					bbobj.bbImage=bbresource2gfx.bbHip;
					bbobj.bbX=856.000000;
					bbobj.bbY=546.000000;
					bbobj.bbFrameLength=4;
					bbobj.bbXSpd=-4.000000-bbrandomRnd()*3.000000;
					bbobj.bbHealth=40;
					bbobj.bbHitBoxRadius=44;
					bbobj.bbScore=25;
					if(!bbglobalsMuteSFX){
						bbaudioPlaySound(bbresource2SFX.bbPurple,0,0);
					}
				}else{
					if(bb==4){
						bbobj.bbFrames=1;
						bbobj.bbImage=bbresource2gfx.bbElmo;
						bbobj.bbX=64.000000+bbrandomRnd2(0.000000,672.000000);
						bbobj.bbY=-74.000000;
						bbobj.bbGravity=0.15;
						bbobj.bbHitBoxRadius=56;
						bbobj.bbHealth=20;
						bbobj.bbScore=60;
						if(!bbglobalsMuteSFX){
							bbaudioPlaySound(bbresource2SFX.bbElmo,0,0);
						}
					}else{
						if(bb==5){
							bbobj.bbFrames=1;
							bbobj.bbImage=bbresource2gfx.bbWeegee;
							bbobj.bbX=-49.000000;
							bbobj.bbY=350.000000+bbrandomRnd2(0.000000,100.000000);
							bbobj.bbXSpd=3.000000+bbrandomRnd();
							bbobj.bbScore=100;
							bbobj.bbHealth=50;
						}else{
							if(bb==6){
								bbobj.bbFrames=1;
								bbobj.bbImage=bbresource2gfx.bbWeegee;
								bbobj.bbX=849.000000;
								bbobj.bbY=350.000000+bbrandomRnd2(0.000000,100.000000);
								bbobj.bbXSpd=-3.000000-bbrandomRnd();
								bbobj.bbScore=100;
								bbobj.bbHealth=50;
							}else{
								if(bb==7){
									bbobj.bbFrames=1;
									bbobj.bbImage=bbresource2gfx.bbFOE;
									bbobj.bbX=64.000000+bbrandomRnd3(673.000000);
									bbobj.bbY=648.000000;
									bbobj.bbGravity=0.15+bbrandomRnd()*0.05;
									bbobj.bbYSpd=-15.000000+bbrandomRnd()*3.000000;
									bbobj.bbHealth=20;
									bbobj.bbHitBoxRadius=40;
									bbobj.bbScore=50;
								}else{
									if(bb==8){
										bbobj.bbFrames=1;
										bbobj.bbImage=bbresource2gfx.bbTroll;
										bbobj.bbX=64.000000+bbrandomRnd3(673.000000);
										bbobj.bbY=648.000000;
										bbobj.bbGravity=0.15+bbrandomRnd()*0.05;
										bbobj.bbXSpd=-4.000000+bbrandomRnd()*8.000000;
										bbobj.bbYSpd=-14.000000+bbrandomRnd()*3.000000;
										bbobj.bbHealth=20;
										bbobj.bbHitBoxRadius=40;
										bbobj.bbScore=50;
									}else{
										if(bb==9){
											bbobj.bbFrames=2;
											bbobj.bbFrameLength=30;
											bbobj.bbImage=bbresource2gfx.bbMJ;
											bbobj.bbX=bbrandomRnd2(0.000000,800.000000);
											bbobj.bbY=660.000000;
											bbobj.bbGravity=0.000000;
											bbobj.bbXSpd=-4.000000;
											if((bbrandomRnd2(0.000000,1.000000))!=0.0){
												bbobj.bbXSpd=4.000000;
											}
											bbobj.bbYSpd=-4.000000+bbrandomRnd()*1.5;
											bbobj.bbHealth=50;
											bbobj.bbHitBoxRadius=30;
											bbobj.bbScore=80;
											if(!bbglobalsMuteSFX){
												bbaudioPlaySound(bbresource2SFX.bbMJ,0,0);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return bbobj;
}
bbenemyTEnemy.prototype.bbExplode=function(){
	if(!bbglobalsMuteSFX){
		bbaudioPlaySound(bbresource2SFX.bbExplode,0,0);
	}
	for(var bbi=0;bbi<=19;bbi=bbi+1){
		var bbCR=0;
		var bbCG=0;
		var bbCB=0;
		var bb=this.bbID;
		if(bb==0){
			bbCR=((bbrandomRnd2(159.000000,255.000000))|0);
			bbCG=((bbrandomRnd2(63.000000,159.000000))|0);
		}else{
			if(bb==1){
				bbCR=((bbrandomRnd2(159.000000,255.000000))|0);
				bbCG=((bbrandomRnd2(63.000000,159.000000))|0);
			}else{
				if(bb==2){
					bbCR=((bbrandomRnd2(127.000000,192.000000))|0);
					bbCB=((bbrandomRnd2(159.000000,255.000000))|0);
				}else{
					if(bb==3){
						bbCR=((bbrandomRnd2(127.000000,192.000000))|0);
						bbCB=((bbrandomRnd2(159.000000,255.000000))|0);
					}else{
						if(bb==4){
							bbCR=((bbrandomRnd2(159.000000,255.000000))|0);
						}else{
							if(bb==5){
								bbCG=((bbrandomRnd2(159.000000,255.000000))|0);
							}else{
								if(bb==6){
									bbCG=((bbrandomRnd2(159.000000,255.000000))|0);
								}else{
									if(bb==7){
										bbCR=((bbrandomRnd2(191.000000,255.000000))|0);
										bbCG=((bbrandomRnd2(127.000000,159.000000))|0);
									}else{
										if(bb==8){
											bbCR=((bbrandomRnd2(191.000000,255.000000))|0);
											bbCG=((bbrandomRnd2(127.000000,159.000000))|0);
										}else{
											if(bb==9){
												bbCR=((bbrandomRnd2(159.000000,191.000000))|0);
												bbCG=((bbrandomRnd2(159.000000,191.000000))|0);
												bbCB=((bbrandomRnd2(159.000000,255.000000))|0);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		for(var bbi2=0;bbi2<=20;bbi2=bbi2+1){
			bbglobalsExplosion.bbAddLast(bbfireMake2(this.bbX-20.000000+bbrandomRnd2(0.000000,40.000000),this.bbY-20.000000+bbrandomRnd2(0.000000,40.000000),(bbCR),(bbCG),(bbCB)));
		}
		break;
	}
	return 0;
}
bbenemyTEnemy.prototype.bbLaunchBullet=function(){
	if(bbglobalsLastBullet>=60){
		var bbXS=.0;
		var bbYS=.0;
		var bbangle=(Math.atan2(this.bbX-bbglobalsPlayer.bbX,this.bbY-bbglobalsPlayer.bbY)*R2D);
		bbXS=Math.sin((bbangle)*D2R)*4.000000;
		bbYS=Math.cos((bbangle)*D2R)*4.000000;
		bbglobalsBullets.bbAddLast(bbenemyMake(this.bbX,this.bbY-20.000000,-bbXS,-bbYS));
		bbglobalsLastBullet=0;
	}
	return 0;
}
bbenemyTEnemy.prototype.bbUpdate=function(){
	var bb=this.bbID;
	if(bb==0){
		if(bbglobalsBullets.bbCount()<bbglobalsMaxBullets && bbrandomRnd3(100+150*bbglobalsBullets.bbCount())<1.000000){
			this.bbLaunchBullet();
		}
	}else{
		if(bb==1){
			if(bbglobalsBullets.bbCount()<bbglobalsMaxBullets && bbrandomRnd3(100+150*bbglobalsBullets.bbCount())<1.000000){
				this.bbLaunchBullet();
			}
		}else{
			if(bb==2){
				if(bbglobalsBullets.bbCount()<bbglobalsMaxBullets+1 && bbrandomRnd3(30+80*bbglobalsBullets.bbCount())<1.000000){
					this.bbLaunchBullet();
				}
			}else{
				if(bb==3){
					if(bbglobalsBullets.bbCount()<bbglobalsMaxBullets+1 && bbrandomRnd3(30+80*bbglobalsBullets.bbCount())<1.000000){
						this.bbLaunchBullet();
					}
				}else{
					if(bb==4){
						if(this.bbY>=664.000000){
							bbglobalsEnemies.bbRemove(this);
						}
					}else{
						if(bb==5){
							if(this.bbX>=849.000000){
								bbglobalsEnemies.bbRemove(this);
								if(!bbglobalsMuteSFX){
									bbaudioPlaySound(bbresource2SFX.bbWeegee,0,0);
								}
							}
						}else{
							if(bb==6){
								if(this.bbX<=-49.000000){
									bbglobalsEnemies.bbRemove(this);
									if(!bbglobalsMuteSFX){
										bbaudioPlaySound(bbresource2SFX.bbWeegee,0,0);
									}
								}
							}else{
								if(bb==7){
									if(this.bbY>=664.000000){
										bbglobalsEnemies.bbRemove(this);
									}
								}else{
									if(bb==8){
										if(this.bbYSpd>0.000000){
											this.bbImage=bbresource2gfx.bbTroll2;
										}
										if(this.bbY>=664.000000){
											bbglobalsEnemies.bbRemove(this);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	this.bbFrameTime+=1;
	if(this.bbFrameTime>=this.bbFrameLength){
		this.bbFrameTime=0;
		this.bbFrame+=1;
		if(this.bbFrame>=this.bbFrames){
			this.bbFrame=0;
		}
	}
	this.bbYSpd+=this.bbGravity;
	if(this.bbYSpd>12.000000){
		this.bbYSpd=12.000000;
	}
	this.bbX+=this.bbXSpd;
	this.bbY+=this.bbYSpd;
	if(this.bbID!=5 && this.bbID!=6){
		if(this.bbX<((this.bbImage.bbWidth()/2)|0) && this.bbXSpd<0.000000){
			this.bbXSpd=-this.bbXSpd;
		}
		if(this.bbX>(800-((this.bbImage.bbWidth()/2)|0)) && this.bbXSpd>0.000000){
			this.bbXSpd=-this.bbXSpd;
		}
	}
	if(this.bbID==9){
		if(this.bbY<((this.bbImage.bbHeight()/2)|0) && this.bbYSpd<0.000000){
			this.bbYSpd=-this.bbYSpd;
		}
		if(this.bbY>(600-((this.bbImage.bbHeight()/2)|0)) && this.bbYSpd>0.000000){
			this.bbYSpd=-this.bbYSpd;
		}
	}
	var bb2=bbglobalsFire.bbObjectEnumerator();
	while(bb2.bbHasNext()){
		var bbf=object_downcast((bb2.bbNextObject()),bbfireTFire);
		var bbdx=bbf.bbX-this.bbX;
		var bbdy=bbf.bbY-this.bbY;
		var bbr=(this.bbHitBoxRadius)+bbf.bbradius;
		if(bbdx*bbdx+bbdy*bbdy<bbr*bbr){
			this.bbHealth-=bbf.bbHealth;
			bbglobalsPlayer.bbScore+=this.bbHitScore;
			bbglobalsSmoke.bbAddLast(bbfireMake3(bbf.bbX,bbf.bbY,bbf.bbradius));
			bbglobalsFire.bbRemove(bbf);
			if(this.bbHealth<=0){
				break;
			}
		}
	}
	if(this.bbHealth<=0){
		this.bbExplode();
		bbglobalsPlayer.bbScore+=this.bbScore;
		bbglobalsEnemies.bbRemove(this);
	}
	if(this.bbID>=4 && this.bbID<=9){
		var bbdx2=bbglobalsPlayer.bbX-this.bbX;
		var bbdy2=bbglobalsPlayer.bbY-this.bbY;
		var bbr2=(this.bbHitBoxRadius+bbglobalsPlayer.bbHitBoxRadius);
		if(bbdx2*bbdx2+bbdy2*bbdy2<bbr2*bbr2){
			bbglobalsPlayer.bbHealth-=this.bbHealth;
			this.bbExplode();
			if(!bbglobalsMuteSFX){
				bbaudioPlaySound(bbresource2SFX.bbFuck,0,0);
			}
			bbglobalsEnemies.bbRemove(this);
		}
	}
	return 0;
}
bbenemyTEnemy.prototype.bbDraw=function(){
	var bbscale_x=1;
	var bbscale_y=1;
	if(this.bbXSpd<0.000000){
		bbscale_x=-1;
	}
	if(this.bbID==9){
		bbscale_x*=2;
		bbscale_y*=2;
	}
	bbgraphicsDrawImage2(this.bbImage,this.bbX,this.bbY,0.000000,(bbscale_x),(bbscale_y),this.bbFrame);
	return 0;
}
var bbglobalsEnemies;
var bbglobalsBullets;
function bbfireTSmoke(){
	Object.call(this);
	this.bbX=.0;
	this.bbY=.0;
	this.bbradius=.0;
	this.bbXSpd=-3.000000+bbrandomRnd()*5.000000;
	this.bbYSpd=-1.000000-bbrandomRnd()*4.000000;
	this.bbLife=40;
	this.bbColor=((bbrandomRnd2(63.000000,159.000000))|0);
}
function bbfirenew3(){
	return this;
}
function bbfireMake3(bbX,bbY,bbradius){
	var bbobj=bbfirenew3.call(new bbfireTSmoke);
	bbobj.bbX=bbX;
	bbobj.bbY=bbY;
	bbobj.bbradius=bbradius;
	return bbobj;
}
bbfireTSmoke.prototype.bbUpdate=function(){
	this.bbX+=this.bbXSpd;
	this.bbY+=this.bbYSpd;
	this.bbLife-=1;
	if(this.bbLife<=0){
		bbglobalsSmoke.bbRemove(this);
	}
	return 0;
}
bbfireTSmoke.prototype.bbDraw=function(){
	bbgraphicsSetColor((this.bbColor),(this.bbColor),(this.bbColor));
	bbgraphicsSetAlpha((this.bbLife)/50.0);
	bbgraphicsDrawCircle(this.bbX,this.bbY,this.bbradius);
	bbgraphicsSetColor(255.000000,255.000000,255.000000);
	bbgraphicsSetAlpha(1.000000);
	return 0;
}
var bbglobalsSmoke;
var bbglobalsTime;
function bbsceneSceneScore(){
	bbsceneSceneBase.call(this);
	this.bbscore=0;
	this.bbtime=0;
	this.bbmenuID=0;
	this.bbtextBoxText="";
	this.bbmenu=null;
	this.bbtimeElapsed=0;
	this.bbprevMenu=null;
	this.bbnextMenu=null;
	this.bbinputBox=null;
	this.bbpage=1;
	this.bbname="";
	this.bbtimeoutTime=300;
}
bbsceneSceneScore.prototype=extend_class(bbsceneSceneBase);
bbsceneSceneScore.prototype.bbSwitchMenu=function(bbmID){
	this.bbmenuID=bbmID;
	var bb=this.bbmenuID;
	if(bb==0){
		this.bbtextBoxText=bbappLoadString("lang/"+bbglobalsuserLang+"/highscore.txt");
		this.bbmenu=bbmenunew.call(new bbmenuMenu,700,560,"back");
		this.bbscore=-1;
	}else{
		if(bb==1){
			this.bbtextBoxText=bbappLoadString("lang/"+bbglobalsuserLang+"/name.txt");
			this.bbmenu=bbmenunew.call(new bbmenuMenu,400,350,"submit");
		}else{
			if(bb==2){
				this.bbtextBoxText=bbappLoadString("lang/"+bbglobalsuserLang+"/success.txt");
				this.bbmenu=bbmenunew.call(new bbmenuMenu,400,350,"ok");
				this.bbscore=-1;
			}else{
				if(bb==3){
					this.bbtextBoxText=bbappLoadString("lang/"+bbglobalsuserLang+"/failure.txt");
					this.bbmenu=bbmenunew.call(new bbmenuMenu,400,350,"again");
				}else{
					if(bb==4){
						this.bbtextBoxText="Wait for it...";
						this.bbmenu=bbmenunew.call(new bbmenuMenu,400,350,"back");
						this.bbtimeElapsed=0;
					}else{
						if(bb==5){
							this.bbtextBoxText="Timed Out!";
							this.bbmenu=bbmenunew.call(new bbmenuMenu,400,350,"ok");
						}else{
							if(bb==6){
								this.bbtextBoxText="Timed Out!";
								this.bbmenu=bbmenunew.call(new bbmenuMenu,400,350,"again");
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
bbsceneSceneScore.prototype.bbInit=function(bb_score,bb_time){
	this.bbscore=bb_score;
	this.bbtime=bb_time;
	if(this.bbscore>=0){
		this.bbSwitchMenu(1);
	}else{
		this.bbSwitchMenu(4);
		bbglobalsSubmitScore("",-1,0,0,15,1);
	}
	this.bbprevMenu=bbmenunew.call(new bbmenuMenu,100,560,"previous");
	this.bbnextMenu=bbmenunew.call(new bbmenuMenu,500,560,"next");
	this.bbinputBox=bbsimpleinputnew.call(new bbsimpleinputSimpleInput,"",0,0);
	return 0;
}
function bbscenenew4(){
	bbscenenew.call(this);
	this.bbInit(-1,0);
	return this;
}
function bbscenenew5(bb_score,bb_time){
	bbscenenew.call(this);
	this.bbInit(bb_score,bb_time);
	return this;
}
bbsceneSceneScore.prototype.bbUpdate=function(){
	var bb=this.bbmenuID;
	if(bb==0){
		if(this.bbmenu.bbUpdate()>0){
			return (bbscenenew2.call(new bbsceneSceneTitle));
		}
		if(bbglobalsHighscores[0][0]!="#FAILED"){
			if(this.bbpage>1 && ((this.bbprevMenu.bbUpdate())!=0)){
				this.bbpage-=1;
				bbglobalsSubmitScore("",-1,0,0,15,this.bbpage);
				this.bbSwitchMenu(4);
			}else{
				if(this.bbpage<bbglobalsscorePages && ((this.bbnextMenu.bbUpdate())!=0)){
					this.bbpage+=1;
					bbglobalsSubmitScore("",-1,0,0,15,this.bbpage);
					this.bbSwitchMenu(4);
				}
			}
		}
	}else{
		if(bb==1){
			this.bbname=this.bbinputBox.bbUpdate();
			var bbmenuHit=this.bbmenu.bbUpdate();
			if(((bbinputKeyHit(13))!=0) || bbmenuHit==1){
				if(bbglobalsSanityCheck(this.bbname)){
					this.bbSwitchMenu(4);
					bbglobalsSubmitScore(this.bbname,this.bbscore,this.bbtime,1,15,1);
				}else{
					this.bbtextBoxText=bbappLoadString("lang/"+bbglobalsuserLang+"/insane.txt");
				}
			}else{
				if(bbmenuHit==2){
					this.bbSwitchMenu(0);
				}
			}
		}else{
			if(bb==2){
				if(this.bbmenu.bbUpdate()>0){
					this.bbSwitchMenu(0);
				}
			}else{
				if(bb==3){
					var bbmenuHit2=this.bbmenu.bbUpdate();
					if(bbmenuHit2==1){
						this.bbSwitchMenu(0);
					}else{
						if(bbmenuHit2==2){
							this.bbSwitchMenu(1);
						}
					}
				}else{
					if(bb==4){
						this.bbtimeElapsed+=1;
						if(this.bbtimeElapsed>this.bbtimeoutTime){
							if(this.bbscore>=0){
								this.bbSwitchMenu(6);
							}else{
								this.bbSwitchMenu(5);
							}
						}else{
							if(bbglobalsscoreFinished){
								if(this.bbscore>=0){
									if(bbglobalsHighscores[0][0]=="#FAILED"){
										this.bbSwitchMenu(3);
									}else{
										this.bbSwitchMenu(2);
									}
								}else{
									this.bbSwitchMenu(0);
								}
							}
						}
					}else{
						if(bb==5){
							if(this.bbmenu.bbUpdate()>0){
								this.bbSwitchMenu(0);
							}
						}else{
							if(bb==6){
								var bbmenuHit3=this.bbmenu.bbUpdate();
								if(bbmenuHit3==1){
									this.bbSwitchMenu(0);
								}else{
									if(bbmenuHit3==2){
										this.bbSwitchMenu(1);
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return null;
}
bbsceneSceneScore.prototype.bbDraw=function(){
	if(this.bbmenuID!=4){
		this.bbmenu.bbDraw();
	}
	bbsimpletextboxDraw(this.bbtextBoxText,400,5,800,1);
	var bb=this.bbmenuID;
	if(bb==0){
		if(bbglobalsHighscores[0][0]=="#FAILED"){
			bbsimpletextboxDraw(bbglobalsHighscores[0][1],400,280,800,1);
		}else{
			bbsimpletextboxDraw("NAME",10,45,200,0);
			bbsimpletextboxDraw("SCORE",250,45,200,0);
			bbsimpletextboxDraw("TIME",380,45,200,0);
			bbsimpletextboxDraw("DATETIME",500,45,300,0);
			for(var bbi=0;bbi<=bbglobalsHighscores.length-1;bbi=bbi+1){
				if((bbi % 2)!=0){
					bbgraphicsSetColor(15.000000,31.000000,63.000000);
				}else{
					bbgraphicsSetColor(15.000000,63.000000,95.000000);
				}
				bbgraphicsDrawRect(0.000000,(83+bbi*30),240.000000,30.000000);
				bbgraphicsSetColor(255.000000,255.000000,255.000000);
				if(bbresource2Font.bbTextWidth(bbglobalsHighscores[bbi][0])>238){
					bbresource2Font.bbDrawWidth(bbglobalsHighscores[bbi][0],4,80+bbi*30,238.000000);
				}else{
					bbsimpletextboxDraw(bbglobalsHighscores[bbi][0],6,80+bbi*30,200,0);
				}
				if((bbi % 2)!=0){
					bbgraphicsSetColor(15.000000,31.000000,63.000000);
				}else{
					bbgraphicsSetColor(15.000000,63.000000,95.000000);
				}
				bbgraphicsDrawRect(240.000000,(83+bbi*30),560.000000,30.000000);
				bbgraphicsSetColor(255.000000,255.000000,255.000000);
				bbsimpletextboxDraw(bbglobalsHighscores[bbi][1],250,80+bbi*30,200,0);
				bbsimpletextboxDraw(bbglobalsHighscores[bbi][2],380,80+bbi*30,200,0);
				bbsimpletextboxDraw(bbglobalsHighscores[bbi][3],500,80+bbi*30,300,0);
			}
			bbsimpletextboxDraw("Page: "+String(this.bbpage),300,560,100,1);
			if(this.bbpage>1){
				this.bbprevMenu.bbDraw();
			}
			if(this.bbpage<bbglobalsscorePages){
				this.bbnextMenu.bbDraw();
			}
		}
	}else{
		if(bb==1){
			this.bbinputBox.bbDraw(300,280);
		}
	}
	return 0;
}
function ajax_submitScore(name, score, gameTime, version, amount, page) {
	//if (!amount) { amount = 10 }
	//if (!page) { page = 1 }
	//var url = "ajax.php";
	//$.getJSON(url, { name: name, score: score, gametime: gameTime, version: version, amount: amount, page: page }, function(json) {
	//	var scorePages;
	//	var scoreArray;
	//	if (json.success) {
	//		scorePages = json.pages;
	//		scoreArray = json.winners;
	//	} else {
			scorePages = 0;
			scoreArray = [["#FAILED", "Failed to retrieve scores"]];
	//	}
	//	bbglobalsscorePages = scorePages;
	//	bbglobalsScoreSuccess(scoreArray);
    //});
}
function bbglobalsSubmitScore(bbname,bbscore,bbgameTime,bbversion,bbamount,bbpage){
	bb_globals_scoreFinished=false;
	ajax_submitScore(bbname, bbscore, bbgameTime, bbversion, bbamount, bbpage);
}
function bbsimpleinputSimpleInput(){
	Object.call(this);
	this.bbtext="";
	this.bbx=0;
	this.bby=0;
	this.bbfont=null;
	this.bbheight=0;
	this.bbheightOffset=0;
	this.bbcursorPos=0;
}
function bbsimpleinputnew(bbtxt,bbx,bby){
	this.bbtext=bbtxt;
	this.bbx=bbx;
	this.bby=bby;
	this.bbfont=bbangelfontGetCurrent();
	this.bbheight=this.bbfont.bbheight;
	this.bbheightOffset=this.bbfont.bbheightOffset;
	this.bbcursorPos=bbtxt.length;
	return this;
}
function bbsimpleinputnew2(){
	return this;
}
var bbsimpleinputcount;
bbsimpleinputSimpleInput.prototype.bbUpdate=function(){
	bbsimpleinputcount=(bbsimpleinputcount+1) % 7;
	var bbasc=bbinputGetChar();
	if(bbasc>31 && bbasc<127){
		this.bbtext=this.bbtext.slice(0,this.bbcursorPos)+String.fromCharCode(bbasc)+this.bbtext.slice(this.bbcursorPos,this.bbtext.length);
		this.bbcursorPos+=1;
	}else{
		var bb=bbasc;
		if(bb==8){
			if(this.bbcursorPos>0){
				this.bbtext=this.bbtext.slice(0,this.bbcursorPos-1)+this.bbtext.slice(this.bbcursorPos,this.bbtext.length);
				this.bbcursorPos-=1;
			}
		}else{
			if(bb==13){
			}else{
				if(bb==65573){
					this.bbcursorPos-=1;
					if(this.bbcursorPos<0){
						this.bbcursorPos=0;
					}
				}else{
					if(bb==65575){
						this.bbcursorPos+=1;
						if(this.bbcursorPos>this.bbtext.length){
							this.bbcursorPos=this.bbtext.length;
						}
					}
				}
			}
		}
	}
	return this.bbtext;
}
bbsimpleinputSimpleInput.prototype.bbDraw=function(bbx,bby){
	this.bbfont.bbDrawText(this.bbtext,bbx,bby);
	if(bbsimpleinputcount>3){
		bbgraphicsDrawRect((bbx+this.bbfont.bbTextWidth(this.bbtext.slice(0,this.bbcursorPos))),(bby+this.bbheightOffset),2.000000,(this.bbheight));
	}
}
bbsimpleinputSimpleInput.prototype.bbDraw2=function(){
	this.bbDraw(this.bbx,this.bby);
}
function bblistEnumerator(){
	Object.call(this);
	this.bb_list=null;
	this.bb_curr=null;
}
function bblistnew4(bblist){
	this.bb_list=bblist;
	this.bb_curr=bblist.bb_head.bb_succ;
	return this;
}
function bblistnew5(){
	return this;
}
bblistEnumerator.prototype.bbHasNext=function(){
	return this.bb_curr!=this.bb_list.bb_head;
}
bblistEnumerator.prototype.bbNextObject=function(){
	var bbdata=this.bb_curr.bb_data;
	this.bb_curr=this.bb_curr.bb_succ;
	return bbdata;
}
function bbgraphicsDrawImageRect(bbimage,bbx,bby,bbsrcX,bbsrcY,bbsrcWidth,bbsrcHeight,bbframe){
	var bbf=bbimage.bbframes[bbframe];
	if((bbgraphicscontext.bbtformed)!=0){
		bbgraphicsPushMatrix();
		bbgraphicsTranslate(-bbimage.bbtx+bbx,-bbimage.bbty+bby);
		bbgraphicsValidateMatrix();
		bbgraphicscontext.bbdevice.DrawSurface2(bbimage.bbsurface,0.000000,0.000000,bbsrcX+bbf.bbx,bbsrcY+bbf.bby,bbsrcWidth,bbsrcHeight);
		bbgraphicsPopMatrix();
	}else{
		bbgraphicsValidateMatrix();
		bbgraphicscontext.bbdevice.DrawSurface2(bbimage.bbsurface,-bbimage.bbtx+bbx,-bbimage.bbty+bby,bbsrcX+bbf.bbx,bbsrcY+bbf.bby,bbsrcWidth,bbsrcHeight);
	}
	return 0;
}
function bbgraphicsDrawImageRect2(bbimage,bbx,bby,bbsrcX,bbsrcY,bbsrcWidth,bbsrcHeight,bbrotation,bbscaleX,bbscaleY,bbframe){
	var bbf=bbimage.bbframes[bbframe];
	bbgraphicsPushMatrix();
	bbgraphicsTranslate(bbx,bby);
	bbgraphicsRotate(bbrotation);
	bbgraphicsScale(bbscaleX,bbscaleY);
	bbgraphicsTranslate(-bbimage.bbtx,-bbimage.bbty);
	bbgraphicsValidateMatrix();
	bbgraphicscontext.bbdevice.DrawSurface2(bbimage.bbsurface,0.000000,0.000000,bbsrcX+bbf.bbx,bbsrcY+bbf.bby,bbsrcWidth,bbsrcHeight);
	bbgraphicsPopMatrix();
	return 0;
}
function bbgraphicsDrawRect(bbx,bby,bbw,bbh){
	bbgraphicsValidateMatrix();
	bbgraphicsrenderDevice.DrawRect(bbx,bby,bbw,bbh);
	return 0;
}
function bbsimpletextboxSimpleTextBox(){
	Object.call(this);
}
var bbsimpletextboxfont;
var bbsimpletextboxalign;
var bbsimpletextboxyOffset;
var bbsimpletextboxlineGap;
function bbsimpletextboxDrawTextLine(bbtxt,bbx,bby){
	bbsimpletextboxfont.bbDrawText2(bbtxt,bbx,bby,bbsimpletextboxalign);
	bbsimpletextboxyOffset+=bbsimpletextboxlineGap+bbsimpletextboxfont.bbheight;
}
function bbsimpletextboxDraw(bbtext,bbx,bby,bbwidth,bbalignment){
	var bbthisLine="";
	var bbcharOffset=0;
	var bbwordLen=0;
	var bbword="";
	bbsimpletextboxfont=bbangelfontcurrent;
	bbsimpletextboxalign=bbalignment;
	bbsimpletextboxyOffset=0;
	for(var bbi=0;bbi<bbtext.length;bbi=bbi+1){
		if(bby+bbsimpletextboxyOffset>bbgraphicsDeviceHeight()){
			return;
		}
		var bbasc=bbtext.charCodeAt(bbi);
		var bb=bbasc;
		if(bb==32){
			bbwordLen=bbangelfontcurrent.bbTextWidth(bbword);
			if(bbcharOffset+bbwordLen>bbwidth){
				bbsimpletextboxDrawTextLine(bbthisLine,bbx,bby+bbsimpletextboxyOffset);
				bbthisLine="";
				bbcharOffset=0;
			}
			bbcharOffset+=bbwordLen+bbsimpletextboxfont.bbGetChars()[32].bbxAdvance;
			bbthisLine+=bbword+" ";
			bbword="";
		}else{
			if(bb==10){
				bbwordLen=bbsimpletextboxfont.bbTextWidth(bbword);
				if(bbcharOffset+bbwordLen>bbwidth){
					bbsimpletextboxDrawTextLine(bbthisLine,bbx,bby+bbsimpletextboxyOffset);
					bbthisLine="";
				}
				bbthisLine+=bbword;
				bbsimpletextboxDrawTextLine(bbthisLine,bbx,bby+bbsimpletextboxyOffset);
				bbthisLine="";
				bbcharOffset=0;
				bbword="";
			}else{
				var bbch=bbsimpletextboxfont.bbGetChars()[bbasc];
				bbword+=String.fromCharCode(bbasc);
			}
		}
	}
	if(bbword!=""){
		bbwordLen=bbsimpletextboxfont.bbTextWidth(bbword);
		if(bbcharOffset+bbwordLen>bbwidth){
			bbsimpletextboxDrawTextLine(bbthisLine,bbx,bby);
			bbthisLine="";
		}
		bbthisLine+=bbword;
	}
	if(bbthisLine!=""){
		bbsimpletextboxDrawTextLine(bbthisLine,bbx,bby);
	}
}
function bbinputKeyHit(bbkey){
	return bbinputdevice.KeyHit(bbkey);
}
var bbglobalsMaxBullets;
var bbglobalsMaxEnemies;
var bbglobalsLastEnemy;
var bbglobalsMuteSFX;
function bbaudioPlaySound(bbsound,bbchannel,bbflags){
	if((bbsound.bbsample)!=null){
		bbaudiodevice.PlaySample(bbsound.bbsample,bbchannel,bbflags);
	}
	return 0;
}
function bbglobalsSpawnEnemies(){
	if(bbglobalsPlayer.bbDead){
		return 0;
	}
	var bbspecial=false;
	bbglobalsMaxBullets=((bbglobalsTime/2000)|0)+6;
	bbglobalsMaxEnemies=((bbglobalsTime/5000)|0)+5;
	bbglobalsLastEnemy+=1;
	if(bbglobalsTime % 7000>6800){
		bbglobalsMaxEnemies=6;
		if(bbglobalsEnemies.bbCount()<bbglobalsMaxEnemies && bbrandomRnd3(30.000000)<1.000000){
			bbglobalsEnemies.bbAddLast(bbenemyMake2((bbrandomRnd2(7.000000,9.000000))|0));
			bbglobalsLastEnemy=0;
		}
		bbspecial=true;
	}
	if(bbglobalsTime % 9000>8800){
		bbglobalsMaxEnemies=5;
		if(bbglobalsEnemies.bbCount()<bbglobalsMaxEnemies && bbrandomRnd3(20.000000)<1.000000){
			bbglobalsEnemies.bbAddLast(bbenemyMake2(4));
			bbglobalsLastEnemy=0;
		}
		bbspecial=true;
	}
	if(bbglobalsTime % 13000>12300){
		bbglobalsMaxEnemies=7;
		if(bbglobalsEnemies.bbCount()<bbglobalsMaxEnemies && bbrandomRnd3(30.000000)<1.000000){
			bbglobalsEnemies.bbAddLast(bbenemyMake2((bbrandomRnd2(2.000000,7.000000))|0));
			bbglobalsLastEnemy=0;
		}
		bbspecial=true;
	}
	if(bbglobalsTime % 16000>15400){
		bbglobalsMaxEnemies=4;
		if(bbglobalsEnemies.bbCount()<bbglobalsMaxEnemies && bbrandomRnd3(40.000000)<1.000000){
			bbglobalsEnemies.bbAddLast(bbenemyMake2(9));
			bbglobalsLastEnemy=0;
		}
		bbspecial=true;
	}
	if(bbglobalsTime % 20000>19000){
		bbglobalsMaxEnemies=8;
		if(bbglobalsEnemies.bbCount()<bbglobalsMaxEnemies && bbrandomRnd3(20.000000)<1.000000){
			bbglobalsEnemies.bbAddLast(bbenemyMake2((bbrandomRnd2(0.000000,10.000000))|0));
			bbglobalsLastEnemy=0;
		}
		bbspecial=true;
	}
	if(bbspecial){
		return 0;
	}
	if(bbglobalsLastEnemy>=30*bbglobalsEnemies.bbCount()){
		if(bbglobalsTime>5000 && bbrandomRnd3((((700*(bbglobalsEnemies.bbCount()+1)/(1+((bbglobalsTime/8000)|0)))|0)+1))<1.000000){
			bbglobalsEnemies.bbAddLast(bbenemyMake2(9));
			bbglobalsLastEnemy=0;
		}else{
			if(bbglobalsTime>3500 && bbrandomRnd3((((600*(bbglobalsEnemies.bbCount()+1)/(1+((bbglobalsTime/5000)|0)))|0)+1))<1.000000){
				bbglobalsEnemies.bbAddLast(bbenemyMake2(8));
				bbglobalsLastEnemy=0;
			}else{
				if(bbglobalsTime>2000 && bbrandomRnd3((((600*(bbglobalsEnemies.bbCount()+1)/(1+((bbglobalsTime/5000)|0)))|0)+1))<1.000000){
					bbglobalsEnemies.bbAddLast(bbenemyMake2(4));
					bbglobalsLastEnemy=0;
				}else{
					if(bbglobalsTime>1000 && bbrandomRnd3((((300*(bbglobalsEnemies.bbCount()+1)/(1+((bbglobalsTime/8000)|0)))|0)+1))<1.000000){
						bbglobalsEnemies.bbAddLast(bbenemyMake2((bbrandomRnd2(2.000000,4.000000))|0));
						bbglobalsLastEnemy=0;
					}else{
						if(bbglobalsTime>1200 && bbrandomRnd3((((600*(bbglobalsEnemies.bbCount()+1)/(1+((bbglobalsTime/5000)|0)))|0)+1))<1.000000){
							bbglobalsEnemies.bbAddLast(bbenemyMake2(7));
							bbglobalsLastEnemy=0;
						}else{
							if(bbglobalsTime>1000 && bbrandomRnd3((((1000*(bbglobalsEnemies.bbCount()+1)/(1+((bbglobalsTime/8000)|0)))|0)+1))<1.000000){
								bbglobalsEnemies.bbAddLast(bbenemyMake2((bbrandomRnd2(5.000000,7.000000))|0));
								bbglobalsLastEnemy=0;
							}else{
								if(bbglobalsEnemies.bbCount()<bbglobalsMaxEnemies && bbrandomRnd3(200*bbglobalsEnemies.bbCount()+1)<1.000000){
									bbglobalsEnemies.bbAddLast(bbenemyMake2((bbrandomRnd2(0.000000,2.000000))|0));
									bbglobalsLastEnemy=0;
								}
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
var bbglobalsWaitForClick;
function bbinputMouseDown(bbbutton){
	return bbinputdevice.KeyDown(1+bbbutton);
}
var bbglobalsLastBullet;
function bbglobalsUpdateScenery(){
	if(bbglobalsPlayer.bbBombUsed==0){
		bbgraphicsDrawImage(bbresource2gfx.bbBack,400.000000,300.000000,0);
		if(bbglobalsTime<6000){
		}else{
			if(bbglobalsTime<6400){
				var bba=(bbglobalsTime-6000);
				bba/=400.000000;
				bbgraphicsSetAlpha(bba);
				bbgraphicsDrawImage(bbresource2gfx.bbLolwut,500.000000,440.000000,0);
				bbgraphicsSetAlpha(1.000000);
			}else{
				bbgraphicsDrawImage(bbresource2gfx.bbLolwut,500.000000,440.000000,0);
			}
		}
	}else{
		var bbFrame=((bbglobalsPlayer.bbBombUsed/6)|0);
		if(bbFrame>10){
			bbFrame=10;
		}
		bbgraphicsDrawImage2(bbresource2gfx.bbDie,400.000000,300.000000,0.000000,2.5,2.5,bbFrame);
	}
	return 0;
}
function bbgraphicsDrawCircle(bbx,bby,bbr){
	bbgraphicsValidateMatrix();
	bbgraphicsrenderDevice.DrawOval(bbx-bbr,bby-bbr,bbr*2.000000,bbr*2.000000);
	return 0;
}
var bbglobalsscorePages;
function bbinputGetChar(){
	return bbinputdevice.GetChar();
}
function bbglobalsSanityCheck(bbstr){
	if(bbstr.length<3 || bbstr.length>16){
		return false;
	}
	var bb=bbstr.toUpperCase();
	var bb2=0;
	while(bb2<bb.length){
		var bbc=bb.charCodeAt(bb2);
		bb2=bb2+1;
		if(bbc<48 || bbc>57 && bbc<65 || bbc>90){
			return false;
		}
	}
	return true;
}
function bb_Init(){
	bbgraphicscontext=null;
	bbinputdevice=null;
	bbaudiodevice=null;
	bbappdevice=null;
	bbgraphicsDefaultFlags=0;
	bbresourceresources=bbmapnew2.call(new bbmapStringMap);
	bbgraphicsrenderDevice=null;
	bbangelfonterror="";
	bbangelfontcurrent=null;
	bbangelfont_list=bbmapnew2.call(new bbmapStringMap);
	bbresource2Font=null;
	bbresource2gfx=null;
	bbresource2SFX=null;
	bbrandomSeed=1234;
	bbglobalsHighscores=[["WOOT"]];
	bbglobalsscoreFinished=false;
	bbglobalsuserLang="en";
	bbglobalsPlayer=null;
	bbglobalsFire=bblistnew.call(new bblistList);
	bbglobalsExplosion=bblistnew.call(new bblistList);
	bbglobalsEnemies=bblistnew.call(new bblistList);
	bbglobalsBullets=bblistnew.call(new bblistList);
	bbglobalsSmoke=bblistnew.call(new bblistList);
	bbglobalsTime=0;
	bbsimpletextboxfont=null;
	bbsimpletextboxalign=0;
	bbsimpletextboxyOffset=0;
	bbsimpletextboxlineGap=5;
	bbglobalsMaxBullets=6;
	bbglobalsMaxEnemies=5;
	bbglobalsLastEnemy=0;
	bbglobalsMuteSFX=false;
	bbglobalsWaitForClick=false;
	bbglobalsLastBullet=0;
	bbglobalsscorePages=1;
	bbsimpleinputcount=0;
	
	//cc = document.getElementById("centercontainer");
	//cc.style.visibility = 'hidden';
	//cc.style.width = 0;
	//cc.style.height = 0;
	qa = document.getElementById("bitch");
	qa.style.visibility = 'visible';
	qa.style.width = game_canvas.style.width;
	qa.style.height = game_canvas.style.height;
}
//${TRANSCODE_END}

//This overrides print in 'std.lang/lang.js'
//
