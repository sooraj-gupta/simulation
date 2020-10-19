var c;
var loaded = false;

function increase(){
    mass++;
    weight = gravity * mass;
    update();
}
function decrease(){
    if( mass > 1 )
    {
        mass--;
        weight = gravity * mass;
    }
    update();
}

function inF(){
	if( frictionMag < 1 )
    	frictionMag += 0.01;
    update();
}
function deF(){
	if( frictionMag > 0.01 )
    	frictionMag -= 0.01;
    update();
}

function inJ(){ 
	if( Math.abs(jumpingForce) < 1000 )
    	jumpingForce -= 2;
    update();
}
function deJ(){
	if( Math.abs(jumpingForce) > 5 )
    	jumpingForce += 2;
    update();
}

function inG(){
	if( gravity < 20 )
    	gravity += 0.2;
    update();
}
function deG(){
	if( gravity > 0.04 )
    	gravity -= 0.2;
    update();
}

function jump()
{
	if( y > bottom - 20 )
	{
		instantForceY = jumpingForce;
    	forcesY = 0;
	}
}

var bottom = window.innerHeight/2.2;
function setup() {
    var canvas = document.getElementById("canvas");
    canvas.height = (bottom) + 70;
    canvas.width = window.innerWidth;
    window.addEventListener( "keydown", keyDown, false);
	canvas.addEventListener( "mousedown", handleMouseDown );
	canvas.addEventListener( "mouseup", handleMouseUp );
	canvas.addEventListener( "mousemove", handleMouseMove );
	//canvas.addEventListener( "touchstart", handleMouseDown );
	//canvas.addEventListener( "touchend", handleMouseUp );
	//canvas.addEventListener( "touchmove", handleMouseMove );
	document.addEventListener('touchmove', function(e) {
    	e.preventDefault();
    	var touch = e.touches[0];
    	mouseX = touch.pageX;
		instantForceX = (mouseX - x)/100;
	}, false);
	
	canvas.addEventListener('wheel', function(e) {

        e.preventDefault();

}, false);
  canvas.addEventListener('touchmove', function(e) {

        e.preventDefault();

}, false);
    
    c = canvas.getContext("2d");
    window.setInterval( draw, 50 );
    
    document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})
	getUrl();
	setUrl();
}


function setUrl()
{
	 window.history.replaceState(null, null, `?mass=${mass}&friction=${parseInt(frictionMag*100)/100}&jump=${jumpingForce}&gravity=${parseInt(gravity*10)/10}`);
}

function update()
{
	document.getElementById("mass").innerHTML = ` Mass: ${mass} kg `;
	document.getElementById("f").innerHTML = ` Friction: ${Math.floor(frictionMag*100)}% `;
	document.getElementById("j").innerHTML = ` Jumping Force: ${-jumpingForce}N `;
	document.getElementById("g").innerHTML = ` Gravity: ${Math.floor(gravity*10)/10} m/s<sup style = "font-size:10px;">2</sup> `; 
	setUrl();
}

function getUrl()
{
	const query = window.location.search;
    const urlParams = new URLSearchParams(query);
	mass = ( urlParams.get('mass' ) ) ? parseInt( urlParams.get('mass' ) ) : mass  ;
	frictionMag = ( urlParams.get( 'friction' ) ) ? parseFloat( urlParams.get('friction') ) : frictionMag ;
	jumpingForce = ( urlParams.get('jump' ) ) ? parseInt( urlParams.get('jump') ) : jumpingForce  ;
	gravity = ( urlParams.get( 'gravity' ) ) ? parseFloat( urlParams.get('gravity') ) : gravity ;
	
	if( gravity > 20 )
	{
		gravity = 20;		
	}
	
	update();
}


var mouseX = 200;
var lastX = mouseX;
var down = false;
var pressed = false;
function handleMouseMove( event )
{
	if( pressed )
	{
		down = true;
		coor( event );
		instantForceX = (mouseX - x)/100;  
		clearTimeout( timeout );
	}
}
function handleMouseDown( event )
{
	coor( event );
	instantForceX = (mouseX - x)/100;  
	fill( 0,0 ,0);
		c.lineWidth = 5;
		c.beginPath();
		c.moveTo( x, y + 25 );
		c.lineTo( mouseX, y+25 );		
		c.stroke();
	pressed = true;
	lastX = mouseX;
}
function handleMouseUp( event )
{
	pressed = false;
	down = false;
}

function coor( event )
{
	var xpos;
  	var ypos;
    	//IE
    xpos = event.clientX;
    ypos = event.clientY;
  	
	mouseX = xpos;
  	console.log( xpos + ", " + ypos);
}

var x = 200;
var y = bottom;

var gravity = 9.8;
var ySpeed = 0;
var aY = 0;

var xSpeed = 0;
var aX = 0;

var mass = 1;

var weight = gravity * mass;
var forcesY = 0;

var forcesX = 0;;

var time = 0;

var changedDirection = true;
var instantForceY = 0;
var instantForceX = 0;

var shouldMove = false;

var frictionXStatic = 0;
var frictionXKinetic = 1;
var frictionX = 0;

var frictionMag = 0.1;

var jumpingForce = -60;

function keyDown( e ){
    
    if( e.keyCode == 32 && y > bottom - 10 ){   
        jump();
    }
	if( e.keyCode == 39 ){   
        instantForceX = 6;
    }
	if( e.keyCode == 37 ){   
        instantForceX = -6;
    }
    
    
}

function background( r, g, b )
{
    fill( r, g, b);
    c.fillRect( 0, 0, window.innerWidth, window.innerHeight );
}
function fill( r, g, b ){
    c.fillStyle = `rgb( ${r}, ${g}, ${b} )`;
}

var timeout;
function draw()
{
	weight = mass * gravity
    time++;
    background( 255, 255, 255 );
    
    checkGround();
    x += xSpeed;
	
	if( down )
	{
		fill( 0,0 ,0);
		c.lineWidth = 5;
		c.beginPath();
		c.moveTo( x, y + 25 );
		c.lineTo( mouseX, y+25 );
		c.stroke();
		if( mouseX > x+25 )
		{
			c.beginPath();
    		c.moveTo(mouseX+10, y+25);
    		c.lineTo(mouseX - 20, y+15);
    		c.lineTo(mouseX - 20, y+35);
    		c.fill();
		}
		else if( mouseX < x+25 )
		{
			c.beginPath();
    		c.moveTo(mouseX-10, y+25);
    		c.lineTo(mouseX + 20, y+15);
    		c.lineTo(mouseX + 20, y+35);
    		c.fill();
		}
		
	}
	
	fill( 255, 255, 255 );
    c.fillRect( x-5, y, 60, 50 );
	
	fill( 0, 0, 0 );
    c.fillRect( x, y, 50, 50 );
	
	
	fill( 0,100,0 );
    c.fillRect( 0, bottom + 50, window.innerWidth, 20)
    
	timeout = setTimeout( function(){ down = false; }, 10 );
    
    
	
    aY = ( weight + forcesY + instantForceY )/mass;
    aX = (forcesX + instantForceX + frictionX)/mass;
    
    //console.log( frictionX );
    
    
    var lastSpeedX = xSpeed;
    
    frictionXKinetic = ((Math.sqrt(mass/(gravity*gravity)))) * (frictionMag*20) * (gravity/20)*(gravity/20) ;
	
	ySpeed += aY; 
    xSpeed += aX;
	y += ySpeed;
	
	
    if( Math.abs(lastSpeedX)/lastSpeedX != Math.abs(xSpeed)/xSpeed  || xSpeed == 0 )
    {
        changedDirection = true;
    }
    
    
    
    if( instantForceY > 0 || instantForceY < 0 )
    {   
        instantForceY = 0;
    }
    if( instantForceX > 0 || instantForceX < 0 )
    {   
        instantForceX = 0;
    }
	
	document.getElementById("vx").innerHTML = "Velocity X: " + parseInt( xSpeed, 10 );
	document.getElementById("vy").innerHTML = "Velocity Y: " + -parseInt( ySpeed, 10 );
	
	//document.getElementById("x").innerHTML = mouseX;
    
}

function addInstantForce( f ){
    
}
function addConstantForce( f ){
    
}

function reGround(){
    y = bottom ;
}

function checkGround( )
{
    if( y >= bottom - 1 && instantForceY == 0 ){
        forcesY = -( weight );
        ySpeed = 0;
        if( Math.abs(y) >= bottom - 10 )
            reGround();
		var staticFrictionX = weight * frictionXStatic;
		var kineticFrictionX = weight * frictionXKinetic;
		xSpeed *= ( 1 - frictionXKinetic/2 );
		xSpeed -= ( frictionXKinetic * xSpeed );
		
		
    }
    else{
        frictionX = 0;
    }
}