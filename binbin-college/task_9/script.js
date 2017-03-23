
function Order(){
    this.time = 3000;
    this.timerId = null;
    this.list = [];
    this.cursor  = 0;
    this.queue = [];
    this.select = [];
    this.add = null;
}

Order.getChildren = function(el, type){
        var type = "div" || type;
        var list = [];
        if( !el.hasChildNodes() ){
            return list;
        }
        var nodes = el.getElementsByTagName( type );
        var firstChild = nodes[0];
        if( !firstChild || firstChild.parentNode != el){
            return list;
        }else{
            var ChildNode = firstChild;
            while( ChildNode ){
                if( ChildNode.nodeName.toUpperCase() == type.toUpperCase() )
                list.push( ChildNode );
                ChildNode = ChildNode.nextSibling;
            }
            return list;
        }
};

Order.getFirstNode = function(el,type){
    var type = "div" || type;
        var result = null;
        if( !el.hasChildNodes() ){
            return result;
        }
        var nodes = el.getElementsByTagName( type );
        if( !nodes.length || nodes[0].parentNode == el ){
            return nodes[0];
        }else{
            return result;
        }
}

Order.getLastNode = function( el,type ){
     var type = "div" || type;
        var result = null;
        if( !el.hasChildNodes() ){
            return result;
        }
        var firstChild = el.getElementsByTagName( type )[0];
        if( !firstChild || firstChild.parentNode != el){
            return result;
        }else{
            var preNode = firstChild;
            var nextNode = preNode.nextSibling;
            while ( nextNode ){
                if( nextNode.nodeName.toUpperCase() == type.toUpperCase() ){
                    preNode = nextNode;
                }
               nextNode = nextNode.nextSibling;
            }
            return preNode;
        }
}

Order.getInstance = function(){
    if( typeof instance == "undefined" ){
        instance = new Order();
        return instance;
    }else{
        return instance;
    }
}


Order.prototype = {
    breadthoder:function( currentNode ){
        if( currentNode == null ){
            return null;
        };
        var nodes = Order.getChildren( currentNode,"div" );
        this.queue = this.queue.concat( nodes ); 
        this.list.push( currentNode );
        this.breadthoder( this.queue.shift() );
        // console.dir( currentNode.firstChild.textContent )
    },

    depthorder:function( currentNode ){
        if( currentNode == null ){
            return null;
        }
        var nodes = Order.getChildren( currentNode, "div" );
        for( var i =0, len = nodes.length; i < len ; i++ ){
            this.depthorder( nodes[i] );
        }
        this.list.push( currentNode );
    },

    preorder :function( currentNode ){
        if( currentNode ==null ){
            return ;
        };
        this.list.push( currentNode );
        var leftNode = Order.getFirstNode(currentNode, "div");
        var rightChild = Order.getLastNode( currentNode, "div" ); 
        this.preorder( leftNode );
        this.preorder( rightChild );
    },

    inorder :function( currentNode ){
        if( currentNode ==null ){
            return ;
        };
        var leftNode = Order.getFirstNode(currentNode, "div");
        var rightChild = Order.getLastNode( currentNode, "div" ); 
        this.inorder( leftNode );
        this.list.push( currentNode );
        this.inorder( rightChild );
        
    },
    
    posteorder :function( currentNode ){
        if( currentNode ==null ){
            return ;
        };
        var leftNode = Order.getFirstNode(currentNode, "div");
        var rightChild = Order.getLastNode( currentNode, "div" ); 
        this.posteorder( leftNode );
        this.posteorder( rightChild );
        this.list.push( currentNode );
    },

    next:function( keyWord ){
        var currentNode = this.list[this.cursor];
        if(currentNode && currentNode != null ){
            currentNode.style.backgroundColor = "#f44";
            function fn(){
                if( currentNode.firstChild.textContent.trim() == keyWord ){
                    currentNode.style.backgroundColor = "#ff4";
                }else{
                    currentNode.style.backgroundColor = "transparent";
                }
                this.cursor++;
                this.next(keyWord);
                window.clearTimeout( timer );
            }
            var timer = window.setTimeout( fn.bind(this), 600 );
        }else{
            this.cursor = 0;
        }
    },

    setSelect:function(el){
        this.select.push(el);
    }
}


var depthBtn = document.getElementById( "depth" );
var breadthBtn = document.getElementById("bredth");
var wrap = document.getElementById("wrap");
var key = document.getElementById("key");
var depthSearchBtn = document.getElementById("depth-search");
var breadthSearchBth = document.getElementById("breadth-search");
var deleteBtn = document.getElementById("delete");
var addBtn = document.getElementById("add");
var text = document.getElementById("nodeText");

function orderHandler(){
    var order = new Order();
    order.depthorder( wrap );
    order.next();
}

depthBtn.addEventListener("click",orderHandler);
breadthBtn.addEventListener("click", orderHandler)

function search(){
    var keyWord = key.value;
    if( !/^\w+$/.test( keyWord ) ){
        alert("格式错误");
        return ;
    }
    var order = new Order();
    order.depthorder( wrap );
    order.next( keyWord );
}

depthSearchBtn.addEventListener("click",search);
breadthSearchBth.addEventListener("click",search);



var o = Order.getInstance(); 
wrap.addEventListener("click", function(e){
    var target = e.target;
    o.setSelect(target);
    target.style.backgroundColor = "#faa";
    console.dir( o );
});

deleteBtn.addEventListener("click",function(){
    while( node = o.select.shift() ){
        node.parentNode.removeChild( node );
    }
});


addBtn.addEventListener("click",function(){
    var textContent = text.value.trim();
    text.value = "";
     if( !/^[\w\u4e00-\u9fa5]{1,10}$/.test( textContent ) ){
            alert("格式错误");
            return ;
        } 
        if( !o.select.length ){
             alert("请选择节点");
            return ;
        }
    while( node = o.select.shift() ){
        var newNode = document.createElement("div");
        newNode.innerHTML = textContent;
        node.appendChild( newNode );
    }
    var divs =  wrap.getElementsByTagName("div");
    for( var i =0; i< divs.length; i++ ){
        divs[i].style.backgroundColor = "transparent";
    }
})
