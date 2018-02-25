// Huy Cam with Udemy class
// Budget App Project
// Budget Controller
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

  return {
    addItems: function(type, des, val) {
      var newItem, id;

      // Create Id base on the id of the last item in the array
      if (data.allItems[type].length > 0){
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // Create new item to suitable array base on type
      if (type === 'inc'){
        newItem = new Income(id, des, val);
      } else {
        newItem = new Expense(id, des, val);
      }

      // Push item into array
      data.allItems[type].push(newItem);

      // Return new item
      return newItem;
    }
  };
})();



// UI controller
var UIController = (function(){
  var DOMString = {
    description: '.add__description',
    budget: '.add__value',
    addType: '.add__type',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
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
    },
    addListItems: function(obj,type){
      var html, newHtml, element;

      // decide that income or expense list should be chose.
      if (type === "inc"){
        element = DOMString.incomeContainer;
        html = `<div class="item clearfix" id="income-${obj.id}"><div class="item__description">${obj.description}</div><div class="right clearfix"><div class="item__value">${obj.value}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
      } else {
        element = DOMString.expensesContainer;
        html = `<div class="item clearfix" id="expense-${obj.id}"><div class="item__description">${obj.description}</div><div class="right clearfix"><div class="item__value">${obj.value}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
      }

      // Add the html to document
      document.querySelector(element).insertAdjacentHTML('beforeend', html);
    },
    clearItems: function(){
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMString.description + ',' + DOMString.budget);

      fieldsArr = Array.prototype.slice.call(fields);

      // clear all selected fields
      fieldsArr.forEach(function(current, index, array){
        current.value = "";
      });

      fieldsArr[0].focus();
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
    var input, newItem;
    // Get the field input data
    input = UI.getInput();
    // Add the item to the budget budgetController
    newItem = budgetC.addItems(input.addType, input.descript, input.budget);
    // Add the item to the UI
    UI.addListItems(newItem, input.addType);

    // Clear Items after hit add or enter
    UI.clearItems();
    // Calculate the budget

    // Display the budget on the UI

  };

  return {
    init: setUpEventListeners
  }
})(budgetController, UIController);

 controller.init();
