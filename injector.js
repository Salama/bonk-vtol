function VTOLinjector(str){
	newStr = str;
	
	/***CONSTANTS***/
	/***REPLACERS***/
	
	if(str === newStr) throw "Injection failed!";
	console.log("VTOL injector run");
	return newStr;
}

if(!window.bonkCodeInjectors)
window.bonkCodeInjectors = [];
window.bonkCodeInjectors.push(bonkCode => {
	try {
		return VTOLinjector(bonkCode);
	} catch (error) {
		alert(
`Whoops! VTOL was unable to load.
This may be due to an update to Bonk.io. If so, please report this error!
This could also be because you have an extension that is incompatible with \
VTOL, such as the Bonk Leagues Client. You would have to disable it to use \
VTOL.
		`);
		throw error;
	}
});

console.log("VTOL injector loaded");
