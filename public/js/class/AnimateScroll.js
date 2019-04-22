/**
   * @name AnimateScroll
   * @description Animate scroll bar
   * @access public
   * @version 1.0.0
   * @author Leonardo Avelino
*/
export class AnimateScroll {
    constructor(identifier, attr, duration, diffY = 0, type, hash) {
        /**
         * @name _scrollToIdOnClick
         * @description Calls the scroling process
         * @access private
         * @param {Event} event: triggered event
         * @internal This function uses the constants responsible for taking the final position and the hash
         * @return void
        */
        this._scrollToIdOnClick = (event) => {
            event.preventDefault();
            // Disabled links
            this._links.forEach(link => link.classList.add("disabled"));
            setTimeout(() => this._links.forEach(link => link.classList.remove("disabled")), this._duration);
            let { currentTarget } = event;
            const posY = this._getAttr(currentTarget).offsetTop + this._diffY, hashName = this._getAttr(currentTarget).id;
            this._scrollToPosition(posY);
            // Checks whether to add the hash or not
            (this._hash) ? history.pushState({}, '', hashName) : null;
        };
        this._links = document.querySelectorAll(identifier);
        this._attr = attr;
        this._duration = duration;
        this._diffY = diffY;
        this._type = type;
        this._hash = hash;
        this._links.forEach(item => item.addEventListener("click", this._scrollToIdOnClick));
        // When change resolution, reposition the scroll bar
        window.onresize = () => {
            let { hash } = window.location;
            this._links.forEach((item) => (item.getAttribute("href") === hash) ? item.click() : null);
        };
    }
    /**
     * @name _getAttr
     * @description Receives the element as parameter and returns some of its attributes
     * @access private
     * @param {any} element
     * @return any {id, offsetTop}
     */
    _getAttr(element) {
        const id = element.getAttribute(this._attr), offsetTop = document.querySelector(id).offsetTop;
        return { id, offsetTop };
    }
    /**
     * @name _scrollToPosition
     * @description Receives end position and calls function for smooth scrolling
     * @access private
     * @internal If only want the native:
     * @tutorial
     * window.scroll({
     *  top: posY,
     *  behavior: "smooth"
     * })
     * @param {number} posY: Y-axis end position
     * @return void
     */
    _scrollToPosition(posY) {
        this._smoothScrollTo(0, posY);
    }
    /**
     * @name _smoothScrollTo
     * @description Smooth scroll animation
     * @access private
     * @param {number} endX: destination x coordinate
     * @param {number} endY: destination y coordinate
     * @return void
    */
    _smoothScrollTo(endX, endY) {
        const startX = window.scrollX || window.pageXOffset, startY = window.scrollY || window.pageYOffset, distanceX = endX - startX, distanceY = endY - startY, startTime = new Date().getTime();
        this._tolRoll(startX, startY, distanceX, distanceY, startTime, this._duration);
    }
    /**
     * @name _tolRoll
     * @description Receives the data and run the scroll
     * @access private
     * @param {number} startX: initial X coordinate
     * @param {number} startY: initial Y coordinate
     * @param {number} distanceX: distance from initial and final X
     * @param {number} distanceY: distance from initial and final Y
     * @param {number} startTime: transition start time
     * @param {number} duration: duration transition
     * @return void
     */
    _tolRoll(startX, startY, distanceX, distanceY, startTime, duration) {
        const timer = setInterval(() => {
            const time = new Date().getTime() - startTime, { newX, newY } = this._selectedType(startX, startY, distanceX, distanceY, startTime, duration); // Retorna os valores incial e final para suavizar
            if (time >= duration) {
                clearInterval(timer);
            }
            window.scroll(newX, newY);
        }, 1000 / 60); // 60 fps 
    }
    /**
     * @name _tolRoll
     * @description Receives the data and run the scroll
     * @access private
     * @param {number} startX: initial X coordinate
     * @param {number} startY: initial Y coordinate
     * @param {number} distanceX: distance from initial and final X
     * @param {number} distanceY: distance from initial and final Y
     * @param {number} startTime: transition start time
     * @param {number} duration: duration transition
     * @return any
     */
    _selectedType(startX, startY, distanceX, distanceY, startTime, duration) {
        const time = new Date().getTime() - startTime;
        let newX, newY;
        switch (this._type) {
            case "easeInOut":
                newX = this._effect(time, startX, distanceX, duration, 4, 3);
                newY = this._effect(time, startY, distanceY, duration, 4, 3);
                break;
            default: // linear
                newX = this._effect(time, startX, distanceX, duration, 4, 4);
                newY = this._effect(time, startY, distanceY, duration, 4, 4);
                break;
        }
        return { newX, newY };
    }
    /**
     * @name _effect
     * @description Responsible for scrolling
     * @access private
     * @internal vars {start} and {end} Responsible for the smootheness of the transition
     * @param {number} time: time scroll
     * @param {number} from: scroll destination
     * @param {number} distance: distance of the route
     * @param {number} duration: transition duration
     * @param {number} start: initial time defining transition type
     * @param {number} end: final time defining transition type
     * @return number
    */
    _effect(time, from, distance, duration, start, end) {
        if ((time /= duration / 2) < 1) {
            return distance / 2 * Math.pow(time, start) + from;
        }
        else {
            return -distance / 2 * ((time -= 2) * Math.pow(time, end) - 2) + from;
        }
    }
}
