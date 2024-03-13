const mapping = {
  'Administrative': 2,
  'Structural': 3,
  'Descriptive': 4
};

/**
 * Download a YAML file based on the given metadata type
 * 
 * @param {string} metadataType - The type of metadata to be used for generating the YAML file
 * @returns {void}
 */
function downloadYAMLFile(metadataType) {
  // Check if the form is properly filled.
  partNumber = mapping[metadataType];
  if (!checkFields(partNumber)) {
    return;
  }

  // Generate the YAML content based on the metadata type and summary
  const yamlContent = generateFile(metadataType);

  // Set the filename and content type for the downloaded file
  const filename = document.getElementById('filename').value + ".yml";
  const contentType = 'text/yaml';

  // Create a Blob containing the YAML content with the specified content type
  const blob = new Blob([yamlContent], { type: contentType });

  // Create a link element to trigger the download
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // Clean up by removing the link and revoking the URL object after the download
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}


/**
 * Uploads a YAML file to a server and opens the GitHub OAuth authorization page.
 * @param {string} metadataType - The type of metadata.
 */
function uploadYAMLFile(metadataType) {
  // Check if the form is properly filled.
  partNumber = mapping[metadataType];
  if (!checkFields(partNumber)) {
    return;
  }

  // Generate the YAML content based on the metadata type and summary
  const content = generateFile(metadataType);
  const filename = document.getElementById('filename').value;

  const clientId = 'a8dab0a79e2c49379d8a';
  const scope = 'repo';
  const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${filename}`;


  fetch('http://carnas.ele.tue.nl:3000/fileUpload', {
    method: 'POST',
    body: JSON.stringify({
      content: content,
      filename: filename
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  window.open(oauthUrl, '_blank', 'width=800, height=600');
}


/**
 * Checks the fields in the specified part of the form for validity.
 * Resets error messages, checks required fields, and validates field formats.
 * If any errors are found, displays error messages and highlights the invalid fields.
 * @param {number} partNumber - The part number of the form section to check.
 * @returns {boolean} - Returns true if all fields are valid, false otherwise.
 */
function checkFields(partNumber) {
  // Resetting error messages
  var errorMessages = document.querySelectorAll('.error');
  errorMessages.forEach(function (errorMessage) {
    errorMessage.remove();
  });

  var requiredFields = document.getElementById(`part${partNumber}`).querySelectorAll('.required-question');
  var formatFields = document.getElementById(`part${partNumber}`).querySelectorAll('.required-format');
  var falses = [];

  // Check if the required fields are filled in
  requiredFields.forEach(function (field) {
    if (field.tagName.toLowerCase() === 'input' || field.tagName.toLowerCase() === 'textarea') {
      if (field.type === 'checkbox') {
        if (!document.querySelector('input[name="' + field.name + '"]:checked')) {
          falses.push(field);
          appendErrorMessage(field);
        }
      } else {
        if (field.value.trim() === '') {
          falses.push(field);
          appendErrorMessage(field);
        }
      }
    } else if (field.tagName.toLowerCase() === 'select') {
      if (field.value === '') {
        falses.push(field);
        appendErrorMessage(field);
      }
    }

    // Resetting border color
    field.style.border = '';
  });

  // Check if the fields with a required format match this requirement
  formatFields.forEach(function (field) {
    if (!isValidFormat(field.value)) {
      falses.push(field);
      appendErrorMessage(field, "Please only use lowercase letters and '_'");
    }

    // Resetting border color
    field.style.border = '';
  });

  if (falses.length === 0) {
    return true;
  } else {
    alert('Please fill in all required fields correctly.');
    // Highlighting the fields with red border
    falses.forEach(function (field) {
      if (field.tagName.toLowerCase() === 'input' || field.tagName.toLowerCase() === 'select') {
        if (field.value.trim() === '') {
          field.style.border = '1px solid red';
        }
      }
    });
    return false;
  }
}

/**
 * Appends an error message to a field.
 * @param {HTMLElement} field - The field to append the error message to.
 * @param {string} [message='Please fill this in'] - The error message to display.
 */
function appendErrorMessage(field, message = 'Please fill this in') {
  var errorMessageWrapper = document.createElement('div');
  errorMessageWrapper.setAttribute('data-qa', 'error-message-visible-error-wrapper');
  errorMessageWrapper.classList.add('error');

  var errorMessageIcon = document.createElement('span');
  errorMessageIcon.classList.add('error-message');
  errorMessageIcon.innerHTML = `<svg height="24" viewBox="0 0 24 24" width="24">
                      <path clip-rule="evenodd"
                          d="M16.3361 17.9998L7.00279 18C5.49294 18 4.52754 16.391 5.23806 15.0588L9.90471 6.30882C10.6576 4.89706 12.6812 4.89706 13.4341 6.30881L18.1008 15.0586C18.8113 16.3908 17.8459 17.9998 16.3361 17.9998ZM11.6694 8.50003C12.2217 8.50003 12.6694 8.94774 12.6694 9.50003V11.5C12.6694 12.0523 12.2217 12.5 11.6694 12.5C11.1171 12.5 10.6694 12.0523 10.6694 11.5V9.50003C10.6694 8.94774 11.1171 8.50003 11.6694 8.50003ZM11.6694 16C12.2217 16 12.6694 15.5523 12.6694 15C12.6694 14.4477 12.2217 14 11.6694 14C11.1171 14 10.6694 14.4477 10.6694 15C10.6694 15.5523 11.1171 16 11.6694 16Z"
                          fill-rule="evenodd"></path>
                  </svg>`;

  var errorMessage = document.createElement('div');
  errorMessage.setAttribute('data-qa', 'error-message-visible');
  errorMessage.setAttribute('role', 'alert');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;

  errorMessageWrapper.appendChild(errorMessageIcon);
  errorMessageWrapper.appendChild(errorMessage);

  // Appending error message after the field
  field.parentNode.appendChild(errorMessageWrapper);
}

/**
 * Checks if the given value is in a valid format.
 * 
 * @param {string} value - The value to be checked.
 * @returns {boolean} - Returns true if the value is in a valid format, false otherwise.
 */
function isValidFormat(value) {
  // Regular expression to match lowercase letter followed by lowercase letters, uppercase letters, or "_"
  var regex = /^[a-z][a-zA-Z_]*$/;
  return regex.test(value) || value === "";
}
