/* -------- Main Window -------- */

class MainWindow {
	constructor() {
		console.log(`${window.innerHeight}px`);
		console.log(`${window.innerWidth}px`);
		console.log(`${window.devicePixelRatio}`);
		
		this.innerHeight = window.innerHeight;
		this.innerWidth = window.innerWidth;
		this.devicePixelRatio = window.devicePixelRatio;
	}
}

let mainWindow = new MainWindow();


/* -------- Utility Functions -------- */

function wait(duration) {
	return new Promise((resolve, reject) => {setTimeout(resolve, duration)});
}

function disableScrolling() {
	document.body.classList.add("DisableScrolling");
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

	window.onscroll = function() {window.scrollTo(scrollLeft, scrollTop);};
}

function enableScrolling() {
	document.body.classList.remove("DisableScrolling");
	window.onscroll = function() {};
}


/* -------- Published -------- */

function publishedOnClick(eventObject) {
	const target = eventObject.target;
	target.style.color = "#551A8B";
	const id = target.id;
	indexAsString = id.split("-")[1];
	index = Number(indexAsString);

	disableScrolling();
	const newPunterPuzzle = new Puzzle(puzzleSpecs[index]);
	reconfigure(newPunterPuzzle);
	mainWall.show();	
	punter.solveBiz.wake();
	mainWall.showKeyboard();
	keyboard.enable();

}

class Published {
	constructor() {
		const publishedRef = document.querySelector("#iwTCPublishedPuzzles-2");
		for (let i = 0; i < puzzleSpecs.length; i++) {
			const puzzleSpec = puzzleSpecs[i];
			const puzzleRef = document.createElement("button");
			puzzleRef.id = "iwTCPublishedPuzzle-" + String(i);
			puzzleRef.type = "button";
			puzzleRef.style =
				"margin:0; padding:0.3em 0 0.3em 0; border:none; background-color:transparent; " +
				"box-sizing:border-box; width:12.5%; " +
				"font-size:1.7em; text-decoration-line:underline;";
			if (i == 0) {
				puzzleRef.style.color = "#551A8B";
			}
			else {
				puzzleRef.style.color = "#0000EE";
			}
			puzzleRef.append(String(puzzleSpec.number));
			puzzleRef.addEventListener("click", publishedOnClick);
			publishedRef.append(puzzleRef);
		}
	}
}


/* -------- Puzzle -------- */

class Puzzle {
	constructor(puzzleSpec) {
		this.number = puzzleSpec.number;
		this.publishedOn = puzzleSpec.publishedOn;
		this.words = puzzleSpec.words;
		this.hintSpec = puzzleSpec.hintSpec;
		this.featuredWordBlurb = puzzleSpec.featuredWordBlurb
	}
	
	deconstruct() {
	}
}


/* -------- Main Wall -------- */

const punterKeyboardOnClicks =
	[function() {punter.solveBiz.keyClicked("A")},
	 function() {punter.solveBiz.keyClicked("B")},
	 function() {punter.solveBiz.keyClicked("C")},
	 function() {punter.solveBiz.keyClicked("D")},
	 function() {punter.solveBiz.keyClicked("E")},
	 function() {punter.solveBiz.keyClicked("F")},
	 function() {punter.solveBiz.keyClicked("G")},
	 function() {punter.solveBiz.keyClicked("H")},
	 function() {punter.solveBiz.keyClicked("I")},
	 function() {punter.solveBiz.keyClicked("J")},
	 function() {punter.solveBiz.keyClicked("K")},
	 function() {punter.solveBiz.keyClicked("L")},
	 function() {punter.solveBiz.keyClicked("M")},
	 function() {punter.solveBiz.keyClicked("N")},
	 function() {punter.solveBiz.keyClicked("O")},
	 function() {punter.solveBiz.keyClicked("P")},
	 function() {punter.solveBiz.keyClicked("Q")},
	 function() {punter.solveBiz.keyClicked("R")},
	 function() {punter.solveBiz.keyClicked("S")},
	 function() {punter.solveBiz.keyClicked("T")},
	 function() {punter.solveBiz.keyClicked("U")},
	 function() {punter.solveBiz.keyClicked("V")},
	 function() {punter.solveBiz.keyClicked("W")},
	 function() {punter.solveBiz.keyClicked("X")},
	 function() {punter.solveBiz.keyClicked("Y")},
	 function() {punter.solveBiz.keyClicked("Z")}
	];

const mainWallSpec = {
	numGridRows: 69,
	numGridColumns: 65
};

class MainWall {
	constructor(mainWallSpec) {
		this.wallRef = document.querySelector("#mainWall");
		
		let innerDimension = 0
		let gridDimension = 0
		if ((mainWindow.innerHeight / mainWallSpec.numGridRows) <= (mainWindow.innerWidth / mainWallSpec.numGridColumns)) {
			innerDimension = mainWindow.innerHeight;
			gridDimension = mainWallSpec.numGridRows;
		}
		else {
			innerDimension = mainWindow.innerWidth;
			gridDimension = mainWallSpec.numGridColumns;
		}

		const percent = innerDimension / 100;
		let fontSize = 0;
		let reducingInnerDimension = innerDimension + 1;
		do {
			reducingInnerDimension = reducingInnerDimension - 1;
			fontSize = Math.trunc((reducingInnerDimension / gridDimension) * mainWindow.devicePixelRatio) / mainWindow.devicePixelRatio;
			console.log('mw fontSize', fontSize);
		} while ((innerDimension - (fontSize * gridDimension)) < (2 * percent));
		console.log('mw final fontSize', fontSize);
		this.wallRef.style.fontSize = `${fontSize}px`;
		this.fontSize = fontSize;
		
		const spareHeight = mainWindow.innerHeight - (this.fontSize * mainWallSpec.numGridRows);
		console.log('mw spareHeight', spareHeight);
		const deviceSpareHeight = spareHeight * mainWindow.devicePixelRatio;
		console.log('mw deviceSpareHeight', deviceSpareHeight);
		const roundedDeviceSpareHeight = Math.trunc(deviceSpareHeight / 2) * 2;
		console.log('mw roundedDeviceSpareHeight', roundedDeviceSpareHeight);
		const roundedSpareHeight = roundedDeviceSpareHeight / mainWindow.devicePixelRatio;
		console.log('mw roundedSpareHeight', roundedSpareHeight);
		this.topPosition = roundedSpareHeight / 2;
		this.wallRef.style.top = `${this.topPosition}px`;

		this.width = this.fontSize * mainWallSpec.numGridColumns
		const spareWidth = mainWindow.innerWidth - this.width;
		console.log('mw spareWidth', spareWidth);
		const deviceSpareWidth = spareWidth * mainWindow.devicePixelRatio;
		console.log('mw deviceSpareWidth', deviceSpareWidth);
		const roundedDeviceSpareWidth = Math.trunc(deviceSpareWidth / 2) * 2;
		console.log('mw roundedDeviceSpareWidth', roundedDeviceSpareWidth);
		const roundedSpareWidth = roundedDeviceSpareWidth / mainWindow.devicePixelRatio;
		console.log('mw roundedSpareWidth', roundedSpareWidth);
		this.leftPosition = roundedSpareWidth / 2;
		this.wallRef.style.left = `${this.leftPosition}px`;
	}

	show() {
		this.wallRef.style.display = `grid`;
	}

	hide() {
		this.wallRef.style.display = `none`;
	}

	addKeyboard() {
		keyboard.assign(punterKeyboardOnClicks);
		this.keyboardTopPosition = keyboard.mainTopPosition;
		this.keyboardWasEnabled = undefined;
	}
	
	showKeyboard() {
		keyboard.show(this.keyboardTopPosition);
	}
	
	saveKeyboardState() {
		this.keyboardWasEnabled = keyboard.isEnabled;
	}
	
	restoreKeyboardState() {
		keyboard.assign(punterKeyboardOnClicks);
		keyboard.show(this.keyboardTopPosition);		
		if (this.keyboardWasEnabled) {
			keyboard.enable();
		}
		else {
			keyboard.disable();
		}
	}	
	
	deconstruct() {
	}
}


/* -------- Info Wall -------- */

function backOnClick() {
	infoWall.hide();
	//disableScrolling();
	mainWall.restoreKeyboardState();
	mainWall.show();
	disableScrolling();
	}

function demonstrationOnClick () {
	demo.enter();
	}

class InfoWall {
	constructor(topPosition, leftPosition, fontSize, punterPuzzle) {
		this.wallRef = document.querySelector("#infoWall");

		this.wallRef.style.top = `${topPosition}px`;
		this.wallRef.style.left = `${leftPosition}px`;
		this.wallRef.style.fontSize = `${fontSize}px`;

		const puzzleDataRef = document.querySelector("#iwPuzzleData");
		puzzleDataRef.innerHTML = "<strong>Puzzle " + String(punterPuzzle.number) + "&emsp;&boxh;&emsp;published on " + punterPuzzle.publishedOn + "</strong>";

		const featuredWordRef = document.querySelector("#iwTCFeaturedWord");
		featuredWordRef.innerHTML = punterPuzzle.featuredWordBlurb;

		this.separator2Ref = document.querySelector("#iwSeparator-2");
		this.separator2TopPosition = undefined;

		this.controlBack = new Control("#iwCtrlBack", backOnClick);
		this.controlBack.enable();
		this.controlBack.unfade();		
		this.controlDemo = new Control("#iwdCtrlDemonstration", demonstrationOnClick);
		this.controlDemo.enable();
		this.controlDemo.unfade();
	}
	
	show() {
		this.wallRef.style.display = `grid`;
		const separator2Rect = this.separator2Ref.getBoundingClientRect();
		this.separator2TopPosition = separator2Rect.top;
		keyboard.hide();
	}

	hide() {
		this.wallRef.style.display = `none`;
	}
	
	deconstruct() {
		this.wallRef.style.display = `none`;
		this.controlDemo.deconstruct();
		this.controlBack.deconstruct();
	}
}


/* -------- Keyboard -------- */

class Key {
	constructor(id) {
		this.id = id;
		this.ref = document.querySelector(id);
		this.onClick = undefined;
		this.isEnabled = false;
	}

	assign(onClick) {
		this.onClick = onClick;
		this.isEnabled = true;
		this.disable();
		
	}
	
	enable() {
		if (!this.isEnabled) {
			this.ref.style.opacity = `1.0`;
			if (this.onClick != null) this.ref.addEventListener("click", this.onClick);
			this.isEnabled = true;
		}
	}
	
	disable() {
		if (this.isEnabled) {
			this.ref.style.opacity = `0.5`;
			if (this.onClick != null) this.ref.removeEventListener("click", this.onClick);
			this.isEnabled = false;
		}
	}
	
	deconstruct() {
		if (this.onClick != null) this.ref.removeEventListener("click", this.onClick);
	}
}

class Keyboard {
	constructor(leftKeyboardLeftPosition, rightKeyboardRightPosition) {
		this.leftRef = document.querySelector("#kbLeft");
		this.rightRef = document.querySelector("#kbRight");

		const numLetters = 13
		const minSpareHeight = 10;
		
		const fontSize = Math.trunc(((mainWindow.innerHeight - minSpareHeight) / numLetters) * mainWindow.devicePixelRatio) / mainWindow.devicePixelRatio;
		console.log('kb fontSize', fontSize);
		this.leftRef.style.fontSize = `${fontSize}px`;
		this.rightRef.style.fontSize = `${fontSize}px`;

		const spareHeight = mainWindow.innerHeight - (fontSize * numLetters);
		console.log('kb spareHeight', spareHeight);
		const deviceSpareHeight = spareHeight * mainWindow.devicePixelRatio;
		console.log('kb deviceSpareHeight', deviceSpareHeight);
		const roundedDeviceSpareHeight = Math.trunc(deviceSpareHeight / 2) * 2;
		console.log('kb roundedDeviceSpareHeight', roundedDeviceSpareHeight);
		const roundedSpareHeight = roundedDeviceSpareHeight / mainWindow.devicePixelRatio;
		console.log('kb roundedSpareHeight', roundedSpareHeight);
		this.mainTopPosition = roundedSpareHeight / 2;
		
		this.leftRef.style.left = `${leftKeyboardLeftPosition}px`;
		const rightKeyboardWidth = fontSize;
		this.rightRef.style.left = `${rightKeyboardRightPosition - rightKeyboardWidth}px`;
		
		this.keys = [];
		this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
		const keyIdRoot = "#kb-";
		for (let i = 0; i < this.letters.length; i++) {
			const keyId = keyIdRoot + this.letters[i];
			this.keys[i] = new Key(keyId);
		}
		
		this.isEnabled = false;
	}
	
	assign(onClicks) {
		for (let i = 0; i < this.keys.length; i++) {
			const onClick = onClicks == null ? null : onClicks[i];
			this.keys[i].assign(onClick);
		}
		this.isEnabled = false;
	}
	
	show(topPosition) {
		this.leftRef.style.display = `grid`;
		this.leftRef.style.top = `${topPosition}px`;
		this.rightRef.style.display = `grid`;
		this.rightRef.style.top = `${topPosition}px`;		
	}
	
	hide() {
		this.leftRef.style.display = `none`;
		this.rightRef.style.display = `none`;
	}

	enable() {
		if (!this.isEnabled) {
			for (let i = 0; i < this.keys.length; i++) {
				this.keys[i].enable();
			}
			this.isEnabled = true;
		}
	}
	
	disable() {
		if (this.isEnabled) {
			for (let i = 0; i < this.keys.length; i++) {
				this.keys[i].disable();
			}
			this.isEnabled = false;
		}
	}
	
	deconstruct() {
		for (let i = 0; i < this.letters.length; i++) {
			this.keys[i].deconstruct();
		}
	}
}


/* -------- Cross/Tick -------- */

function crossTickFlashed(solveBiz) {solveBiz.unfreeze()}

async function flashCrossTick(crossTickRef, solveBiz) {
	await wait(300);
	crossTickRef.style.display = `none`;
	await wait(300);
	crossTickRef.style.display = `block`;
	await wait(300);
	crossTickRef.style.display = `none`;
	await wait(300);
	crossTickRef.style.display = `block`;
	crossTickFlashed(solveBiz)
}

class CrossTick {
	constructor(crossTickId) {
		this.ref = document.querySelector(crossTickId);
	}
	
	showTick(solveBiz) {
		this.ref.innerHTML = "<strong>&check;</strong>"
		this.ref.style.display = `block`;
		flashCrossTick(this.ref, solveBiz);
	}

	showTickQuery(solveBiz) {
		this.ref.innerHTML = "<strong>&check;</strong><sub>?</sub>"
		this.ref.style.display = `block`;
		flashCrossTick(this.ref, solveBiz);
	}
	
	showCross(solveBiz) {
		this.ref.innerHTML = "<strong>&cross;</strong>"
		this.ref.style.display = `block`;
		flashCrossTick(this.ref, solveBiz);
	}
	
	hide() {
		this.ref.style.display = `none`;
	}
	
	deconstruct() {
		this.ref.style.display = `none`;
	}
}


/* -------- Diamonds -------- */

class Diamonds {
	constructor(diamondIdRoot) {
		this.goodRefs = [[], [], []];
		this.badRefs = [[], [], []];
		for (let rung = 0; rung <= 2; rung++) {
			for (let position = 0; position < 5; position++) {
				const goodId = diamondIdRoot + "Good-" + String(rung + 1) + String(position + 1);
				const badId = diamondIdRoot + "Bad-" + String(rung + 1) + String(position + 1);
				this.goodRefs[rung][position] = document.querySelector(goodId);
				this.badRefs[rung][position] = document.querySelector(badId);
			}
		}
	}
	
	showGood(rung, position) {
		this.badRefs[rung][position].style.display = `none`;
		this.goodRefs[rung][position].style.display = `block`;
	}

	showBad(rung, position) {
		this.goodRefs[rung][position].style.display = `none`;
		this.badRefs[rung][position].style.display = `block`;
	}
	
	hide(rung, position) {
		this.goodRefs[rung][position].style.display = `none`;
		this.badRefs[rung][position].style.display = `none`;
	}
	
	hideAll() {
		for (let rung = 0; rung <= 2; rung++) {
			for (let position = 0; position < 5; position++) {
				this.hide(rung, position);
			}
		}		
	}
	
	deconstruct() {
		for (let rung = 0; rung <= 2; rung++) {
			for (let position = 0; position < 5; position++) {
				this.goodRefs[rung][position].style.display = `none`;
				this.badRefs[rung][position].style.display = `none`;
			}
		}
	}
}


/* -------- Words -------- */

class Word {
	constructor(letterIdRoot) {	
		this.letterRefs = [];
		for (let i = 0; i < 5; i++) {
			const letterId = letterIdRoot + String(i + 1);
			this.letterRefs[i] = document.querySelector(letterId);
		}
		
		this.letters = [undefined, undefined, undefined, undefined, undefined];
		this.position = 0;
	}
	
	refresh() {
		for (let i = 0; i < 5; i++) {
			const text = this.letters[i] == undefined ? "&InvisibleTimes;" : this.letters[i];
			this.letterRefs[i].innerHTML = text;
		}
	}
	
	addLetter(letter) {
		this.letters[this.position] = letter;
		this.position++;
	}
	
	removeLetter() {
		this.position--;
		this.letters[this.position] = undefined;
	}
	
	setLetter(letter, position) {
		this.letters[position] = letter;
	}
	
	unsetLetter(position) {
		this.letters[position] = undefined;
	}
	
	reset() {
		for (let i = 0; i < this.letters.length; i++) {
			this.letters[i] = undefined;
		}
		this.position = 0;
	}

	getLetter(position) {
		return this.letters[position];
	}

	getNextLetterPosition() {
		return this.position;
	}
	
	isEmpty() {
		return this.position == 0;
	}
	
	isComplete() {
		return this.position == 5;
	}
	
	deconstruct() {
		for (let i = 0; i < 5; i++) {
			this.letterRefs[i].innerHTML = "&InvisibleTimes;";
		}
	}
}


/* -------- Cursor -------- */

class Cursor {
	constructor(cursorIdRoot) {
		this.wordNum = undefined;
		this.position = undefined;
		this.isShowing = false;

		this.refs = [undefined, [], []];
		for (let wordNum = 1; wordNum <= 2; wordNum++) {
			for (let position = 0; position <= 5; position++) {
				const id = cursorIdRoot + String(wordNum + 1) + String(position + 1);
				this.refs[wordNum][position] = document.querySelector(id);
			}
		}
	}
	
	hide() {
		this.isShowing = false;
	}
	
	show() {
		this.isShowing = true;
	}
	
	setWordNum(wordNum) {
		this.wordNum = wordNum;
	}

	getWordNum() {
		return this.wordNum;
	}
	
	setPosition(position) {
		this.position = position;
	}
	
	getPosition() {
		return this.position;
	}
	
	refresh() {
		for (let wordNum = 1; wordNum <= 2; wordNum++) {
			for (let position = 0; position <= 5; position++) {
				if (this.isShowing && wordNum == this.wordNum && position == this.position) {
					this.refs[wordNum][position].style.display = `block`;
				}
				else {
					this.refs[wordNum][position].style.display = `none`;
				}
			}
		}
	}
	
	deconstruct() {
		for (let wordNum = 1; wordNum <= 2; wordNum++) {
			for (let position = 0; position <= 5; position++) {
				this.refs[wordNum][position].style.display = `none`;
			}
		}
	}
}


/* -------- Controls -------- */

class Control {
	constructor(id, onClick, onHover) {
	this.id = id;
	this.onClick = onClick;
	this.onHover = onHover;
	this.ref = document.querySelector(id);
	this.isEnabled = false;
	this.isFrozen = false;
	this.wasEnabledBeforeFreeze = undefined;
	}

	enable() {
		if (this.isFrozen) return;
		if (!this.isEnabled) {
			if (this.OnClick !== null) this.ref.addEventListener("click", this.onClick);
			this.isEnabled = true;
			
			if (this.onHover != null) {
				const classList = this.ref.classList;
				classList.remove(this.onHover + "Disabled");
				classList.add(this.onHover + "Enabled");
			}
		}
	}
	
	disable() {
		if (this.isFrozen) return;
		if (this.isEnabled) {
			if (this.OnClick !== null) {
				this.ref.removeEventListener("click", this.onClick);
			}
			this.isEnabled = false;

			if (this.onHover != null) {
				const classList = this.ref.classList;
				classList.remove(this.onHover + "Enabled");
				classList.add(this.onHover + "Disabled");
			}
		}
	}

	fade() {
		if (this.isFrozen) return;
		this.ref.style.opacity = `0.5`;
	}
	
	unfade() {
		if (this.isFrozen) return;
		this.ref.style.opacity = `1.0`;
	}
	
	freeze() {
		if (this.isFrozen) return;
		this.wasEnabledBeforeFreeze = this.isEnabled;
		if (this.isEnabled) {
			this.ref.removeEventListener("click", this.onClick);
			this.isEnabled = false;
		}
		this.isFrozen = true;
	}
	
	unfreeze() {
		this.isEnabled = this.wasEnabledBeforeFreeze;
		if (this.isEnabled) {
			if (this.OnClick !== null) this.ref.addEventListener("click", this.onClick);
		}
		this.isFrozen = false;
	}
	
	deconstruct() {
		this.ref.removeEventListener("click", this.onClick);
	}
}


/* -------- Solve -------- */

class SolveIO {
	constructor(controls, crossTick) {
	this.controls = controls;
	this.crossTick = crossTick;
	}

	disableAllControls() {
		for (let name in this.controls) {
			this.controls[name].disable();
			this.controls[name].fade();
		}
	}

	disableControls(controls) {
		for (let name of controls) {
			this.controls[name].disable();
			this.controls[name].fade();
		}
	}
	
	enableAllControls() {
		for (let name in this.controls) {
			this.controls[name].enable();
			this.controls[name].unfade();
		}
	}

	enableControls(controls) {
		for (let name of controls) {
			this.controls[name].enable();
			this.controls[name].unfade();
		}
	}
	
	enableAllControlsExcept(exceptions) {
		for (let name in this.controls) {
			if (!exceptions.includes(name)) {
				this.controls[name].enable();
				this.controls[name].unfade();
			}
			else {
				this.controls[name].disable();
				this.controls[name].fade();
			}
		}
	}
	
	freezeAllControls() {
		for (let name in this.controls) {
			this.controls[name].freeze();
		}
	}
	
	unfreezeAllControls() {
		for (let name in this.controls) {
			this.controls[name].unfreeze();
		}
	}
		
	hideCrossTick() {
		this.crossTick.hide();
	}
	
	showTick(solveBiz) {
		this.crossTick.showTick(solveBiz);
	}

	showTickQuery(solveBiz) {
		this.crossTick.showTickQuery(solveBiz);
	}
	
	showCross(solveBiz) {
		this.crossTick.showCross(solveBiz);
	}
	
	deconstruct() {
	}
}

class SolveBiz {	
	constructor(puzzle, words, diamonds, cursor, io) {
		this.puzzle = puzzle;
		this.words = words;
		this.diamonds = diamonds;
		this.cursor = cursor;
		this.io = io;

		for (let p = 0; p < 5; p++) {
			this.words[0].addLetter(this.puzzle.words[0][p]);
			this.words[3].addLetter(this.puzzle.words[3][p]);
		}
		for (let w = 0; w < 4; w++) this.words[w].refresh();

		this.cursor.setWordNum(1);
		this.cursor.setPosition(0);
		this.cursorSavedPosition = 0;
		
		this.diamondCounts = [undefined, undefined, undefined];

		this.hintWord = this.words[this.puzzle.hintSpec[0]];
		this.hintPosition = this.puzzle.hintSpec[1];
		this.hintLetter = this.puzzle.hintSpec[2];
		this.hintTimer = undefined;
		this.hintNumShows = 3;
		this.hintNumShowsRemaining = undefined;
		this.hintShowing = undefined;

		this.solutionLetters = [];
		for (let i = 0; i < 5; i++) this.solutionLetters.push(puzzle.words[1][i]);
		for (let i = 0; i < 5; i++) this.solutionLetters.push(puzzle.words[2][i]);
		this.solutionPositions = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4]];
		this.solutionDelays = [500, 500, 500, 500, 1000, 500, 500, 500, 500, 500];
		this.solutionNextIndex = undefined;

		this.callbackResolve = undefined;

		this.sleep();
	}
	
	sleep() {
		this.cursor.hide();
		this.cursor.refresh();
		this.io.disableAllControls();
	}
	
	wake() {
		this.cursor.show();
		this.cursor.refresh();
		this.io.enableAllControlsExcept(["Reset", "BackDelete", "BackDeleteAll", "UpperWord"]);
	}
	
	freeze() {
		this.io.freezeAllControls();
	}
	
	unfreeze() {
		this.io.unfreezeAllControls();
	}

	reset() {
		this.words[1].reset();
		this.words[1].refresh();
		this.words[2].reset();
		this.words[2].refresh();
		this.cursor.setWordNum(1);
		this.cursor.setPosition(0);
		this.cursor.refresh();
		this.diamonds.hideAll();
		this.io.hideCrossTick();
	}

	assessWords() {
		for (let i = 0; i < this.diamondCounts.length; i++) {
			if (this.diamondCounts[i] != 2) {
				console.log("show cross");
				this.freeze();
				this.io.showCross(this);
				return;
			}
		}
		let letters1 = [];
		let letters2 = [];
		for (let position = 0; position < 5; position++) {
			letters1[position] = this.words[1].getLetter(position);
			letters2[position] = this.words[2].getLetter(position);
		}
		if (letters1.join('') == this.puzzle.words[1] && letters2.join('') == this.puzzle.words[2]) {
			console.log("show tick");
			this.io.disableControls(["BackDelete", "BackDeleteAll"]);
			this.cursor.hide();
			this.cursor.refresh();
			this.freeze();
			this.io.showTick(this);
		}
		else {
			console.log("show tick ?");
			this.freeze();
			this.io.showTickQuery(this);
		}
	}

	updateRungDiamonds(rung) {
		let diamondCount = 0;
		for (let position = 0; position < 5; position++) {
			const letterAbove = this.words[rung].getLetter(position);
			const letterBelow = this.words[rung + 1].getLetter(position);
			if (letterAbove == undefined || letterBelow == undefined) continue;
			if (letterAbove != letterBelow) diamondCount++;
		}
		for (let position = 0; position < 5; position++) {
			const letterAbove = this.words[rung].getLetter(position);
			const letterBelow = this.words[rung + 1].getLetter(position);
			if (letterAbove == undefined || letterBelow == undefined) {
				this.diamonds.hide(rung, position);
			}
			else if (letterAbove == letterBelow) {
				this.diamonds.hide(rung, position);
			}
			else if (diamondCount <= 2) {
				this.diamonds.showGood(rung, position);
			}
			else {
				this.diamonds.showBad(rung, position);
			}
		}
		return diamondCount;
	}
	
	updateAllDiamonds() {
		this.diamondCounts[0] = this.updateRungDiamonds(0);
		this.diamondCounts[1] = this.updateRungDiamonds(1);
		this.diamondCounts[2] = this.updateRungDiamonds(2);
	}

	review(doAssessment) {
		if (this.words[1].isEmpty() && this.words[2].isEmpty()) {
			this.io.disableControls(["Reset"]);
		}
		else {
			this.io.enableControls(["Reset"]);
		}
			
		const cursorPosition = this.cursor.getPosition();
		if (cursorPosition == 0) {
			this.io.disableControls(["BackDelete", "BackDeleteAll"]);
		}
		else {
			this.io.enableControls(["BackDelete", "BackDeleteAll"]);
		}
		if (cursorPosition == 5) {
			keyboard.disable();
		}
		else {
			keyboard.enable();
		}
		
		this.updateAllDiamonds();
		
		if (this.words[1].isComplete() && this.words[2].isComplete()) {
			if (doAssessment) this.assessWords();
		}
		else {
			this.io.hideCrossTick();
		}
	}

	resetClicked() {
		this.cursor.show();
		this.reset();
		keyboard.enable();
		this.io.enableAllControlsExcept(["Reset", "BackDelete", "BackDeleteAll", "UpperWord"]);
	}

	upperWordClicked() {
		console.log("upperWordClicked");
		this.cursor.setWordNum(1);
		this.cursor.setPosition(this.words[1].getNextLetterPosition());
		this.cursor.refresh();
		this.review(false);
		this.io.disableControls(["UpperWord"]);
		this.io.enableControls(["LowerWord"]);
	}

	lowerWordClicked() {
		console.log("lowerWordClicked");
		this.cursor.setWordNum(2);
		this.cursor.setPosition(this.words[2].getNextLetterPosition());
		this.cursor.refresh();
		this.review(false);
		this.io.disableControls(["LowerWord"]);
		this.io.enableControls(["UpperWord"]);
	}
	
	keyClicked(letter) {
		const wordNum = this.cursor.getWordNum();
		const word = this.words[wordNum];
		word.addLetter(letter);
		word.refresh();
		const position = this.cursor.getPosition();
		this.cursor.setPosition(position + 1);
		this.cursor.refresh();
		this.review(true);
	}
	
	backDeleteClicked() {
		const wordNum = this.cursor.getWordNum();
		const word = this.words[wordNum];
		word.removeLetter();
		word.refresh();
		const position = this.cursor.getPosition();
		this.cursor.setPosition(position - 1);
		this.cursor.refresh();
		this.review(true);
	}
	
	backDeleteAllClicked() {
		const wordNum = this.cursor.getWordNum();
		const word = this.words[wordNum];
		word.reset();
		word.refresh();
		this.cursor.setPosition(0);
		this.cursor.refresh();
		this.review(true);
	}

	hintTimerExpired() {
		if (this.hintShowing) {
			this.hintWord.unsetLetter(this.hintPosition);
			this.hintWord.refresh();
			this.hintShowing = false;
			this.hintNumShowsRemaining--;
			if (this.hintNumShowsRemaining == 0) {
				keyboard.enable();
				this.io.enableAllControlsExcept(["Reset", "BackDelete", "BackDeleteAll", "UpperWord"]);
				this.cursor.show();
				this.cursor.refresh();
				return;
			}
		}
		else {
			this.hintWord.setLetter(this.hintLetter, this.hintPosition);
			this.hintWord.refresh();
			this.hintShowing = true;
		}
		setTimeout(punterHintTimerExpired, 1000);
	}

	hintClicked() {
		keyboard.disable();
		this.io.disableAllControls();
		this.cursor.hide();
		this.cursor.refresh();
		this.io.hideCrossTick();
		if (this.words[1].isEmpty() && this.words[2].isEmpty() && this.cursor.getWordNum() == 1) {
			this.hintWord.setLetter(this.hintLetter, this.hintPosition);
			this.hintWord.refresh();
			this.hintShowing = true;
			this.hintNumShowsRemaining = this.hintNumShows;
		}
		else {
			this.reset();
			this.hintShowing = false;
			this.hintNumShowsRemaining = this.hintNumShows;
		}
		setTimeout(punterHintTimerExpired, 1000);
	}

	hintWithCallbackTimerExpired() {
		if (this.hintShowing) {
			this.hintWord.unsetLetter(this.hintPosition);
			this.hintWord.refresh();
			this.hintShowing = false;
			this.hintNumShowsRemaining--;
			if (this.hintNumShowsRemaining == 0) {
				keyboard.enable();
				this.io.enableAllControlsExcept(["Reset", "BackDelete", "BackDeleteAll", "UpperWord"]);
				this.cursor.show();
				this.cursor.refresh();
				this.callbackResolve();
				return;
			}
		}
		else {
			this.hintWord.setLetter(this.hintLetter, this.hintPosition);
			this.hintWord.refresh();
			this.hintShowing = true;			
		}
		setTimeout(demoHintTimerExpired, 1000);
	}

	hintWithCallback() {
		return new 	Promise((resolve, reject) => {
							this.callbackResolve = resolve;
							keyboard.disable();
							this.io.disableAllControls();
							this.cursor.hide();
							this.cursor.refresh();
							this.hintWord.setLetter(this.hintLetter, this.hintPosition);
							this.hintWord.refresh();
							this.hintShowing = true;
							this.hintNumShowsRemaining = this.hintNumShows;
							setTimeout(demoHintTimerExpired, 1000);
						}
					);
	}

	solutionTimerExpired() {
		this.solutionNextIndex++;
		if (this.solutionNextIndex == 10) {
			this.io.enableControls(["Information", "Reset"]);
			return;
		}
		const position = this.solutionPositions[this.solutionNextIndex];
		const word = this.words[position[0]];
		word.setLetter(this.solutionLetters[this.solutionNextIndex], position[1]);
		word.refresh();
		this.updateAllDiamonds();
		setTimeout(punterSolutionTimerExpired, this.solutionDelays[this.solutionNextIndex]);
	}

	solutionClicked() {
		keyboard.disable();
		this.io.disableAllControls();
		this.cursor.hide();
		this.cursor.refresh();
		this.io.hideCrossTick();
		this.solutionNextIndex = -1;
		if (this.words[1].isEmpty() && this.words[2].isEmpty()) {
			setTimeout(punterSolutionTimerExpired, 500);
		}
		else {
			this.reset();
			setTimeout(punterSolutionTimerExpired, 750);
		}
	}

	solutionWithCallbackTimerExpired() {
		this.solutionNextIndex++;
		if (this.solutionNextIndex == 10) {
			this.io.enableControls(["Information", "Reset"]);
			this.callbackResolve();
			return;
		}
		const position = this.solutionPositions[this.solutionNextIndex];
		const word = this.words[position[0]];
		word.setLetter(this.solutionLetters[this.solutionNextIndex], position[1]);
		word.refresh();
		this.updateAllDiamonds();
		setTimeout(demoSolutionTimerExpired, this.solutionDelays[this.solutionNextIndex]);
	}

	solutionWithCallback() {
		return new 	Promise((resolve, reject) => {
							this.callbackResolve = resolve;
							keyboard.disable();
							this.io.disableAllControls();
							this.cursor.hide();
							this.cursor.refresh();
							this.solutionNextIndex = -1;
							setTimeout(demoSolutionTimerExpired, 500);
							}
					);
	}
	
	deconstruct() {
	}
}


/* -------- Punter -------- */

function punterInformationOnClick() {
	mainWall.saveKeyboardState();
	mainWall.hide();
	infoWall.show();
	enableScrolling();
}

function punterUpperWordOnClick() {punter.solveBiz.upperWordClicked();};
function punterLowerWordOnClick() {punter.solveBiz.lowerWordClicked();};
function punterHintOnClick() {punter.solveBiz.hintClicked();};
function punterHintTimerExpired() {punter.solveBiz.hintTimerExpired();};
function punterSolutionOnClick() {punter.solveBiz.solutionClicked();};
function punterSolutionTimerExpired() {punter.solveBiz.solutionTimerExpired();}
function punterResetOnClick() {punter.solveBiz.resetClicked();};
function punterBackDeleteOnClick() {punter.solveBiz.backDeleteClicked();};
function punterBackDeleteAllOnClick() {punter.solveBiz.backDeleteAllClicked();};

class Punter {
	constructor(puzzle) {
		this.puzzle = puzzle;

		const letterIdRoot = "#mwdpLetter-"
		this.words = [];
		for (let w = 0; w < 4; w++) {
			this.words[w] = new Word(letterIdRoot + String(w + 1));
		}
		
		this.diamonds = new Diamonds("#mwdpDiamond");
		
		this.cursor = new Cursor("#mwdpCursor-");
		
		this.controls = [];
		this.controls["UpperWord"] = new Control("#mwdpUpperWord", punterUpperWordOnClick, "UpperLowerWord");
		this.controls["LowerWord"] = new Control("#mwdpLowerWord", punterLowerWordOnClick, "UpperLowerWord");
		this.controls["Information"] = new Control("#mwdCtrlInformation", punterInformationOnClick, null);
		this.controls["Hint"] = new Control("#mwdCtrlHint", punterHintOnClick, null);
		this.controls["Solution"] = new Control("#mwdCtrlSolution", punterSolutionOnClick, null);
		this.controls["Reset"] = new Control("#mwdCtrlReset", punterResetOnClick, null);
		this.controls["BackDelete"] = new Control("#mwdCtrlBackDelete", punterBackDeleteOnClick, null);
		this.controls["BackDeleteAll"] = new Control("#mwdCtrlBackDeleteAll", punterBackDeleteAllOnClick, null);

		this.crossTick = new CrossTick("#mwCrossTick");
		this.solveIO = new SolveIO(this.controls, this.crossTick);	

		this.solveBiz = new SolveBiz(this.puzzle, this.words, this.diamonds, this.cursor, this.solveIO);
	}
	
	deconstruct() {
		this.solveBiz.deconstruct();
		this.solveIO.deconstruct();
		this.crossTick.deconstruct();
		
		for (let control in this.controls) {
			this.controls[control].deconstruct();
		}
		
		this.cursor.deconstruct();
		this.diamonds.deconstruct();

		for (let w = 0; w < 4; w++) {
			this.words[w].deconstruct();
		}
	}
}


/* -------- Demo -------- */

function demoHintTimerExpired() {demo.solveBiz.hintWithCallbackTimerExpired();};
function demoSolutionTimerExpired() {demo.solveBiz.solutionWithCallbackTimerExpired();}

class Demo {
	constructor() {
		const puzzleSpec = {
			number: undefined,
			solveBy: undefined,
			words: ["GREEN", "GREBE", "BRIBE", "BAIZE"],
			hintSpec: [2, 2, "I"]
		};
		this.puzzle = new Puzzle(puzzleSpec);

		const letterIdRoot = "#iwdpLetter-"
		this.words = [];
		for (let w = 0; w < 4; w++) {
			this.words[w] = new Word(letterIdRoot + String(w + 1));
		}
		
		this.diamonds = new Diamonds("#iwdpDiamond");
		
		this.cursor = new Cursor("#iwdpCursor-");
		
		this.controls = [];
		this.controls["UpperWord"] = new Control("#iwdpUpperWord", null, null);
		this.controls["LowerWord"] = new Control("#iwdpLowerWord", null, null);
		this.controls["Information"] = new Control("#iwdCtrlInformation", null, null);
		this.controls["Hint"] = new Control("#iwdCtrlHint", null, null);
		this.controls["Solution"] = new Control("#iwdCtrlSolution", null, null);
		this.controls["Reset"] = new Control("#iwdCtrlReset", null, null);
		this.controls["BackDelete"] = new Control("#iwdCtrlBackDelete", null, null);
		this.controls["BackDeleteAll"] = new Control("#iwdCtrlBackDeleteAll", null, null);

		this.crossTick = new CrossTick("#iwdCrossTick");
		this.solveIO = new SolveIO(this.controls, this.crossTick);	

		this.solveBiz = new SolveBiz(this.puzzle, this.words, this.diamonds, this.cursor, this.solveIO);
	}
	
	enter() {
		infoWall.controlBack.disable();
		infoWall.controlBack.fade();
		infoWall.controlDemo.disable();
		infoWall.controlDemo.fade();
		
		infoWall.separator2Ref.scrollIntoView({behavior:"smooth"});
		
		keyboard.assign(null);
		keyboard.show(infoWall.separator2TopPosition);
		keyboard.enable();
		
		demoExecuteScript();
	}
	
	exit() {
		infoWall.controlBack.enable();
		infoWall.controlBack.unfade();
		infoWall.controlDemo.enable();
		infoWall.controlDemo.unfade();
		
		window.scrollTo({top:0, left:0, behavior:"smooth"});
	}

	deconstruct() {
		this.solveBiz.deconstruct();
		this.solveIO.deconstruct();
		this.crossTick.deconstruct();
		
		for (let control in this.controls) {
			this.controls[control].deconstruct();
		}
		
		this.cursor.deconstruct();
		this.diamonds.deconstruct();

		for (let w = 0; w < 4; w++) {
			this.words[w].deconstruct();
		}

		this.puzzle.deconstruct();
	}
}

const demoScript =
	["Pause",
	 "Pause",
	 "L",
	 "Pause",
	 "M",
	 "Pause",
	 "N",
	 "Pause",
	 "Pause",
	 "BackDelete",
	 "Pause",
	 "BackDelete",
	 "Pause",
	 "BackDelete",
	 "Pause",
	 "Pause",
	 "B",
	 "Pause",
	 "R",
	 "Pause",
	 "E",
	 "Pause",
	 "E",
	 "Pause",
	 "D",
	 "Pause",
	 "Pause",
	 "LowerWord",
	 "Pause",
	 "B",
	 "Pause",
	 "R",
	 "Pause",
	 "I",
	 "Pause",
	 "B",
	 "Pause",
	 "E",
	 "Pause",
	 "Pause",
	 "Pause",
	 "Pause",
	 "UpperWord",
	 "Pause",
	 "Pause",
	 "BackDeleteAll",
	 "Pause",
	 "Pause",
	 "G",
	 "Pause",
	 "R",
	 "Pause",
	 "E",
	 "Pause",
	 "B",
	 "Pause",
	 "E",
	 "Pause",
	 "Pause",
	 "Pause",
	 "Pause",
	 "Reset",
	 "Pause",
	 "Pause",
	 "Hint",
	 "Pause",
	 "Pause",
	 "Solution",
	];

function demoShowSpot(spotRef, opacity) {
	spotRef.style.display = `block`;
	spotRef.style.opacity = `${opacity}`;
	}
	
function demoHideSpot(spotRef) {
	spotRef.style.display = `none`;
	}

async function demoExecuteScript() {
	let spotRefLookUp = [];
	const iwdControls = ["Hint", "Solution", "Reset", "BackDelete", "BackDeleteAll"]
	for (let control of iwdControls) spotRefLookUp[control] = document.querySelector("#iwdSpot" + control);
	const iwdpControls = ["UpperWord", "LowerWord"];
	for (let control of iwdpControls) spotRefLookUp[control] = document.querySelector("#iwdpSpot" + control);
	const kbLetters = ["B", "D", "E", "G", "I", "L", "M", "N", "R"];
	for (let letter of kbLetters) spotRefLookUp[letter] = document.querySelector("#kbSpot-" + letter);
	
	const spotFadeSequence = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4];

	//waiting for smooth scroll to complete
	await wait(1000);
	disableScrolling();
	
	demo.solveBiz.wake();
	await wait(1000);
	for (let command of demoScript) {
		if (command === "Pause") {
			await wait(500);
			continue;
		}
		const control = command;
		const spotRef = spotRefLookUp[control];
		for (let opacity of spotFadeSequence) {
			demoShowSpot(spotRef, opacity);
			await wait(100);
		}
		
		switch(control) {
		case "Hint":
			await demo.solveBiz.hintWithCallback();
			break;
		case "Solution":
			await demo.solveBiz.solutionWithCallback();
			break;
		case "Reset":
			demo.solveBiz.resetClicked();
			break;
		case "BackDelete":
			demo.solveBiz.backDeleteClicked();
			break;
		case "BackDeleteAll":
			demo.solveBiz.backDeleteAllClicked();
			break;
		case "UpperWord":
			demo.solveBiz.upperWordClicked();
			break;
		case "LowerWord":
			demo.solveBiz.lowerWordClicked();
			break;
		default:
			demo.solveBiz.keyClicked(control);
			break;
		}
		
		demoHideSpot(spotRef);
		await wait(1000);
	}
	
	await wait(1500);
	demo.solveBiz.reset();
	demo.solveBiz.sleep();	
	keyboard.hide()
	
	await wait(1000);
	enableScrolling();
	demo.exit();
}


/* -------- Configuration -------- */

let mainWall = undefined;
let punter = undefined;
let infoWall = undefined;
let demo = undefined;
let keyboard = undefined;

function configure() {
	const punterPuzzle = new Puzzle(puzzleSpecs[0]);
	mainWall = new MainWall(mainWallSpec);
	punter = new Punter(punterPuzzle);
	infoWall = new InfoWall(mainWall.topPosition, mainWall.leftPosition, mainWall.fontSize, punterPuzzle);
	demo = new Demo();
	keyboard = new Keyboard(mainWall.leftPosition, mainWall.leftPosition + mainWall.width);
	mainWall.addKeyboard();
}


function reconfigure(punterPuzzle) {
	//keyboard.deconstruct();
	//demo.deconstruct();
	infoWall.deconstruct();
	punter.deconstruct();
	//mainWall.deconstruct();
	//mainWall = new MainWall(mainWallSpec);
	punter = new Punter(punterPuzzle);
	infoWall = new InfoWall(mainWall.topPosition, mainWall.leftPosition, mainWall.fontSize, punterPuzzle);
	//demo = new Demo();		
	//keyboard = new Keyboard(mainWall.leftPosition, mainWall.leftPosition + mainWall.width);
	//mainWall.addKeyboard();
}


/* -------- Begin -------- */

const published = new Published();
configure();


/* -------- Preamble -------- */
/*
async function performPreamble() {
	infoWall.show();

	await wait(1500);

	const surroundInstructionsRef = document.querySelector("#iwSurroundInstructions");
	surroundInstructionsRef.style.display = `block`;
	await wait(750);
	surroundInstructionsRef.style.display = `none`;

	await wait(750);

	const separator2Ref = document.querySelector("#iwSeparator-2");
	separator2Ref.scrollIntoView({behavior: "smooth"});

	await wait(1000);
	
	const surroundDemonstrationRef = document.querySelector("#iwdSurroundDemonstration");
	surroundDemonstrationRef.style.display = `block`;
	await wait(750);
	surroundDemonstrationRef.style.display = `none`;

	await wait(1000);

	infoWall.hide();
	mainWall.show();
	mainWall.showKeyboard();
	
	await wait(1000);

	const surroundInformationRef = document.querySelector("#mwdSurroundInformation");
	surroundInformationRef.style.display = `block`;
	await wait(500);
	surroundInformationRef.style.display = `none`;
	
	infoWall.controlBack.unfreeze();
	infoWall.controlDemo.unfreeze();
	punter.solveBiz.unfreeze();
	keyboard.enable();
	disableScrolling();
}
*/
async function performPreamble() {
	mainWall.showKeyboard();
	mainWall.show();
	
	await wait(1000);

	const surroundInformationRef = document.querySelector("#mwdSurroundInformation");
	surroundInformationRef.style.display = `block`;
	await wait(500);
	surroundInformationRef.style.display = `none`;

	await wait(750);

	keyboard.hide();
	mainWall.hide();
	infoWall.show();

	await wait(1500);

	const surroundInstructionsRef = document.querySelector("#iwSurroundInstructions");
	surroundInstructionsRef.style.display = `block`;
	await wait(750);
	surroundInstructionsRef.style.display = `none`;

	await wait(750);

	const separator2Ref = document.querySelector("#iwSeparator-2");
	separator2Ref.scrollIntoView({behavior: "smooth"});

	await wait(1000);
	
	const surroundDemonstrationRef = document.querySelector("#iwdSurroundDemonstration");
	surroundDemonstrationRef.style.display = `block`;
	await wait(750);
	surroundDemonstrationRef.style.display = `none`;

	await wait(1000);

	infoWall.hide();
	mainWall.showKeyboard();
	mainWall.show();
	
	infoWall.controlBack.unfreeze();
	infoWall.controlDemo.unfreeze();
	//punter.solveBiz.unfreeze();
	punter.solveBiz.wake();
	keyboard.enable();
	disableScrolling();
}

infoWall.controlBack.freeze();
infoWall.controlDemo.freeze();
//punter.solveBiz.wake();
//punter.solveBiz.freeze();
performPreamble();
