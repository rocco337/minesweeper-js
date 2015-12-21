"use strict";

class FieldFactory{
	constructor(fieldSize,onFieldClick,onBombMarked)
	{
		this.size = fieldSize;
		this.fields = [];
		
		var fieldHolder= document.getElementById("field");
		
		for(var y=0;y<this.size;y++){
			
			for(var x=0;x<this.size;x++){
				var el = this.CreateButton();
				
				this.fields.push(new Field(el,x,y,onFieldClick,onBombMarked));
				
				fieldHolder.appendChild(el);
			}	
			fieldHolder.appendChild(document.createElement("br"));			
		}
	}	
	
	CreateButton(){		
		var el =document.createElement("a");		
		el.className = "waves-effect waves-light btn-large field grey darken-1";
		return el;
	}
}