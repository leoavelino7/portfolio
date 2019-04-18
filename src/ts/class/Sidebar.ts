export class Sidebar {
    private _element: Promise<void>;
    private _status: boolean;
    private _controller: Promise<void>;

    constructor(elementIdentifier: string, controllerIdentifier: string){
        this._element           = this._searchElement(elementIdentifier);
        this._controller        = this._searchElement(controllerIdentifier);
        this._status            = false;
        this._start();
    } 
    
    private _start(){
        this._controller.then(element => {
            this._eventInController(element);
        });
    }

    private _searchElement(identifier: string): any{
        return new Promise<Object>((resolve, reject) => {
            resolve(document.querySelector(identifier));
        });
    }

    private _eventInController(element: any){
        element.addEventListener("click", () => {
            this._status = !this._status;
            this._changeState(this._element, "data-collapse");
            this._changeState(this._controller, "data-open");
        });
    }

    private _changeState(promise: Promise<any>, attribute: String){
        promise.then(element => element.setAttribute(attribute, this._status));
    }
}