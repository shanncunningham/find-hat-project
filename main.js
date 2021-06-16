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

    isOutOfBouds() {
        return ( this.locationX < 0 || this.locationY < 0 || this.locationY >= this._fieldArray.length || this.locationX >= this._fieldArray[0].length )
    }


    // method to print the current state of the field
    print() {
      const displayArray = this._fieldArray.map( row => row.join(''));
      console.log(displayArray.join('\n'));
    }
    
  }
  
  const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);
  
  myField.print();