(function () {

    const mockSubmitButtonId = 'submit-mock';
    const widthBetweenButtons = 5;
    const withPixels = (value) => value + 'px';

    const observerConfig = { attributes: true, childList: true, subtree: true };

    const observedNode = document.getElementsByTagName('body')[0];

    const onMutation = function (mutationsList) {
        
        for (let mutation of mutationsList) {
            
            if (mutation.target.dataset['u4id'] == 'action_panel') {

                let actionsPanel = mutation.target;
                let submitButton = actionsPanel.querySelectorAll('[data-u4id="submit"]')[0];
                
                if(!submitButton)
                    return;

                let mockSubmitButton = document.getElementById(mockSubmitButtonId);
                let isMockAlreadyCreated = !!mockSubmitButton;

                if (isMockAlreadyCreated)
                    mockSubmitButton.parentNode.removeChild(mockSubmitButton);

                mockSubmitButton = submitButton.cloneNode(true);
                mockSubmitButton.id = mockSubmitButtonId;
                mockSubmitButton.style.display = 'block';

                mockSubmitButton.addEventListener('click', function (event) {
                    if(confirm('Are you sure you want to submit your timesheet?'))
                        submitButton.click();
                });
                
                submitButton.parentNode.appendChild(mockSubmitButton);
                submitButton.style.display = 'none';

                let saveDraftButton = actionsPanel.querySelectorAll('[data-u4id="draft"]')[0];
                let printButton = actionsPanel.querySelectorAll('[data-u4id="printpreview"]')[0];

                saveDraftButton.style.left = withPixels(widthBetweenButtons);
                mockSubmitButton.style.left = withPixels(widthBetweenButtons + saveDraftButton.offsetWidth + widthBetweenButtons);
                printButton.style.left = withPixels(widthBetweenButtons + saveDraftButton.offsetWidth + 
                                                widthBetweenButtons + mockSubmitButton.offsetWidth + 
                                                widthBetweenButtons);

                let containerWidth = withPixels(widthBetweenButtons + mockSubmitButton.offsetWidth + 
                    widthBetweenButtons + saveDraftButton.offsetWidth + 
                    widthBetweenButtons + printButton.offsetWidth);

                submitButton.parentNode.style.width = containerWidth;
                submitButton.parentNode.parentNode.style.width = containerWidth;
                submitButton.parentNode.parentNode.parentNode.style.width = containerWidth;

                return;
            }
        }
    };
    
    const observer = new MutationObserver(onMutation);

    observer.observe(observedNode, observerConfig);

})();