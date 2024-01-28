function generateYAMLFile() {

    const summary = getSummray()
    const administrative = getAdministrative()
    const process = getProcesses()
    const structural = getStructural()
    const descriptive = getDescriptive()

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

function downloadYAMLFile() {
    content = generateYAMLFile();
    filename = 'filename.yml';
    contentType = 'text/yaml';
    const blob = new Blob([content], { type: contentType });

    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function splitTextByLength(text, maxLength) {
    if (!text) return "N/A";

    let words = text.split(' ');
    let lines = [];
    let currentLine = '';

    for (const word of words) {
        if ((currentLine + word).length <= maxLength) {
            currentLine += word + ' ';
        } else {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        }
    }

    if (currentLine) {
        lines.push(currentLine.trim());
    }

    return lines.join('\n');
}

// {-------------------------------------------}
// After this are all functions that get the data from the input fields.

function getSummray() {
    const summaryRaw =
    {
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
                    `  # Which are the data are from. Can be an exact coordinate, a polygon, a town name, a country name, etc.
  # If providing coordinates/polygons, it must be encoded as WKT with an SRID of 4326.`;
                break;
            case 'data_type':
                comment =
                    `  # Which type of data this is.
  # Must be one or more of:
  #     survey, interviews, mobile network, itsg5, lane markings, signage, physical road infrastructure,
  #     speed/acceleration, video, pictures, gnss, lidar, radar, weather, vehicle probe data, events, other.
  # You may add multiple data types if relevant, separated by a comma.`;
                break;
            case 'modi_use_case':
                comment =
                    `  # Which of the use cases in MODI this dataset is related to.
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


        // Add the seperator if the value consists of several lines.
        // Also add the indice for the several lines.
        if (value.includes('\n')) {
            separator = `: |\n`;
            return `\n${comment}  ${key}${separator}${value.split('\n').map(line => `    ${line}`).join(`\n`)}`;
        } else {
            return `\n${comment}  ${key}${separator}${value.split('\n').join(`\n`)}`;
        }


    }).join('\n');



    return summaryComments;
}

function getAdministrative() {
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

function getProcesses() {
    const processElement = document.getElementById('process');
    const amount = processElement.querySelector('#add_question_button').querySelector('button').id.split('_')[2];

    for (let i = 1; i <= amount; i++) {
        const keyElement = document.getElementById(`administrative_key_${i}`);
        const descriptionElement = document.getElementById(`administrative_description_${i}`);

        if (keyElement && descriptionElement) {
            const key = keyElement.value;
            const description = descriptionElement.value;

            // Check if both key and description have values before adding to the process object
            if (key.trim() !== '' && description.trim() !== '') {
                process[key] = description;
            }
        }
    }

    const processEdited = Object.entries(process).map(([key, value]) => {
        let separator = `: |\n`;

        return `    ${key}${separator}${value.split('\n').map(line => `      ${line}`).join(`\n`)}`;
    }).join('\n');

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

function getStructural() {
    const structuralRaw = {
        summary: splitTextByLength(document.getElementById('summary').value, 85),
        file_format: splitTextByLength(document.getElementById('file_format').value, 85),
        file_structure: splitTextByLength(document.getElementById('file_structure').value, 85),
        required_tools: splitTextByLength(document.getElementById('required_tools').value, 85),
        tool_version: splitTextByLength(document.getElementById('tool_version').value, 85),
    };

    const structuralElement = document.getElementById('add_keys_structural');
    const amount = structuralElement.querySelector('#add_question_button').querySelector('button').id.split('_')[2];

    for (let i = 1; i <= amount; i++) {
        const keyElement = document.getElementById(`structural_key_${i}`);
        const descriptionElement = document.getElementById(`structural_description_${i}`);

        if (keyElement && descriptionElement) {
            const key = keyElement.value;
            const description = descriptionElement.value;

            // Check if both key and description have values before adding to the process object
            if (key.trim() !== '' && description.trim() !== '') {
                add_keys_structural[key] = description;
            }
        }
    }

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
  # tables, indices, triggers and views is important.`
                break;
            case 'required_tools':
                comment = `  # Which tools can be used to read the data. Especially important for non-standard formats.`;
                break;
            case 'tool_version':
                comment = `  # If the files were made using a specific tool, the tool name and version may be relevant
  # for reading the data.`
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

    const structuralFinal = structuralComments + `\n\n  # Additional keys and values can be added here if this is a non-standard format that requires
  # a more detailed explanation.\n` + structuralAdd;

    return structuralFinal;
}

function getDescriptive() {
    const descriptiveRaw = {};

    const descriptionElement = document.getElementById('add_field_button');
    const fields = descriptionElement.querySelector('button').id.split('_')[1];

    for (let i = 1; i <= fields; i++) {
        const field = {};

        const fieldElement = document.getElementById(`field_${i}`);

        if (fieldElement) {
            const keyElement = document.getElementById(`field_key_${i}`);
            const descriptionElement = document.getElementById(`field_description_${i}`);

            if (keyElement && descriptionElement) {
                const fieldKey = keyElement.value;
                const fieldDescription = splitTextByLength(descriptionElement.value, 85);;

                // Check if both key and description have values before adding to the process object
                if (fieldKey.trim() !== '' && fieldDescription.trim() !== '') {
                    field["description"] = fieldDescription;
                }

                const attributes = fieldElement.querySelector('#add_atribute_button').querySelector('button').id.split('_')[3];
                
                for (let j = 1; j <= attributes; j++) {
                    const attributeElement = document.getElementById(`field_${i}_key_${j}`);
                    const informationElement = document.getElementById(`field_${i}_information_${j}`);

                    if (attributeElement && informationElement) {
                        const atributekey = attributeElement.value;
                        const atributeInformation = splitTextByLength(informationElement.value, 85);
                        
                        // Check if both key and description have values before adding to the process object
                        if (atributekey.trim() !== '' && atributeInformation.trim() !== '') {
                            field[atributekey] = atributeInformation;
                        }
                    }
                }
                descriptiveRaw[fieldKey] = field;
            }
        }
    }


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

    const descriptiveFinal = Object.entries(descriptiveRaw).map(([key, value]) => {

        return `\n    ${key}:${stringifyNestedObject(value)}`;

    }).join('\n');


    return descriptiveFinal;
}