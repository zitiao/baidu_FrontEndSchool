function init(title,str){
	var template = '<div id="mask"><div class="panal"><div class="title">'+title+'</div><div class="content">'+str+'</div><div id="inputGroup"><input type="button" value="确定"><input type="button" value="取消"></div></div></div>'
	var body = document.getElementsByTagName('body')[0];
	body.innerHTML += template;
}

init("test","test");

document.getElementById('mask').addEventListener("click",hide);
document.getElementById('show').addEventListener("click",show);
function hide(){
	var mask = document.getElementById('mask');
	mask.style.display = "none";
}

function show(){
	var mask = document.getElementById('mask');
	mask.style.display = "block";
}