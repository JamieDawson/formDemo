const data = project.data;

onCreateUser((p) => {
	p.userData.state = _.cloneDeep(data); //Creates a clone of the data. Can call on it with userData.state
	//console.log(`project.elements ARE HERE: ${JSON.stringify(project.elementPattern)}`);
});

const elementPattern = _(data.inspectionDefaultState.sections)
	.map((s) => s.elements) //grab all items in elements
	.flatten() //make them one array
	.map((e) => e.alternatives.map((a) => a + "~" + e.name)) //grab names and alternatives
	.flatten() //make them one array
	.join("|"); //

const statusPattern = _(data.statuses)
	.map((s) => s.alternatives.map((a) => a + "~" + s.value))
	.flatten()
	.join("|");

console.log(
	`project.elements ARE HERE: ${JSON.stringify(project.elementPattern)}`
);

intent(`$(ELEMENT ${elementPattern}) is $(STATUS ${statusPattern})`, (p) => {
	console.log("elementPattern HERE: " + elementPattern);
	console.log("STATUS PATTERN HERE: " + statusPattern);
	console.log(`p.ELEMENT.value: ${p.ELEMENT.value}`);
	console.log(`p.ELEMENT.label: ${p.ELEMENT.label}`);
	console.log(`p.STATUS.value: ${p.STATUS.value}`);
	console.log(`p.STATUS.label: ${p.STATUS.label}`);

	const element = _(p.userData.state.inspectionDefaultState.sections)
		.map((s) => s.elements)
		.flatten()
		.filter((e) => e.name == p.ELEMENT.label)
		.first();
	element.status = p.STATUS.label;
	console.log("p.userData.state HERE: " + JSON.stringify(p.userData.state));
	p.play({ state: p.userData.state });
	p.play(`setting ${p.ELEMENT.label} to ${p.STATUS.label}`);
});

projectAPI.getInitialData = (p, param, callback) => {
	callback(null, p.userData.state);
};
