let END_GAME=`
function i5S() {
	if(u6H[11]["hostID"] == u6H[11]["getLSID"]()) {
		u6H[11]["sendReturnToLobby"]();
	}
`;

let RENDER_JETPACK=`
if(this["gameSettings"]["mo"]=="v") {
	this["VTOLWing"]=new PIXI["Graphics"]();
	this["VTOLWing"]["beginFill"](0xcccccc);
	this["VTOLWing"]["drawRect"](
		this["radius"]*(-{uniVar}["footHW"]+{uniVar}["footOffsetX"]),
		this["radius"]*(-{uniVar}["footHH"]+{uniVar}["footOffsetY"]),
		this["radius"]*({uniVar}["footHW"]*2),
		this["radius"]*({uniVar}["footHH"]*2)
	);
	this["VTOLWing"]["beginFill"](0xcccccc);
	this["VTOLWing"]["drawRect"](
		this["radius"]*(-{uniVar}["footHW"]+-{uniVar}["footOffsetX"]),
		this["radius"]*(-{uniVar}["footHH"]+{uniVar}["footOffsetY"]),
		this["radius"]*({uniVar}["footHW"]*2),
		this["radius"]*({uniVar}["footHH"]*2)
		);
	this["container"]["addChild"](this["VTOLWing"]);
}`;

let VTOL=`"v") {
	var VTOL_O1B=[];
	VTOL_O1B[11]=(-22/30)*{sizeMultiplier};
	VTOL_O1B[791]=0.12;
	VTOL_O1B[874]=new {box2d}.Common.Math.b2Vec2(0,VTOL_O1B[11]);
	VTOL_O1B[874]={playerObject}["body"]["GetWorldVector"](VTOL_O1B[874],VTOL_O1B[874]);
	VTOL_O1B[857]=new {box2d}.Common.Math.b2Vec2(0,VTOL_O1B[11]*VTOL_O1B[791]);
	VTOL_O1B[857]={playerObject}["body"]["GetWorldVector"](
		VTOL_O1B[857],
		VTOL_O1B[857]
	);
	VTOL_O1B[347]={playerObject}["body"]["GetWorldPoint"](new {box2d}.Common.Math.b2Vec2(
		{uniVar}["footOffsetX"]*{sizeMultiplier},
		{uniVar}["footOffsetY"]*{sizeMultiplier}
	));
	VTOL_O1B[848]={playerObject}["body"]["GetWorldPoint"](new {box2d}.Common.Math.b2Vec2(
		-{uniVar}["footOffsetX"]*{sizeMultiplier},
		{uniVar}["footOffsetY"]*{sizeMultiplier}
	));
	VTOL_O1B[195]="none";
	if({inputs}["up"]) {
		if({inputs}["left"]) {
			VTOL_O1B[195]="right";
		}
		else if({inputs}["right"]) {
			VTOL_O1B[195]="left";
		}
		else {
			VTOL_O1B[195]="both";
		}
	}
	else if({inputs}["left"] && {inputs}["right"]) {
		VTOL_O1B[195]="both";
	}
	else if({inputs}["left"]) {
		VTOL_O1B[195]="right";
	}
	else if({inputs}["right"]) {
		VTOL_O1B[195]="left";
	}
	if(VTOL_O1B[195]=="both") {
		{playerObject}["body"]["ApplyImpulse"](VTOL_O1B[874],VTOL_O1B[347]);
		{playerObject}["body"]["ApplyImpulse"](VTOL_O1B[874],VTOL_O1B[848]);
	}
	if(VTOL_O1B[195]=="left") {
		{playerObject}["body"]["ApplyImpulse"](VTOL_O1B[874],VTOL_O1B[347]);
		{playerObject}["body"]["ApplyImpulse"](VTOL_O1B[857],VTOL_O1B[848]);
	}
	if(VTOL_O1B[195]=="right") {
		{playerObject}["body"]["ApplyImpulse"](VTOL_O1B[857],VTOL_O1B[347]);
		{playerObject}["body"]["ApplyImpulse"](VTOL_O1B[874],VTOL_O1B[848]);
	}
}`;

/**YOINKED WITH PERMISSION FROM BLU <3**/
let VARTOL_PARTICLES = `if (arguments[3].mo == "v") {
	for (let currDisc = 0; currDisc < arguments[1].discs.length; currDisc++) {
		if (arguments[0].discs[currDisc] && arguments[1].discs[currDisc] && this.discGraphics[currDisc] && arguments[4] && arguments[4][currDisc]) {
			let particleSize = 2.5 * this.discGraphics[currDisc].radius / arguments[1].physics.ppm;
			let percentAlongJetpack = 0.85;
			let xOffset = -this.discGraphics[currDisc].radius * (E.footOffsetX + -E.footHW) * percentAlongJetpack;
	
			let spreadWidth = .3;
			let spreadDir = Math.random() * spreadWidth - spreadWidth / 2;
			let dir = arguments[1].discs[currDisc].a + spreadDir + Math.PI / 2;
			let avgSpeed = 2;
			let maxRandSpeed = .7;
			let speed = avgSpeed + (Math.random() * maxRandSpeed) - (maxRandSpeed / 2);
			let particleXV = Math.cos(dir) * speed;
			let particleYV = Math.sin(dir) * speed;
			particleXV += arguments[1].discs[currDisc].xv / 30;
			particleYV += arguments[1].discs[currDisc].yv / 30;
	
			let fireJetpack = [];
			if(arguments[4][currDisc].left && !arguments[4][currDisc].action2) fireJetpack.push("right");
			if(arguments[4][currDisc].right && !arguments[4][currDisc].action2) fireJetpack.push("left");
			if(arguments[4][currDisc].up && !fireJetpack.length) fireJetpack = ["left", "right"];
			for(let jetpack in fireJetpack) {
				let particle = new PIXI.Graphics;
				// vanilla vtol (with old renderer lighting fx accounted for) = 0xffffd9;
				particle.beginFill(0xffd9d9);
				particle.drawRect(0, -particleSize/2, particleSize, particleSize);
				particle.x = this.discGraphics[currDisc].container.x + ((fireJetpack[jetpack] == "right" ? xOffset : -xOffset) * Math.cos(this.discGraphics[currDisc].container.rotation));
				particle.y = this.discGraphics[currDisc].container.y + ((fireJetpack[jetpack] == "right" ? xOffset : -xOffset) * Math.sin(this.discGraphics[currDisc].container.rotation));
				this.blurContainer.addChild(particle);
				this.particleManager.container.addChild(particle);
				this.particleManager.particles.push({graphics: particle, xv: particleXV, yv: particleYV, alpha: 1, shrinkPerFrame: 0.05, gravity: .04});
			}
	  	}
	}
}`;