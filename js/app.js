console.log(100)
//Mimartulebebi
const direct = {
    NORTH : {
        x: 0, y : -1
    },
    SOUTH : {
        x : 0, y : 1
    },
    WEST : {
        x : -1, y : 0
    },
    EAST : {
        x : 1, y : 0
    }

}


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

class MainSnake {
    //Vqmnit gvels da grids da vamatebt gridshi                                                                                                             
    constructor(gridMatrix){
        this.snakeArray = [];
        this.snakeArray.push(new Element(0,1,2));
        this.snakeArray.push(new Element(1,2,2));
        this.snakeArray.push(new Element(3,3,2));
        this.snakeArray.push(new Element(4,4,2));
        this.snakeArray.push(new Element(2,5,2));
        this.grid = gridMatrix;
        //Default Direction
        this.direction = direct.SOUTH;
        this.snakeArray.forEach((element) => {this.grid.addNewElement(element)});
    }


    //Shemdegi svla vashlia/kedelia tu gvelia
    moving(){

        let firstPeace = this.snakeArray[this.snakeArray.length-1];
        let xCoord = firstPeace.X + this.direction.x;
        let yCoord = firstPeace.Y + this.direction.y;
        if (xCoord == 20 || xCoord == -1){
            return "hit";
        }
        if (this.grid.checkTheGrid(xCoord, yCoord) === "null") {

            let shiftElem = this.snakeArray[0];
            this.snakeArray.shift();
            this.snakeArray.push(shiftElem);
            this.grid.pointReplace(shiftElem,xCoord,yCoord);
            return "null";
        }
        if (typeof this.grid.grid[xCoord][yCoord] !== 'undefined' && this.grid.grid[xCoord][yCoord].newElement.id == '-5') {

            let newElement = new Element(this.snakeArray.length, xCoord, yCoord);
            this.snakeArray.push(newElement);
            this.grid.addNewElement(newElement);
            return "apple";
        }

        if (this.grid.checkTheGrid(xCoord, yCoord) === "hit"){
            console.log(100);
            return "hit";
        }
        if (this.grid.checkTheGrid(xCoord,yCoord) === "snake"){
            console.log(213);
            return "snake";
        }

    }


    //shecvla mimartulebis
    directionChange(direction){
        let x = direction.x + this.direction.x;
        let y = direction.y + this.direction.y;

        if (x != 0 && y != 0){

            this.direction = direction;

        }
    }

}

class Apples{

    //vqmni vashls
    constructor(gridMatrix){

        let xCoord = this.rand();

        let yCoord = this.rand();

        this.grid = gridMatrix;

        if(this.grid.grid[xCoord][yCoord] == null){
            this.newApple = new Element(-5, xCoord, yCoord);
        }
        else{
            while(this.grid.grid[xCoord][yCoord] != null){
                xCoord = this.rand();
                yCoord = this.rand();
            }

            this.newApple = new Element(-5, xCoord, yCoord);

        }

        this.grid.addNewElement(this.newApple);

        this.newApple.newElement.classList.add('apple');
        this.newApple.newElement.classList.add('snake-element');
    }
    //random ricxvis dagenerireba 0-20
    rand(){
        let coord = Math.random()*19;
        coord = Math.round(coord);
        return coord;
    }

    //axal adgilas vashlis dadgma
    appear(){
        let xCoord = this.rand();
        let yCoord = this.rand();

        if(this.grid.grid[xCoord][yCoord] == null){
            this.grid.pointReplace(this.newApple,xCoord, yCoord);
        }
        else{
            while(this.grid.grid[xCoord][yCoord] != null){
                xCoord = this.rand();
                yCoord = this.rand();
            }
            this.grid.pointReplace(this.newApple,xCoord, yCoord);

        }
    }
}

//Mtavari Event
window.addEventListener("keydown", function(event){
    if(event.key == 'ArrowUp' || event.key == 'w') {
        snake.directionChange(direct.NORTH);
    }
    if(event.key == 'ArrowDown' || event.key == 's') {
        snake.directionChange(direct.SOUTH);
    }
    if(event.key == 'ArrowLeft' || event.key == 'a') {
        snake.directionChange(direct.WEST);
    }
    if(event.key == 'ArrowRight' || event.key == 'd') {
        snake.directionChange(direct.EAST);
    }
});


//Mtavari funqcia romelic droshi 
function mainFunction(snake, apple) {

    let move = snake.moving();

    if(move == "snake"){
        window.alert("Game Over!\nRestart the page to continue!");

        return;
    }


    if(move == "apple"){
        apple.appear();
        let number = snake.snakeArray.length-4;
        if(number > 4){
            document.getElementById("speed").style.color = "green";
        }
        if(number >= 8){
            document.getElementById("speed").style.color = "blue";
        }
        if(number >= 12){
            document.getElementById("speed").style.color = "orange";
        }
        if(number >= 15){
            document.getElementById("speed").style.color = "red";
        }

        let message = "Level = " + number;
        console.log(message);
        document.getElementById("speed").innerHTML = message;

    }


    if(move == "hit"){
        window.alert("Game Over!\nRestart the page to continue!")
        return;
    }


    window.setTimeout(function () {
        console.log(snake.snakeArray.length-1);
        mainFunction(snake,apple);
    },250 - (10) * snake.snakeArray.length-1);


}


let grid = new Grid();

let snake = new MainSnake(grid);

let apple = new Apples(grid);


mainFunction(snake,apple);

