export class Sidebar {
    constructor(elementIdentifier, controllerIdentifier) {
        this._element = this._searchElement(elementIdentifier);
        this._controller = this._searchElement(controllerIdentifier);
        this._status = false;
        this._start();
    }
    _start() {
        this._controller.then(element => {
            this._eventInController(element);
        });
    }
    _searchElement(identifier) {
        return new Promise((resolve, reject) => {
            resolve(document.querySelector(`#${identifier}`));
        });
    }
    _eventInController(element) {
        element.addEventListener("click", () => {
            this._status = !this._status;
            this._changeState(this._element, "data-collapse");
            this._changeState(this._controller, "data-open");
        });
    }
    _changeState(promise, attribute) {
        promise.then(element => element.setAttribute(attribute, this._status));
    }
}
