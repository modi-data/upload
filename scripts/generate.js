/**
 * Generates a YAML file with metadata based on the FOT-Net Data Sharing Framework (DSF).
 * The metadata includes all parts.
 * 
 * @returns {string} The YAML content with the metadata.
 */
function generateYAMLFile() {
    // Get all the metadata
    const summary = generateSummray()
    const administrative = generateAdministrative()
    const process = generateProcesses()
    const structural = generateStructural()
    const descriptive = generateDescriptive()

    // Construct the YAML content
    const yamlContent =
        `# This metadata format is based on the FOT-Net Data Sharing Framework (DSF).
# The DSF can be consulted if anything is unclear; each section in the format is directly
# or indirectly based on a section in the DSF document.
# https://www.connectedautomateddriving.eu/wp-content/uploads/2021/09/Data-Sharing-Framework-v1.1-final.pdf

# The summary should contain a thorough description of the study design and execution.
# The description must be complete and self-contained, but can contain links
# to images and further information (but keep in mind that the description
# must make sense even if those links should stop working.)
# Multiline strings can be written by starting the value with a pipe symbol (|).
summary:
${summary}

# 5.3.3 Administrative metadata
# "Administrative metadata are collected for the effective operation and management of data
# storage and catalogues. This administrative information, covering various topics, is stored
# along with the datasets. From a FOT data re-use perspective, the key role of administrative
# metadata is to cover access conditions, rights, ownership and constraints."
administrative:
${administrative}

${process}

# 5.3.2 Structural metadata
# "Structural metadata are used to describe how the data are structured in relation to other
# data. Data are organized into a system (e.g., a database and/or file system), a structure or
# database schema and a data content format. The aim of structural metadata is to facilitate
# the initial phase of data re-use by providing the necessary documentation about how the data
# is organized. The description should include the file system, the file structure and how to
# interpret the contents of a data container. All components of the dataset need to be
# described."
structural:
${structural}

# 5.3.1 Descriptive metadata
# "Descriptive metadata shall include detailed information needed to understand each part of a
# dataset. The purpose is to describe the dataset and build trust in it—by providing not only the
# characteristics of each measure or component, but also information about how the data were
# generated and collected."
descriptive:

  # The descriptions can vary by data type.
  # For each data field in your dataset, please fill out all relevant parameters from section
  # 5.3.1 of the DSF, and enter the attributes using the "Data description item" in lower-case
  # as the key. The following list lists the most relevant attributes from the tables, see 
  # tables 3 to 9 in the DSF for full explanations.
  
  # - description
  # - data_precision
  # - unit
  # - sample_rate
  # - filter
  # - origin
  # - bias
  # - type
  # - definition
  # - range
  # - error_codes
  # - quality
  # - offset
  # - enumeration_specification
  # - availability
  # - srid (for coordinates)
  # - time_zone (for time stamps)
  # - time_format (for time stamps)

  # Please note the following additions to the DSF:
  # - When dealing with coordinates, the SRID must be specified with the srid key.
  # - When dealing with times, the time zone must be specified with the timezone key.
  # - When dealing with dates or times, the format must be specified with the format key.
  
  fields:
${descriptive}
`
    return yamlContent;
}

/**
 * Generate a YAML file with metadata based on the provided metadata type and summary.
 * 
 * @param {string} metadataType - The type of metadata: "Administrative", "Structural", or "Descriptive".
 * @param {string} summary - A thorough description of the study design and execution.
 * @returns {string} - The generated YAML content.
 */
function generateFile(metadataType) {
    const summary = generateSummary();
    // Initialize the YAML content with a header and the provided summary
    var yamlContent = `# This metadata format is based on the FOT-Net Data Sharing Framework (DSF).
# The DSF can be consulted if anything is unclear; each section in the format is directly
# or indirectly based on a section in the DSF document.
# https://www.connectedautomateddriving.eu/wp-content/uploads/2021/09/Data-Sharing-Framework-v1.1-final.pdf

# The summary should contain a thorough description of the study design and execution.
# The description must be complete and self-contained, but can contain links
# to images and further information (but keep in mind that the description
# must make sense even if those links should stop working.)
# Multiline strings can be written by starting the value with a pipe symbol (|).
summary:
${summary}

`;

    // Append specific metadata based on the provided metadata type
    if (metadataType === "Administrative") {
        // Get administrative and process metadata
        const administrative = generateAdministrative();
        const process = generateProcesses();
        yamlContent += `# 5.3.3 Administrative metadata
# "Administrative metadata are collected for the effective operation and management of data
# storage and catalogues. This administrative information, covering various topics, is stored
# along with the datasets. From a FOT data re-use perspective, the key role of administrative
# metadata is to cover access conditions, rights, ownership and constraints."
administrative:
${administrative}

${process}`;
    } else if (metadataType === "Structural") {
        // Get structural metadata
        const structural = generateStructural();
        yamlContent += `# 5.3.2 Structural metadata
# "Structural metadata are used to describe how the data are structured in relation to other
# data. Data are organized into a system (e.g., a database and/or file system), a structure or
# database schema and a data content format. The aim of structural metadata is to facilitate
# the initial phase of data re-use by providing the necessary documentation about how the data
# is organized. The description should include the file system, the file structure and how to
# interpret the contents of a data container. All components of the dataset need to be
# described."
structural:
${structural}
`;
    } else if (metadataType === "Descriptive") {
        // Get descriptive metadata
        const descriptive = generateDescriptive();
        yamlContent += `# 5.3.1 Descriptive metadata
# "Descriptive metadata shall include detailed information needed to understand each part of a
# dataset. The purpose is to describe the dataset and build trust in it—by providing not only the
# characteristics of each measure or component, but also information about how the data were
# generated and collected."
descriptive:

  # The descriptions can vary by data type.
  # For each data field in your dataset, please fill out all relevant parameters from section
  # 5.3.1 of the DSF, and enter the attributes using the "Data description item" in lower-case
  # as the key. The following list lists the most relevant attributes from the tables, see 
  # tables 3 to 9 in the DSF for full explanations.
  
  # - description
  # - data_precision
  # - unit
  # - sample_rate
  # - filter
  # - origin
  # - bias
  # - type
  # - definition
  # - range
  # - error_codes
  # - quality
  # - offset
  # - enumeration_specification
  # - availability
  # - srid (for coordinates)
  # - time_zone (for time stamps)
  # - time_format (for time stamps)

  # Please note the following additions to the DSF:
  # - When dealing with coordinates, the SRID must be specified with the srid key.
  # - When dealing with times, the time zone must be specified with the timezone key.
  # - When dealing with dates or times, the format must be specified with the format key.
  
  fields:
${descriptive}
`;
    }
    return yamlContent;
}

/**
 * Splits the input text into lines of maximum length
 * 
 * @param {string} text - The input text to be split
 * @param {number} maxLength - The maximum length of each line
 * @returns {string} - The text split into lines of maximum length
 */
function splitTextByLength(text, maxLength) {
    // If input text is empty, return "N/A"
    if (!text) return "N/A";

    // Split the text into words
    let words = text.split(' ');
    let lines = [];
    let currentLine = '';

    // Iterate through each word to create lines of maximum length
    for (const word of words) {
        // Check if adding the word to the current line exceeds the maximum length
        if ((currentLine + word).length <= maxLength) {
            // If not, add the word to the current line
            currentLine += word + ' ';
        } else {
            // If adding the word exceeds the maximum length, push the current line to the lines array and start a new line
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        }
    }

    // Push the last line to the lines array
    if (currentLine) {
        lines.push(currentLine.trim());
    }

    // Join the lines with newline characters and return the result
    return lines.join('\n');
}

// {-------------------------------------------------------------------}
// After this are all functions thatgenerate the data from the input fields.

/**
 * Generates a summary of the collected data and its metadata.
 * 
 * @returns {string} - The generated summary with comments.
 */
function generateSummary() {
    // Define the raw data for the summary
    const summaryRaw = {
        why_was_it_collected: splitTextByLength(document.getElementById('why_was_it_collected').value, 85),
        how_was_the_collection_executed: splitTextByLength(document.getElementById('how_was_the_collection_executed').value, 85),
        objectives: splitTextByLength(document.getElementById('objectives').value, 85),
        research_questions: splitTextByLength(document.getElementById('research_questions').value, 85),
        experimental_plan: splitTextByLength(document.getElementById('experimental_plan').value, 85),
        sample_selection_criteria: splitTextByLength(document.getElementById('sample_selection_criteria').value, 85),
        contact_person: splitTextByLength(document.getElementById("contact_person_name").value + ', ' + document.getElementById("contact_person_mail").value, 85),
        producer_of_data: splitTextByLength(document.getElementById('producer_of_data').value, 85),
        data_area: splitTextByLength(document.getElementById('data_area').value, 85),
        data_type: splitTextByLength(Array.from(document.querySelectorAll('input[name="data_type"]:checked')).map(checkbox => checkbox.value).join(', '), 85),
        modi_use_case: splitTextByLength(document.getElementById('modi_use_case').value, 85),
        dataset_size: splitTextByLength(document.getElementById('dataset_size').value, 85),
        dataset_example: splitTextByLength(document.getElementById('dataset_example').value, 300)
    };

    // Generate comments for each data entry
    const summaryComments = Object.entries(summaryRaw).map(([key, value]) => {
        let comment = '';
        let separator = ': ';

        switch (key) {
            case 'contact_person':
                comment =
                    '  # A person that can be contacted for more information about this dataset.';
                break;
            case 'producer_of_data':
                comment =
                    '  # Which entity produced this dataset.';
                break;
            case 'data_area':
                comment =
                    `  # Which area the data is from. Can be an exact coordinate, a polygon, a town name, a country name, etc.
  # If providing coordinates/polygons, it must be encoded as WKT with an SRID of 4326.`;
                break;
            case 'data_type':
                comment =
                    `  # The type of data this is.
  # Must be one or more of:
  #     survey, interviews, mobile network, itsg5, lane markings, signage, physical road infrastructure,
  #     speed/acceleration, video, pictures, gnss, lidar, radar, weather, vehicle probe data, events, other.
  # You may add multiple data types if relevant, separated by a comma.`;
                break;
            case 'modi_use_case':
                comment =
                    `  # The use case in MODI this dataset is related to.
  # Must be one of: UCNL, UCGE, UCSE, UCNO, UCCCAM, Other tasks`;
                break;
            case 'dataset_size':
                comment =
                    `  # An approximate description of the size of this dataset`;
                break;
            case 'dataset_example':
                comment =
                    '  # A tiny sample of the dataset to show how it looks (if possible).';
                break;
        }

        // New line after comments
        if (comment != '') {
            comment += '\n';
        }

        // Add the separator if the value consists of several lines.
        // Also add the indentation for the several lines.
        if (value.includes('\n')) {
            separator = `: |\n`;
            return `\n${comment}  ${key}${separator}${value.split('\n').map(line => `    ${line}`).join(`\n`)}`;
        } else {
            return `\n${comment}  ${key}${separator}${value.split('\n').join(`\n`)}`;
        }
    }).join('\n');

    return summaryComments;
}

/**
 * Retrieves administrative information from the HTML form and formats it with comments.
 * 
 * @returns {string} - Formatted administrative information with comments.
 */
function generateAdministrative() {
    // Retrieve administrative information from the HTML form
    const administrativeRaw = {
        version_number: document.getElementById('version_number').value,
        archiving_date: document.getElementById('archiving_date').value,
        unique_dataset_id: document.getElementById('unique_dataset_id').value,
        rights: splitTextByLength(document.getElementById('rights').value, 85),
        license: document.getElementById('license').value,
        access: splitTextByLength(document.getElementById('access').value, 85),
        constraints: splitTextByLength(document.getElementById('constraints').value, 85),
        billing: splitTextByLength(document.getElementById('billing').value, 85),
        data_end_of_life: document.getElementById('data_end_of_life').value,
    };

    // Format administrative information with comments
    const administrativeComments = Object.entries(administrativeRaw).map(([key, value]) => {
        let comment = '';
        let separator = ': ';

        // Add comments based on the key
        switch (key) {
            case 'version_number':
                comment = `  # The version number of this dataset, used to keep track of different
  # versions if it is uploaded multiple times.
  # The version number can be numeric, date-based, or anything else, but
  # it must be easy to see which version is newer without further knowledge.`;
                break;
            case 'archiving_date':
                comment = '  # The date this dataset was uploaded. Must be in ISO 8601 format (YYYY-MM-DD).';
                break;
            case 'unique_dataset_id':
                comment = `  # A unique identifier for this dataset. This will be used to identify this and
  # future updates in the metadata database, and must never be changed after the
  # dataset has been uploaded for the first time.`;
                break;
            case 'rights':
                comment = '  # Who has rights to use this dataset?';
                break;
            case 'license':
                comment = '  # Does the dataset have a specific license for usage?';
                break;
            case 'access':
                comment = '  # Who can access the dataset?';
                break;
            case 'constraints':
                comment = '  # Any constraints in usage of the dataset?';
                break;
            case 'billing':
                comment = '  # Can the dataset be used for free, or does usage incur any costs/billing for the user?';
                break;
            case 'data_end_of_life':
                comment = `  # When the data set will stop existing (for example due to privacy regulations).
  # Must be in ISO 8601 format (YYYY-MM-DD).`;
                break;
        }

        // New line after comments
        if (comment != '') {
            comment += '\n';
        }

        // Adjust the separator and formatting based on the value
        if (value.includes('\n')) {
            separator = `: |\n`;
            return `\n${comment}  ${key}${separator}${value.split('\n').map(line => `    ${line}`).join(`\n`)}`;
        } else {
            return `\n${comment}  ${key}${separator}${value.split('\n').join(`\n`)}`;
        }
    }).join('\n');

    return administrativeComments;
}

/**
 * Retrieves processes from the DOM and formats them as a YAML string.
 * 
 * @returns {string} - The formatted YAML string describing the processes.
 */
function generateProcesses() {
    const processElement = document.getElementById('process');
    const amount = processElement.querySelector('#add_question_button').querySelector('button').id.split('_')[2];

    // Retrieve key-value pairs for each process
    const process = {};
    for (let i = 1; i <= amount; i++) {
        const keyElement = document.getElementById(`administrative_key_${i}`);
        const descriptionElement = document.getElementById(`administrative_description_${i}`);

        if (keyElement && descriptionElement) {
            const key = keyElement.value;
            const description = splitTextByLength(descriptionElement.value, 85);

            // Check if both key and description have values before adding to the process object
            if (key.trim() !== '' && description.trim() !== '') {
                process[key] = description;
            }
        }
    }

    // Format the processes as a YAML string
    const processEdited = Object.entries(process).map(([key, value]) => {
        let separator = `: |\n`;

        return `    ${key}${separator}${value.split('\n').map(line => `      ${line}`).join(`\n`)}`;
    }).join('\n');

    // Create the final YAML string with a detailed description of the processes
    const processFinal =
        `  # A more detailed description of the various processes of the data collection,
  # for example the methods/tools used to collect the data, filtering, post-processing,
  # storage file structure, etc.
  # This should include information about relevant conditions during the data collection
  # (for example weather, climate, time of day, etc).
  # Each key under "processes" can be custom made, and there can be as many as is
  # necessary. The proposed keys are just examples.
  processes:
${processEdited}`

    return processFinal;
}

/**
 * Retrieves the structural information from the input fields and constructs a formatted output with comments
 * 
 * @returns {string} - The formatted structural information with comments
 */
function generateStructural() {
    // Retrieve raw structural information from input fields
    const structuralRaw = {
        summary: splitTextByLength(document.getElementById('summary').value, 85),
        file_format: splitTextByLength(document.getElementById('file_format').value, 85),
        file_structure: splitTextByLength(document.getElementById('file_structure').value, 85),
        required_tools: splitTextByLength(document.getElementById('required_tools').value, 85),
        tool_version: splitTextByLength(document.getElementById('tool_version').value, 85),
    };

    // Retrieve the amount of keys to be added
    const structuralElement = document.getElementById('add_keys_structural');
    const amount = structuralElement.querySelector('#add_question_button').querySelector('button').id.split('_')[2];

    // Construct the object of additional keys and descriptions
    const add_keys_structural = {};
    for (let i = 1; i <= amount; i++) {
        const keyElement = document.getElementById(`structural_key_${i}`);
        const descriptionElement = document.getElementById(`structural_description_${i}`);

        if (keyElement && descriptionElement) {
            const key = keyElement.value;
            const description = splitTextByLength(descriptionElement.value, 85);

            // Check if both key and description have values before adding to the process object
            if (key.trim() !== '' && description.trim() !== '') {
                add_keys_structural[key] = description;
            }
        }
    }

    // Construct comments for each raw structural information
    const structuralComments = Object.entries(structuralRaw).map(([key, value]) => {
        let comment = '';
        let separator = ': ';

        // Add comments based on the key
        switch (key) {
            case 'file_format':
                comment = `  # File format. Please include attributes such as delimiter for CSV, decimal separator, 
  # thousand separator (if any), and any other properties that is relevant for parsing the data.`;
                break;
            case 'file_structure':
                comment = `  # Please describe the storage structure of the data. If it consists of flat files, the folder
  # structure and file naming can be relevant. If it is a database, a description of the relevant 
  # tables, indices, triggers and views is important.`;
                break;
            case 'required_tools':
                comment = `  # Which tools can be used to read the data. Especially important for non-standard formats.`;
                break;
            case 'tool_version':
                comment = `  # If the files were made using a specific tool, the tool name and version may be relevant
  # for reading the data.`;
        }

        // New line after comments
        if (comment != '') {
            comment += '\n';
        }

        // Adjust the separator and formatting based on the value
        if (value.includes('\n')) {
            separator = `: |\n`;
            return `\n${comment}  ${key}${separator}${value.split('\n').map(line => `    ${line}`).join(`\n`)}`;
        } else {
            return `\n${comment}  ${key}${separator}${value.split('\n').join(`\n`)}`;
        }
    }).join('\n');

    // Construct additional keys and descriptions
    const structuralAdd = Object.entries(add_keys_structural).map(([key, value]) => {
        let separator = ': ';

        // Adjust the separator and formatting based on the value
        if (value.includes('\n')) {
            separator = `: |\n`;
            return `\n  ${key}${separator}${value.split('\n').map(line => `    ${line}`).join(`\n`)}`;
        } else {
            return `\n  ${key}${separator}${value.split('\n').join(`\n`)}`;
        }
    }).join('\n');

    // Construct the final formatted structural information
    const structuralFinal = structuralComments + `\n\n  # Additional keys and values can be added here if this is a non-standard format that requires
  # a more detailed explanation.\n` + structuralAdd;

    return structuralFinal;
}

/**
 * Function to generate a descriptive object from the form fields
 * 
 * @returns {string} - A formatted string representing the descriptive object
 */
function generateDescriptive() {
    // Initialize an empty object to store the descriptive information
    const descriptiveObject = {};

    // Get the number of fields from the 'add_field_button' element
    const descriptionElement = document.getElementById('add_field_button');
    const fields = descriptionElement.querySelector('button').id.split('_')[1];

    // Iterate over each field to extract and process the information
    for (let i = 1; i <= fields; i++) {
        const field = {};

        // Get the field element by its ID
        const fieldElement = document.getElementById(`field_${i}`);

        if (fieldElement) {
            // Extract the key and description elements by their IDs
            const keyElement = document.getElementById(`field_key_${i}`);
            const descriptionElement = document.getElementById(`field_description_${i}`);

            if (keyElement && descriptionElement) {
                // Extract and format the field key and description
                const fieldKey = keyElement.value;
                const fieldDescription = splitTextByLength(descriptionElement.value, 85);

                // Check if both key and description have values before adding to the field object
                if (fieldKey.trim() !== '' && fieldDescription.trim() !== '') {
                    field["description"] = fieldDescription;
                }

                // Get the number of attributes for the current field
                const attributes = fieldElement.querySelector('#add_Attribute_button').querySelector('button').id.split('_')[3];

                // Iterate over each attribute to extract and process the information
                for (let j = 1; j <= attributes; j++) {
                    const attributeElement = document.getElementById(`field_${i}_key_${j}`);
                    const informationElement = document.getElementById(`field_${i}_information_${j}`);

                    if (attributeElement && informationElement) {
                        // Extract and format the attribute key and information
                        const attributeKey = attributeElement.value;
                        const attributeInformation = splitTextByLength(informationElement.value, 85);

                        // Check if both key and description have values before adding to the field object
                        if (attributeKey.trim() !== '' && attributeInformation.trim() !== '') {
                            field[attributeKey] = attributeInformation;
                        }
                    }
                }
                // Add the processed field to the descriptive object
                descriptiveObject[fieldKey] = field;
            }
        }
    }

    // Function to stringify a nested object with proper indentation and formatting
    const stringifyNestedObject = (obj) => {
        const indent = '      ';
        let result = '';

        for (const [key, value] of Object.entries(obj)) {
            if (key === 'description') {
                if (value.includes('\n')) {
                    result += `\n${indent}${key}: |\n${value.split('\n').map(line => `        ${line}`).join(`\n`)}\n`;
                } else {
                    result += `\n${indent}${key}: ${value}\n`;
                }
            } else {
                if (value.includes('\n')) {
                    result += `\n${indent}${key}: |\n${value.split('\n').map(line => `        ${line}`).join(`\n`)}`;
                } else {
                    result += `\n${indent}${key}: ${value}`;
                }
            }
        }

        return result;
    };

    // Convert the descriptive object to a formatted string
    const descriptiveFinal = Object.entries(descriptiveObject).map(([key, value]) => {
        return `\n    ${key}:${stringifyNestedObject(value)}`;
    }).join('\n');

    // Return the formatted string representing the descriptive object
    return descriptiveFinal;
}