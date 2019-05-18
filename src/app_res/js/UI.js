/**
 * Light UI library
 * @author Danilkinkin <hello@danilkinkin.com>
 */

class UI{
	constructor(element){
		if(typeof element == "object"){
			this._dom = element;
		}else{
			this._dom = document.createElement(element || "div");
		}		
		this._customEvents = {};
	}

	get html(){
		return this._dom;
	}

	destroy(){
		this._dom.remove();

		return null;
	}
	class(clsName){
		if(clsName) this._dom.className = clsName;
		let _dom = this._dom;

		return new class UIClass extends UI{
			constructor(){
				super();
				this._dom = _dom;
			}
			add(cls){
				this._dom.classList.add(cls);

				return this;
			}
			has(cls){
				return this._dom.classList.contains(cls);
			}
			remove(cls){
				this._dom.classList.remove(cls);

				return this;
			}
		};
	}

	style(stl){
		if(stl) this._dom.style = stl;
		let _dom = this._dom;

		return new class UIStyle extends UI{
			constructor(){
				super();
				this._dom = _dom;
			}
			add(key, value){
				if(key && value) this._dom.style[key] = value;
				else console.error("UI: Invalid arguments for add style method. Method should be called as 'add(name, value)'");

				return this;
			}
			remove(key){
				if(key) this._dom.style[key] = "";

				return this;
			}
		};
	}

	attribute(key, value){
		if(key) this._dom.setAttribute(key, /*(value == undefined ? undefined : value) || ""*/value);
		let _dom = this._dom;

		return new class UIAttribute extends UI{
			constructor(){
				super();
				this._dom = _dom;
			}
			add(key, value){
				if(key) this._dom.setAttribute(key, value || "");

				return this;
			}
			remove(key){
				if(key) this._dom.removeAttribute(key);

				return this;
			}
		};
	}

	event(action, callback){
		if(action){
			if(!callback)console.error("UI: Not find callback function for event. Method 'event' should be called as 'event(actionName, callbackAction)'");
			else this._dom["on"+action] = (e)=>{callback(e, this)};
		}
		let _dom = this._dom;

		return new class UIEvent extends UI{
			constructor(){
				super();
				this._dom = _dom;
			}
			add(action, callback){
				if(!this._customEvents[action]) this._customEvents[action] = new CustomEvent(action, arguments[3] || {});
				this._dom.addEventListener(action, (e)=>{callback(e, this)}, arguments[2] || false);

				return this;
			}
			remove(action, callback){
				if(action){
					if(callback) this._dom.removeEventListener(action, callback, arguments[2] || false);
					else this._dom["on"+action] = null;
				}else console.error("UI: Not find action name. Method 'remove' should be called as 'remove(actionName[, callbackAction])'");

				return this;
			}
			call(action, result){
				if(action){
					if(this._customEvents[action]) this._dom.dispatchEvent(this._customEvents[action]);
					else{
						if(result) result(()=>this._dom[action]());					
						else this._dom[action]();
					}	
				}else console.error("UI: Not find action name. Method 'call' should be called as 'call(actionName[, callbackActionResult])'");							

				return this;
			}
		};
	}

	append(content){
		if(content){
			if(typeof content == "object") this._dom.appendChild(content.html || content);
			else this._dom.innerHTML += content;
		}		
		let _dom = this._dom;

		return new class UIAppend extends UI{
			constructor(){
				super();
				this._dom = _dom;
			}
			before(content){
				//TODO
				/*if(typeof content == "object") this._dom.insertBefore(content.html || content, this._dom.html.firstChild())
				else this._dom.innerHTML = content + this._dom.innerHTML;*/

				return this;
			}
			text(str){
				this._dom.textContent += str;

				return this;
			}
		};
	}

	insert(parentNode){
		if(parentNode){
			if(typeof parentNode == "object") (parentNode.html || parentNode).appendChild(this._dom);
		}

		return this;
	}

	content(content){
		if(content) this._dom.innerHTML = content;

		let _dom = this._dom;

		return new class UIContent extends UI{
			constructor(){
				super();
				this._dom = _dom;
			}
			text(str){
				this._dom.textContent = str;

				return this;
			}
			clear(){
				this._dom.innerHTML = "";

				return this;
			}
		};
	}

	static replace(UIa, UIb){
		//TODO

		return this;
	}

	static create(){
		return new UI(...arguments);
	}
}