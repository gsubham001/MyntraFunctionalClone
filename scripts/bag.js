let bagItemObjects = []; 

function loadBagItemObjects() {
    if (!bagItems || !items) {
        console.error("Error: bagItems or items is undefined!");
        return;
    }

    
    bagItemObjects = bagItems.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i]; 
            }
        }
        return undefined; 
    }).filter(item => item !== undefined); 

    console.log("Bag Item Objects:", bagItemObjects);
}

function onLoad() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');
  if (!bagSummaryElement) {
    console.error("Error: .bag-summary element not found in DOM!");
    return;
  }

  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;
  let convenienceFee = 99; 

  
  bagItemObjects.forEach(item => {
    totalMRP += item.original_price; 
    totalDiscount += (item.original_price - item.current_price); 
  });

  finalPayment = totalMRP - totalDiscount + convenienceFee;

  bagSummaryElement.innerHTML = `
  <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>
    
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMRP}</span>
    </div>

    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>

    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹${convenienceFee}</span>
    </div>

    <hr>

    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹${finalPayment}</span>
    </div>
  </div>
  
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
`;
}

window.onload = onLoad;

function displayBagItems() {
    if (!bagItemObjects || bagItemObjects.length === 0) {
        console.error("Error: bagItemObjects is undefined or empty!");
        return;
    }

    console.log("Bag Items:", bagItemObjects);
    let containerElement = document.querySelector('.bag-items-container');
    if (!containerElement) {
        console.error("Error: .bag-items-container not found in the DOM!");
        return;
    }

   
    containerElement.innerHTML = bagItemObjects.map(item => generateItemHTML(item)).join('');
}

function removeFromBag(itemId){
  bagItems = bagItems.filter(bagItemId => bagItemId !== itemId); 
  localStorage.setItem('bagItems', JSON.stringify(bagItems)); 
  loadBagItemObjects();  
  displayBagItems();  
  displayBagIcon();  
  displayBagSummary();
}



function generateItemHTML(item) {
    return `<div class="bag-item-container">
                <div class="item-left-part">
                    <img class="bag-item-img" src="../${item.image}" alt="item-image">
                </div>
                <div class="item-right-part">
                    <div class="company">${item.company}</div>
                    <div class="item-name">${item.item_name}</div>
                    <div class="price-container">
                        <span class="current-price">Rs ${item.current_price}</span>
                        <span class="original-price">Rs ${item.original_price}</span>
                        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
                    </div>
                    <div class="return-period">
                        <span class="return-period-days">${item.return_period} days</span> return available
                    </div>
                    <div class="delivery-details">
                        Delivery by <span class="delivery-details-days">${item.delivery_date}</span>
                    </div>
                </div>
                <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
            </div>`;
}
