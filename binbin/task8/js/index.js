  //树的定义
  function Node(ele){
    this.ele = ele;
    this.data = text(ele);
    this.childNodes = [];
    
  }

  function Tree(){
    this.root = null;
    this.find = find;
    this.getAll = getAll;
  }

function find(data){
    var currNode = this.root;
    if(currNode.data == data){
      return currNode;
    }else{
      return search(this.root.childNodes,data);
    }
    //这个search是find的内部函数
    function search(arr,data){
      for(var i=0;i<arr.length;i++){
        if(arr[i].data == data){
          return arr[i];
        }
      }
      for(var i=0;i<arr.length;i++){
        search(arr[i].childNodes,data);
      }
    }
}

//如果传入了data值，表示需要按照data值来搜索
  function getAll(data){
    var arr = [];
    function inOrder(node){
        arr.push(node.ele);
        for(var i=0;i<node.childNodes.length;i++){
            inOrder(node.childNodes[i]);
        }
    }
    inOrder(this.root);
    getColor(arr,data);
  }

//绑定setTimeout。加上颜色
  function getColor(arr,data){
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

//将DOM节点转换到树里面去
//DOM本身就是树的结构。。。为什么要专门再弄个树。。。。。。。。。。
  function TurnToTree(node,ele){
    if(ele.children.length){
        for(var i=0;i<ele.children.length;i++){
            var div = ele.children[i];
            node.childNodes.push(new Node(div));
        }
        for(var i=0;i<ele.children.length;i++){
            TurnToTree(node.childNodes[i],ele.children[i]);
        }
    }
  }

//寻找内部文本
  function text(ele){
    var arr = ele.innerText.split(/[\s\r\n]/);
    return arr[0];
  }


//主程序
document.getElementById("showColor").addEventListener("click",showColor);
document.getElementById("search").addEventListener("click",search);

var tree = new Tree();
var container = document.getElementById('container');
tree.root = new Node(container);
TurnToTree(tree.root,container);

  function showColor(){
      tree.getAll();
  }

  function search(){
    var text = document.getElementById("searchText").value;
    tree.getAll(text);
  }