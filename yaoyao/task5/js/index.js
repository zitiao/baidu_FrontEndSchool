
function Panal(){
	this.width=10;
	this.perWidth=50;
	this.ele=document.getElementById('panal');
	this.createPanal=createPanal;
}


function Square(){
	this.positionX=0;
	this.positionY=0;
	this.createSquare=createSquare;
	this.ele=null;
	this.direction=0;
	this.turn=turn;
	this.reDraw=reDraw;
}

function createPanal(){
	var str = "<table id='panalTable'>";
	for(var i=0;i<this.width;i++){
		str += "<tr>";
		for(var j=0;j<this.width;j++){
			str += "<td style='width:"+ this.perWidth +"px;height:" + this.perWidth + "px;'></td>"
		}
		str += "</tr>";
	}
	str += "</table>";
	this.ele.innerHTML += str;
}

function createSquare(){
	var squareEle = "<div id='square' style='width:"+ panal.perWidth +"px;height:" + panal.perWidth + "px;'></div>"
	panal.ele.innerHTML += squareEle;
	square.ele=document.getElementById("square");
	square.ele.style.top="0px";
	square.ele.style.left="0px";
}

function turn(word){
	if(word == "LEF"){
		this.ele.className = "TUNLEF";
		if(this.direction == 0){
			this.direction = 3;
			setTimeout("this.reDraw(this.direction,this.positionX,this.positionY)",1500);
			
		}else{
			this.direction -= 1;
			setTimeout("this.reDraw(this.direction,this.positionX,this.positionY)",1500);
		}
	}else if(word == "RIG"){
		this.ele.className = "TUNRIG";
		this.direction = (this.direction+1)%4;
		setTimeout("this.reDraw(this.direction,this.positionX,this.positionY)",1500);
	}else if(word == "BAC"){
		this.ele.className = "TUNBAC";
		this.direction = (this.direction+2)%4;
		setTimeout("this.reDraw(this.direction,this.positionX,this.positionY)",1500);
	}
}

function reDraw(direction,X,Y){
	panal.ele.removeChild(square.ele);
	str = "<div id='square' style='width:"+ panal.perWidth +"px;height:" + panal.perWidth + "px;'></div>"
	panal.ele.innerHTML += str;
	square.ele=document.getElementById("square");
	square.ele.style.top=Y*panal.perWidth + "px";
	square.ele.style.left=X*panal.perWidth + "px";
	drawBorder();


}

function drawBorder(){
	ele=square.ele;
	d=square.direction;
	ele.style.border = "none";
	if(d==0){
		ele.style.borderTop="5px solid red";
	}else if(d==1){
		ele.style.borderRight="5px solid red";
	}else if(d==2){
		ele.style.borderBottom="5px solid red";
	}else if(d==3){
		ele.style.borderLeft="5px solid red";
	}
}

function judgeBorder(square,panal){
	if(square.positionX>=0 && square.positionY>=0 && square.positionX<panal.width && square.positionY<panal.width){
		return true;
	}else{
		return false;
	}
}

var direction=['TOP','RIG','BOT','LEF'];
//主程序
var panal = new Panal();
panal.createPanal();

var square = new Square();
square.createSquare();

document.getElementById("commandBtn").addEventListener("click",commandHandle);

function commandHandle(){
	var command = document.getElementById("commandInput").value;
	if(command == "GO"){
		var currentX = square.positionX;
		var currentY = square.positionY;
		if(square.direction == 0){
			square.positionY -= 1;
		}else if(square.direction == 1){
			square.positionX += 1;
		}else if(square.direction == 2){
			square.positionY += 1;
		}else if(square.direction == 3){
			square.positionX -= 1;
		}
		if(!judgeBorder(square,panal)){
			square.positionX = currentX;
			square.positionY = currentY;
			alert("Cannot move");
		}else{
			square.reDraw(square.direction,square.positionX,square.positionY);
		}
	}else{
		var commandHeader = command.substring(0,3);
		var commandEnd = command.substring(4,7);
		if(commandHeader == "TUN"){
			square.turn(commandEnd);
		}else if(commandHeader == "TRA"){
			GO(commandEnd);
		}else if(commandHeader == "MOV"){
			MOV(commandEnd);
		}
	}
}


function GO(word){
	var currentX = square.positionX;
	var currentY = square.positionY;	
	if(word == "TOP"){
		square.positionY -= 1;
	}else if(word == "RIG"){
		square.positionX += 1;
	}else if(word == "BOT"){
		square.positionY += 1;
	}else if(word == "LEF"){
		square.positionX -= 1;
	}
	if(!judgeBorder(square,panal)){
		square.positionX = currentX;
		square.positionY = currentY;
		alert("Cannot move");
	}else{
		square.reDraw(square.direction,square.positionX,square.positionY);
	}
}

function MOV(word){
	GO(word);
	if(word == "TOP"){
		square.direction = 0;
		drawBorder();
	}else if(word == "RIG"){
		square.direction = 1;
		drawBorder();
	}else if(word == "BOT"){
		square.direction = 2;
		drawBorder();
	}else if(word == "LEF"){
		square.direction = 3;
		drawBorder();
	}
}