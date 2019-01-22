function UI(type, param){
	var element = document.createElement(type);
	if(param){
		if(param.class) element.className = param.class;

		if(param.attr){
			if(param.attr.forEach)
				for(i=0; i<param.attr.length; i++)
					element.setAttribute(param.attr[i].key, param.attr[i].value);
			else
				element.setAttribute(param.attr.key, param.attr.value);
		}
		
		if(param.style){
			if(param.style.forEach)
				for(i=0; i<param.style.length; i++)
					element.style[param.style[i].key] = param.style[i].value;
			else
				element.style[param.style.key] = param.style.value;
		}

		if(param.content){
			if(!param.contentHTML) element.textContent = param.content;
			else element.innerHTML = param.content;
		}
	}

	//Class
	this.class = function(cls){
		element.className = cls;
		return this;
	}
	this.addClass = function(cls){
		element.classList.add(cls);
		return this;
	}
	this.removeClass = function(cls){
		element.classList.remove(cls);
		return this;
	}
	//Attribute
	this.addAttribute = function(attrKey, attrValue){
		element.setAttribute(attrKey, attrValue)
		return this;
	}
	this.removeAttribute = function(attr){
		element.removeAttribute(attr);
		return this;
	}
	//Content
	this.clearContent = function(){
		element.innerHTML = "";
		return this;
	}
	this.text = function(text){
		element.textContent += text;
		return this;
	}
	this.innerHTML = function(html){
		element.innerHTML += html;
		return this;
	}
	this.append = function(newElement){
		if(newElement) element.appendChild(newElement.getHTML());
		return this;
	}
	this.appendBefore = function(newElement, referenceElement){
		if(newElement) element.insertBefore(newElement.getHTML(), referenceElement.getHTML());
		return this;
	}
	this.remove = function(removeElement){
		removeElement.destroy();
		return this;
	}
	this.destroy = function(){
		element.remove();
		return this;
	}
	this.getHTML = function(){
		return element;
	}

	return this;
}