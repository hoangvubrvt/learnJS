window.onload = function() {
    //var url = "http://127.0.0.1:64286/salesdata/salesdata.json";
    var url = "http://gumball.wickedlysmart.com/";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    
    request.onload = function() {
        if(request.status === 200) {
            updateSales(request.responseText);
        }else {
            alert("Send Request Error");
        }
    };
    
    request.send(null);
}

function updateSales(saleData) {
    var saleContainer = document.getElementById("sales");
    var sales = JSON.parse(saleData);
    
    for(var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class","sale-item");
        div.innerHTML = sale.name + " sold " + sale.sales + "gumballs";
        saleContainer.appendChild(div);
    }
}