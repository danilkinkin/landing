import UI from '../core/UI.js';

export class useState {
	_value;
	_listeners;

	constructor(defaultValue) {
	    this._value = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
	    this._listeners = [];

	    return [this._computeValue, this._setValue, this._addListener];
	}

	get _computeValue() {
	    return this._value;
	}

	_setValue = (mutationCallbackOrValue) => {
	    const oldValue = this._value;
	    this._value = typeof mutationCallbackOrValue === 'function' ? mutationCallbackOrValue(this._value) : mutationCallbackOrValue;
	    if (this._value === oldValue) return;
	    this._listeners.forEach((listener) => listener(this._value, oldValue));
	}

	_addListener = (newListener) => {
	    this._listeners.push(newListener);

	    newListener(this._value);
	}
}

export function observer(mutation, listeners, element) {
    const obsvElem = UI('obsv').append(element);

    listeners.forEach((listener) => listener((value, oldValue) => {
        const mutationElem = mutation(element, value, oldValue);
        if (mutationElem) obsvElem.append(mutationElem);
    }));

    return obsvElem;
}
