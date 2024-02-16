/**
 * Show a specific part and update the progress bar.
 *
 * @param {number} partNumber - The number of the part to show
 * @return {void} 
 */
function showPart(partNumber) {
    // Loop through the parts
    for (let i = 1; i <= 4; i++) {
        // Show or hide the current part based on the partNumber
        if (i === partNumber) {
            document.getElementById(`part${i}`).style.display = 'block';
        } else {
            document.getElementById(`part${i}`).style.display = 'none';
        }
    }
    // Update the progress bar
    updateProgressBar(partNumber);

    // Automatically adjust the height of textareas in the current part
    document.getElementById(`part${partNumber}`).querySelectorAll('textarea').forEach(autoGrow);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Updates the progress bar to highlight the current step.
 *
 * @param {number} currentStep - The current step in the progress bar
 * @return {void} 
 */
function updateProgressBar(currentStep) {
    // Select all progress bar items
    const progressBarItems = document.querySelectorAll('.progress-bar-item');
    // Loop through each item to update its active status based on the current step
    progressBarItems.forEach((item, index) => {
        if (index + 1 === currentStep) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Sets the height of the given element to accommodate its content using the auto-grow technique.
 *
 * @param {Element} element - The element whose height needs to be adjusted.
 * @return {void} 
 */
function autoGrow(element) {
    element.style.height = "5px";
    element.style.height = Math.max((element.scrollHeight + 5), 42) + "px";
}

/**
 * Function to add a new question to the form.
 *
 * @param {string} previousButtonId - The id of the previous button
 * @param {boolean} add - Flag to indicate whether this call increases the number of questions
 * @return {void} 
 */
function addQuestion(previousButtonId, add = true) {
    // Extract page and id number from the previous button id
    var page = previousButtonId.split('_')[0];
    var previousIdNumber = parseInt(previousButtonId.split('_')[2]);
    var newIdNumber = previousIdNumber + 1;

    // Clone the base question
    var baseQuestion = document.getElementById(`${page}_question_1`);
    var newQuestion = baseQuestion.cloneNode(true);

    // Update id, key, and description of the new question
    newQuestion.id = page + "_question_" + newIdNumber;
    newQuestion.querySelector(`#${page}_key_1`).id = `${page}_key_${newIdNumber}`;
    newQuestion.querySelector(`#${page}_description_1`).id = `${page}_description_${newIdNumber}`;
    newQuestion.querySelector(`#${page}_key_${newIdNumber}`).value = '';
    newQuestion.querySelector(`#${page}_description_${newIdNumber}`).value = '';

    // Display the delete button for the new question
    newQuestion.querySelector(`#delete_button`).style.display = '';

    // Update the id of the previous button
    baseQuestion.parentElement.querySelector(`#${page}_button_${previousIdNumber}`).id = `${page}_button_${newIdNumber}`;

    // Insert the new question before the add question button
    var button = baseQuestion.parentElement.querySelector('#add_question_button'); 
    baseQuestion.parentNode.insertBefore(newQuestion, button);
    
    // If add flag is true, increase the question count and save form data
    if (add) {
        var amount = parseInt(localStorage.getItem(page)) + 1 || 1;
        localStorage.setItem(`${page}`, JSON.stringify(amount));
        saveFormData();
    }
}

/**
 * Function to add a new Attribute to the form.
 *
 * @param {string} previousButtonId - The id of the previous button
 * @param {boolean} add - Flag to indicate whether this call increases the number of Attributes
 * @return {void}
 */
function addAttribute(previousButtonId, add = true) {
    // Extract the field number from the previousButtonId
    var field = previousButtonId.split('_')[1];

    // Extract the previous AttributeIdNumber from the previousButtonId
    var PreviousAttributeIdNumber = parseInt(previousButtonId.split('_')[3]);

    // Increment the previous AttributeIdNumber to get the new AttributeIdNumber
    var AttributeIdNumber = PreviousAttributeIdNumber + 1;

    // Construct the id of the first Attribute in the field
    var leadAttributeId = `field_${field}_Attribute_1`;

    // Get the leadAttribute element using the leadAttributeId and create a newAttribute element
    var leadAttribute = document.getElementById(leadAttributeId);
    var newAttribute = document.getElementById('field_dummy_Attribute_dummy').cloneNode(true);

    // Set the id of the newAttribute using the new AttributeIdNumber and updating the ids of the key and information inputs
    newAttribute.id = `field_${field}_Attribute_${AttributeIdNumber}`;
    newAttribute.querySelector(`#field_dummy_key_dummy`).id = `field_${field}_key_${AttributeIdNumber}`;
    newAttribute.querySelector(`#field_dummy_information_dummy`).id = `field_${field}_information_${AttributeIdNumber}`;

    // Make the newAttribute visible
    newAttribute.style.display = '';

    // Make the delete button in the newAttribute visible
    newAttribute.querySelector(`#delete_button`).style.display = '';

    // Update the id of the button for the previous Attribute to the new AttributeIdNumber
    leadAttribute.parentElement.querySelector(`#field_${field}_button_${PreviousAttributeIdNumber}`).id = `field_${field}_button_${AttributeIdNumber}`;

    // Get the button to add a new Attribute and insert the newAttribute before the add button
    var button = leadAttribute.parentElement.querySelector('#add_Attribute_button');
    leadAttribute.parentNode.insertBefore(newAttribute, button);
    
    // If add is true, update the number of Attributes in the localStorage and save the form data
    if (add) {
        var amount = parseInt(localStorage.getItem(`field_${field}_Attributes`)) + 1 || 1;
        localStorage.setItem(`field_${field}_Attributes`, JSON.stringify(amount));
        saveFormData();
    }
}

/**
 * Adds a new field to the form.
 *
 * @param {string} previousButtonId - The id of the previous button
 * @param {boolean} add - Flag to indicate whether this call increases the number of Attributes
 * @return {void}
 */
function addField(previousButtonId, add = true) {
    // Extract the number from the previous button id
    var previousFieldIdNumber = previousButtonId.split('_')[1];
    var newFieldIdNumber = parseInt(previousFieldIdNumber) + 1;

    // Clone the dummy field template
    var newField = document.getElementById('field_dummy').cloneNode(true);

    // Update the ids of the cloned field and its child elements
    newField.id = `field_${newFieldIdNumber}`;
    newField.querySelector(`#field_key_dummy`).id = `field_key_${newFieldIdNumber}`;
    newField.querySelector(`#field_description_dummy`).id = `field_description_${newFieldIdNumber}`;
    newField.querySelector(`#field_dummy_Attribute_dummy`).id = `field_${newFieldIdNumber}_Attribute_1`;
    newField.querySelector(`#field_dummy_key_dummy`).id = `field_${newFieldIdNumber}_key_1`;
    newField.querySelector(`#field_dummy_information_dummy`).id = `field_${newFieldIdNumber}_information_1`;
    newField.querySelector(`#field_dummy_button_dummy`).id = `field_${newFieldIdNumber}_button_1`;

    // Make the new field visible
    newField.style.display = '';

    // Get the descriptive element and the add field button
    var descriptive_element = document.getElementById('descriptive');
    var button = document.getElementById('add_field_button');

    // Update the id of the previous button and insert the new field before the add field button
    descriptive_element.querySelector(`#button_${previousFieldIdNumber}`).id = `button_${newFieldIdNumber}`;
    descriptive_element.insertBefore(newField, button);

    // If add flag is true, update the local storage and save form data
    if (add) {
        var amount = parseInt(localStorage.getItem('fields')) + 1 || 1;
        localStorage.setItem('fields', JSON.stringify(amount));
        saveFormData();
    }
}

/**
 * Deletes the parent element of the clicked button and updates the local storage accordingly.
 *
 * @param {Event} event - The event object representing the click event
 * @return {void} 
 */
function deleteParent() {
    // Get the button element that was clicked
    const clickedButton = event.target;

    // Get the parent element of the button
    const parentElement = clickedButton.parentElement;

    // Get the page from the parent element id
    var page = parentElement.id.split('_')[0];

    // Update local storage based on the page and element type
    if (page === "field") {
        if (parentElement.id.split('_')[2] === "Attribute") {
            var field = parentElement.id.split('_')[1]
            var amount = parseInt(localStorage.getItem(`field_${field}_Attributes`)) - 1;
            localStorage.setItem(`field_${field}_Attributes`, JSON.stringify(amount));
        } else {
            var amount = parseInt(localStorage.getItem('fields')) - 1;
            localStorage.setItem('fields', JSON.stringify(amount));
        }
    } else {
        var amount = parseInt(localStorage.getItem(page)) - 1;
        localStorage.setItem(page, JSON.stringify(amount));
    }

    // Save form data
    saveFormData();

    // Remove the parent element
    parentElement.remove();
}


/**
 * Saves form data to local storage.
 * Selects all input, textarea, and select elements within the form container and saves their values to local storage.
 * For checkboxes and radio buttons, it saves their checked status. For multiple-select elements, it saves an array of selected options. 
 * For other elements, it saves their regular value.
 * 
 * @return {void}
 */
function saveFormData() {
    // Select all input, textarea, and select elements within the form container
    const formElements = document.querySelectorAll('.form-container input, .form-container textarea, .form-container select');

    // Save each element's value to local storage
    formElements.forEach((element, index) => {
        let value;

        if (element.type === 'checkbox' || element.type === 'radio') {
            // For checkboxes and radio buttons, save their checked status
            value = element.checked;
        } else if (element.type === 'select-multiple') {
            // For multiple-select elements, save an array of selected options
            value = Array.from(element.selectedOptions).map(option => option.value);
        } else {
            // For other elements, save their regular value
            value = element.value;
        }

        localStorage.setItem(`form_element_${index}`, JSON.stringify(value));
    });
}

/**
 * Loads form data from local storage and populates form elements with the saved values.
 * 
 * @return {void}
 */
function loadFormData() {
    // Load and populate added fields in the administrative section
    var administrativeProcesses = JSON.parse(localStorage.getItem('administrative'));
    for (let i = 1; i <= administrativeProcesses; i++) {
        addQuestion(`administrative_button_${i}`, false);
    }

    // Load and populate added keys in the structural section
    var structuralAddKeys = JSON.parse(localStorage.getItem('structural'));
    for (let i = 1; i <= structuralAddKeys; i++) {
        addQuestion(`structural_button_${i}`, false);
    }

    // Load and populate fields and their attributes
    var fieldsCount = JSON.parse(localStorage.getItem('fields'));
    for (let i = 1; i <= fieldsCount; i++) {
        addField(`button_${i}`, false);
        var attributesCount = JSON.parse(localStorage.getItem(`field_${i}_attributes`));
        for (let j = 1; j <= attributesCount; j++) {
            addAttribute(`field_${i}_button_${j}`, false);
        }
    }

    // Select all input, textarea, and select elements within the form container
    const formElements = document.querySelectorAll('.form-container input, .form-container textarea, .form-container select');

    // Load values from local storage and populate the form elements
    formElements.forEach((element, index) => {
        // Retrieve saved value from local storage
        const savedValue = localStorage.getItem(`form_element_${index}`);
        let parsedValue;

        try {
            // Attempt to parse the saved value
            parsedValue = JSON.parse(savedValue);
        } catch (error) {
            // If parsing fails, use the saved value as is
            parsedValue = savedValue;
        }

        if (element.type === 'checkbox' || element.type === 'radio') {
            // For checkboxes and radio buttons, set their checked status
            element.checked = parsedValue;
        } else if (element.type === 'select-multiple') {
            // For multiple-select elements, select the saved options
            Array.from(element.options).forEach(option => {
                option.selected = parsedValue && parsedValue.includes(option.value);
            });
        } else {
            // For other elements, set their regular value
            element.value = parsedValue || '';
            if (element.type === 'textarea') {
                // Automatically adjust the size of textarea
                autoGrow(element);
            }
        }
    });
}

// Attach an event listener to each form element to save data when it changes
document.addEventListener('input', function (event) {
    const targetElement = event.target;

    // Check if the target element is an input field, textarea, or select
    if (targetElement.matches('.form-container input, .form-container textarea, .form-container select')) {
        saveFormData();
    }
});

// Call loadFormData() on page load to populate the form with saved values
window.addEventListener('load', loadFormData);
