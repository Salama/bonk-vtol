let uniVar=newStr.match(/\(0,20\)\);[A-Z]/)[0][8];
let box2d=newStr.match(/requirejs(.){0,70}function\(...,...,.../)[0].slice(-3);

let buildFunction = newStr.match(/build\(...\,...\) \{var ...=\[arguments\];...\[.\]=....;this\[(.){0,30}new PIXI/)[0].split("var ");
newStr=newStr.replace(buildFunction[0], buildFunction[0] + RENDER_JETPACK.replaceAll('{uniVar}', uniVar));

let sizeMultiplier=newStr.match(/20;\}...\[(\d){1,3}\]\*=...\[(\d){1,3}\]/)[0].split("=")[1];
let playerObject=newStr.match(/...\[(\d){1,3}\]\[...\[(\d){1,3}\]\]=\{a1a:/)[0].split("=")[0];
let inputs = `${playerObject.substr(0, 3)}[0][1][${playerObject.match(/\[...\[(\d){1,3}\]\]/)[0].slice(1, -1)}]`;
newStr=newStr.replace('"v"){;}',
	VTOL.replaceAll('{box2d}', box2d)
	.replaceAll('{sizeMultiplier}', sizeMultiplier)
	.replaceAll('{playerObject}', playerObject)   
	.replaceAll('{inputs}', inputs)
	.replaceAll('{uniVar}', uniVar) 
);

let lobbyModes=newStr.match(/...\....\((\d){1,4}\)\];...\[(\d){1,3}\](.){0,20}\[\];/)[0];
newStr=newStr.replace(lobbyModes,"'v'," + lobbyModes);

let lastMode = newStr.match(/editorCanTarget:[a-z]{4,5}\};/g).slice(-1);
let modeVar = newStr.match(/editorCanTarget:[a-z]{4,5}\};...\[(\d){1,3}\]\[...\[(\d){1,3}\]\[(\d){1,3}\]\]/)[0].split(";")[1];
newStr=newStr.replace(lastMode, lastMode + modeVar + "['v'].editorCanTarget=true;");

//let gameEndFunction = newStr.match(`function ...\(\)\{var ...=\[arguments\];(.){0,50}if\(${varInGameEndFunction.substr(0, 3)}\[(\d){1,3}\]\)\{${varInGameEndFunction.substr(0, 3)}\[(\d){1,3}\]\[...\[(\d){1,3}\]\[(\d){1,3}\]\]\(\);${varInGameEndFunction.substr(0, 3)}\[(\d){1,3}\]\[...\[(\d){1,3}\]\[(\d){1,3}\]\]\(\);`)[0];
newStr=newStr.replace('function i5S(){', END_GAME);

// add particles to renderer
newStr = newStr.replace(`this.particleManager.render`, `${VARTOL_PARTICLES} this.particleManager.render`);