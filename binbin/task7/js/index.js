    function Node(data,left,right){
    	this.data = data;
    	this.left = left;
    	this.right = right;
    }
    function BST(){
    	this.root = null;
    	this.inOrderM = inOrderM;
    	this.inOrderF = inOrderF;
    	this.inOrderB = inOrderB;
    }
    //中序遍历
    function inOrderM(node){
    	var divs = [];
    	function inOrder(node){
    		if(!(node == null)){
    			inOrder(node.left);
    			divs.push(node.data);
    			inOrder(node.right);
    		}
    	}
    	inOrder(node);
    	getColor(divs);
    }
    
    //前序遍历   
    function inOrderF(node){
    	var divs = [];
    	function inOrder(node){
    		if(!(node == null)){
    			divs.push(node.data);
    			inOrder(node.left);			
    			inOrder(node.right);
    		}
    	}
    	inOrder(node);
    	getColor(divs);
    }
    
    //后序遍历
    function inOrderB(node){
    	var divs = [];
    	function inOrder(node){
    		if(!(node == null)){		
    			inOrder(node.left);			
    			inOrder(node.right);
    			divs.push(node.data);
    		}
    	}
    	inOrder(node);
    	getColor(divs);
    }

    //根据排列好的arr让蓝色方块显示颜色
    function getColor(arr){
    	var length = arr.length;
    	for (var i = 0; i < length; i++) {
    		(function(arr,i) {
    			setTimeout(function() {
    				arr[i].className="turnBlue";
    			}, i * 1000);
    			setTimeout(function() {
    				arr[i].className="";
    			}, i * 2000);
    		})(arr,i);
    	}
    }

    //把DOM元素对应到树里面
    function turnToTree(node,ele){
    	if(ele.children.length){
    		var div1 = ele.children[0];
    		var div2 = ele.children[1];
    		node.left = new Node(div1,null,null);
    		node.right = new Node(div2,null,null);
    		turnToTree(node.left,div1);
    		turnToTree(node.right,div2);
    	}
    }

	//主程序
	var container = document.getElementById('container');
	var BST = new BST();
	BST.root = new Node(container,null,null);
	turnToTree(BST.root,container);
	document.getElementById("orderF").addEventListener("click",front);
	document.getElementById("orderM").addEventListener("click",middle);
	document.getElementById("orderB").addEventListener("click",back);

	function front(){
		inOrderF(BST.root);
	}
	function middle(){
		inOrderM(BST.root);
	}
	function back(){
		inOrderB(BST.root);
	}
