export class AnimateScroll {
    private _element: any;
    private _style: string;
    private posEndY: number;
    private _from: number;
    private _to: number;
    private _time: number;
    private _jump: number;
    private _prop: boolean;
    private _nameHash: string;
    private _start: number;
    private _timer: number;

    constructor(element: any, style: string, posEndY: number, from: number, to: number, time: number, jump: number, prop: boolean, nameHash: string = null) {
        this._element   = element;
        this._style     = style;
        this.posEndY    = posEndY;
        this._from      = from;
        this._to        = to;
        this._time      = time;
        this._jump      = jump;
        this._prop      = prop;
        this._nameHash  = nameHash;
        this._start     = new Date().getTime();

        this._animate();
    }

    private _animate() {
        this._timer = setInterval(() => {
            var step: number    = Math.min(1, (new Date().getTime() - this._start) / this._time);
            let calc: number    = this._from + step * (this._to - this._from) + this.posEndY;

           (this._prop) ? this._element[this._style] = calc : this._element.style[this._style] = calc;

           (step === 1) ? clearInterval(this._timer) : null;
            
        }, this._jump);
        
        let result = this._from + this.posEndY;
        
        (this._prop) ? this._element[this._style] = result : this._element.style[this._style] = result;

        (this._nameHash) ? window.location.hash = this._nameHash : null;
    }
}