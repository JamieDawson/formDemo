var alanBtnInstance = alanBtn({
	key: "3707a2c791104a5a428ff564ba5a7a162e956eca572e1d8b807a3e2338fdd0dc/stage",
	onCommand: function (commandData) {
		if (commandData.state) {
			initStateAndRerender(commandData.state);
		}
		// if (commandData.command === "everythingIsFine") {
		// 	console.log(commandData.theList);
		// 	const checkGoodValues = commandData.theList;
		// 	selectAllGood(checkGoodValues);
		// }
		// if (commandData.command === "everythingIsBroken") {
		// 	selectAllBad();
		// }
		// if (commandData.command === "sendingSomeGood") {
		// 	selectSomeGood(
		// 		commandData.theList,
		// 		commandData.checkGoodValues,
		// 		commandData.checkBadValues
		// 	);
		// }
	},
	rootEl: document.getElementById("alan-btn"),
});
var initialData;
var statuses;
var inspectionState;
alanBtnInstance.callProjectApi("getInitialData", {}, (err, res) => {
	if (err) {
		console.error(`getInitialData error:`, err);
		return;
	}
	initStateAndRerender(res);
});

function initStateAndRerender(state) {
	initialData = state;
	statuses = initialData.statuses;
	inspectionState = initialData.inspectionDefaultState;
	console.log(`initialData: ${JSON.stringify(initialData)}`);
	console.log(`inspectionState: ${JSON.stringify(inspectionState)}`);
	render();
}

function createListeners() {
	inspectionState.sections.forEach((section, sectionIndex) => {
		section.elements.forEach((element, elementIndex) => {
			const okId = `#check-ok-${sectionIndex}-${elementIndex}`;
			const attentionId = `#check-attention-${sectionIndex}-${elementIndex}`;
			const problemId = `#check-problem-${sectionIndex}-${elementIndex}`;
			const e = element;
			$(okId).click(() => {
				checkOk(e);
				render();
			});
			$(attentionId).click(() => {
				checkAttention(e);
				render();
			});
			$(problemId).click(() => {
				checkProblem(e);
				render();
			});
		});
	});
}

function checkOk(element) {
	element.status = statuses.ok.value;
}

function checkAttention(element) {
	element.status = statuses.attention.value;
}

function checkProblem(element) {
	element.status = statuses.problem.value;
}

function isOk(element) {
	return element.status == statuses.ok.value;
}

function isAttention(element) {
	return element.status == statuses.attention.value;
}

function isProblem(element) {
	return element.status == statuses.problem.value;
}

function createHtml() {
	let html = "";
	html += "<table>";
	console.log(
		`createHtml: inspectionState: ${JSON.stringify(inspectionState)}`
	);
	inspectionState.sections.forEach((section, sectionIndex) => {
		console.log(`section.name: ${section.name}`);
		html += `<tr>
				<td colspan="5">${section.name}</td>
			</tr>`;
		section.elements.forEach((element, elementIndex) => {
			html += `<tr>
			<td id="check-ok-${sectionIndex}-${elementIndex}">[${
				isOk(element) ? "X" : " "
			}]</td>
			<td id="check-attention-${sectionIndex}-${elementIndex}">[${
				isAttention(element) ? "X" : " "
			}]</td>
			<td id="check-problem-${sectionIndex}-${elementIndex}">[${
				isProblem(element) ? "X" : " "
			}]</td>
			<td>${element.name}</td>
			<td></td>
		</tr>`;
		});
	});
	html += "</table>";
	// console.log(`html: ${html}`);
	return html;
}

function renderHtml(html) {
	document.getElementById("main").innerHTML = html;
	// var tree = document.createDocumentFragment();
	// var link = document.createElement("a");

	// link.setAttribute("id", "id1");
	// link.setAttribute("href", "http://site.com");
	// link.appendChild(document.createTextNode("linkText"));

	// var div = document.createElement("div");
	// div.setAttribute("id", "id2");
	// div.appendChild(document.createTextNode("divText"));

	// tree.appendChild(link);
	// tree.appendChild(div);
	// document.getElementById("main").appendChild(tree);
}

function render() {
	renderHtml(createHtml());
	createListeners();
}

$("#ok-element").click((eventData) => {
	console.log(`clicked`);
	// console.log(JSON.stringify(eventData));
	console.log($(this)[0].tagName);
	// console.log(`$(this): ${JSON.stringify($(this))}`);
});
