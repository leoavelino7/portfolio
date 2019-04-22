/**
 * @name Sidebar
 * @description Create side menu bar
 * @access public
 * @version 1.0.0
 * @author Leonardo Avelino
 */
export class Sidebar {
    constructor(elementIdentifier, controllerIdentifier, wall) {
        this._element = document.querySelector(elementIdentifier);
        ;
        this._controller = document.querySelector(controllerIdentifier);
        ;
        this._wall = document.querySelector(wall);
        this._status = false;
        this._start();
    }
    /**
     * @name _start
     * @description Activates event and wall
     * @access private
     * @return void
     */
    _start() {
        this._event(this._controller, "click", this._change.bind(this));
        (this._wall) ? this._event(this._wall, "click", this._change.bind(this)) : null;
    }
    /**
     * @name _event
     * @description Activates event and wall
     * @access private
     * @param {Element} element: target of the event
     * @param {string} type: event type
     * @param {EventListenerObject} callback: function to perform when listening to an event
     * @return void
     */
    _event(element, type, callback) {
        element.addEventListener(type, callback);
    }
    /**
     * @name _change
     * @description Changes display state of elements
     * @access private
     * @return void
     */
    _change() {
        this._status = !this._status;
        this._element.setAttribute("data-collapse", `${this._status}`);
        this._controller.setAttribute("data-open", `${this._status}`);
    }
}
