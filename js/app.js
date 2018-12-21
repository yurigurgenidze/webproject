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

class Grid{
    //matricis sheqmna
    static createArrayMatrix(){
        let matrix = [];
        for(let i = 0; i<20; i++){
            matrix[i] = [];
            for(let j = 0; j<20; j++){
                matrix[i][j] = null;
            }
        }
        return matrix;
    }


    constructor(){

        this.grid = Grid.createArrayMatrix();
        this.container = document.querySelector('#container');
    }
    //axali elementis chagdeba
    addNewElement (Element){
        this.grid[Element.X][Element.Y] = Element;
        this.container.appendChild(Element.newElement);
    }

    //gvelis wertilis shecvla
    pointReplace(element,x,y){
        element.X = x;
        element.Y = y;
        this.grid[element.X][element.Y] = null;
        this.grid[x][y] = element;

    }

    //Shevamowmot matrica
    checkTheGrid(xCoord, yCoord){
        if(xCoord == 20 || yCoord === 20){
            return "hit";
        }
        //console.log(xCoord + " " + yCoord);
        //console.log(this.grid[xCoord][yCoord] + " " + xCoord + " " + yCoord);
        if(typeof this.grid[xCoord][yCoord] !== 'undefined') {

            if (this.grid[xCoord][yCoord] == null) {
                return "null";
            } else if (this.grid[xCoord][yCoord].id == -5) {
                return "apple";
            } else {
                return "snake";
            }
        }
        else {
            return "hit";
        }
    }




}