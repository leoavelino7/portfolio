import { AnimateScroll } from "./AnimateScroll.js";

export class BackToTop {
    private _elements: any;
    private _posTopY: number;

    constructor(elementClassName: any, posTopY: number = 0){
        this._elements  = this._searchElement(elementClassName);
        this._posTopY   = posTopY;
        this._start();
    }

    private _start(){
        this._elements.then(list => {
            list.forEach(element => {
                this._event(element, this._posTopY);
            });
        });
    }

    private _searchElement(className: String): any{
        return new Promise<Object>((resolve, reject) => {
            resolve(document.querySelectorAll(`.${className}`));
        });
    }

    private _event(element: any, posY: number){
        element.addEventListener("click", () => new AnimateScroll(document.scrollingElement || document.documentElement, "scrollTop", -300, window.scrollY, posY, 2000, 15, true, "TOPO"));
    }
}