class Machine {
    constructor(name) {
        this.name = name;
    }
    turnOn() {
        console.log(`${this.name} is turned on`);
    }
    turnOff() {
        console.log(`${this.name} is turned off`);
    }
}
class WashMachine extends Machine {
      constructor(name) {
         super(name);
      }
      wash() {
         console.log(`${this.name} is washing`);
      }
}
   
var washMachine = new WashMachine('WashMachine');
var machine = new Machine('Machine');

class Account {

      constructor(name) {
         this.name = name;
      }
      deposit(amount) {
         console.log(`${this.name} deposited ${amount}`);
      }
      withdraw(amount) {
         console.log(`${this.name} withdrew ${amount}`);
      }
   
}

class CheckingAccount extends Account {
      constructor(name) {
         super(name);
      }
      withdraw(amount) {
         if (amount > 100) {
            console.log(`${this.name} cannot withdraw ${amount}`);
         } else {
            super.withdraw(amount);
         }
      }
   
   deposit(amount) {
      if (amount < 100) {
         console.log(`${this.name} cannot deposit ${amount}`);
      } else {
         super.deposit(amount);
      }
   }
}


