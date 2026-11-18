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

		const DIV = document.createElement("div");
		DIV.classList = `card card_${i+1}`;

		DIV.innerText = product.title;


		phonesContainer.appendChild(DIV);
	}

};

loadData();



// get data from api


