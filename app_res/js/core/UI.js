function UIConstructor(element){
	this._html = element;

	this.append = (appendElem) => {
		if(appendElem.forEach){
			appendElem.forEach(elem => this.append(elem));
			return this;
		}

		appendElem = appendElem && appendElem.render || appendElem;

		if(!appendElem) return this;

		if(appendElem instanceof Element || appendElem instanceof UIConstructor){
			this._html.appendChild(appendElem._html || appendElem);
		}else{
		this._html.innerHTML = appendElem._html || appendElem;
		}

		return this;	
	};

	this.text = (textAppend) => {
		this._html.innerHTML = textAppend;

		return this;
	};

	this.attribute = (key, value) => {
		if(key) this._html.setAttribute(key, value);

		return this;
	};

	this.className = (clsName) => {
		if(clsName) this._html.className = clsName;

		return new UIClassName(this);
	};

	this.style = (key, value) => {
		if(this._html.style[key] !== undefined){
			this._html.style[key] = value || "";
		}		

		return new UIStyle(this);
	};

	this.toString = () => this._html.outerHTML;

	this.html = this._html;

	this.insert = (parentNode) => {
		if(parentNode){
			if(typeof parentNode == "object") (parentNode._html || parentNode).appendChild(this._html);
		}

		return this;
	};
}

function UIClassName(parent){
	this.__proto__ = parent;

	this.add = (clsName) => {
		if(clsName) this._html.classList.add(clsName);

		return this;
	};

	this.remove = (clsName) => {
		if(clsName) this._html.classList.remove(clsName);

		return this;
	};
}

function UIStyle(parent){
	this.__proto__ = parent;

	this.add = (key, value) => {
		if(this._html.style[key] === undefined){
			console.error(`UI: Unknown style key [${key}]`);
			return this;
		}

		this._html.style[key] = value || "";

		return this;
	};

	this.remove = (key) => {
		if(this._html.style[key] === undefined){
			console.error(`UI: Unknown style key [${key}]`);
			return this;
		}

		this._html.style[key] = "";

		return this;
	};
}

const UIDev = (element) => {
	let computeElement = element instanceof Element? element : document.createElement(element || "div");

	return new UIConstructor(computeElement);
};

class UI{
	constructor(element){
		if(
			element instanceof UI
			/*|| element instanceof UIClass
			|| element instanceof UIStyle
			|| element instanceof UIAttribute
			|| element instanceof UIEvent
			|| element instanceof UIAppend
			|| element instanceof UIContent*/
		){
			return element;
		}else if(typeof element === "function"){
			return UI.create(element());
		}else if(typeof element === "object"){
			this._dom = element;
		}else{
			this._dom = document.createElement(element || "div");
		}			
		this._customEvents = {};
		this._root = this;
	}

	get html(){
		return this._root._dom;
	}

	destroy(){
		this._root._dom.remove();

		return null;
	}

	class(clsName){
		if(clsName) this._root._dom.className = clsName;
		let _root = this._root;

		return new class UIClass extends UI{
			constructor(){
				super();
				this._root = _root;
			}
			add(cls){
				if(cls) _root._dom.classList.add(cls);

				return this;
			}
			has(cls){
				return cls? _root._dom.classList.contains(cls) : true;
			}
			remove(cls){
				if(cls) _root._dom.classList.remove(cls);

				return this;
			}
		};
	}

	style(stl){
		if(stl){
			if(typeof stl === "object"){
				Object.keys(stl).forEach(key => this._root._dom.style[key] = stl[key]);
			}else this._root._dom.style = stl;
		}
		let _root = this._root;

		return new class UIStyle extends UI{
			constructor(){
				super();
				this._root = _root;
			}
			add(keyOrStl, value){
				if(typeof keyOrStl === "object"){
					Object.keys(keyOrStl).forEach(key => this._root._dom.style[key] = keyOrStl[key]);
				}else{					
					if(keyOrStl && value) _root._dom.style[keyOrStl] = value;
					else console.error("UI: Invalid arguments for add style method. Method should be called as 'add(name, value)'");
				}

				return this;
			}
			remove(keyOrStl){
				if(keyOrStl){
					if(typeof keyOrStl === "object"){
						Object.keys(keyOrStl).forEach(key => this._root._dom.style[key] = "");
					}else{
						_root._dom.style[keyOrStl] = "";
					}
				}				

				return this;
			}
		};
	}

	attribute(key, value){
		if(key) this._root._dom.setAttribute(key, /*(value == undefined ? undefined : value) || ""*/value);
		let _root = this._root;

		return new class UIAttribute extends UI{
			constructor(){
				super();
				this._root = _root;
			}
			add(key, value){
				if(key) _root._dom.setAttribute(key, value || "");

				return this;
			}
			remove(key){
				if(key) _root._dom.removeAttribute(key);

				return this;
			}
		};
	}

	event(action, callback){
		if(action){
			if(!callback) 
				console.error("UI: Not find callback function for event. "
					+"Method 'event' should be called as 'event(actionName, callbackAction)'");
			else this._root._dom["on"+action] = (e)=>{callback(e, this)};
		}
		let _root = this._root;

		return new class UIEvent extends UI{
			constructor(){
				super();
				this._root = _root;
			}
			add(action, callback){
				if(!_root._customEvents[action]) _root._customEvents[action] = new CustomEvent(action, arguments[3] || {});
				_root._dom.addEventListener(action, (e)=>{callback(e, _root)}, arguments[2] || false);

				return this;
			}
			remove(action, callback){
				if(action){
					if(callback) _root._dom.removeEventListener(action, callback, arguments[2] || false);
					else _root._dom["on"+action] = null;
				}else console.error("UI: Not find action name. Method 'remove' should be called as 'remove(actionName[, callbackAction])'");

				return this;
			}
			call(action, result){
				if(action){
					if(_root._customEvents[action]) _root._dom.dispatchEvent(_root._customEvents[action]);
					else{
						if(result) result(()=>_root._dom[action]());					
						else _root._dom[action]();
					}	
				}else console.error("UI: Not find action name. Method 'call' should be called as 'call(actionName[, callbackActionResult])'");							

				return this;
			}
		};
	}

	append(content){
		if(content){
			if(typeof content != "object" && typeof content != "function"){
				this._root._dom.innerHTML += content;
			}else{
				content = typeof content == "function"? content() : content;
				if(content.forEach){
					content.forEach(el => {
						el = typeof el == "function"? el() : el;
						if(el) this._root._dom.appendChild((el && el.render || el).html || el)
					});
				}else{
					if(content) this._root._dom.appendChild((content && content.render || content).html || content);					
				}
			}
			if(this._root._customEvents["appendcontent"]) this._root._dom.dispatchEvent(this._root._customEvents["appendcontent"]);
		}		
		let _root = this._root;

		return new class UIAppend extends UI{
			constructor(){
				super();
				this._root = _root;
			}
			before(content){
				//TODO
				/*if(typeof content == "object") this._dom.insertBefore(content.html || content, this._dom.html.firstChild())
				else this._dom.innerHTML = content + this._dom.innerHTML;*/

				return this;
			}
			text(str){
				_root._dom.textContent += str;

				return this;
			}
		};
	}

	insert(parentNode){
		if(parentNode){
			if(typeof parentNode == "object") (parentNode.html || parentNode).appendChild(this._root._dom);
		}

		return this;
	}

	content(content){
		if(content){
			this._root._dom.innerHTML = content;
			if(this._root._customEvents["appendcontent"]) this._root._dom.dispatchEvent(this._root._customEvents["appendcontent"]);
		}

		let _root = this._root;

		return new class UIContent extends UI{
			constructor(){
				super();
				this._root = _root;
			}
			text(str){
				_root._dom.textContent = str;

				return this;
			}
			clear(){
				_root._dom.innerHTML = "";
				if(_root._customEvents["clearcontent"]) _root._dom.dispatchEvent(_root._customEvents["clearcontent"]);

				return this;
			}
		};
	}

	static create(){
		return new UI(...arguments);
	}
}

export default UIDev;