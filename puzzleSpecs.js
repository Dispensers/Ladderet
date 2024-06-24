let puzzleSpecs = [
/*
	{
		number: 47,
		publishedOn: "dd Mmm 24",
		words: ["LAPEL", "LOPES", "POLES", "POLKA"],
		hintSpec: [2, 4, "E"],
		featuredWordBlurb:
			"POLKA.<br>Basic move: three quick steps and a hop. You cover a lot of ground, so practise in the garden!<br><br>" +
			"Not from Polska (Poland), but Bohemia (now in Czech Rep).<br><br>Complete this: \“Itsy …\”"
	},
	{
		number: 12,
		publishedOn: "dd Mmm 24",
		words: ["CARRY", "DAIRY", "DEITY", "DELTA"],
		hintSpec: [2, 4, "E"],
		featuredWordBlurb:
			"DELTA is the fourth letter of the Greek alphabet - uppercase Δ, lowercase δ. It gives us our D.<br><br>" +
			"A river delta is so named because its shape approximates to the letter’s triangular uppercase form."
	},
	{
		number: 42,
		publishedOn: "dd Mmm 24",
		words: ["MUNCH", "DUNCE", "DEUCE", "DRUPE"],
		hintSpec: [2, 4, "E"],
		featuredWordBlurb:
			"DRUPE.<br>What a peach of a word! Well, a peach is a DRUPE, so it’s what you’d expect!<br><br>" +
			"A fruit with juicy flesh around a stone encasing a single seed.<br><br>The cherry is my pick of the bunch."
	},
	{
		number: 37,
		publishedOn: "dd Mmm 24",
		words: ["COXED", "NOTED", "NOTCH", "KETCH"],
		hintSpec: [2, 4, "E"],
		featuredWordBlurb:
			"Q: What’s the difference between a KETCH and a yawl?<br>" +
			"A: They both have two masts: a big one up front and a small one behind. But, on a yawl, the small one is way behind. Don't forget, now! "
	},
*/
	{
		number: 27,
		publishedOn: "24 Jun 24",
		words: ["GLOVE", "ALIVE", "ALIEN", "ADIEU"],
		hintSpec: [1, 4, "E"],
		featuredWordBlurb:
			"ADIEU is a favoured first guess for Wordle.<br><br>" +
			"Do say \‘I bid you ADIEU\’; don’t say \‘Without further ADIEU\’!"
	},
	{
		number: 32,
		publishedOn: "17 Jun 24",
		words: ["GIANT", "MEANT", "MEATY", "JETTY"],
		hintSpec: [2, 3, "T"],
		featuredWordBlurb:
			"JETTY.<br>A structure that is \‘thrown\’ out. From the French verb jeter, \'to throw\’. Down to one meaning nowadays. " +
			"There were two; the other one was \‘a projecting upper storey of a house\’."
	},
	{
		number: 22,
		publishedOn: "10 Jun 24",
		words: ["ABETS", "AREAS", "CREAK", "CROOK"],
		hintSpec: [1, 2, "E"],
		featuredWordBlurb:
			"The Mother of all Baddies: ABETS?"
	},
	{
		number: 17,
		publishedOn: "3 Jun 24",
		words: ["BEIGE", "FEIGN", "FELON", "FUTON"],
		hintSpec: [1, 1, "E"],
		featuredWordBlurb:
			"\"He could at least have chosen a different colour: the BEIGE should not wear BEIGE.\" <br>From Bodily Harm by Margaret Atwood."
	},


// ---------------------------------------------------------------------------------------------------------------------------------------------	
	
	{
		number: 46,
		publishedOn: "18 Mar 24",
		words: ["TANGO", "TABOO", "TABLE", "AMBLE"],
		hintSpec: [2, 4, "E"],
		featuredWordBlurb:
			"TANGO: head snaps, sharp movements, sudden pauses and ‘ganchos’ (leg hooks). Out of Buenos Aires and Montevideo in the 1880s. " +
			"Many variants now, but Argentine TANGO is still very popular."
	},
	{
		number: 31,
		publishedOn: "11 Mar 24",
		words: ["JOULE", "JOWLS", "JOKES", "YIKES"],
		hintSpec: [2, 3, "E"],
		featuredWordBlurb:
			"JOULE. Erg!! One of those incomprehensible units of measurement physics has dreamed up. That subject is hard work, don't you agree?"
	},
	{
		number: 41,
		publishedOn: "4 Mar 24",
		words: ["BITTY", "PETTY", "PETAL", "SEPAL"],
		hintSpec: [2, 3, "A"],
		featuredWordBlurb:
			" A bit of Botany.<br><br>" +
			"Picture a rosebud. The green casing you see is a calyx. It's divided into segments called SEPALs, which spread out as the flower blooms."
	},
	{
		number: 36,
		publishedOn: "26 Feb 24",
		words: ["FERRY", "WORRY", "WORLD", "WOWED"],
		hintSpec: [1, 2, "R"],
		featuredWordBlurb:
			"What’s your favourite Bryan FERRY or Roxy Music song? Mine is ‘Avalon’."
	},
	{
		number: 26,
		publishedOn: "19 Feb 24",
		words: ["SOBER", "SOLES", "SELLS", "HELLO"],
		hintSpec: [1, 0, "S"],
		featuredWordBlurb:
			"\"You say, 'Goodbye' and I say, 'HELLO, HELLO, HELLO'\""
	},
	{
		number: 21,
		publishedOn: "12 Feb 24",
		words: ["SWIPE", "SWEPT", "INEPT", "INPUT"],
		hintSpec: [2, 1, "N"],
		featuredWordBlurb:
			"The World's Number One Diebad: INPUT."
	},
	{
		number: 16,
		publishedOn: "5 Feb 24",
		words: ["GRAFT", "GRAZE", "GAUZE", "MAUVE"],
		hintSpec: [2, 4, "E"],
		featuredWordBlurb:
			"This is puzzle number 16, so can you think of 16 5-letter colours?"
	},
	{
		number: 11,
		publishedOn: "30 Jan 24",
		words: ["SIEGE", "SINGS", "PANGS", "PANIC"],
		hintSpec: [2, 2, "N"],
		featuredWordBlurb:
			"The word PANIC is derived from the god Pan. " +
			"The ancient Greeks believed that he lurked in lonely spots, and would frighten people either by suddenly appearing or by making noises."
	},
	{
		number: 10,
		publishedOn: "18 Feb 22",
		words: ["BRAVO", "CRAVE", "CURVE", "NURSE"],
		hintSpec: [2, 4, "E"],
		featuredWordBlurb:
			"There isn't one!."
	},
	{
		number: 9,
		publishedOn: "17 Feb 22",
		words: ["OLIVE", "CLOVE", "CLOWN", "BROWN"],
		hintSpec: [2, 2, "O"],
		featuredWordBlurb:
			"There isn't one!."
	},
	{
		number: 8,
		publishedOn: "16 Feb 22",
		words: ["DRIVE", "DRIES", "DIMES", "LIMOS"],
		hintSpec: [1, 1, "R"],
		featuredWordBlurb:
			"There isn't one!."
	},
	{
		number: 7,
		publishedOn: "15 Feb 22",
		words: ["THINK", "CHINS", "CHESS", "GUESS"],
		hintSpec: [2, 4, "S"],
		featuredWordBlurb:
			"There isn't one!."
	},
	{
		number: 6,
		publishedOn: "14 Feb 22",
		words: ["TEACH", "PERCH", "PERIL", "PUPIL"],
		hintSpec: [1, 1, "E"],
		featuredWordBlurb:
			"There isn't one!."
	},
	{
		number: 5,
		publishedOn: "11 Feb 22",
		words: ["SMALL", "SMILE", "SLIME", "CLIMB"],
		hintSpec: [1, 3, "L"],
		featuredWordBlurb:
			"There isn't one!."
	},
	{
		number: 4,
		publishedOn: "10 Feb 22",
		words: ["BIRDS", "TIRES", "TREES", "TWEET"],
		hintSpec: [1, 4, "S"],
		featuredWordBlurb:
			"There isn't one!."
	},
	{
		number: 3,
		publishedOn: "9 Feb 22",
		words: ["BUILD", "GUILE", "GRIME", "FRAME"],
		hintSpec: [2, 1, "R"],
		featuredWordBlurb:
			"There isn't one!."
	},
	{
		number: 2,
		publishedOn: "8 Feb 22",
		words: ["ELDER", "WIDER", "WIDTH", "WORTH"],
		hintSpec: [2, 0, "W"],
		featuredWordBlurb:
			"There isn't one!."
	},
	{
		number: 1,
		publishedOn: "7 Feb 22",
		words: ["BASIL", "BAGEL", "ANGEL", "ANGST"],
		hintSpec: [1, 0, "B"],
		featuredWordBlurb:
			"There isn't one!."
	},
	{
		number: 0,
		publishedOn: "7 Feb 22",
		words: ["DEBUT", "DEBTS", "VESTS", "VISTA"],
		hintSpec: [1, 1, "E"],
		featuredWordBlurb:
			"There isn't one!."
	},
];

