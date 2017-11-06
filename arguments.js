const sum = function(){
  let res = 0;
  for(var i = 0; i<arguments.length; i++){
    res += arguments[i];
  }
  return res;
};

 Function.prototype.myBind = function(context, ...bindArgs){
  console.log(bindArgs);
  console.log(context);
  return (...callArgs) => {
    console.log(callArgs);
    return this.apply(context, bindArgs.concat(callArgs));
  };
};


class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");

// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true
//
// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(breakfast, "meow", "Kush")();
// // Breakfast says meow to Kush!
// // true
//
// markov.says.myBind(breakfast)("meow", "a tree");
//
//
// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(breakfast, "meow")("Markov");
// // Breakfast says meow to Markov!
// // true
//
// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// // Breakfast says meow to me!
// // true

const curriedSum = function(numArgs) {
  const numbers = [];
  const _curriedSum = function(arg) {
    numbers.push(arg);

    if (numbers.length === numArgs) {
      let finalSum = 0;
      numbers.forEach(el => {
        finalSum += el;
      });
      return finalSum;
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;

};

// let sumFn = curriedSum(3);
// console.log(sumFn(1));
// console.log(sumFn(2));
// console.log(sumFn(3));



Function.prototype.curry = function(numArgs){
  const args = [];
  const fn = this;
  const _curry = function(arg){
    args.push(arg);

    if (args.length === numArgs) {
      return fn.apply(null, args); //undefined, null works well.
    } else {                      // this just means that the functions default on defined on the global scope
      return _curry;            //unless they are binded to an object
    }
  };
  return _curry;
};


const func = function(){
  for(var i = 0; i<arguments.length; i++){
    console.log(arguments[i]);
  }
};

const curryFunc = func.curry(3);
console.log(curryFunc(1));
console.log(curryFunc(2));
console.log(curryFunc(3));
