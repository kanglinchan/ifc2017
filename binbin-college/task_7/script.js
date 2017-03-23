
function Order(){
    this.time = 3000;
    this.timerId = null;
    this.list = [];
    this.cursor  = 0;
}

Order.getChild = function(el, type){
        var type = "div" || type;
        var list = [];
        if( !el.hasChildNodes() ){
            return list;
        }
        var nodes = el.getElementsByTagName( type );
        var firstChild = nodes[0];
        if( firstChild.parentNode != el){
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
    next(){
        var currentNode = this.list[this.cursor];
        if(currentNode && currentNode != null ){
            currentNode.style.backgroundColor = "#f44";
            function fn(){
                currentNode.style.backgroundColor = "transparent";
                this.cursor++;
                this.next();
            }
            window.setTimeout( fn.bind(this), 600 );
        }else{
            this.cursor = 0;
        }
    }
}


var wrap = document.getElementById("wrap");
var preBtn = document.getElementById("pre");
var inBtn = document.getElementById("in");
var postBtn = document.getElementById("post");


preBtn.addEventListener("click" ,function(){
    var o = new Order();
    o.preorder( wrap );
    o.next();
    console.dir(o);
})

inBtn.addEventListener("click" ,function(){
    var inO = new Order();
    inO.inorder( wrap );
    inO.next();
})

postBtn.addEventListener("click" ,function(){
    var o = new Order();
    o.posteorder( wrap );
    o.next();
})