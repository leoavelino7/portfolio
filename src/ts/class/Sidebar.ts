/**
 * @name Sidebar
 * @description Create side menu bar
 * @access public
 * @version 1.0.0
 * @author Leonardo Avelino
 */
export class Sidebar {
    private _element: Element;
    private _status: boolean;
    private _controller: Element;
    private _wall: Element;

    constructor(elementIdentifier: string, controllerIdentifier: string, wall?: string){
        this._element           = document.querySelector(elementIdentifier);;
        this._controller        = document.querySelector(controllerIdentifier);;
        this._wall              = document.querySelector(wall);
        this._status            = false;

        this._start();
    } 
    
    /**
     * @name _start
     * @description Activates event and wall
     * @access private
     * @return void
     */
    private _start(): void{
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
    private _event(element: Element, type: string, callback: EventListenerObject): void{
        element.addEventListener(type, callback);
    }

    /**
     * @name _change
     * @description Changes display state of elements
     * @access private
     * @return void
     */
    private _change(): void{
        this._status = !this._status;
        this._element.setAttribute("data-collapse", `${this._status}`);
        this._controller.setAttribute("data-open", `${this._status}`);
    }
}