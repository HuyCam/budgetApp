// Huy Cam with Udemy class
// Budget App Project
var budgetController = (function(){

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
  var DOMString = UI.getDOMString();
  var ctrlAddItem = function(){
    // Get the field input data
    console.log(UI.getInput());
    console.log(UI.getDOMString());
    // Add the item to the budget budgetController

    // Add the item to the UI

    // Calculate the budget

    // Display the budget on the UI

  };
  document.querySelector(DOMString.inputBtn).addEventListener('click', function(){

    ctrlAddItem();

  });

  // enter key detect
  document.addEventListener('keydown',function(event){
    var x = event.which || event.keycode;
    if (x === 13){
      ctrlAddItem();
    }
    });
})(budgetController, UIController);
