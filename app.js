// storage controller

// item ciontroller
const ItemCtrl = (function(){
   
    // item constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // data structure / state
    const data = {
        item:[
            {id:0, name:'steak', calories:1200},
            {id:1, name:'ice cream', calories:200},
            {id:2, name:'egg', calories:100}
        ],
        currentItem: null,
        totalCalories:0
    }

    // public methods
    return {
        logData: function(){
            return data;
        }
    }

})();



// uicontroller
const UICtrl = (function(){

    // public methods
    return {

    }

})();



// App controller
const App = ( function(){
    
    // public method
    return {
        init: function(){
            console.log('initalizee app...');
        }
    }
    
})(ItemCtrl, UICtrl);


// initialize app
App.init();