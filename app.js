//storage controller
//create later

//item controller
const ItemCtrl = (function(){
    //item constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items: [
            {id: 0, name: 'Steak Dinner' , calories: 1200},
            {id: 1, name: 'Cookie' , calories: 400},
            {id: 2, name: 'Eggs' , calories: 300},
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
            return newItem;
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
        addBtn: '.add-btn'

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
        }

    }

})();

//app controller
const App = (function(ItemCtrl, UICtrl){
    //load event listeners
    const loadEventListeners = function (){
        //get ui selectors
        const UISelectors = UICtrl.getSelectors();
        //add item event
        document.querySelector(UISelectors.addBtn);
        addEventListener('click', itemAddSubmit);

    }
    //item add submit function
    const itemAddSubmit = function (event){
        console.log('item add event function');
        //Get form input from ui controller
        const input = UICtrl.getItemInput()
        //check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            console.log(newItem)
        }

        event.preventDefault()
    }



    return {
        init: function (){
            console.log('Initializing App')
            //fetch items from data struck
            const items = ItemCtrl.getItems()
            UICtrl.populateItemList(items)
            //load event listeners
            loadEventListeners();
            }

        }
}) (ItemCtrl, UICtrl);

//init app
App.init()