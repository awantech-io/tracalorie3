// storage controller

// item ciontroller
const ItemCtrl = (function(){
   
    // item constructor
    const Items = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // data structure / state
    const data = {
        items:[
            {id:0, name:'steak', calories:1200},
            {id:1, name:'ice cream', calories:200},
            {id:2, name:'egg', calories:100}
        ],
        currentItem: null,
        totalCalories:0
    }

    // public methods
    return {

        getItems: function(){
            return data.items;
        },

        logData: function(){
            return data;
        }
    }

})();



// uicontroller
const UICtrl = (function(){
    
    // ui selector
    const UISelectors = {
        itemList: '#item-list'
    } 
    
    // public methods
    return {

        // Display ui for items    
        populateItemList: function(items) {
            let html = '';

            items.forEach( function(item){
                html += `<li id="item-${item.id}" 
                class="collection-item">
                <strong>${item.name}</strong> 
                <em>${item.calories}</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`;
            })

            // insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        }

    }

})();



// App controller
const App = ( function(){
    
    // public method
    return {
        init: function(){
        
            // fetch the data from ItemCtrl()
            const items = ItemCtrl.getItems();

            // put the data into UICtrl()
            UICtrl.populateItemList(items);
            
        }
    }
    
})(ItemCtrl, UICtrl);


// initialize app
App.init();