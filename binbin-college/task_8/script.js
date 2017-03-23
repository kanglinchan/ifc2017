
function Order(){
    this.time = 3000;
    this.timerId = null;
    this.list = [];
    this.cursor  = 0;
    this.queue = [];
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
            }
            window.setTimeout( fn.bind(this), 600 );
        }else{
            this.cursor = 0;
        }
    }
}


var depthBtn = document.getElementById( "depth" );
var breadthBtn = document.getElementById("bredth");
var wrap = document.getElementById("wrap");
var key = document.getElementById("key");
var depthSearchBtn = document.getElementById("depth-search");
var breadthSearchBth = document.getElementById("breadth-search");


depthBtn.addEventListener("click",function(){
    var order = new Order();
    order.depthorder( wrap );
    order.next();
});

breadthBtn.addEventListener("click", function(){
    var order = new Order();
    order.breadthoder( wrap );
    order.next();
    console.dir( order );
})

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
