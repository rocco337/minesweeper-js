"use strict";

class BombFactory{
	constructor(fieldSize){
		this.size = fieldSize;
		
		this.numOfBombs = Math.round(this.size*this.size*0.2);
		this.bombs = [];
		
		for(var ii=0;ii<this.numOfBombs;ii++){
			let bombPositionFound = false;
			
			while(!bombPositionFound){
				let numX = this.GetRandomNum();
				let numY = this.GetRandomNum();
				
				if(!this.BombExists(numX,numY)){
					this.bombs.push(new Bomb(numX,numY));
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
