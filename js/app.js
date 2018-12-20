console.log(100)
class Element{

    constructor(uniqueId, xCoord, yCoord){
        this.newElement = document.createElement('div');
        if (uniqueId%2==0){
            this.newElement.classList.add('snake-element1');
        }
        else{
            this.newElement.classList.add('snake-element2');
        }

        this.newElement.id = uniqueId;
        this.X = xCoord;
        this.Y = yCoord;

    }


    set X (xCoord) {

        this.x = xCoord;
        let product = xCoord * 4;
        this.newElement.style.marginLeft = product + 'vh';

    }
    set Y (yCoord) {

        this.y = yCoord;
        let product = yCoord * 4;
        this.newElement.style.marginTop = product + 'vh';

    }
    get X(){

        return this.x;

    }
    get Y(){

        return this.y;

    }


}