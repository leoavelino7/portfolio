export class AnimateScroll {
    constructor(element, style, posEndY, from, to, time, jump, prop, nameHash = null) {
        this._element = element;
        this._style = style;
        this.posEndY = posEndY;
        this._from = from;
        this._to = to;
        this._time = time;
        this._jump = jump;
        this._prop = prop;
        this._nameHash = nameHash;
        this._start = new Date().getTime();
        this._animate();
    }
    _animate() {
        this._timer = setInterval(() => {
            var step = Math.min(1, (new Date().getTime() - this._start) / this._time);
            let calc = this._from + step * (this._to - this._from) + this.posEndY;
            (this._prop) ? this._element[this._style] = calc : this._element.style[this._style] = calc;
            (step === 1) ? clearInterval(this._timer) : null;
        }, this._jump);
        let result = this._from + this.posEndY;
        (this._prop) ? this._element[this._style] = result : this._element.style[this._style] = result;
        (this._nameHash) ? window.location.hash = this._nameHash : null;
    }
}
