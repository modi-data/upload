function showPart(partNumber) {
    for (let i = 1; i <= 4; i++) {
        const partElement = document.getElementById(`part${i}`);
        if (i === partNumber) {
            partElement.style.display = 'block';
        } else {
            partElement.style.display = 'none';
        }
    }
    updateProgressBar(partNumber);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressBar(currentStep) {
    const progressBarItems = document.querySelectorAll('.progress-bar-item');
    progressBarItems.forEach((item, index) => {
        if (index + 1 === currentStep) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function autoGrow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight + 5) + "px";
}

function addQuestion(previousButtonId) {
    var page = previousButtonId.split('_')[0];
    var previousIdNumber = parseInt(previousButtonId.split('_')[2]);
    var newIdNumber = previousIdNumber + 1;

    var baseQuestion = document.getElementById(`${page}_question_1`);
    var newQuestion = baseQuestion.cloneNode(true);

    newQuestion.id = page + "_question_" + newIdNumber;
    newQuestion.querySelector(`#${page}_key_1`).id = `${page}_key_${newIdNumber}`;
    newQuestion.querySelector(`#${page}_description_1`).id = `${page}_description_${newIdNumber}`;

    newQuestion.querySelector(`#${page}_key_${newIdNumber}`).value = '';
    newQuestion.querySelector(`#${page}_description_${newIdNumber}`).value = '';

    newQuestion.querySelector(`#delete_button`).style.display = '';

    baseQuestion.parentElement.querySelector(`#${page}_button_${previousIdNumber}`).id = `${page}_button_${newIdNumber}`;

    var button = baseQuestion.parentElement.querySelector('#add_question_button'); 

    baseQuestion.parentNode.insertBefore(newQuestion, button);
}

function addAtribute(previousButtonId) {
    var field = previousButtonId.split('_')[1];
    var PreviousAtributeIdNumber = parseInt(previousButtonId.split('_')[3]);
    var atributeIdNumber = PreviousAtributeIdNumber + 1;
    var leadAtributeId = `field_${field}_atribute_1`;

    var leadAtribute = document.getElementById(leadAtributeId);
    var newAtribute = document.getElementById('field_dummy_atribute_dummy').cloneNode(true);

    newAtribute.id = `field_${field}_atribute_${atributeIdNumber}`;
    newAtribute.querySelector(`#field_dummy_key_dummy`).id = `field_${field}_key_${atributeIdNumber}`;
    newAtribute.querySelector(`#field_dummy_information_dummy`).id = `field_${field}_information_${atributeIdNumber}`;

    newAtribute.style.display = '';

    newAtribute.querySelector(`#delete_button`).style.display = '';

    leadAtribute.parentElement.querySelector(`#field_${field}_button_${PreviousAtributeIdNumber}`).id = `field_${field}_button_${atributeIdNumber}`;

    var button = leadAtribute.parentElement.querySelector('#add_atribute_button'); 
    leadAtribute.parentNode.insertBefore(newAtribute, button);
}

function addField(previousButtonId) {
    var previousFieldIdNumber = previousButtonId.split('_')[1];
    var newFieldIdNumber = parseInt(previousFieldIdNumber) + 1;

    var newField = document.getElementById('field_dummy').cloneNode(true);

    newField.id = `field_${newFieldIdNumber}`;
    newField.querySelector(`#field_key_dummy`).id = `field_key_${newFieldIdNumber}`;
    newField.querySelector(`#field_description_dummy`).id = `field_description_${newFieldIdNumber}`;

    newField.querySelector(`#field_dummy_atribute_dummy`).id = `field_${newFieldIdNumber}_atribute_1`;
    newField.querySelector(`#field_dummy_key_dummy`).id = `field_${newFieldIdNumber}_key_1`;
    newField.querySelector(`#field_dummy_information_dummy`).id = `field_${newFieldIdNumber}_information_1`;
    newField.querySelector(`#field_dummy_button_dummy`).id = `field_${newFieldIdNumber}_button_1`;

    newField.style.display = '';

    var descriptive_element = document.getElementById('descriptive');
    var button = document.getElementById('add_field_button');

    descriptive_element.querySelector(`#button_${previousFieldIdNumber}`).id = `button_${newFieldIdNumber}`;
    descriptive_element.insertBefore(newField, button);
}

// Function to delete the parent element of the clicked button
function deleteParent() {
    // Get the button element that was clicked
    const clickedButton = event.target;

    // Get the parent element of the button
    const parentElement = clickedButton.parentElement;

    // Remove the parent element
    parentElement.remove();
}


// Function to save all form data to local storage
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

// Function to load all form data from local storage
function loadFormData() {
    // Select all input, textarea, and select elements within the form container
    const formElements = document.querySelectorAll('.form-container input, .form-container textarea, .form-container select');

    // Load values from local storage and populate the form elements
    formElements.forEach((element, index) => {
        const savedValue = localStorage.getItem(`form_element_${index}`);
        let parsedValue;

        try {
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
