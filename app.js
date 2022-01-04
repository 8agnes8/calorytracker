//storage controller
//create later

//item controller
const ItemCtrl = (function(){
    //item constructor
    const Item = function(id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }
    const data = {
        items: [
            {id: 0, name: 'Steak Dinner' , calories: 1200},
            {id: 1, name: 'Cake' , calories: 800}
        ],
        total: 0
    }
    return {
        logData: function (){
            return data.items
        },
        logData: function (){
            return data
        }
    }
}) ();

//UI controller
const UICtrl = (function(){
    return {
        populateItemList: function (items){
            //create html content
            let html = '';
            //parse data, create list items
            items.forEach(function (item){
                html += `<li class="collection-item" id= item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                   <i class="edit-item fa fa pencil"></i>
                </a>   
                </li>`;
            });
            document.querySelector("#item-list").innerHTML = html;
        }
    }

}) ();

//app controller
const App = (function(ItemCtrl, UICtrl){
    return {
        init: function (){
            console.log('Initializing App')
            //fetch items from data struck
            const items = ItemCtrl.getItems()
            UICtrl.populateItemList(items)
            }

        }
}) (ItemCtrl, UICtrl);

//init app
App.init()