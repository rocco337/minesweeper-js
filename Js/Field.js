"use strict";

class Field{
	
	constructor(jsObject,x,y,onFieldClickCallback, onBombMarkedCallback){
		this.jsObject = jsObject;
		this.x = x;
		this.y = y;
		this.isBomb = false;
		this.bombsInNeighborhood = 0;
		
		this.status = 0;
		
		this.onFieldClickCallback = onFieldClickCallback;
		this.onBombMarkedCallback = onBombMarkedCallback;
		
		this.innerElement = document.createElement("i");
		this.innerElement.className = "material-icons";
		
		this.jsObject.appendChild(this.innerElement); 		
		this.jsObject.addEventListener("click", this.Open.bind(this));
		this.jsObject.addEventListener("contextmenu",this.MarkAsBomb.bind(this));
	
		this.SetInitialState();			
	}
	
	Open(e){
		e.preventDefault();		
		if(this.status!=0 && this.status!=2)
			return;
		
		this.onFieldClickCallback(this);
	}	
	
	MarkAsBomb(e){
		e.preventDefault();
		
		if(this.status===1)
			return;
			
		if(this.status===0){
			this.SetMarkedState();
			this.onBombMarkedCallback(true);	
		}
		else if (this.status===2){
			this.SetInitialState();
			this.onBombMarkedCallback(false);			
		}
			
	}
		
	ShowBombsInNeighborhood(){
		this.SetNeighborsShowed();
	}
	
	SetInitialState(){
		this.status = 0;
		this.innerElement.innerHTML = "clear";
		this.innerElement.className = "material-icons";	
	}
	
	SetOpenedState(){
		this.status = 1;
		this.innerElement.innerHTML = "clear";
		this.innerElement.className =" material-icons icon-inactive";
	}
	
	SetMarkedState(){
		this.status = 2;
		this.innerElement.innerHTML = "star";
		this.innerElement.className = "material-icons";		
	}
	
	SetBombFoundState(){
		this.status = 3;
		this.innerElement.innerHTML = "warning";
		this.innerElement.className = "material-icons";		
	}
	
	SetNeighborsShowed(){
		var innerElement = this.innerElement;
		innerElement.className = "material-icons";
		
		if(this.bombsInNeighborhood===0){
			innerElement.innerHTML = "clear";				
			innerElement.className += " icon-inactive";	
		}
		else if(this.bombsInNeighborhood===1){
			innerElement.innerHTML = "looks_one";
		}
		else if(this.bombsInNeighborhood===2){
			innerElement.innerHTML = "looks_two";
		}else{
			innerElement.innerHTML = "looks_"+this.bombsInNeighborhood;			
		}
	}
	
	
	
}