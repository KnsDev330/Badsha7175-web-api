let searchBtn = document.querySelector(".my-button");
let phonesContainer = document.querySelector("#phone-container");

searchBtn.onclick = function() {
	searchBtn.style = 'background-color: gray; color: white';
	searchBtn.innerText = 'Searching...';

	let conf = confirm("Are You Sure to DELETE YOUR ACCOUNT?");

	if(conf === true) {
		// delete account
	}
	else {
		// DO NOT DELETE ACCOUNT
	}
};



// get data from api
async function loadData() {
	const data = await fetch(
		`https://dummyjson.com/products/search?q=phone&limit=10&skip=0`,
	).then(r => r.json());

	console.log(data);

	const products = data.products;
	
	for(let i=0; i<data.limit; i++) {
		const product = products[i];

		const CONTAINER = document.createElement("div");
		CONTAINER.classList = `card card_${i+1}`;
		
		const NAME = document.createElement("div");
		NAME.classList = `name`;
		NAME.innerText = product.title;

		const IMG = document.createElement("img");
		IMG.src = product.thumbnail;

		const PRICE = document.createElement("div");
		PRICE.classList = "price";
		PRICE.innerText = `Tk. ${product.price}`;

		const DESC = document.createElement("div");
		DESC.classList = "description";
		DESC.innerText = product.description;

		const ORDER = document.createElement('button');
		ORDER.classList = "order-now";
		ORDER.innerText = "ORDER NOW";

		ORDER.onclick = function() {
			ORDER.innerText = "Ordering...";
			ORDER.classList.toggle("ordering");
			ORDER.disabled = true;
			console.log('ordering...')

			setTimeout(
				function(){
					ORDER.innerText = "ORDER NOW";
					ORDER.classList.toggle("ordering");
					ORDER.disabled = false;
				},
				2000
			);
		}

		const BR = document.createElement('br');


		const LINK = document.createElement('a');
		LINK.href = "details.html";
		LINK.innerText = "Details";

		CONTAINER.appendChild(IMG);
		CONTAINER.appendChild(NAME);
		CONTAINER.appendChild(PRICE);
		CONTAINER.appendChild(DESC);
		CONTAINER.appendChild(ORDER);
		CONTAINER.appendChild(BR);
		CONTAINER.appendChild(LINK);
		


		phonesContainer.appendChild(CONTAINER);
	}

};

loadData();



// get data from api


