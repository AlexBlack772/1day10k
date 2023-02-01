//<Type>とは、<Type>の型を表す。例えば、<Type>がint型の場合、<Type>はint型を表す。
function identity<Type>(arg: Type): Type {
  return arg;
}

//
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.name;
}

//enumとは、列挙型のこと。列挙型は、列挙された値を表す。
enum Tristate {
    False,
    True,
    Unknown
}
console.log(Tristate[0]); // "False"
console.log(Tristate["False"]); // 0
console.log(Tristate[Tristate.False]); // "False" because `Tristate.False == 0`

enum AnimalFlags {
    None           = 0,
    HasClaws       = 1 << 0,
    CanFly         = 1 << 1,
}
type Animal = {
    flags: AnimalFlags
}

function printAnimalAbilities(animal: Animal) {
    var animalFlags = animal.flags;
    if (animalFlags & AnimalFlags.HasClaws) {
        console.log('animal has claws');
    }
    if (animalFlags & AnimalFlags.CanFly) {
        console.log('animal can fly');
    }
    if (animalFlags == AnimalFlags.None) {
        console.log('nothing');
    }
}

let animal: Animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly
xzasdghjk /
   ';lkjhgfdsaASDF\][POIREWQ  `1234567890-=c
 ` `