// var colorPicker = function(){
// 	return new colorPicker.fn.init();
// };

// colorPicker.fn = colorPicker.prototype = {
// 	width:200,

// 	getWidth: function() {
// 		alert(this.width);
// 	}
// };

// var init = colorPicker.fn.init = function(){
// 	return {width:200};
// }

// colorPicker.fn.getWidth();

var colorPicker = {

	init : function(rootEle){
		this.createPicker(rootEle);
		this.fillPanal();
		this.fillBar();
		this.changeValue('R',255);
		this.changeValue('G',255);
		this.changeValue('B',255);
		this.changeValue('H',0);
		this.changeValue('S',0);
		this.changeValue('L',100);

		// 绑定事件
		document.getElementById("colorBar").addEventListener('click',this.getBarColor);
		document.getElementById('colorPanal').addEventListener('click',this.getPanalColor);
		return colorPicker;
	},


	createPicker: function(rootEle){
		var rootEle;
		if (rootEle !== '' && rootEle !== undefined) {
			rootEle = document.getElementById(rootEle);
		}else
		{
			rootEle = document.getElementsByTagName('body')[0];
		}
		var rootHTML = rootEle.innerHTML;
		var string = '<div class="colorPicker"><canvas id="colorPanal" width="400px" height="400px"></canvas><canvas id="colorBar" width="20px" height="400px" style="margin-left:3px;"></canvas><span class="circle" id="onPanal"></span><span class="circle" id="onBar"></span><div class="numPanal"><div class="colorNum"><div class="item"><label for="R">R</label><input type="text" id="R"></div><div class="item"><label for="G">G</label><input type="text" id="G"></div><div class="item"><label for="B">B</label><input type="text" id="B"></div></div><hr /><div class="colorNum"><div class="item"><label for="H">H</label><input type="text" id="H"></div><div class="item"><label for="S">S</label><input type="text" id="S"></div><div class="item"><label for="L">L</label><input type="text" id="L"></div></div></div></div>'
		rootHTML += string;
		rootEle.innerHTML = rootHTML;
	},

	fillPanal : function(midColor){
		var ctx = this.getPanal();

		if (midColor === undefined || midColor === '') {
			midColor = "#F00";
		}
		
		// 创建渐变
		var grd = ctx.createLinearGradient(0, 0, 0, 400);
		grd.addColorStop(0, "#fff");
		grd.addColorStop(1 / 2, midColor);
		grd.addColorStop(1, "#000");

		// 填充渐变
		ctx.fillStyle = grd;
		ctx.rotate(-45*Math.PI/180);
		ctx.translate(-(200*Math.sqrt(2)),0);
		ctx.fillRect(0, 0, 400*Math.sqrt(2), 400*Math.sqrt(2));
	},

	fillBar : function(){
		var ctx = this.getBar();

	    // 创建渐变
	    var grd = ctx.createLinearGradient(0, 0, 0, 400);
	    grd.addColorStop(0, "#f00");
	    grd.addColorStop(1 / 6, "#f0f");
	    grd.addColorStop(2 / 6, "#00f");
	    grd.addColorStop(3 / 6, "#0ff");
	    grd.addColorStop(4 / 6, "#0f0");
	    grd.addColorStop(5 / 6, "#ff0");
	    grd.addColorStop(1, "#f00");

	    // 填充渐变
	    ctx.fillStyle = grd;
	    ctx.fillRect(0, 0, 20, 400);
	},

	getPanal : function(){
		var c = document.getElementById("colorPanal");
		var ctx = c.getContext("2d");
		return ctx;
	},

	getBar : function(){
		var c = document.getElementById("colorBar");
		var ctx = c.getContext("2d");
		return ctx;
	},

	changeValue: function(str,val){
		var ele = document.getElementById(str);
		ele.value = val;
	},

	getBarColor : function(e){
		var barHeight = e.clientY;
		var imageData;
		var ctx = this.getBar();
		imageData = ctx.getImageData(0,barHeight,1,1).data; 
		var midColor = this.RGBTo16(imageData[0],imageData[1],imageData[2]);

		var ctx1 = this.getPanal();
		ctx1.rotate(-135*Math.PI/180);
		createColorPanal(midColor);
		ctx1.rotate(-135*Math.PI/180);
		this.createColorPanal(midColor);
		this.changeBarCircle(barHeight);
	},

	getPanalColor : function(e){
		var barHeight = e.clientY;
		var barWidth = e.clientX;
		var imageData;
		var ctx = this.getPanal();
		imageData = ctx.getImageData(barWidth,barHeight,1,1).data; 

		this.changeValue('R',imageData[0]);
		this.changeValue('G',imageData[1]);
		this.changeValue('B',imageData[2]);

		var hslArray = this.rgbToHsl(imageData[0],imageData[1],imageData[2]);
		this.changeValue('H',hslArray[0]);
		this.changeValue('S',hslArray[1]);
		this.changeValue('L',hslArray[2]);


		this.changePanalCircle(barWidth,barHeight);
	},

	RGBTo16 : function(R,G,B){
	    R = R.toString(16);
	    if (R.length == 1) {
	      R = '0' + R;
	    }
	    G = G.toString(16);
	    if (G.length == 1) {
	      G = '0' + G;
	    }
	    B = B.toString(16);
	    if (B.length == 1) {
	      B = '0' + B;
	    }
	    var result = "#" + R + G + B;
	    return result;
	}
}

colorPicker.init();
