chrome.storage.sync.get({
    autoHideSaveConfirmation: ''
}, function(items) {
	if (items.autoHideSaveConfirmation) {
		// Listen for DOM mutations to detect when save confirmation is injected
		const observer = new MutationObserver(function(mutations){
			var saveConfirmation;

			mutations.forEach(function(mutation) {
				if (mutation.addedNodes.length) {
					for (let i = 0; i < mutation.addedNodes.length; i++) {
						let node = mutation.addedNodes[i],
							r = /u4_messageoverlay_success-[0-9]*$/;

						if (node.id && r.test(node.id)) {
							saveConfirmation = mutation.addedNodes[i];
						}
					}
				}
			});

			if (saveConfirmation) {
				let closeButton = saveConfirmation.querySelector("[id*=closeEl]");

				document.body.className += " custom-hide-overlay";
				saveConfirmation.className += " custom-save-confirmation";

				setTimeout(function() {
					document.body.className = document.body.className.replace("custom-hide-overlay", "");
					closeButton.click();
				}, 3000);
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	}
});