var rootID = "sortTable";

var data = [
["名称", "语文", "数学", "英语", "总计"],
["小明", 80, 90, 70, 240],
["小红", 90, 60, 90, 240],
["小亮", 60, 100, 70, 230]
];

var config = [2,3];
var sortStatus = [];


function appendStatus(arr,data){
	for(var i=0;i<data[0].length;i++){
		sortStatus.push(0);
	}
}

function createSortTable(rootID, data) {
	var tableStr = "<table>";
	var rootEle = document.getElementById(rootID);
  // 表头
  tableStr += "<tr>";
  for (var i = 0; i < data[0].length; i++) {
  	tableStr += "<th>" + data[0][i];    
  }
  tableStr += "</tr>";

  // 数据填充
  for (i = 1; i < data.length; i++) {
  	if (data[i] === undefined || data[i] === null) {
  		break;
  	}
  	tableStr += "<tr>";
  	for (var j = 0; j < data[i].length; j++) {
  		tableStr += "<td>" + data[i][j] + "</td>";
  	}
  	tableStr += "</tr>";
  }
  tableStr += "</table>";
  rootEle.innerHTML = tableStr;
}

function addButton(rootID,config){
	var rootEle = document.getElementById(rootID);
	var tableHead = rootEle.getElementsByTagName("tbody")[0].children[0].children;
	for(var i=0;i<config.length;i++){
		var headCell = tableHead[config[i]].innerHTML;
		headCell += "<input type = 'button' value = 's' class='sortBtn' id='SortBtn"+ config[i] +"'>";
		tableHead[config[i]].innerHTML = headCell;
	}
}

appendStatus(sortStatus,data);

createSortTable(rootID, data);

addButton(rootID,config);

document.getElementById(rootID).addEventListener("click",sortTable);

function sortTable(){
	var targetID = event.target.id;
	if (targetID.match("SortBtn*")) {
		var sortIndex = parseInt(targetID.substr(targetID.length-1,1));		
		sortData(sortIndex);
	}
}

function sortData(sortIndex){  
	var sortArr = [];
	if(sortStatus[sortIndex] == 1){
		sortArr = data.sort(function(a,b){
			return b[sortIndex]-a[sortIndex];
		}); 
    sortStatus[sortIndex] = -1;
	}else{
		// 重新排序或者直接反向数组，哪个更方便？
		sortArr = data.sort(function(a,b){
			return a[sortIndex]-b[sortIndex];
		}); 
    sortStatus[sortIndex] = 1;
	}
	
	createSortTable(rootID, sortArr);

	addButton(rootID,config);
}