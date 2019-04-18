 /**
    * @name AnimateScroll
    * @description Animate scroll bar
    * @access public
    * @version 1.0.0
*/
export class AnimateScroll {
    private _links: NodeListOf<Element>;
    private _attr: string;
    private _duration: number;
    private _diffY: number;
    private _type: string;
    private _hash: boolean;

    constructor(identifier: string, attr: string, duration:number, diffY: number = 0, type?: string, hash?: boolean){
        this._links     = document.querySelectorAll(identifier);
        this._attr      = attr;
        this._duration  = duration;
        this._diffY     = diffY;
        this._type      = type;
        this._hash      = hash;
        this._links.forEach(item => item.addEventListener("click", this._scrollToIdOnClick));
    }

    /**
     * @name _scrollToIdOnClick
     * @description Calls the scroling process
     * @access private
     * @param {Event} event: triggered event 
     * @internal This function uses the constants responsible for taking the final position and the hash
     * @return void
    */
    private _scrollToIdOnClick = (event: Event): void => {
        event.preventDefault();
        let { currentTarget } = event;
        const posY: number      = this._getAttr(currentTarget).offsetTop + this._diffY,
              hashName: string  = this._getAttr(currentTarget).id;
        
        this._scrollToPosition(posY);

        // Checks whether to add the hash or not
        (this._hash) ? history.pushState({}, '', hashName) : null;
    }
    
    /**
     * @name _getAttr
     * @description Receives the element as parameter and returns some of its attributes
     * @access private
     * @param {any} element 
     * @return any {id, offsetTop}
     */
    private _getAttr(element: any): any{
        const id: any        = element.getAttribute(this._attr),
              offsetTop: any = document.querySelector(id).offsetTop;
            
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
    private _scrollToPosition(posY: number): void{
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
    private _smoothScrollTo(endX: number, endY: number): void{
        const startX:number    = window.scrollX || window.pageXOffset,
              startY:number    = window.scrollY || window.pageYOffset,
              distanceX:number = endX - startX,
              distanceY:number = endY - startY,
              startTime:number = new Date().getTime();
        
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
    private _tolRoll(startX:number, startY:number, distanceX:number, distanceY:number, startTime:number, duration: number): void{
        const timer = setInterval(() => {
            const time:number  = new Date().getTime() - startTime,
                  { newX, newY } = this._selectedType(startX, startY, distanceX, distanceY, startTime, duration); // Retorna os valores incial e final para suavizar
            
            if(time >= duration){
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
    private _selectedType(startX:number, startY:number, distanceX:number, distanceY:number, startTime:number, duration: number): any{
        const time:number  = new Date().getTime() - startTime;
        let newX:number, newY:number;

        switch(this._type){
            case "easeInOut":
                newX    = this._effect(time, startX, distanceX, duration, 4, 3);
                newY    = this._effect(time, startY, distanceY, duration, 4, 3);
                break;

            default: // linear
                newX    = this._effect(time, startX, distanceX, duration, 4, 4);
                newY    = this._effect(time, startY, distanceY, duration, 4, 4);
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
    private _effect(time: number, from: number, distance: number, duration: number, start: number, end: number):number{
        if((time /= duration / 2) < 1){
            return distance / 2 * Math.pow(time, start) + from;
        }else{
            return -distance / 2 * ((time -= 2) * Math.pow(time, end) - 2) + from;
        }
    }
}