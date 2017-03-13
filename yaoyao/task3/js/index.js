document.getElementById('inS').addEventListener("click",showInS);
document.getElementById('notIn').addEventListener("click",showNotIn);
document.getElementById('city').addEventListener("change",changeSelect);

var selectPanal = document.getElementById("selectPanal");
var inputText = document.getElementById("inputText");
var arr = JSON.parse(school);
var citySeletor = document.getElementById("city");
var schoolSelector = document.getElementById("schoolName");

function showInS(){
	selectPanal.style.display="block";
	inputText.style.display="none";
}

function showNotIn(){
	selectPanal.style.display="none";
	inputText.style.display="block";
}

function changeSelect(){
	var city = this.value;
	createOpt(schoolSelector,city);
}

//init
(function (){	
	var cities = [];	
	for(var i=0;i<arr.length;i++){
		cities.push(arr[i].area);
	}	
	var currentCity = cities[0];
	createOpt(citySeletor,cities);
	createOpt(schoolSelector,currentCity);	
})()

function createOpt(ele,obj){
	ele.innerHTML = "";
	if(typeof(obj) == "object"){
		for(var i=0;i<obj.length;i++){
			var option = document.createElement("option");
			option.innerText = obj[i];
			ele.appendChild(option);
		}
	}else if(typeof(obj) == "string"){
		for(var i=0;i<arr.length;i++){
			if(arr[i].area == obj){
				var arrSchool = arr[i].school;
				break;
			}
		}
		for(var i=0;i<arrSchool.length;i++){
			var option = document.createElement("option");
			option.innerText = arrSchool[i];
			ele.appendChild(option);
		}
	}
}