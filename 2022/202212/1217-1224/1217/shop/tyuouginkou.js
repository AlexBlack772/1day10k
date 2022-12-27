class tyuouginkou {
   constructor() {
      this.name = 'tyuouginkou';
      this.price = 100;
   }

   getName() {
      return this.name;
   }

   getPrice() {
      return this.price;
   }

   getTax() {
      return Math.floor(this.price * 0.08);
   }

   getShipping() {
      return 100;
   }

   getTotal() {
      return this.price + this.getTax() + this.getShipping();
   }

   toString() {
      return `${this.name} ${this.price} ${this.getTax()} ${this.getShipping()} ${this.getTotal()}`;
   }

   
}