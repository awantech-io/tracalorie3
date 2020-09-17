// storage controller

// item controller
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

        addItem: function(name, calories){
            let ID;

            // create ID
            if (data.items.length > 0){
                ID = data.items[data.items.length-1].id + 1;
            } else {
                ID = 0;
            }

            // calories to number
            calories = parseInt(calories);
            
            // create new item
            newItem = new Items(ID, name, calories);

            // add to items array
            data.items.push(newItem);

           return newItem; 

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
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
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
        },

        // return form input
        getItemInput: function(){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        }, 

        // return UISelectors to public
        getSelectors: function(){
        return UISelectors;
        
        }

    }

})();



// App controller
const App = ( function(){
    
    // load event listeners
    const loadEventListeners = function() {
        // get ui selector from UICrtl
        const UISelectors = UICtrl.getSelectors()

        // add item event
        document.querySelector( UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    // Add item submit
    const itemAddSubmit = function(e){
        e.preventDefault();

        // get form input UICtrl
        const input = UICtrl.getItemInput();

        // check for meal and calorie input
        if ( input.name !== '' && input.calories !== ''){
            // add item 
            const newItem = ItemCtrl.addItem( input.name, input.calories);

        }

    }

    // public method
    return {
        init: function(){
        
            // fetch the data from ItemCtrl()
            const items = ItemCtrl.getItems();

            // put the data into UICtrl()
            UICtrl.populateItemList(items);
           
            // load event listener
            loadEventListeners();
        }
    }
    
})(ItemCtrl, UICtrl);


// initialize app
App.init();