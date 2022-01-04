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
            return data
        }
    }
}) ();

//UI controller
const UICtrl = (function(){

}) ();

//app controller
const App = (function(ItemCtrl, UICtrl){
    return {
        init: function (){
            console.log('Initializing App')
         }

        }
}) (ItemCtrl, UICtrl);

//init app
App.init()