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
