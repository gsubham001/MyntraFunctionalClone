let bagItems;
onLoad();

function onLoad(){
  let bagItemsStr = localStorage.getItem('bagItems');
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
}


function addToBag(itemId){
   bagItems.push(itemId);
   localStorage.setItem('bagItems', JSON.stringify(bagItems));
   displayBagIcon();
}

function displayBagIcon() {
   let bagItemCounterElement = document.querySelector('.bag-item-count');
   if(bagItems.length >0){
    bagItemCounterElement.style.visibility = 'visible';
    bagItemCounterElement.innerText = bagItems.length;
   }else{
    bagItemCounterElement.style.visibility = 'hidden';
   }
   bagItemCounterElement.innerText = bagItems.length;
}

function displayItemsOnHomePage(){
  let itemsContainerElement = document.querySelector('.items-container');
  if (!itemsContainerElement) return;
  let innerHTML = '';
  items.forEach(item => {
     innerHTML += `
      <div class="item-container">
       <img class="item-image" src="${item.image}" alt="item-image">
       <div class="rating">
         ${item.rating.stars } ⭐ | ${item.rating.count}
       </div>
       <div class="company-name">${item.company}</div>
       <div class="item-name">${item.item_name}</div>
       <div class="Price">
       <span class="current-price">Rs ${item.current_price}</span>
       <span class="original-price">Rs ${item.original_price}</span>
       <span class="discount">(${item.discount_percentage}% off)</span>
       </div>
       <button class="btn-add-bag" onclick = "addToBag(${item.id})">Add to Bag</button>
      </div>`
  });
  itemsContainerElement.innerHTML = innerHTML;
}

