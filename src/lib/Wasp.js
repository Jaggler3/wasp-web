/**
 * Wasp language implementation
 */

// Initialize a Variable object with a random ID
export class Variable {
	constructor() {
		this.value = undefined;
		this.ID = genID();
		this.isFunction = false;
	}
}

export const WaspGlobals = [
	true,
	false,
	0,
	1,
	10,
	" ",
	"\n",
	",",
	-1,
	10,
	2
]

const genID = () => {
	let id = "0x", range = "ABCDEFHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345";
	for (let i = 0; i < 6; i++) {
		id += range.charAt(Math.floor(Math.random() * range.length));
	}
	return id;
}

function Wasp({
	outstr
}) {
	let _ = this;
	this.artifacts = [
		"10",
		"#"
	]
	const execute = (script, context = {}) => {
		this.artifacts = this.artifacts.map(art => !isNaN(art) ? Number(art) : art)

		let vars = context.vars || [];
		let index = context.index === undefined ? -1 : context.index;
		let isRightSide = false; //right side
		let log = false; //print
		let op_a = false, op_m = false, op_d = false, op_t = false, op_b = false; //addition / minus / distance / multiply / break(divide) operations
		let idg = false; //id get
		let lov = false; //length operator value
		let coi = false; //close-out-if
		let hi = false, si = false, fi = false; //(have/start/false) if
		let fc = false; //function
		let nl = true; //new line
		let lc = false; //expecting loop condition
		let ld = "", lcd = ""; //loop (data/condition data
		let dt = false; //double times-symbols (meaning '')
		//let lst = -1;	//last index
		var InterpreterUtils = InterpreterUtils || {
			runLoop: function (condition) {
				let lastContext = execute(ld, { vars: vars, index: index });
				while (lastContext.vars[lastContext.index].value != condition) {
					execute(ld, { vars: vars, index: index });
				}
			},
			operation: function (right) {
				if (log) {
					outstr(right, nl);
					log = false;
				} else if (InterpreterUtils.ol(right)) {
				} else if (si) {
					si = false;
					if (op_d) {
						op_d = false;
						coi = vars[index].value - right <= 0;
						coi = fi ? !coi : coi;
					} else {
						coi = vars[index].value !== right;
						coi = fi ? !coi : coi;
					}
				} else if (lc) {
					lc = false;
					InterpreterUtils.runLoop(right);
				} else //(we are setting a var)
				{
					vars[index].value = right;
				}
			},
			ol: function (right) {
				var tv = vars[index].value;
				if (typeof tv === "undefined") { vars[index].value = right; return true; }
				var edc = 0;
				if (op_t) {
					if ((edc += tv.toString().indexOf(".")) === -1) {
						edc = 0;
					}
					if ((edc += right.toString().indexOf(".")) === -1) {
						edc = 0;
					}
				} else if (op_b) {
					if ((edc += tv.toString().indexOf(".")) === -1) {
						edc = 0;
					}
					if ((edc += (1 / right).toString().indexOf(".")) === -1) {
						edc = 0;
					}
				}
				if (typeof vars[index].value == "number" && !dt) {
					vars[index].value += op_a ? right : (op_m ? -right : 0);
					vars[index].value *= op_t ? right : (op_b ? 1 / right : 1);
				} else {
					vars[index].value = right > 0 ? vars[index].value.toString().repeat(op_t ? right : 1) : "";
					dt = false;
				}
				if (edc !== 0) {
					vars[index].value = Number(vars[index].value.toFixed(edc).toString());
				}
				var tmp = op_a || op_m || op_t || op_b; op_a = op_m = op_t = op_b = false;
				return tmp;
			}
		};

		let s = script.toString().split("");
		for (let i = 0; i < s.length; i++) {
			let c = s[i];
			if (coi && c !== "#") { continue; }
			if (c === "?") { index = 0; continue; };
			if (c === "/" && s[i + 1] === '/') //exit, also provides comments to end of input
			{
				return;
			} else if (c === "/") //restart function/program
			{
				execute(script, { vars: vars, index: index });
			} else if (c === "^") //loop
			{
				ld = script.substring(++i, script.indexOf("|", i));
				i += ld.length;
				lc = true;
			} else if (c === "#") {
				coi = hi ? false : coi;
				if (!hi) {
					if (s[i + 1] == "#") //not
					{
						fi = true;
						i++;
					}
					si = true;
					hi = true;
				} else {
					hi = false;
				}
			} else if (c === ";") {
				if (s[i + 1] === ">") //create new variable
				{
					var nv = new Variable();
					vars.push(nv);
					isRightSide = true;
					index = vars.length - 1;
					i++;
				} else if (s[i + 1] === "<") //delete current variable
				{
					vars.splice(index, 1);
					index += (index == 0 ? 0 : -1);
					i++;
				}
			} else if (c === "@") //accessing globals
			{
				var id = script.substring(++i, script.indexOf("|", i));
				i += id.length;
				InterpreterUtils.operation(lov ? (WaspGlobals[Number(id)] + "").length : WaspGlobals[Number(id)]);
				isRightSide = false;
				lov = idg = false;
			} else if (c === "_") //accessing an artifact
			{
				var id = script.substring(++i, script.indexOf("|", i));
				i += id.length;
				InterpreterUtils.operation(lov ? (_.artifacts[Number(id)] + "").length : _.artifacts[Number(id)]);
				isRightSide = false;
				lov = idg = false;
			} else if (c === "$") //accessing the current variable
			{
				if (fc) {
					fc = false;
					var pi = index;
					execute(vars[index].value, { vars: vars, index: index });
					index = pi;
				} else if (isRightSide) {
					InterpreterUtils.operation(idg ? vars[index].ID : (lov ? (vars[index].value + "").length : vars[index].value));
					lov = idg = false;
				} else {
					if (idg) {
						InterpreterUtils.operation(vars[index].ID);
						idg = false;
					} else if (lov) {
						InterpreterUtils.operation((vars[index].value + "").length);
						lov = false;
					} else {
						isRightSide = true;
					}
				}
			} else if (c === "+") //increment
			{
				isRightSide = op_a = s[i + 1] === "+";
				i += op_a ? 1 : 0;
				if (typeof vars[index].value == "number") { vars[index].value += !op_a ? 1 : 0; }
			} else if (c === "-") //decrement
			{
				isRightSide = op_m = s[i + 1] === "-";
				i += op_m ? 1 : 0;
				if (typeof vars[index].value == "number") { vars[index].value -= !op_m ? 1 : 0; }
			} else if (c === "'") //times
			{
				dt = op_t;
				isRightSide = op_t = true;
				//if(typeof vars[index].value == "number") { vars[index].value *= !op_t ? 1 : 0; }
			} else if (c === "\"") //break (divide)
			{
				isRightSide = op_b = true;
				//if(typeof vars[index].value == "number") { vars[index].value /= !op_b ? 1 : 0; }
			} else if (c === "~") //distance
			{
				isRightSide = op_d = true
			} else if (c === "!") //print out
			{
				isRightSide = true;
				log = true;
				nl = s[i + 1] !== "!";
				i += nl ? 0 : 1;
			} else if (c === "[") {
				var amt = 0;
				while (i <= s.length) {
					i++;
					if (s[i] != "]") {
						amt += s[i] === ">" ? 1 : -1;
					} else {
						if (fc) {
							execute(vars[index + amt].value, { vars: vars, index: index });
						} else if (lc) {
							InterpreterUtils.runLoop(vars[index + amt].value);
							index += amt;
						} else if (op_d && !si) {
							vars[index].value -= vars[index + amt].value;
							isRightSide = op_d = false;
						} else if ((op_d || op_t || op_m || op_a || op_b)) {
							if (lov) {
								console.log(index, amt);
							}
							InterpreterUtils.operation(idg ? vars[index + amt].ID : (lov ? (vars[index + amt].value + "").length : vars[index + amt].value));
						} else {
							index += amt;
						}
						fc = lc = false;
						break;
					}
				}
			} else if (c === "%") {
				idg = true;
			} else if (c === "=") {
				lov = true;
			} else if (c === "(") { // start of a function
				var func = script.substring(++i, script.indexOf(")", i));
				i += func.length;
				vars[index].value = func;
				vars[index].isFunction = true;
				isRightSide = false;
			} else if (c === "*") {
				fc = true;
			} else if (c === "&") {
				console.log(vars.length);
			}
		}

		return { vars: vars, index: index };
	}

	this.execute = execute;
}

export default Wasp;