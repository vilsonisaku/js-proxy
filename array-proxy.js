var data = ['a','b','c'];

var pData = new Proxy(data,{
      	set: function(target, i,name) {
        	update(i,name);
        	return target[i]=name;
      	},
  	deleteProperty(target, prop) {
		if (prop in target) {
		  	delete target[prop];
		  	remove(prop);
		}
      	}
})

function update(i,val){
	let d = document;
	let body = d.getElementsByTagName('body')[0];
    	let div = ( () => { 
		for(let i in body.children) { 
			if(body.children[i].className == "top-content") return body.children[i]; 
		} 
		let top = d.createElement('div'); 
		top.className="top-content"; 
		body.insertBefore(top, body.firstChild);
		return top; 
	}) ();

	var is=false;
	for (let c in div.children ){
		if(div.children[c].className == "item-"+i) is=div.children[c];
	}
	if(!is){
		var span = d.createElement('span');
		span.className="item-"+i;
		span.innerHTML=val;
		div.appendChild(span);
	} else {
		is.innerHTML=val;
	}
}

function remove(i){
	let d = document;
	let body = d.getElementsByTagName('body')[0];
    let div = ( () => { 
        for(let i in body.children) { 
          	if(body.children[i].className == "top-content") return body.children[i]; 
        }
		return null;
    }) ();
	if(div) {
        for (let c in div.children ){
			if(div.children[c].className == "item-"+i) div.children[c].remove();
		}
	}
}



pData[0]="item a | ";
pData[1]="item b | ";
pData[2]="item c";



