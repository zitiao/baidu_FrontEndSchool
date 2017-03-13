//棋盘和方块的构造函数
function Square(){
	this.positionX=0;
	this.positionY=0;
	this.ele="";
	this.header=0;
}

function Panal(){
	this.ele=document.getElementById("panal");
	this.width=10;
	this.perWidth=50;
	// this.border=2;
}

var square = new Square;
var panal = new Panal;
var direction = ["Top","Right","Bottom","Left"];

//初始化，画出棋盘
(function(){
	
	var str = "<table id='panalTable'>";

	for(var i=0;i<panal.width;i++){
		str += "<tr>";
		for(var j=0;j<panal.width;j++){
			str += "<td style='width:"+ panal.perWidth +"px;height:" + panal.perWidth + "px;'></td>"
		}
		str += "</tr>";
	}
	str += "</table>";
	panal.ele.innerHTML += str;

	//方块
	// var squareWidth=panal.perWidth+panal.border*2;
	var squareEle = "<div id='square' style='width:"+ panal.perWidth +"px;height:" + panal.perWidth + "px;'></div>"
	panal.ele.innerHTML += squareEle;
	square.ele=document.getElementById("square");
	square.ele.style.top="0px";
	square.ele.style.left="0px";
})()

document.getElementById("execBtn").addEventListener("click",funcs);

function funcs(){
	var commandLine=document.getElementById("commandInput").value;
	if(commandLine == "GO"){
		if(square.header == 0 && square.positionY-1>=0){
			var current = parseInt(square.ele.style.top);
			current -= panal.perWidth;
			square.ele.style.top = current + "px";
			square.positionY -= 1;
		}else if(square.header == 1 && square.positionX+1<panal.width){
			var current = parseInt(square.ele.style.left);
			current += panal.perWidth;
			square.ele.style.left = current + "px";
			square.positionX += 1;
		}else if(square.header == 2 && square.positionY+1<panal.width){
			var current = parseInt(square.ele.style.top);
			current += panal.perWidth;
			square.ele.style.top = current + "px";
			square.positionY+= 1;
		}else if(square.header == 3 && square.positionX-1>0){
			var current = parseInt(square.ele.style.left);
			current -= panal.perWidth;
			square.ele.style.left = current + "px";
			square.positionX -= 1;
		}else {alert("Cannot move");}
	}else if(commandLine == "TUN LEF"){
		if(square.header == 0){
			square.header = 3;
		}else{
			square.header -=1;
		}
		handleBorder(square.ele,square.header);
	}else if(commandLine == "TUN RIG"){
		if(square.header == 3){
			square.header = 0;
		}else{
			square.header +=1;
		}
		handleBorder(square.ele,square.header);
	}else if(commandLine == "TUN BAC"){
		square.header = (square.header + 2)%4;
		handleBorder(square.ele,square.header);
	}
	else{
		alert("指令有误");
	}
}

function handleBorder(ele,dIndex){
	ele.style.border="none";
	ele.style["border" + direction[dIndex]] = "5px solid red";
}