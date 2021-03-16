function createMacrosParams(macros) {
	console.log(macros);
	const macrosParams = {};

	createMacroParam("Fat", macros.Fat, macrosParams);
	createMacroParam("Protein", macros.Protein, macrosParams);
	createMacroParam("Carbs", macros.Carbohydrates, macrosParams);

	return macrosParams;
}

function createMacroParam(name, macro, macrosParams) {
	console.log(macro);
	if (macro.operator === "<" && macro.amount)
		macrosParams[`max${name}`] = macro.amount;
	if (macro.operator === ">" && macro.amount)
		macrosParams[`min${name}`] = macro.amount;
}

export default createMacrosParams;
