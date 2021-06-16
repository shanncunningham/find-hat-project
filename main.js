const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArray){
      this._fieldArray = fieldArray;
      this.locationX = 0;
      this.locationY = 0; 
    }
    
    // method to run the game loop
    runGame() {
        let playing = true;
        while(playing) {
            this.print();
            this.askQuestion();
            if(this.isOutOfBounds()) {
                console.log('You moved out of bounds! You lose');
                playing = false;
                break;
            } else if(this.isHole()) {
                console.log('You fell in a hole! You lose');
                playing = false;
                break;
            } else if(this.isHat()) {
                console.log('Congrats, you found your hat!');
                playing=false;
                break;
            }
            //Update the user location on the map
            this._fieldArray[this.locationY][this.locationX] = pathCharacter;
        }
    } 


    //method to ask the user for input 
    askQuestion() {
        const answer = prompt('Which way? ').toUpperCase();
        switch(answer) {
            case 'U':
                this.locationY -= 1;
                break;
            case 'D':
                this.locationY += 1;
                break;
            case 'L':
                this.locationX -= 1;
                break;
            case 'R':
                this.locationX += 1;
                break;
            default:
                console.log('Enter U, D, L or R');
                this.askQuestion();
                break; 
        }
    }

    //true false methods to check if the user location is not natural space
    isHat() {
        return this._fieldArray[this.locationY][this.locationX] === hat; 
    }

    isHole() {
        return this._fieldArray[this.locationY][this.locationX] === hole; 
    }

    isOutOfBounds() {
        return ( this.locationX < 0 || this.locationY < 0 || this.locationY >= this._fieldArray.length || this.locationX >= this._fieldArray[0].length )
    }


    // method to print the current state of the field
    print() {
      const displayArray = this._fieldArray.map( row => row.join(''));
      console.log(displayArray.join('\n'));
    }

    //generate a random game field 
    static generateField(height, width) {
        const newField = new Array(height).fill(0).map(el => new Array(width));
        for(let y = 0; y < height; y++){
            for(let x = 0; x < width; x++){
                const prob = Math.random();
                newField[y][x] = prob > .2 ? fieldCharacter : hole;
            }
        }

        //Set the "hat" location
        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
        // Make sure the "hat" is not at the starting point
        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height);
        }
        newField[hatLocation.y][hatLocation.x] = hat;
        return newField;
    }
  }
  
  const myfield = new Field(Field.generateField(10, 10));
  myfield.runGame();