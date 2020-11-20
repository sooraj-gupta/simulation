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
