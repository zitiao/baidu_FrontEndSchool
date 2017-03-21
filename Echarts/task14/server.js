var fs = require('fs');

fs.readdir('data',function(err,files){
	var str = "[\n";
	for(var i=0;i<files.length;i++){
		
		isLast(i,str);
		function isLast(index,str){
			fs.readFile('data\\'+files[i],'utf8',function(err,data){
			var itemArr = data.split(/\r\n/);
			
			for(var j=0;j<itemArr.length-1;j++){
				var dataArr = itemArr[j].split(",");
				str += '{\n"Date":"' + dataArr[0] + '",\n';
				str += '"Ticker":"' + dataArr[1] + '",\n';
				str += '"Open":"' + dataArr[2] + '",\n';
				str += '"High":"' + dataArr[3] + '",\n';
				str += '"Low":"' + dataArr[4] + '",\n';
				str += '"Close":"' + dataArr[5] + '",\n';	
				if(index == files.length-1 && j == itemArr.length-2){
				str += '"Volume":"' + dataArr[6] + '"\n}\n]';
			}else{
				str += '"Volume":"' + dataArr[6] + '"\n},\n';
			}		
			}	
			fs.open('data.json','a',function(err,fd){
				fs.writeSync(fd, str, function(err,written,buffer){})
			});
		})
		}
		
	}	
});


