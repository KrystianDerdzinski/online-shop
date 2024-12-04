const addToCart = (event) => {
	const id = event.target.getAttribute("data-id");
	const parent = event.target.parentElement;
	parent.classList.add("item-in-cart");
	parent.querySelector(".add-to-cart-quantity").value = 1;

	cart[id] = { quantity: 1 };
	updateMiniCart();
};

const cart = {};

const updateCart = (event) => {
	const parent = event.target.parentElement;
	const button = parent.querySelector(".add-to-cart");
	const id = button.getAttribute("data-id");

	if (event.target.value == 0) {
		// if we reduce the quantity to 0
		delete cart[id];
		parent.classList.remove("item-in-cart");
	} else if (cart[id]) {
		// if we not reduce the quantity to 0 and the item is already in cart
		cart[id].quantity = event.target.value;
	}

	updateMiniCart();
};

const updateMiniCart = () => {
	const miniCartCounter = document.querySelector("#counter");
	let cartTotal = 0;

	for (const cartItem in cart) {
		console.log(cartItem);
		cartTotal += Number(cart[cartItem].quantity);
	}
	miniCartCounter.innerText = cartTotal;
};

document.addEventListener("DOMContentLoaded", () => {
	const renderProducts = (products) => {
		for (const item in products) {
			const tile = document.createElement("div");
			tile.classList.add("product-tile");

			tile.innerHTML = `<h3>${products[item]["productName"]}</h3>
      <img src="${products[item]["image"]}" />
      <button onclick="addToCart(event)" class="add-to-cart" data-id="${item}">Add to cart</button>
      <input min="0" onchange="updateCart(event)" class="add-to-cart-quantity" type="number"  />`;

			const productsList = document.querySelector("#productsList");
			productsList.appendChild(tile);
		}
	};

	fetch("products.json")
		.then((response) => response.json())
		.then((res) => res["products"])
		.then((products) => renderProducts(products));
});
