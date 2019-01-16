(function(){
	var machine = {
		newElement: function(param, children, parent, initEvent){

			param = param? param : {};
			param.type = param.type? param.type : "div"; 

			var i = 0;
			var result = {
				element: document.createElement(param.type),
				attribute: {
					set: function(attr){
						if(attr.forEach)
							for(i=0; i<attr.length; i++){
								if(attr[i]) result.element.setAttribute(attr[i].key, attr[i].value);
							}
						else
							result.element.setAttribute(attr.key, attr.value)
					},
					remove: function(attr){
						if(attr.forEach)
							for(i=0; i<attr.length; i++){
								if(attr[i]) result.element.removeAttribute(attr[i]);
							}
						else
							result.element.removeAttribute(attr)
					},
					contain: function(attr){

					}
				},
				class: {
					add: function(attr){
						if(typeof(attr) == "object"){
							for(i=0; i<attr.length; i++){
								if(attr[i] != "") result.element.classList.add(attr[i]);
							}
						}else
							if(attr != "") result.element.classList.add(attr)
					},
					remove: function(attr){
						if(typeof(attr) == "object"){
							for(i=0; i<attr.length; i++){
								if(attr[i] != "") result.element.classList.remove(attr[i]);
							}
						}else
							if(attr != "") result.element.classList.remove(attr)
					},
					contain: function(attr){

					}
				},
				children: {
					add: function(attr){
						if(attr.forEach)
							for(i=0; i<attr.length; i++){
								if(attr[i]) result.element.appendChild(attr[i].element)
							}
						else
							if(attr) result.element.appendChild(attr.element)
					},
					remove: function(attr){
						if(attr.forEach)
							for(i=0; i<attr.length; i++){
								if(attr[i]) result.element.removeChild(attr[i].element);
							}
						else
							if(attr) result.element.removeChild(attr.element)
					}
				},
				text: function(text){
					result.element.textContent = text;
				}
			}

			if(param.attr) result.attribute.set(param.attr);
			if(param.class) result.class.add(param.class);
			if(param.text) result.text(param.text);
			if(children) result.children.add(children);

			if(initEvent) initEvent(result);

			return result;
		},
		newSvg: function(link, isUse){
			var svg = machine.newElement();
			if(isUse){
				svg.element = document.createElementNS('http://www.w3.org/2000/svg', "svg");
				var use = document.createElementNS('http://www.w3.org/2000/svg', "use");
				use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", link);
				svg.element.appendChild(use);
			}
			return svg;
		}
	};

	window.UI = machine;
})();