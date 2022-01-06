//storage controller
//create later
//storage controller
const StorageCtrl = (function (item){
    //public methods
    return {
        storeItem: function (item){
            let items;

            if(localStorage.getItem('items') === null) {
                items = [];

                items.push(item);

                localStorage.setItem('items' , JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem('items'));

                items.push(item);

                localStorage.setItem('items', JSON.stringify(items));
            }

        },
        getItemsFromStorgae: function (){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            }  else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        }
    }
})();

//item controller
const ItemCtrl = (function(){
    //item constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
//data structure
    const data = {
        items: [
            //{id: 0, name: 'Steak Dinner' , calories: 1200},
            //{id: 1, name: 'Cookie' , calories: 400},
            //{id: 2, name: 'Eggs' , calories: 300},
        ],
        total: 0
    }
    return {
        getItems: function (){
            return data.items
        },
        addItem: function(name, calories){
          let ID;
          //create id
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
                console.log(ID)
            } else{
                ID = 0
            } //calories to number
            calories = parseInt(calories);
            //
            newItem = new Item(ID, name, calories);
            data.items.push(newItem);
            return newItem
        },
        getTotalCalories: function (){
            let total = 0;
            //loop thru items and get calories
            data.items.forEach(function(item){
                total = total + item.calories;
            });
            //set total calories in data structure
            data.total = total;
            console.log(data.total)
            //return total
            return data.total;
        },
        logData: function (){
            return data
        }
    }
}) ();

//UI controller
const UICtrl = (function(){
    //ui selectors
    const UISelectors = {
        itemList: '#item-list',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn',
        totalCalories: '.total-calories'

    }
    return {
        populateItemList: function (items){
            //create html content
            let html = '';
            //parse data, create list items
            items.forEach(function (item){
                html += `<li class="collection-item" id= item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                   <i class="edit-item fa fa-pencil"></i>
                </a>   
                </li>`;
            });
            //insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function (){
            return UISelectors;
        },
        getItemInput: function (){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value

            }
        },
        addListItem: function(item){
            // create li elements
            const li = document.createElement("li");
            // add class
            li.className = "collection-item";
            // add ID
            li.id = `item-${item.id}`;
            // add HTML
            li.innerHTML = `<strong>${item.name}: </strong>
                <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                   <li class="edit-item fa fa-pencil"></li>
                </a>`;
            // insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li)
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        },
        showTotalCalories: function (totalCalories){
            document.querySelector(UISelectors.totalCalories).
                textContent = totalCalories;
        }
    }
})();

//APP controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
    //load event listeners
    const loadEventListeners = function (){
        //get ui selectors
        const UISelectors = UICtrl.getSelectors();
        //add item event
        document.querySelector(UISelectors.addBtn);
        addEventListener('click', itemAddSubmit);

        document.addEventListener('DOMContentLoaded' , getItemsFromStorage)

    }
    //item add submit function
    const itemAddSubmit = function (event){
        //Get form input from ui controller
        const input = UICtrl.getItemInput()
        //check for name and calorie input
        if(input.name !== "" && input.calories !== ""){
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            UICtrl.addListItem(newItem)
            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //add total calories to ui
            UICtrl.showTotalCalories(totalCalories);
            //store in LS
            StorageCtrl.storeItem(newItem);
            //clear fields
            UICtrl.clearInput();
        }

        event.preventDefault()
    }
    //get items from storage
    const  getItemsFromStorage = function (){

        const items = StorageCtrl.getItemsFromStorgae()
        items.forEach(function (item){
            ItemCtrl.addItem(item['name'], item['calories'])
        })
        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //add total calories to ui
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.populateItemList(items)
    }



    return {
        init: function (){
            console.log("Initializing App")
            //fetch items from data struck
            const items = ItemCtrl.getItems()
            UICtrl.populateItemList(items)
            //load event listeners
            loadEventListeners();
            }

        }
}) (ItemCtrl, StorageCtrl, UICtrl);

//init app
App.init()