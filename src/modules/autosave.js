// When something is changed in a timesheet, the iframe that the form resides in will reload. In order to save things automatically, when the 'copy', 'delete' or row apply buttons are pressed, a timestamp is set in `sessionStorage`. On every load, `doAutoSave` is executed, which checks elapsed time since last edit, and saves the timesheet if the edit was recent. Saving is done using the global `PostBack` function, which is only available in the frame `ContentContainer.aspx`

let doAutoSave = function() {
  var isFormFrame = window.location.pathname.endsWith("/ContentContainer.aspx");

  if (isFormFrame) {
    try {
      let lastEdit = sessionStorage.getItem("U4ELastEdit");

      if (lastEdit) {
        let timeSinceEdit = (new Date().getTime() - parseInt(lastEdit)) / 1000;

        if (timeSinceEdit < 10) {
          window.PostBack && PostBack("b$tblsysSave");
          sessionStorage.setItem("U4ELastEdit", 0);
        }
      }
    } catch (err) {}
  }
};

chrome.storage.sync.get(
  {
    autoSaveTimesheet: ""
  },
  function(options) {
    if (!options.autoSaveTimesheet) {
      return;
    }

    // Inject script that does save postback on load in the form frame
    let script = document.createElement("script");
    script.innerHTML = "(" + String(doAutoSave) + ")()";
    document.body.appendChild(script);

    // These buttons should trigger auto save (row apply, copy row and delete row)
    let editButtons = [
      document.querySelector('.BaseButton[onclick*="CopyRow"]'),
      document.querySelector('.BaseButton[onclick*="deleteButton"]'),
      document.querySelector('.BaseButton[onclick*="row"][onclick*="apply"]')
    ];

    // Save time of click to session storage
    editButtons.forEach(function(button) {
      button &&
        button.addEventListener("click", function() {
          try {
            sessionStorage.setItem("U4ELastEdit", new Date().getTime());
          } catch (err) {}
        });
    });
  }
);
