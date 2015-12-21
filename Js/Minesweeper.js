"use strict";

class Minesweeper {

	constructor() {
		this.init();

		document.getElementById("newGame").addEventListener("click", () => {

			document.getElementById("field").innerHTML = '';
			this.init();
		});
	}

	init() {
		let level = prompt("Enter desired level(beginner - 1, intermediate - 2, advanced - 3):");

		let fieldSize = 5;
		if (level == 2)
			fieldSize = 8;
		else if (level == 3)
			fieldSize = 12;

		let fieldFactory = new FieldFactory(fieldSize, this.OnFieldClick.bind(this), this.OnBombMarked.bind(this));
		let bombFactory = new BombFactory(fieldSize);

		this.fields = fieldFactory.fields;
		this.bombs = bombFactory.bombs;
		
		this.jsBombsLeft = document.getElementById('bombsLeft');
		this.bombsMarked = bombFactory.numOfBombs;
		this.bombsLeft = bombFactory.numOfBombs;
		
		this.jsBombsLeft.innerHTML = this.bombsMarked;


	}

	OnFieldClick(field) {
		if (this.IsBombInField(field)) {
			this.ShowAllBombs();
			return false;
		}
		else {
			field.SetOpenedState();
			this.CountAndSetBombsInNeighbours(field);
			this.ClearFieldNeighbours(field, this.GetNeighbours(field), []);
		}

		return true;
	}

	OnBombMarked(field,add) {
		if (add) {
			this.bombsMarked -= 1;
			if(this.IsBombInField(field)){
				this.bombsLeft -=1;
				if(this.bombsLeft===0){
					alert('Winn!!!');
				}	
			}
		} else {
			this.bombsMarked += 1;
		}

		this.jsBombsLeft.innerHTML = this.bombsMarked;
	}

	IsBombInField(field) {
		let isBomb = false;
		this.bombs.forEach(function (bomb) {
			if (field.x === bomb.x && field.y === bomb.y) {
				isBomb = true;
				return;
			}
		}, this);
		return isBomb;
	}

	ClearFieldNeighbours(field, neighbours, checked) {
		if (field.status === 2 || this.IsBombInField(field) || checked.indexOf(field) != -1) {
			return;
		}
		checked.push(field);
		this.CountAndSetBombsInNeighbours(field, neighbours);

		if (field.bombsInNeighborhood === 0) {
			neighbours.forEach(function (element) {
				this.ClearFieldNeighbours(element, this.GetNeighbours(element), checked);
			}, this);
		}
	}

	CountAndSetBombsInNeighbours(field, neighbours) {
		neighbours = neighbours ? neighbours : this.GetNeighbours(field);

		field.bombsInNeighborhood = 0;
		neighbours.forEach(function (element) {
			if (this.IsBombInField(element)) {
				field.bombsInNeighborhood += 1;
			}
		}, this);
		field.ShowBombsInNeighborhood();
	}

	GetNeighbours(field) {
		let searchPairs = [];
		searchPairs.push({ x: field.x + 1, y: field.y - 1 });
		searchPairs.push({ x: field.x + 1, y: field.y + 1 });
		searchPairs.push({ x: field.x + 1, y: field.y });
		searchPairs.push({ x: field.x - 1, y: field.y - 1 });
		searchPairs.push({ x: field.x - 1, y: field.y + 1 });
		searchPairs.push({ x: field.x - 1, y: field.y });
		searchPairs.push({ x: field.x, y: field.y - 1 });
		searchPairs.push({ x: field.x, y: field.y + 1 });

		return this.GetByPositions(searchPairs);
	}

	GetByPosition(x, y) {
		var item = null;
		this.fields.array.forEach(function (el) {
			if (el.x === x && el.y === y) {
				item = el;
				return;
			}
		}, this);

		return item;
	}

	GetByPositions(pairs) {
		let items = [];

		this.fields.forEach(function (el) {
			pairs.forEach(function (p) {
				if (el.x === p.x && el.y === p.y) {
					items.push(el);
				}
			});
		}, this);

		return items;
	}

	ShowAllBombs() {
		var bombFields = this.GetByPositions(this.bombs);

		bombFields.forEach((el) => {
			el.SetBombFoundState();
		});
	}
}

var minesweeper = new Minesweeper();
