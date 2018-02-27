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

  var calculateTotal = function(type){
    var sum = 0;

    // Calculate sum of inc or expense in inc or exp array
    data.allItems[type].forEach(function(cur){
      sum += cur.value;
    });

    // Add total in totalBudget
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    },
    budget: 0,
    percentage: -1 // set to -1 at first
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
    },
    calculateBudget: function(){
      // Calculate total
      calculateTotal('inc');
      calculateTotal('exp');

      // Calculate budget
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate percentage
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
      }

    },
    getBudget: function(){
      return {
        budget: data.budget,
        income: data.totals.inc,
        expenses: data.totals.exp,
        percentage: data.percentage
      };
    },
    testing: function() {
      console.log(data);
    }
  };
})();



// UI controller
var UIController = (function(){
  var DOMString = {
    container: '.container',
    description: '.add__description',
    budget: '.add__value',
    addType: '.add__type',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage'
  };
  return {
    getInput: function(){
      return {
        descript : document.querySelector(DOMString.description).value,
        budget :parseInt(document.querySelector(DOMString.budget).value),
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
    },
    displayBudget: function(obj){
      document.querySelector(DOMString.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMString.incomeLabel).textContent = obj.income;
      document.querySelector(DOMString.expensesLabel).textContent = obj.expenses;

      if (obj.percentage > 0) {
        document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMString.percentageLabel).textContent = '--';
      }

    }
  }

})();


// Controller-------------------------------------------------------------------
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
      document.querySelector(DOMString.container).addEventListener('click', ctrlDeleteItems);
  };


  var updateBudget = function(){
    // Calculate the budget
    budgetC.calculateBudget();
    // Return the budget
    var budget = budgetC.getBudget();
    // Calculate the percentage of income that we already spent
    UI.displayBudget(budget);
  };

  var ctrlDeleteItems = function(event){
    console.log('You clicked on its child', event.target);
  }

  var ctrlAddItem = function(){
    var input, newItem;
    // Get the field input data
    input = UI.getInput();

    // Validate inputBtn
    if (!isNaN(input.budget) && input.descript !== "" && input.budget > 0){
    // Add the item to the budget budgetController
    newItem = budgetC.addItems(input.addType, input.descript, input.budget);
    // Add the item to the UI
    UI.addListItems(newItem, input.addType);

    // Clear Items after hit add or enter
    UI.clearItems();
    // Calculate and update budget
    updateBudget();
    }
  };

  return {
    init: function(){
      setUpEventListeners();
      UI.displayBudget({
        budget: 0,
        income: 0,
        expenses: 0,
        percentage: 0
      });
    }
  }
})(budgetController, UIController);

 controller.init();
