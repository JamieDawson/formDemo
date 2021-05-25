const data = project.data;

onCreateUser((p) => {
	p.userData.state = _.cloneDeep(data);
});

const elementPattern = _(data.inspectionDefaultState.sections)
	.map((s) => s.elements)
	.flatten()
	.map((e) => e.alternatives.map((a) => a + "~" + e.name))
	.flatten()
	.join("|");

const statusPattern = _(data.statuses)
	.map((s) => s.alternatives.map((a) => a + "~" + s.value))
	.flatten()
	.join("|");

console.log(`project.elements: ${JSON.stringify(project.elementPattern)}`);

intent(`$(ELEMENT ${elementPattern}) is $(STATUS ${statusPattern})`, (p) => {
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
	p.play({ state: p.userData.state });
	p.play(`setting ${p.ELEMENT.label} to ${p.STATUS.label}`);
});

projectAPI.getInitialData = (p, param, callback) => {
	callback(null, p.userData.state);
};
