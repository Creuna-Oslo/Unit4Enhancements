// Get stored options
chrome.storage.sync.get({
    affectTables: {},
    hideCells: {}
}, function(items) {
    if(items.affectTables) {
        let tables = [];

        if (items.affectTables["Timesheet"]) {
            let timesheet = document.getElementById("b_s89_g89s90");
            if (timesheet) {
                timesheet.className += " custom-timesheet";
                tables.push(timesheet);
            }
        } else if (items.affectTables["TimesheetApproval"]) {
            let timesheetApproval = document.getElementById("b_g1105s5");
            if (timesheetApproval) {
                timesheetApproval.className += " custom-timesheet-approval";
                tables.push(timesheetApproval);
            }
        }

        tables.forEach(function(table) {
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

                if (text !== "0,00" && text !== "0.00") {
                    textEl.className += " custom-nonzero-hours";
                } else {
                    textEl.className += " custom-zero-hours";
                }
            }

            function hideColumn(type) {
                // Hide table head column
                table.querySelector(`th[title*="${type}"]`).style.display = "none";
                
                // Get table cells and sum column
                let cells = [];
                let sumCell;
                
                switch(type) {
                    case "Zoom":
                        table.classList.add('custom-zoom-field-hidden')
                        sumCell = table.querySelector('tr[id*="__sumRow"] td:nth-child(3)')
                        cells = Array
                            .from(table.querySelectorAll(`div[onclick*="action:${type}"]`))
                            .map(node => node.parentElement.parentElement);
                        break;
                    
                    case "Time code":
                        sumCell = table.querySelector('td[id*="__sumRow_timecode"]')
                        cells = table.querySelectorAll(`td[onclick*="timecode"]`);
                        break;

                    case "Time unit":
                        sumCell = table.querySelector('td[id*="__sumRow_reg_unit"]')
                        cells = table.querySelectorAll(`td[onclick*="reg_unit"]`);
                        break;

                    default:
                        sumCell = table.querySelector(`td[id*="__sumRow_${type.toLowerCase()}"]`);
                        cells = table.querySelectorAll(`td[onclick*="${type.toLowerCase()}"]`);
                        break;
                        
                }

                // Hide table cells
                for(let i = 0; i < cells.length; i++) {
                    cells[i].style.display = "none";
                }

                // Hide the sum cell
                if(sumCell) {
                    sumCell.style.display = "none";
                }

                // Decrement button row colspan
                table.querySelector('tr[id*="_buttons"] td').colSpan -= 1;
            }

            // Hide cells
            if(items.hideCells) {
                let colSpan = 0;

                for(let cell in items.hideCells) {
                    if(items.hideCells[cell]) {
                        hideColumn(cell)
                    }
                }
            }
        });
    }
});