window.onload = function() {
}

function updateSales(sales) {
	var salesDiv = document.getElementById("sales");
	for (var i = 0; i < sales.length; i ++) {
		var sale = sales[i];
		var div = document.createElement("div");
		div.setAttribute("class", "saleItem");
		if (i%2 == 0) {
			div.classList.add("cream");
		}
		div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
		salesDiv.appendChild(div);
	}
}
