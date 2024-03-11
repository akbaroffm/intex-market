let addBtn = document.querySelector(".add-btn");
let tBody = document.querySelector(".tbody");
let tHead = document.querySelector(".thead")

let elModalWrapper = document.querySelector(".modal-wrapper");
let elModal = document.querySelector(".modal");

let elNavList = document.querySelector(".type-list");
let elItem1 = document.querySelector(".type-item:nth-child(1)");
let elItem2 = document.querySelector(".type-item:nth-child(2)");
let elItem3 = document.querySelector(".type-item:nth-child(3)");

let searchInput = document.querySelector(".search-input");
let searchList = document.querySelector(".search-list");

let orderProduct = JSON.parse(window.localStorage.getItem("orderProductList")) || []

elNavList.addEventListener("click", function(evt){
    if(evt.target.id){
        if(evt.target.id == 0){
            elItem1.style.color = "rgb(0, 147, 152)";
            elItem2.style.color = "rgb(166, 166, 166)";
            elItem3.style.color = "rgb(166, 166, 166)";
            renderProducts(products, tBody, evt.target.id);
        }
        else if(evt.target.id == 1){
            elItem2.style.color = "rgb(0, 147, 152)";
            elItem1.style.color = "rgb(166, 166, 166)";
            elItem3.style.color = "rgb(166, 166, 166)";
            renderProducts(products, tBody, evt.target.id);
        }
        else{
            elItem2.style.color = "rgb(166, 166, 166)";
            elItem1.style.color = "rgb(166, 166, 166)";
            elItem3.style.color = "rgb(0, 147, 152)";
            renderProducts(orderProduct, tBody, evt.target.id);
        }
        }
    }
);


let products = JSON.parse(window.localStorage.getItem('product')) || [];

addBtn.addEventListener('click', function(){
    elModalWrapper.classList.add("open-modal");
    elModal.innerHTML = `
        <form class="add-form">
            <label>
                <div class="form-img__wrapper">
                    <img class="form-img render-img" src="./images/choose.png" />
                </div>
                <input class="visually-hidden get-img" type="file"/>
            </label>
            <div class="category-wrap">
                <div class="category-left">
                    <label class="category-title">
                        <span>Product name:</span>
                        <input class="category-input" type="text" placeholder="Имя товара:"/>
                        <img class="category-icon" src="./images/pen.svg" width="20" height="20"/>
                    </label>
                    <label class="category-title">
                        <span>Old price:</span>
                        <input class="category-input" type="text" placeholder="Старая цена:"/>
                        <img class="category-icon" src="./images/old-price.svg" width="20" height="20"/>
                    </label>
                    <label class="category-title">
                        <span>New price:</span>
                        <input class="category-input" type="text" placeholder="Цена со скидкой name:"/>
                        <img class="category-icon" src="./images/new-price.svg" width="20" height="20"/>
                    </label>
            </div>
            <div class="category-right">
                <label class="category-title">
                <span>Quantity:</span>
                <input class="category-input" type="text" placeholder="Количество:"/>
                <img class="category-icon" src="./images/quantity.svg" width="20" height="20"/>
            </label>
            <label class="category-title">
                <span>Choose type:</span>
                <select class="category-input">
                    <option value="0">Каркасные</option>
                    <option value="1">Надувные</option>
                </select>
                <img class="category-icon" src="./images/category.svg" width="20" height="20"/>
            </label>
            <label class="category-title">
                <span>Status:</span>
                <select class="category-input">
                    <option value="0">Not</option>
                    <option value="1">Рекомендуем</option>
                    <option value="2">Скидка</option>
                    <option value="3">Нет в наличии</option>
                </select>
                <img class="category-icon" src="./images/status.svg" width="20" height="20"/>
            </label>
                </div>
            </div>
            <button class="add-form__btn">Добавить</button>
        </form>
    `;
    let elForm = document.querySelector(".add-form");
    let elInputChange = document.querySelector(".get-img")
    let elRenderImg = document.querySelector(".render-img")

    elInputChange.addEventListener("change", function(evt){        
        elRenderImg.src = URL.createObjectURL(evt.target.files[0]);
        
    });

    elForm.addEventListener("submit", function(evt){
        evt.preventDefault();
        let data = {
            id: products.length ? products[products.length - 1].id + 1: 1,
            img: URL.createObjectURL(evt.target[0].files[0]),
            name: evt.target[1].value,
            oldPrice: evt.target[2].value,
            newPrice: evt.target[3].value,
            quantity: evt.target[4].value,
            type: evt.target[5].value,
            status: evt.target[6].value 
        };
        products.push(data);
        renderProducts(products, tBody, evt.target[5].value);
        elModalWrapper.classList.remove("open-modal");
        window.localStorage.setItem('product', JSON.stringify(products));
        if(evt.target[5].value == 0){
            elItem1.style.color = "rgb(0, 147, 152)";
            elItem2.style.color = "rgb(166, 166, 166)";
        }
        else{
            elItem2.style.color = "rgb(0, 147, 152)";
            elItem1.style.color = "rgb(166, 166, 166)";
            
            renderProducts(products, tBody, evt.target.id);
        }
    });
});

elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal");
    }
});

function renderProducts(arr, list, id){
    list.innerHTML = "";
    arr.filter(item => {
        if(item.type == id){
            let elTr = document.createElement('tr');

            elTr.innerHTML = `
                <td class="table-items border-l">
                    <img class="table-img" src="${item.img}" alt = "render img"/>
                </td>
                <td class="table-items">
                    <span>${item.name}</span>
                </td>
                <td class="table-items table-column">
                    <span class="table-old">${item.oldPrice}</span>
                    <strong class="table-new">${item.newPrice}</strong>
                </td>
                <td class="table-items">${item.quantity}</td>
                <td class="table-items ${item.status == "1" ? "green" : ""} ${item.status == "2" ? "yellow" : ""} ${item.status == "3" ? "red" : ""}">
                    ${item.status == "0" ? "Простой" : ""}
                    ${item.status == "1" ? "Рекомендуем" : ""}
                    ${item.status == "2" ? "Скидка" : ""}
                    ${item.status == "3" ? "Нет в наличии" : ""}
                </td>
                <td class="table-items border-r">
                    <div class="btn-flex">
                        <button onclick="updateProduct(${item.id})" class="edit-btn"><img src="./images/edit.svg"  alt="edit" width="24" height="24" /></button>
                        <button onclick="deleteProduct(${item.id})" class="delete-btn"><img src="./images/delete.svg"  alt="edit" width="24" height="24" /></button>
                    </div>
                </td>
            `;
            list.appendChild(elTr);
        }
    });
    if(id == "2"){
        tHead.innerHTML = `
            <tr class="table-list">
                <th class="table-item border-l">Имя клиента</th>
                <th class="table-item">Телефон</th>
                <th class="table-item">Изображение</th>
                <th class="table-item">Цена(сум)</th>
                <th class="table-item">Адрес</th>
                <th class="table-item">Время</th>
                <th class="table-item border-r">Действия</th>
            </tr>
        `
        
        arr.map(item => {
            let elTr = document.createElement('tr');
            elTr.innerHTML = `
                <td class="table-items border-l">
                    <span>${item.name}</span>
                </td>
                <td class="table-items">
                    <span>${item.phone}</span>
                </td>
                <td class="table-items">
                    <img class="table-img" src="${item.img}" alt = "render img"/>
                </td>
                <td class="table-items">
                    <span>${item.price}</span>
                </td>
                <td class="table-items">
                    <span>${item.address}</span>
                </td>
                <td class="table-items">
                    <span>${item.time}</span>
                </td>
                <td class="table-items border-r">
                    <span>Check</span>
                    <span>Delete</span>
                </td>
            `
            tBody.appendChild(elTr);
            
        })
    }
}
renderProducts(products, tBody, 0);
// update start
function updateProduct(id){
    let data = products.find(item => item.id == id);

    elModalWrapper.classList.add("open-modal");
    elModal.innerHTML = `
        <form class="update-form">
            <label>
                <div class="form-img__wrapper">
                    <img class="form-img update-render-img" src=${data.img} />
                </div>
                <input class="visually-hidden update-get-img" type="file"/>
            </label>
            <div class="category-wrap">
                <div class="category-left">
                    <label class="category-title">
                        <span>Product name:</span>
                        <input value=${data.name} class="category-input" type="text" placeholder="Имя товара:"/>
                        <img class="category-icon" src="./images/pen.svg" width="20" height="20"/>
                    </label>
                    <label class="category-title">
                        <span>Old price:</span>
                        <input value=${data.oldPrice} class="category-input" type="text" placeholder="Старая цена:"/>
                        <img class="category-icon" src="./images/old-price.svg" width="20" height="20"/>
                    </label>
                    <label class="category-title">
                        <span>New price:</span>
                        <input value=${data.newPrice} class="category-input" type="text" placeholder="Цена со скидкой name:"/>
                        <img class="category-icon" src="./images/new-price.svg" width="20" height="20"/>
                    </label>
            </div>
            <div class="category-right">
                <label class="category-title">
                <span>Quantity:</span>
                <input value=${data.quantity} class="category-input" type="text" placeholder="Количество:"/>
                <img class="category-icon" src="./images/quantity.svg" width="20" height="20"/>
            </label>
            <label class="category-title">
                <span>Choose type:</span>
                <select class="category-input update-type-select">
                    <option value="0">Каркасные</option>
                    <option value="1">Надувные</option>
                </select>
                <img class="category-icon" src="./images/category.svg" width="20" height="20"/>
            </label>
            <label class="category-title">
                <span>Status:</span>
                <select class="category-input update-status-select">
                    <option value="0">Not</option>
                    <option value="1">Рекомендуем</option>
                    <option value="2">Скидка</option>
                    <option value="3">Нет в наличии</option>
                </select>
                <img class="category-icon" src="./images/status.svg" width="20" height="20"/>
            </label>
                </div>
            </div>
            <button class="add-form__btn">Сохранить</button>
        </form>
    `;

    let elUpdateForm = document.querySelector(".update-form");
    let elTypeSelect = document.querySelector(".update-type-select");
    let elStatusSelect = document.querySelector(".update-status-select");
    let elUpdateImgInput = document.querySelector(".update-get-img");
    let elUpdateImg = document.querySelector(".update-render-img");

    elTypeSelect.value = data.type;
    elStatusSelect.value = data.status;

    elUpdateImgInput.addEventListener("change", function(evt){        
        elUpdateImg.src = URL.createObjectURL(evt.target.files[0]);
        
    });

    elUpdateForm.addEventListener("submit", function(evt){
        evt.preventDefault();
        data.img = elUpdateImg.src
        data.name = evt.target[1].value
        data.oldPrice = evt.target[2].value
        data.newPrice = evt.target[3].value
        data.quantity = evt.target[4].value
        data.type = evt.target[5].value
        data.status = evt.target[6].value

        renderProducts(products, tBody, evt.target[5].value);
        elModalWrapper.classList.remove("open-modal");
        window.localStorage.setItem('product', JSON.stringify(products));
            if(evt.target[5].value == 0){
                elItem1.style.color = "rgb(0, 147, 152)";
                elItem2.style.color = "rgb(166, 166, 166)";
            }
            else{
                elItem2.style.color = "rgb(0, 147, 152)";
                elItem1.style.color = "rgb(166, 166, 166)";
            }
    })
}
// update end

// delete start

function deleteProduct(id){
    const findObj = products.find(item => item.id == id)
    let data = products.findIndex(item => item.id == id);
    products.splice(data, 1);
    renderProducts(products, tBody, findObj.type)
    window.localStorage.setItem('product', JSON.stringify(products));
}

// delete end

// search start
searchInput.addEventListener("blur", function(evt){
    setTimeout(function() {
        searchList.classList.remove("open-list");
    }, 200);
});


searchInput.addEventListener("keyup", function(evt) {
    let data = products.filter(item => item.name.toLowerCase().includes(evt.target.value.toLowerCase()));
  
    searchList.innerHTML = "";
    data.map(item => {
      let listItem = document.createElement("li");
      listItem.dataset.id = item.id;
      listItem.className = "search-item";
      listItem.textContent = `${item.name} - ${item.newPrice}`;
      searchList.appendChild(listItem);
  
      listItem.addEventListener("click", function(evt) {
        let clickedId = evt.target.dataset.id;
        let dataClick = products.find(item => item.id == clickedId);
        searchInput.value = `${dataClick.name} - ${dataClick.newPrice}`;
  
        let searchFilter = products.filter(item => item.id == clickedId);
        renderProducts(searchFilter, tBody, dataClick.type);
        window.localStorage.setItem('product', JSON.stringify(products));
  
        if (dataClick.type == 0) {
          elItem1.style.color = "rgb(0, 147, 152)";
          elItem2.style.color = "rgb(166, 166, 166)";
        } else {
          elItem2.style.color = "rgb(0, 147, 152)";
          elItem1.style.color = "rgb(166, 166, 166)";
        }
      });
    });
  
    if (evt.target.value) {
      searchList.classList.add("open-list");
    } else {
      searchList.classList.remove("open-list");
  
      elItem1.style.color = "rgb(0, 147, 152)";
      elItem2.style.color = "rgb(166, 166, 166)";
  
      renderProducts(products, tBody, 0);
    }
  })

// search end