function AddExtensionOptionsButton(){
    var optionsButton = '<td class="u4-login-button"><input type="button" value="Creuna Unit4 Extension Options" class="u4-login-link-button-content" id="extension-options"></td>';

    var el = document.createElement("tr");
    el.innerHTML = optionsButton;

    var loginActions = document.querySelector("table.u4-login-button-table tbody")
    loginActions.appendChild(el);

    document.querySelector("#extension-options").addEventListener("click", function(){
        chrome.runtime.sendMessage({ intent: "options" });
    });
}

// Login Enchancements
if(document.querySelector('form.Login')) {

    AddExtensionOptionsButton();

    chrome.storage.sync.get({
        client: ''
    }, function(items) {
        const input = document.querySelector('input[placeholder=Client]')
        if(items.client) {
            input.value = items.client
            input.type = "hidden"
            input.parentElement.parentElement.style.display = "none"
        }else{
            input.placeholder = input.placeholder + " (no default client set in extension options)";
        }
    });
}