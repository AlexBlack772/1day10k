class vm {
      constructor() {
         this.a = 1;
      }
      getA() {
         return this.a;
      }
   
   setA(a) {
      this.a = a;
   }

   add(a, b) {
      return a + b;
   }

   sub(a, b) {

      return a - b;
   }

   mul(a, b) {

      return a * b;
   }

   div(a, b) {

      return a / b;
   }

   mod(a, b) {

      return a % b;
   }

   try() {
      console.log('test');
   }
   catch(e) {
      console.log(e);
   }

}

switch (op) {
   case 'add':
      return vm.add(a, b);
   case 'sub':
      return vm.sub(a, b);
   case 'mul':
      return vm.mul(a, b);
   case 'div':
      return vm.div(a, b);
   case 'mod':
      return vm.mod(a, b);
   case 'try':
      return vm.try();
   case 'catch':
      return vm.catch();
   default:
      return 'error';
}

