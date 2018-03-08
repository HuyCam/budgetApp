// Huy Cam with Udemy class
// Budget App Project
// Budget Controller
var budgetController = (function() {

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value/totalInc) * 100);
    } else {
      this.percentage = -1;
    }
  }

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  }
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
    deleteItem: function(type, id) {
      var ids, index;

      // create a new array of ids
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });
      
      index = ids.indexOf(id);

      if (index !== -1){
        data.allItems[type].splice(index, 1);
      }
      
    },
    calculateBudget: function() {
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
    getBudget: function() {
      return {
        budget: data.budget,
        income: data.totals.inc,
        expenses: data.totals.exp,
        percentage: data.percentage
      };
    },
    calculatePercentage: function() {
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },
    getPercentages: function() {
      var percentageList = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });
      return percentageList;
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
    percentageLabel: '.budget__expenses--percentage',
    expensePercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };
  // format Number type
  var formatNumber = function(num, type) {
    var int, dec, numSplit;
    var numbArr = [];
    // int = Math.abs(num);
    num = num.toFixed(2);
    numSplit = num.split('.');

    int = numSplit[0];
    // format number, add comma to number like 123,456
    int = (function() {
      var numbString = int;
      var formattedNumb = numbString;
      if (numbString.length > 3) {
        for (var i = numbString.length - 3; i >= 0; i-= 3 ) {
          numbArr.push(numbString.substr(i, 3));
          if (i - 3 < 0 && i !== 0) {
            numbArr.push(numbString.substring(0,i));
          }
        }
        numbArr.reverse();
        formattedNumb = numbArr.join(',');
      }
      return formattedNumb;
    })(int);
    dec = numSplit[1];
    
    return (type === 'exp' ? '-' : '+') + int + '.' + dec;
  };
  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  return {
    getInput: function(){
      return {
        descript : document.querySelector(DOMString.description).value,
        budget :parseFloat(document.querySelector(DOMString.budget).value),
        addType : document.querySelector(DOMString.addType).value
      };
    },
    getDOMString: function(){
      return DOMString;
    },
    addListItems: function(obj,type){
      var html, newHtml, element;
      var value = formatNumber(obj.value, type);
      // decide that income or expense list should be chose.
      if (type === "inc"){
        element = DOMString.incomeContainer;
        html = `<div class="item clearfix" id="inc-${obj.id}"><div class="item__description">${obj.description}</div><div class="right clearfix"><div class="item__value">${value}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
      } else {
        element = DOMString.expensesContainer;
        html = `<div class="item clearfix" id="exp-${obj.id}"><div class="item__description">${obj.description}</div><div class="right clearfix"><div class="item__value">${value}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
      }

      // Add the html to document
      document.querySelector(element).insertAdjacentHTML('beforeend', html);
    },
    removeListItems: function (selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },
    clearItems: function () {
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
      var type;
      obj.budget < 0 ? type = 'exp' : type = 'inc'
      document.querySelector(DOMString.budgetLabel).textContent = obj.budget ;
      document.querySelector(DOMString.incomeLabel).textContent = formatNumber(obj.income, 'inc');
      document.querySelector(DOMString.expensesLabel).textContent = formatNumber(obj.expenses, 'exp');

      if (obj.percentage > 0) {
        document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMString.percentageLabel).textContent = '---';
      }
    },
    displayPercentages: function(percentages) {
      var field = document.querySelectorAll(DOMString.expensePercLabel);
      // run through list of percentages to add percentage val
      nodeListForEach(field, function(current, index){
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '---';
        }
      });
    },
    displayDate: function() {
      var now, month ,year;
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];
      now = new Date();
      month = monthNames[now.getMonth()];
      year = now.getFullYear();
      
      document.querySelector(DOMString.dateLabel).textContent = month + ' ' + year;
    },
    changeClass: function() {
      var field = document.querySelectorAll(
        DOMString.budget + ',' +
        DOMString.addType + ',' +
        DOMString.description
      );
      var inputBtn = document.querySelector(DOMString.inputBtn);
      inputBtn.classList.toggle('red');
      nodeListForEach(field, function(cur) {
        cur.classList.toggle('red-focus');
      });

      
    }
  };

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
      document.querySelector(DOMString.addType).addEventListener('change', UI.changeClass);
  };


  var updateBudget = function(){
    // Calculate the budget
    budgetC.calculateBudget();
    // Return the budget
    var budget = budgetC.getBudget();
    // Calculate the percentage of income that we already spent
    UI.displayBudget(budget);
  };

  var updatePercentages = function () {
    // 1. Calculate percentage for each item in the list
    budgetC.calculatePercentage();
    // 2. Read the percentage from the controller
    var itemPercentages = budgetC.getPercentages();
    // 3. Update UI interface
    UI.displayPercentages(itemPercentages);
  };

  var ctrlDeleteItems = function(event){
    var itemID, splitID, type, ID;
    var element = event.target;
    itemID = event.target.parentNode.parentNode.parentNode.id;
    
    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. Delete item from the data structure
      budgetC.deleteItem(type, ID);
      // 2. Delete item from the UI
      UI.removeListItems(itemID);
      // 3. Update and show new budget
      updateBudget();
      // 4. Calculate and update percentages
      updatePercentages();
    }
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
    // Calculate and update percentages
    updatePercentages();
    }
  };

  return {
    init: function(){
      setUpEventListeners();
      UI.displayDate();
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