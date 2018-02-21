// Huy Cam with Udemy class
// Budget App Project
var budgetController = (function(){

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totalBudget: 0
  };

})();

var UIController = (function(){
  var DOMString = {
    description: '.add__description',
    budget: '.add__value',
    addType: '.add__type',
    inputBtn: '.add__btn'
  };
  return {
    getInput: function(){
      return {
        descript : document.querySelector(DOMString.description).value,
        budget : document.querySelector(DOMString.budget).value,
        addType : document.querySelector(DOMString.addType).value
      }
    },
    getDOMString: function(){
      return DOMString;
    }
  }

})();

  var controller = (function(budgetC, UI){
    var setUpEventListeners = function(){
      var DOMString = UI.getDOMString();
      document.querySelector(DOMString.inputBtn).addEventListener('click', ctrlAddItem);
      document.addEventListener('keydown',function(event){
        var x = event.which || event.keycode;
        if (x === 13){
          ctrlAddItem();
        }
      });
  };

  var ctrlAddItem = function(){
    // Get the field input data
    console.log(UI.getInput());
    // Add the item to the budget budgetController

    // Add the item to the UI

    // Calculate the budget

    // Display the budget on the UI

  };

  return {
    init: setUpEventListeners
  }
})(budgetController, UIController);

 controller.init();
