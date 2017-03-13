document.getElementById('mc').addEventListener("blur",mcValid);
document.getElementById('mm').addEventListener("blur",mmValid);
document.getElementById('mmqr').addEventListener("blur",mmqrValid);
document.getElementById('yx').addEventListener("blur",yxValid);
document.getElementById('sj').addEventListener("blur",sjValid);
document.getElementById('tj').addEventListener("click",tjValid);

function mcValid(){
	var mc = document.getElementById('mc')
	var str = mc.value;
	var alert = mc.nextElementSibling;
	var strLength = 0;
	for(var i=0;i<str.length;i++){
		strCode = str.charCodeAt(i);
		if(strCode>=0xFF || strCode<=0x00){
			strLength+=2;
		}else{
			strLength+=1;
		}
	}
	if (str.length==0) {
		alert.innerText = "姓名不能为空"
		alert.className="failed";
		document.getElementById('mc').className = "failed";
	}
	else if(strLength < 4 || strLength > 16){
		alert.innerText = "长度必须在4——16之间";
		alert.className="failed";
		document.getElementById('mc').className = "failed";
	}else{
		alert.innerText = "格式正确";
		alert.className="success";
		document.getElementById('mc').className = "success";
		return true;
	}
	return false;

}

function mmValid(){
	var mm = document.getElementById('mm')
	var str = mm.value;
	var alert = mm.nextElementSibling;
	var flag=true;
	for(var i=0;i<str.length;i++){
		strCode = str.charCodeAt(i);
		if(strCode>=0xFF || strCode<=0x00){
			flag=false;
			break;
		}
	}
	if(!flag){
		alert.innerText = "密码只能包含英文和数字"
		alert.className="failed";
		document.getElementById('mm').className = "failed";
	}else if(str.length < 4 || str.length > 16){
		alert.innerText = "长度必须在4——16之间";
		alert.className="failed";
		document.getElementById('mm').className = "failed";
	}else{
		alert.innerText = "格式正确";
		alert.className="success";
		document.getElementById('mm').className = "success";
		return true;
	}
	return false;
}

function mmqrValid(){
	var passwordStr = document.getElementById('mm').value;
	var passwordStrR = document.getElementById('mmqr').value;
	var alert = document.getElementById('mmqr').nextElementSibling;
	if(passwordStr!==passwordStrR || passwordStrR==""){
		alert.innerText = "两次输入不一致"
		alert.className="failed";
		document.getElementById('mmqr').className = "failed";
	}else{
		alert.innerText = "格式正确";
		alert.className="success";
		document.getElementById('mmqr').className = "success";
		return true;
	}
	return false;
}

function yxValid(){
	var str = document.getElementById("yx").value;
	var email = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
	var alert = document.getElementById('yx').nextElementSibling;
	if(email.exec(str)==null){
		alert.innerText = "请输入正确的邮箱地址"
		alert.className="failed";
		document.getElementById('yx').className = "failed";
	}else{
		alert.innerText = "格式正确";
		alert.className="success";
		document.getElementById('yx').className = "success";
		return true;
	}
	return false;
}

function sjValid(){
	var str = document.getElementById("sj").value;
	var phoneNum = /^1(3|4|5|7|8)[0-9]\d{8}$/;
	var alert = document.getElementById('sj').nextElementSibling;
	if(phoneNum.exec(str)==null){
		alert.innerText = "请输入正确的手机号码"
		alert.className="failed";
		document.getElementById('sj').className = "failed";
	}else{
		alert.innerText = "格式正确";
		alert.className="success";
		document.getElementById('sj').className = "success";
		return true;
	}
	return false;
}

function tjValid(){
	if(mcValid() && mmValid() && mmqrValid() && yxValid() && sjValid()){
		alert("验证通过");
	}else{
		alert("格式有误，请检查");
	}
}