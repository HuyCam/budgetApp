// Huy Cam with Udemy class
// Budget App Project
var budgetController = (function(){

})();

var UIController = (function(){



})();

var controller = (function(budgetC, UI){

  var ctrlAddItem = function(){
    var descript = "";
    var budget;
    var addType;
    descript = document.querySelector('.add__description').value;
    budget = document.querySelector('.add__value').value;
    addType = document.querySelector('.add__type').value;
    console.log('Work');
  };
  document.querySelector('.add__btn').addEventListener('click', function(){

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
