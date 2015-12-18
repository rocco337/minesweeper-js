"use strict";
class Field{
	constructor(jsObject,x,y,onFieldClickCallback){
		this.jsObject = jsObject;
		this.x = x;
		this.y = y;
		this.isBomb = false;
		this.bombsInNeighborhood = 0;
		
		this.status = 0;
		
		this.onFieldClickCallback = onFieldClickCallback;
		
		this.SetText("X");		
		this.jsObject.addEventListener("click", this.Open.bind(this));
		this.jsObject.addEventListener("contextmenu",this.MarkAsBomb.bind(this));
	}
	
	Open(e){
		e.preventDefault();
		if(this.onFieldClickCallback(this)){
			this.SetText("O");	
			this.status = 1;
		}		
	}	
	
	MarkAsBomb(e){
		e.preventDefault();
		this.SetText("B");	
		this.status = 2;	
	}
	
	SetText(text){
		this.jsObject.innerHTML  = text;		
	}
	
	ShowBombsInNeighborhood(){
		if(this.bombsInNeighborhood)
			this.SetText(this.bombsInNeighborhood);
		else
			this.SetText('&nbsp;');
	}
	
}

class FieldFactory{
	constructor(fieldSize,onFieldClick)
	{
		this.size = fieldSize;
		this.fields = [];
		
		var fieldHolder= document.getElementById("field");
		
		for(var y=0;y<this.size;y++){
			for(var x=0;x<this.size;x++){
				var el = document.createElement("button");
				
				this.fields.push(new Field(el,x,y,onFieldClick));
				
				fieldHolder.appendChild(el);
			}	
			fieldHolder.appendChild(document.createElement("br"));			
		}
	}	
}

class Bomb{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}

class BombFactory{
	constructor(fieldSize){
		this.size = fieldSize;
		
		var numOfBombs = Math.round(this.size*this.size*0.2);
		this.bombs = [];
		
		for(var ii=0;ii<numOfBombs;ii++){
			let bombPositionFound = false;
			
			while(!bombPositionFound){
				let numX = this.GetRandomNum();
				let numY = this.GetRandomNum();
				
				if(!this.BombExists(numX,numY)){
					this.bombs.push(new Bomb(numX,numY));
					console.log(`${numY} - ${numX}`);
					bombPositionFound = true;	
				}	
			}	
		}
	}
	
	GetRandomNum(){
		return Math.floor(Math.random() * this.size);
	}
	
	BombExists(x,y){
		let exists = false;
		
		this.bombs.forEach(function(bomb) {
			if(bomb.x ===x && bomb.y ===y)
			{
				exists= true;
				return;
			}			
		}, this);
		
		return exists;
		
	}
}

class Minesweeper{
		
	constructor(fieldSize){
		let fieldFactory = new FieldFactory(fieldSize,this.OnFieldClick.bind(this));
		let bombFactory = new BombFactory(fieldSize);
		
		this.fields = fieldFactory.fields;
		this.bombs = bombFactory.bombs;
	}
	
	OnFieldClick(field){
		if(this.IsBombInField(field)){
			alert('Bomb');
			return false;
		}
		else{
			this.ClearFieldNeighbours(field,this.GetNeighbours(field));			
		}
		
		return true;
	}
	
	IsBombInField(field){
		let isBomb = false;
		this.bombs.forEach(function(bomb) {
			if(field.x === bomb.x && field.y === bomb.y)
			{
				isBomb = true;
				return;
			}
		}, this);
		return isBomb;
	}
	
	ClearFieldNeighbours(field,neighbours){
		if(field.status === 0 && !this.IsBombInField(field)){
			field.status = 1;
			
			field.bombsInNeighborhood = 0;
			neighbours.forEach(function(element) {
				if(this.IsBombInField(element)){
					field.bombsInNeighborhood +=1;	
				}				
			}, this);			
			field.ShowBombsInNeighborhood();
			
			neighbours.forEach(function(element) {
				this.ClearFieldNeighbours(element,this.GetNeighbours(element));
			}, this);
		}
	}
		
	GetNeighbours(field){
		let searchPairs = [];
		searchPairs.push({x :field.x+1 ,y:field.y-1 });
		searchPairs.push({x :field.x+1 ,y:field.y+1 });		
		searchPairs.push({x :field.x+1 ,y:field.y });		
		searchPairs.push({x :field.x-1 ,y:field.y-1 });		
		searchPairs.push({x :field.x-1 ,y:field.y+1 });		
		searchPairs.push({x :field.x-1 ,y:field.y });		
		searchPairs.push({x :field.x ,y: field.y-1});		
		searchPairs.push({x :field.x ,y:field.y+1 });		
		
		return this.GetByPositions(searchPairs);
	}
	
	GetByPosition(x,y){
		var item = null;
		this.fields.array.forEach(function(el) {
			if(el.x===x && el.y === y)
			{
				item = el;
				return;
			}
		}, this);
		
		return item;
	}
	
	GetByPositions(pairs){
		let items = [];
		
		this.fields.forEach(function(el) {
			pairs.forEach(function(p){
				if(el.x===p.x && el.y === p.y)
				{
					items.push(el);
				}
			});
		}, this);
		
		return items;
	}
}

new Minesweeper(10);

