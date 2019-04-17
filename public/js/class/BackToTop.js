import { AnimateScroll } from "./AnimateScroll.js";
export class BackToTop {
    constructor(elementClassName, posTopY = 0) {
        this._elements = this._searchElement(elementClassName);
        this._posTopY = posTopY;
        this._start();
    }
    _start() {
        this._elements.then(list => {
            list.forEach(element => {
                this._event(element, this._posTopY);
            });
        });
    }
    _searchElement(className) {
        return new Promise((resolve, reject) => {
            resolve(document.querySelectorAll(`.${className}`));
        });
    }
    _event(element, posY) {
        element.addEventListener("click", () => new AnimateScroll(document.scrollingElement || document.documentElement, "scrollTop", -300, window.scrollY, posY, 2000, 15, true, "TOPO"));
    }
}
