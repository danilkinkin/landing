function UI(type, param){
	var element = document.createElement(type);

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
	this.text = function(text){
		element.textContent = text;
		return this;
	}
	this.innerHtml = function(html){
		element.innerHtml = html;
		return this;
	}
	this.append = function(newElement){
		element.appendChild(newElement.getHTML());
		return this;
	}
	this.appendBefore = function(newElement, referenceElement){
		element.insertBefore(newElement.getHTML(), referenceElement.getHTML());
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