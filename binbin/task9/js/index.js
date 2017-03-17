(function (){
  var rootDiv = document.getElementById('container');
  var currDiv;//记录当前被选中的div
  var arr = everyDiv(rootDiv);//当前的div序列

  //绑定事件
  for(var i=0;i<arr.length;i++){
    arr[i].addEventListener("click",beChoosen);
  }
  document.getElementById("showColor").addEventListener("click",show);
  document.getElementById("search").addEventListener("click",search);
  document.getElementById("deleteBtn").addEventListener("click",deleteNode);
  document.getElementById("insertBtn").addEventListener("click",insertNode);

  function search(){
    var text = document.getElementById("searchText").value;
    if(text){
      show(text);  
    }else{
      alert("no search text input");
    }
  }

  function beChoosen(event){
    //阻止冒泡，否则会多次触发
    event.stopPropagation();
    for(var i=0;i<arr.length;i++){
      arr[i].className = "";
    }
    this.className = "choosen"
    currDiv = this;
  }

  function deleteNode(){
    if(currDiv){
      var parentDiv = currDiv.parentNode;
      parentDiv.removeChild(currDiv);
      arr = everyDiv(rootDiv);
    }else{
      alert("No Div Selected");
    }

  }

  function insertNode(){
    if(currDiv){
      var text = document.getElementById("insertText").value;
      var div = document.createElement("div");
      div.innerText = text;
      currDiv.appendChild(div);
      div.addEventListener("click",beChoosen);
      arr = everyDiv(rootDiv);
    }else{
      alert("No Div Selected");
    }
  }

  //遍历所有节点，并返回一个按顺序存放DOM元素的数组
  function everyDiv(){
    var arr = [];
    //递归调用自身，从路径上来看，是深度优先吧。。。毕竟不是二叉树了。。无所谓前序中序了。。
    function inOrder(node){
      arr.push(node);
      for(var i=0;i<node.children.length;i++){
        inOrder(node.children[i]);
      }
    }
    inOrder(rootDiv);
    return arr;
  }

  //如果传入了data值，表示需要按照data值来搜索
  function show(data){
    var arr = everyDiv(this.root);
    var length = arr.length;
    for (var i = 0; i < length; i++) {
      if(data == undefined || !(data == text(arr[i])) ){
        (function(arr,i) {
          setTimeout(function() {
            arr[i].className="turnBlue";
          }, i * 1000);
          setTimeout(function() {
            arr[i].className="";
          }, i * 2000);
        })(arr,i);
      }else{
        (function(arr,i) {
          setTimeout(function() {
            alert("Found");
          }, i * 1000);
          setTimeout(function() {
            arr[i].className="turnBlue";
          }, i * 1000);                    
          setTimeout(function() {
            arr[i].className="";
          }, i * 2000);
        })(arr,i);
        break;
      }
    }
  }

  //寻找内部文本
  function text(ele){
    var arr = ele.innerText.split(/[\s\r\n]/);
    return arr[0];
  }
})()
