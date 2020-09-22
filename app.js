// storage controller
const StorageCtrl = (function(){
   // Public method
    return {
        storeItem: function(item){
          let items;
          // chek if any item in local storage
          if (localStorage.getItem('items') === null){
            items = [];
            // push new item
            items.push(item);
            // set ls
            localStorage.setItem('items', JSON.stringify(items));
          } else {
            // get what already in localstorage  
            items = JSON.parse(localStorage.getItem('items'));

            // push new item
            items.push(item);

            // Reset local storage
            localStorage.setItem('items', JSON.stringify(items));

          }  
        },

        // get item from ls
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        } 
   } 
})();

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
        // items:[
        //     // {id:0, name:'steak', calories:1200},
        //     // {id:1, name:'ice cream', calories:200},
        //     // {id:2, name:'egg', calories:100}
        // ],

        items: StorageCtrl.getItemsFromStorage(),
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

        getItemById: function (id) {
            let found = null;

            // loop through items
            data.items.forEach(function(item){
                if(item.id === id) {
                    found = item;
                }
            });
            return found;
        },

        setCurrentItem: function (item) {
            data.currentItem = item;
        },

        getCurrentItem: function (){
            return data.currentItem;
        },

        updateItem: function( name, calories) {
            // cal to num
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(function(item){
                if ( item.id === data.currentItem.id ){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },

        // delete item from data
        deleteItem: function(id) {
            //console.log(Id);
            // get ids
            const ids = data.items.map( function(item){
                 return item.id;
            });

            // get the index
            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index,1);
        },

        // clear all items
        clearAllItems: function(){
           data.items = []; 
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
        listItems:'#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn:'.delete-btn',
        backBtn:'.back-btn',
        clearBtn:'.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories:'.total-calories',
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

        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },

        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        // show total cal ui
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;

        },

        // CLEAR EDIT STATE
        clearEditState: function() {
            // clear form input
            UICtrl.clearInput();

            // hide update, delete & back button
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        // Show EDIT STATE
        showEditState: function() {
            // clear form input
            //UICtrl.clearInput();

            // hide update, delete & back button
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        // Update Item UI
        updateListItem:  function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // convert node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = 
                    `<strong>${item.name}</strong> 
                    <em>${item.calories}</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }
                
            });
        },

        // Delete item UI
        deleteListItem: function(id) {
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
        },

        // remove all item Ui
        removeItems: function(){
           let listItem = document.querySelectorAll(UISelectors.listItems);
           
           // turn node list into array
           listItems = Array.from(listItem);

           listItems.forEach(function(item){
             item.remove();   
           });
        },

        // return UISelectors to public
        getSelectors: function(){
            return UISelectors;       
        }

    }

})();



// App controller
const App = ( function( ItemCtrl, StorageCtrl, UICtrl ){
    
    // load event listeners
    const loadEventListeners = function() {
        // get ui selector from UICrtl
        const UISelectors = UICtrl.getSelectors()

        // add item event
        document.querySelector( UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // disable submit on an enter
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        });
        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // clear items event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemClick);
        
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

            // store in localstorage
            StorageCtrl.storeItem(newItem);

            // clear field
            UICtrl.clearInput();

        }

    }

    // update item submit
    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
            // get list item id
            const listId = e.target.parentNode.parentNode.id;

            // break into an array
            const listIdArr = listId.split('-');

            // Get the actual id
            const id = parseInt(listIdArr[1]);

            // Get item 
            const itemToEdit = ItemCtrl.getItemById(id);

            // set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();

        }
        
        e.preventDefault();

    }

    // Update item submit     
    const itemUpdateSubmit = function(e) {

        // get item input
        const input = UICtrl.getItemInput();

        // Update the item
        const updatedItem = ItemCtrl.updateItem( input.name, input.calories);

        // Show the update item UI
        UICtrl.updateListItem(updatedItem);

        // get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // add total cal to ui
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearInput();

        e.preventDefault();
    }

    // delete button event 
    const itemDeleteSubmit = function(e){
        
        // get current item
        const currentItem = ItemCtrl.getCurrentItem();
        //console.log(currentItem.id);

        // Delete from data
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // add total cal to ui
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearInput();
        
        e.preventDefault();
    }

    // clear item event
    const clearAllItemClick = function(){
        // delete all items in data structure
        ItemCtrl.clearAllItems();

        // get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // add total cal to ui
        UICtrl.showTotalCalories(totalCalories);

        // clear all item from Ui
        UICtrl.removeItems();

        // Hide the UL
        UICtrl.hideList();

    }    
    
    
    // public method
    return {
        init: function(){
            // set inital edit state
            UICtrl.clearEditState();

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
    
})(ItemCtrl, StorageCtrl, UICtrl);


// initialize app
App.init();