
let cart = [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
}

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartItemsList = document.querySelector("#cart-items"); 
const totalPriceElement = document.querySelector("#total-price");

console.log("Скрипт подключен! Найдено кнопок корзины:", addToCartButtons.length);


addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const clickedButton = event.target;
        const productDiv = clickedButton.closest(".product");

        const productId = productDiv.dataset.id;
        const productName = productDiv.dataset.name;
        const productPrice = Number(productDiv.dataset.price);

        const item = {
            id: productId,
            name: productName,
            price: productPrice
        };

        cart.push(item);
        saveCart();

        console.log("В корзину добавлен товар:", productName);
        
        renderCart();
    });
});


const renderCart = () => {

    cartItemsList.innerHTML = "";
    

    let total = 0;


    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price} руб. `;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Удалить";
        removeBtn.style.marginLeft = "10px";

        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1); 
            renderCart(); 
        });

        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);

        total += item.price;
    });

    totalPriceElement.textContent = total;
};

const payBtn = document.querySelector("#pay-btn");
const clearBtn = document.querySelector("#clear-btn");

payBtn.addEventListener("click", () => {

    if (cart.length === 0) {
       
        alert("Корзина пуста!");
    } else {
       
        alert("Покупка прошла успешно!");
      
        cart = [];

        saveCart();
        
        renderCart();
    }
});

clearBtn.addEventListener("click", () => {

    cart = [];

    renderCart();
});

const categoryFilter = document.querySelector("#category-filter");

const allProducts = document.querySelectorAll(".product");

categoryFilter.addEventListener("change", (event) => {

    const selectedCategory = event.target.value;
 
    allProducts.forEach((productDiv) => {
    
        const productCategory = productDiv.dataset.category;

        if (selectedCategory === "all" || productCategory === selectedCategory) {
            productDiv.style.display = "block";
        } else {
            productDiv.style.display = "none";
        }
    });
});

