var INIT_COLOR = "#F00";
// 需要circle的偏移量变量
init();

// 绑定事件
document.getElementById("colorBar").addEventListener('click',getBarColor);
document.getElementById('colorPanal').addEventListener('click',getPanalColor);


function init() {
  createColorBar();
  createColorPanal(INIT_COLOR);
// 0°, 0.0%, 100.0
  changeValue('R',255);
  changeValue('G',255);
  changeValue('B',255);
  changeValue('H',0);
  changeValue('S',0);
  changeValue('L',100);
  
  function createColorBar() {
    var ctx = getBar();

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
  }
}

function createColorPanal(midColor) {
  var ctx = getPanal();

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
}

function changeValue(str,val){
  var ele = document.getElementById(str);
  ele.value = val;
}

function getBarColor(e){
  var barHeight = e.clientY;
  var imageData;
  var ctx = getBar();
  imageData = ctx.getImageData(0,barHeight,1,1).data; 
  var midColor = RGBTo16(imageData[0],imageData[1],imageData[2]);

  var ctx1 = getPanal();
  ctx1.rotate(-135*Math.PI/180);
  createColorPanal(midColor);
  ctx1.rotate(-135*Math.PI/180);
  createColorPanal(midColor);
  changeBarCircle(barHeight);
}

function getPanalColor(e){
  var barHeight = e.clientY;
  var barWidth = e.clientX;
  var imageData;
  var ctx = getPanal();
  imageData = ctx.getImageData(barWidth,barHeight,1,1).data; 
  
  changeValue('R',imageData[0]);
  changeValue('G',imageData[1]);
  changeValue('B',imageData[2]);

  var hslArray = rgbToHsl(imageData[0],imageData[1],imageData[2]);
  changeValue('H',hslArray[0]);
  changeValue('S',hslArray[1]);
  changeValue('L',hslArray[2]);


  changePanalCircle(barWidth,barHeight);
}

function getBar(){
  var c = document.getElementById("colorBar");
  var ctx = c.getContext("2d");
  return ctx;
}

function getPanal(){
  var c = document.getElementById("colorPanal");
  var ctx = c.getContext("2d");
  return ctx;
}

function RGBTo16(R,G,B){
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

function changeBarCircle(hTranNum){

  var barC = document.getElementById("onBar");
  var barCHeight = barC.offsetTop;
  var m = hTranNum - barCHeight;
  barC.style.top = (barCHeight + m - 3) + "px";
  // console.log(barCHeight);
}

function changePanalCircle(width,height){
  var panal = document.getElementById("onPanal");
  var panalHeight = panal.offsetTop;
  var panalWidth = panal.offsetLeft;
  var m = height - panalHeight;
  var n = width - panalWidth
  panal.style.top = (panalHeight + m - 3) + "px";
  panal.style.left = (panalWidth + n - 3) + "px";
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = h * 100;
    h = parseInt(h);
    s = s * 100;
    s = parseInt(s);
    l = l * 100;
    l = parseInt(l);

    return [h, s, l];
}

