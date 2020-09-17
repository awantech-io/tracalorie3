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
            // {id:0, name:'steak', calories:1200},
            // {id:1, name:'ice cream', calories:200},
            // {id:2, name:'egg', calories:100}
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
        
        getTotalCalories: function(){
            let total = 0;

            // loop tru item and add cals
            data.items.forEach( function(item){
                total += item.calories;
            });

            // set total cal in data structure
            data.totalCalories = total;

            return data.totalCalories;
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
        itemCaloriesInput: '#item-calories',
        totalCalories:'.total-calories'
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

        // add new item to UI List
        addListItem: function(item){
            // show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add id
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}</strong> 
            <em>${item.calories}</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
            // insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li)


        },

        // clear input
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        // show total cal ui
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;

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

            // add item to UI list
            UICtrl.addListItem(newItem);

            // get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // add total cal to ui
            UICtrl.showTotalCalories(totalCalories);

            // clear field
            UICtrl.clearInput();

        }

    }

    // public method
    return {
        init: function(){
        
            // fetch the data from ItemCtrl()
            const items = ItemCtrl.getItems();

            // check if any items
            if (items.length === 0){
                UICtrl.hideList();
            } else {
                // put the data into UICtrl()
                UICtrl.populateItemList(items);
            }

             // get total calories
             const totalCalories = ItemCtrl.getTotalCalories();

             // add total cal to ui
             UICtrl.showTotalCalories(totalCalories);
            
            // load event listener
            loadEventListeners();
        }
    }
    
})(ItemCtrl, UICtrl);


// initialize app
App.init();