/**
 * @name ScrollSpy
 * @description Create side menu bar
 * @access public
 * @version 1.0.0
 * @author Leonardo Avelino
*/
export class ScrollSpy {
    constructor(identifier) {
        this.elements = {};
        this.identifier = identifier;
        this._mountList();
        this._start();
        window.onscroll = () => this._start();
    }
    /**
     * @name _mountList
     * @description Mount to the list of elements
     * @access private
     * @return void
    */
    _mountList() {
        let list = document.querySelectorAll(this.identifier);
        for (let i = 0; i < list.length; i++) {
            this.elements[list[i].id] = list[i].offsetTop;
        }
    }
    /**
     * @name nearestValue
     * @description Check the numbers closest (in list) to a certain number
     * @access public
     * @param {Array<number>} ideals: list of numbers
     * @param {number} value: value to be approximated
     * @return Array<Number>
    */
    nearestValue(ideals, value) {
        let lo = -1, hi = ideals.length;
        while (hi - lo > 1) {
            let mid = Math.round((lo + hi) / 2);
            (ideals[mid] <= value) ? lo = mid : hi = mid;
        }
        if (ideals[lo] == value)
            hi = lo;
        return [ideals[lo], ideals[hi]];
    }
    /**
     * @name _mountArrayNumber
     * @description Mount to the list of numbers
     * @access private
     * @param {Object} list
     * @return Array<number>
    */
    _mountArrayNumber(list) {
        let myArray = [];
        for (let item in list) {
            myArray.push(list[item]);
        }
        return myArray;
    }
    /**
     * @name _start
     * @description Controls the active item according to the scroll
     * @access private
     * @return void
    */
    _start() {
        let myListNumber = this._mountArrayNumber(this.elements), scrollPosition = (document.documentElement.scrollTop || document.body.scrollTop), arrayResult = this.nearestValue(myListNumber, scrollPosition);
        for (let id in this.elements) {
            if (this.elements[id] === arrayResult[1]) {
                let oldElement = document.querySelector(`.active`), newElement = document.querySelector(`a[href*=${id}]`);
                oldElement.classList.remove("active");
                newElement.classList.add("active");
                break;
            }
        }
    }
}
