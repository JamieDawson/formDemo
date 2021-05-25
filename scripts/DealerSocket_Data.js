const STATUSES = {
	empty: {
		value: "empty",
		alternatives: ["reset", "clear"],
	},
	ok: {
		value: "ok",
		alternatives: ["ok", "good", "works"],
	},
	attention: {
		value: "attention",
		alternatives: ["attention"],
	},
	problem: {
		value: "problem",
		alternatives: ["problem", "broken"],
	},
};

const STATUS_EMPTY = STATUSES.empty.value;
const STATUS_OK = STATUSES.ok.value;
const STATUS_ATTENTION = STATUSES.attention.value;
const STATUS_PROBLEM = STATUSES.problem.value;

const INSPECTION_DEFAULT_STATE = {
	sections: [
		{
			name: "Scheduled maintanance",
			alternatives: ["maintanance"], //use this for section
			elements: [
				{
					name: "Oil Change / Filter",
					alternatives: ["oil", "oil filter"],
					status: STATUS_EMPTY,
				},
				{
					name: "Air Filter",
					alternatives: ["air filter"],
					status: STATUS_EMPTY, //STATUS_EMPTY
				},
			],
		},
		{
			name: "Brake system",
			elements: [
				{
					name: "Rotors / Drums",
					alternatives: ["rotors", "drums", "rotors and drums"],
					status: STATUS_EMPTY, //STATUS_EMPTY
				},
				{
					name: "Condition of Brake Linings",
					alternatives: ["brake linings"],
					status: STATUS_EMPTY, //STATUS_EMPTY
				},
			],
		},
	],
};

project.data = {
	statuses: STATUSES,
	statusEmpty: STATUS_EMPTY,
	statusOk: STATUS_OK,
	statusAttention: STATUS_ATTENTION,
	statusProblem: STATUS_PROBLEM,
	//TODO rename to inspectionList
	inspectionDefaultState: INSPECTION_DEFAULT_STATE,
};
