class vendingmachine {
      constructor() {
         this._money = 0;
         this._items = [];
         this._item = null;
      }
   
      get money() {
         return this._money;
      }
   
      get items() {
         return this._items;
      }
   
      get item() {
         return this._item;
      }
   
      set money(money) {
         this._money = money;
      }
   
      set items(items) {
         this._items = items;
      }
   
      set item(item) {
         this._item = item;
      }
   
      insertMoney(money) {
         this._money += money;
      }
   
      selectItem(item) {
         this._item = item;
      }
   
      buyItem() {
         if (this._item.price <= this._money) {
               this._money -= this._item.price;
               this._item = null;
         }
      }
}

class item {
   constructor(name, price) {
      this._name = name;
      this._price = price;
   }

   get name() {
      return this._name;
   }

   get price() {
      return this._price;
   }

   set name(name) {
      this._name = name;
   }

   set price(price) {
      this._price = price;
   }
}

var coke = new item('coke', 100);
var sprite = new item('sprite', 100);
var fanta = new item('fanta', 100);
var vendingMachine = new vendingmachine();
vendingMachine.items = [coke, sprite, fanta];
vendingMachine.insertMoney(1000);
vendingMachine.selectItem(coke);
vendingMachine.buyItem();
console.log(vendingMachine.money);
console.log(vendingMachine.item);

