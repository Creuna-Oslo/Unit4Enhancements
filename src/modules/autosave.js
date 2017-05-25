chrome.storage.sync.get({
    autoSaveTimesheet: ''
}, function(items) {
	if (items.autoSaveTimesheet) {
		// Inject script that does save postback in the form frame on load
		let doAutoSave = function () {
			var isFormFrame = window.location.pathname === "/p470014-web/ContentContainer.aspx";

			if (isFormFrame) {
				try {
					let lastEdit = sessionStorage.getItem("U4ELastEdit");

					if (lastEdit) {
						let timeSinceEdit = ((new Date()).getTime() - parseInt(lastEdit))/1000;

						if (timeSinceEdit < 10) {
							window.PostBack && PostBack("b$tblsysSave");
							sessionStorage.setItem("U4ELastEdit", 0);
						}
					}
				} catch (err) {

				}
			}
		}

		let script = document.createElement("script");
		script.innerHTML = "(" + String(doAutoSave) + ")()";
		document.body.appendChild(script);


		// Find buttons that should trigger auto save (row apply, copy row and delete row)
		let editButtons = [
			document.querySelector('.BaseButton[onclick*="CopyRow"]'),
			document.querySelector('.BaseButton[onclick*="deleteButton"]'),
			document.querySelector('.BaseButton[onclick*="row"][onclick*="apply"]')
		];

		// Save time of click to session storage
		editButtons.forEach(function(button) {
			button && button.addEventListener("click", function(){
				try {
					sessionStorage.setItem("U4ELastEdit", (new Date()).getTime());
				} catch (err) {

				}
			});
		})
	}
});