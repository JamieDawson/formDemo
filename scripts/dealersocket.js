// Use this sample to create your own voice commands
const checkGoodValues = ["oil-good", "whipers-good", "cabin-good"];
const checkBadValues = ["oil-bad", "whipers-bad", "cabin-bad"];
const basicValues = ["oil", "whipers", "cabin"];

onCreateProject(() => {
	project.ALLVALUES = "oil|whipers|cabin";
});

function findGoodItems(items) {
	console.log("findGoodItems: " + items);
	let pushedGoodValues = [];
	for (var i = 0; i < basicValues.length - 1; i++) {
		if (basicValues.includes(items[i].value)) {
			//console.log(basicValues.findIndex(items[i].value))
			const indexHere = basicValues.findIndex(
				(goodValue) => goodValue === items[i].value
			);
			console.log(indexHere);
			pushedGoodValues.push(checkGoodValues[indexHere]);
		}
	}
	return pushedGoodValues;
}

intent(`$(B p:ALLVALUES) and $(B p:ALLVALUES|) are good`, (p) => {
	//console.log("Good values: " + p.B_[1]);
	let foundGoodValues = findGoodItems(p.B_);
	console.log("foundGoodValues DONE: " + foundGoodValues);
	p.play({ command: "testing", theList: foundGoodValues });
	p.play("Sending this");
});

intent("Everything is fine", (p) => {
	p.play({ command: "everythingIsFine", theList: checkGoodValues });
	p.play("Glad to hear it! I clicked all the green boxes!");
});

intent("Everything is broken", (p) => {
	p.play({ command: "everythingIsBroken" });
	p.play("Sorry to hear that! I clicked all the red boxes!");
});
