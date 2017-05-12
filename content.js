var table = document.getElementById("b_s89_g89s90")
if(table != null){
    var rows = table.querySelectorAll("tbody > tr.ListItem td:nth-child(5), tbody > tr.AltListItem td:nth-child(5)")
    for(var i = 0; i < rows.length; i++){
        var tableCell = rows[i];
        var title = tableCell.getAttribute("title");

        // Remove work order id from string. Assumes that work order IDs consist of 7 digits followed by a dash and three more digits
        title = title.replace(/(- [0-9]{7}-[0-9]{3})$/, "");

        // Make Customer title bold. Assumes that everything before the first dash is the customer name
        var customerRegExp = new RegExp(/[^-]*/),
        	customerString = title.match(customerRegExp);
        if (customerString.length) {
        	title = title.replace(customerRegExp, "<span class='custom-customer-name'>" + customerString[0] + "</span>");
        }


        var titleDiv = document.createElement("div");
        titleDiv.innerHTML = title;
        titleDiv.className += " custom-project-name";

        tableCell.appendChild(titleDiv);
    }


    var hourCells = table.querySelectorAll("td[onClick*='PostBack'][onClick*='reg_value'], .GridCell.SumColumn");

    for (var i = 0; i < hourCells.length; i++) {
    	var textEl = hourCells[i].getElementsByTagName("div")[0],
    		text = textEl.innerText;

    	if (text !== "0,00") {
    		textEl.className += " custom-nonzero-hours";
    	} else {
    		textEl.className += " custom-zero-hours";
    	}
    }

}