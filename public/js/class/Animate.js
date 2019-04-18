export class Animate {
    constructor(identifier, attr, duration, type, hash) {
        // Solicita que a rolagem seja iniciada de acordo com o elemento recebido através do evento
        this._scrollToIdOnClick = event => {
            event.preventDefault();
            let { currentTarget } = event;
            const posY = this._getAttr(currentTarget).offsetTop - 80, hashName = this._getAttr(currentTarget).id;
            // Inicia o processo de rolagem do scroll enviando a posição y final
            this._scrollToPosition(posY);
            // Verifica se é para adicionar um hash ou não
            (this._hash) ? history.pushState({}, '', hashName) : null;
        };
        this._links = document.querySelectorAll(identifier);
        this._attr = attr;
        this._duration = duration;
        this._type = type;
        this._hash = hash;
        this._links.forEach(item => item.addEventListener("click", this._scrollToIdOnClick));
    }
    // Recebe o elemento como parâmetro e retorna alguns de seus atributos
    _getAttr(element) {
        const id = element.getAttribute(this._attr), offsetTop = document.querySelector(id).offsetTop;
        return { id, offsetTop };
    }
    // Recebe a posição y final e inicia chama a função que suaviza a rolagem
    _scrollToPosition(posY) {
        this._smoothScrollTo(0, posY);
    }
    // Recebe a posição X e Y final. E calcula a distância total que da rolagem (ponto inicial ao ponto final)
    _smoothScrollTo(endX, endY) {
        const startX = window.scrollX || window.pageXOffset, startY = window.scrollY || window.pageYOffset, distanceX = endX - startX, distanceY = endY - startY, startTime = new Date().getTime();
        // Efetua a rolagem informando os dados necessários
        this.tolRoll(startX, startY, distanceX, distanceY, startTime, this._duration);
    }
    // Recebe os dados e executa a rolagem
    tolRoll(startX, startY, distanceX, distanceY, startTime, duration) {
        const timer = setInterval(() => {
            const time = new Date().getTime() - startTime, { newX, newY } = this._selectedType(startX, startY, distanceX, distanceY, startTime, duration); // Retorna os valores incial e final para suavizar
            if (time >= duration) {
                clearInterval(timer);
            }
            window.scroll(newX, newY);
        }, 1000 / 60); // 60 fps 
    }
    // Calcula e retorna os valores finais de acordo com o tipo de suavização
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
    // Responsável por efetuar a rolagem
    _effect(time, from, distance, duration, start, end) {
        if ((time /= duration / 2) < 1) {
            return distance / 2 * Math.pow(time, start) + from;
        }
        else {
            return -distance / 2 * ((time -= 2) * Math.pow(time, end) - 2) + from;
        }
    }
}
