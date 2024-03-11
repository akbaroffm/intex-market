let KarkasList = document.querySelector(".karkas-list")
let NaduvList = document.querySelector(".naduv-list")
let products = JSON.parse(window.localStorage.getItem("product"))

let elModalWrapper = document.querySelector(".modal-wrapper");
let elModal = document.querySelector(".modal");

let datas = new Date()


let orderProductData = JSON.parse(window.localStorage.getItem("orderProductList")) || []

function renderProduct(arr, list, id){
    list.innerHTML = ""
    arr.map(item => {
        if(item.type == id ){
            let elItem = document.createElement("li")
            elItem.classList.add("list-item")
            elItem.innerHTML = `
                <span class="item-status" style="background-color: ${item.status == 0 ? 'transparent' : (item.status  == 1 ? 'green' : (item.status  == 2 ? 'yellow' : (item.status  == 3 ? 'red' : '')))}">
                    ${item.status == 0 ? "Not" : ""}
                    ${item.status == 1 ? "Рекомендуем" : ""}
                    ${item.status == 2 ? "Скидка" : ""}
                    ${item.status == 3 ? "Нет в наличии" : ""}
                </span>
                <h3 class="item-name">${item.name}</h3>
                <div class="item-img">
                <img  src=${item.img} width="120" height="70"/>
                </div>
                <div>
                    <p class="item-old">${item.oldPrice}</p>
                    <p class="item-new">${item.newPrice}</p>
                    <button class="order-btn" onclick="orderProduct(${item.id})">Заказать</button>
                </div>
            `
            list.appendChild(elItem)
        }
    })
}
renderProduct(products, KarkasList, "0")
renderProduct(products, NaduvList, "1")

function orderProduct(id){
    const data = products.find(item => item.id == id)
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
        <div class="order-wrap">
            <div class="ordering-form">
            <img src=${data.img} width="250" height="100"/>
            <p>${data.newPrice}</p>
            </div>
            <form class="order-form">
            <input class="form-input" required placeholder="Ваше имя"/>
            <input class="form-input" required placeholder="Ваш номер"/>
            <input class="form-input" required placeholder="Ваш адрес"/>
            <button class="ordering-btn">Заказать</button>
            </form>
        </div>
    `
    let orderForm = document.querySelector(".order-form")
    orderForm.addEventListener("submit", function(evt){
        let newTime = `${datas.getDate().toString().padStart(2, "0")}.${(datas.getMonth() + 1).toString().padStart(2, "0")}.${datas.getFullYear()} ${datas.getHours().toString().padStart(2, "0")}:${datas.getMinutes().toString().padStart(2, "0")}`;
        
        evt.preventDefault()

        const orderData = {
            name: evt.target[0].value,
            phone: evt.target[1].value,
            address:evt.target[2].value,
            time:newTime,
            id: orderProductData.length ? orderProductData[orderProductData.length - 1].id + 1 : 1,
            img:data.img,
            price:data.newPrice,
        }
        orderProductData.push(orderData)
        elModal.innerHTML = `
            <h2>Thank you</h2>
        `
        setTimeout(() => {
            elModalWrapper.classList.remove("open-modal")
        },2000)
        window.localStorage.setItem("orderProductList", JSON.stringify(orderProductData))
    })
}

elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal");
    }
})
window.localStorage.setItem("orderProductList", JSON.stringify(orderProductData))