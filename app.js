// Huy Cam with Udemy class
// Budget App Project
var budgetController = (function(){
  var x = 2018;
  function add(a){
    return 2018 - a
  }
  return {
    age: function(a){
      return add(a);
    }
  }
})();

var UIController = (function(){

console.log(budgetController.age(1996));

})();

var controller = (function(budget, UI){
  var z = budget.age(1996);

  return {
    publicTest: function(){
      console.log(z);
    }
  }
})(budgetController, UIController);
