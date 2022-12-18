class shop {
    constructor(name, address, phone) {
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    get phone() {
        return this._phone;
    }
    set phone(value) {
        this._phone = value;
    }
    toString() {
        return `Name: ${this.name}, Address: ${this.address}, Phone: ${this.phone}`;
    }
}

class book extends shop {


      constructor(name, address, phone, title, author, price) {
         super(name, address, phone);
         this.title = title;
         this.author = author;
         this.price = price;
      }
      get title() {
         return this._title;
      }
      set title(value) {
         this._title = value;
      }
      get author() {
         return this._author;
      }
      set author(value) {
         this._author = value;
      }
      get price() {
         return this._price;
      }
      set price(value) {
         this._price = value;
      }
      toString() {
         return `${super.toString()}, Title: ${this.title}, Author: ${this.author}, Price: ${this.price}`;
      }
}
   

Object.prototype.toString = function () {
    return `${this.constructor.name}: ${JSON.stringify(this)}`;
}

