var c;
var loaded = false;

function increase(){
    mass++;
    weight = gravity * mass;
    document.getElementById("mass").innerHTML = ` Mass: ${mass} `;
}
function decrease(){
    if( mass > 1 )
    {
        mass--;
        weight = gravity * mass;
    }
    document.getElementById("mass").innerHTML = ` Mass: ${mass} `;
}

function inF(){
	if( frictionMag < 1 )
    	frictionMag += 0.01;
    document.getElementById("f").innerHTML = ` Friction: ${parseInt(frictionMag*100, 10)}% `;
}
function deF(){
	if( frictionMag > 0.01 )
    	frictionMag -= 0.01;
    document.getElementById("f").innerHTML = ` Friction: ${Math.floor(frictionMag*100)}% `;
}

function inJ(){
	if( jumpingForce < 500 )
    	jumpingForce -= 1;
    document.getElementById("j").innerHTML = ` Jumping Force: ${-jumpingForce}N `;
}
function deJ(){
	if( Math.abs(jumpingForce) > 5 )
    	jumpingForce += 1;
    document.getElementById("j").innerHTML = ` Jumping Force: ${-jumpingForce}N `;
}

function jump()
{
	if( y > bottom - 20 )
	{
		instantForceY = jumpingForce;
    	forcesY = 0;
	}
}

var bottom = 300;

function setup() {
    var canvas = document.getElementById("canvas");
    canvas.height = bottom + 70;
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
}



var mouseX = 200;
var down = false;
function handleMouseMove( event )
{
	if( down )
	{
	
	}
}
function handleMouseDown( event )
{
	coor( event );
		instantForceX = (mouseX - x)/100;  
	down = true;
}
function handleMouseUp( event )
{
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

var forcesX = 0.0001;

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
    c.fillRect( 0, 0, window.innerWidth, screen.height );
}
function fill( r, g, b ){
    c.fillStyle = `rgb( ${r}, ${g}, ${b} )`;
}
function draw()
{
    time++;
    background( 255, 255, 255 );
    
    fill( 0, 0, 0 );
    c.fillRect( x, y, 50, 50 );
	
	fill( 0,100,0 );
    c.fillRect( 0, bottom + 50, screen.width, 20)
    
    
    checkGround();
    
	
    aY = ( weight + forcesY + instantForceY )/mass;
    aX = (forcesX + instantForceX + frictionX)/mass;
    
    //console.log( frictionX );
    
    
    var lastSpeedX = xSpeed;
    
    ySpeed += aY; 
    xSpeed += aX;
	xSpeed *= ( 1 - frictionXKinetic );
	xSpeed -= ( frictionXKinetic * xSpeed );
	
	frictionXKinetic = (mass - mass*(1-frictionMag))/mass ;
	
    if( Math.abs(lastSpeedX)/lastSpeedX != Math.abs(xSpeed)/xSpeed  || xSpeed == 0 )
    {
        changedDirection = true;
    }
    
    
    
    y += ySpeed;
    x += xSpeed;
    
    
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
    if( y >= bottom - 11 && instantForceY == 0 ){
        forcesY = -( weight );
        ySpeed = 0;
        if( Math.abs(y) >= bottom - 10 )
            reGround();
		var staticFrictionX = weight * frictionXStatic;
		var kineticFrictionX = weight * frictionXKinetic;
		
		
    }
    else{
        frictionX = 0;
    }
}