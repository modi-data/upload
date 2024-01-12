function generateYAMLFile() {
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
    
    const summary = {
        why_was_it_collected: splitTextByLength(document.getElementById('why_was_it_collected').value, 85),
        how_was_the_collection_executed: splitTextByLength(document.getElementById('how_was_the_collection_executed').value, 85),
        objectives: splitTextByLength(document.getElementById('objectives').value, 85),
        research_questions: splitTextByLength(document.getElementById('research_questions').value, 85),
        experimental_plan: splitTextByLength(document.getElementById('experimental_plan').value, 85),
        sample_selection_criteria: splitTextByLength(document.getElementById('sample_selection_criteria').value, 85),
        contact_person: splitTextByLength(document.getElementById("contact_person_name").value + ', ' + document.getElementById("contact_person_mail").value, 85),
        producer_of_data: splitTextByLength(document.getElementById('producer_of_data').value, 85),
        data_area: splitTextByLength(document.getElementById('data_area').value, 85),
        data_type: Array.from(document.querySelectorAll('input[name="data_type"]:checked')).map(checkbox => checkbox.value).join(', '),
        modi_use_case: splitTextByLength(document.getElementById('modi_use_case').value, 85),
        dataset_size: splitTextByLength(document.getElementById('dataset_size').value, 85),
        dataset_example: splitTextByLength(document.getElementById('dataset_example').value, 300)
    };
    

    const date = document.getElementById('datePicker').value;



    const yamlContent = `
# This metadata format is based on the FOT-Net Data Sharing Framework (DSF).
# The DSF can be consulted if anything is unclear; each section in the format is directly
# or indirectly based on a section in the DSF document.
# https://www.connectedautomateddriving.eu/wp-content/uploads/2021/09/Data-Sharing-Framework-v1.1-final.pdf

# The summary should contain a thorough description of the study design and execution.
# The description must be complete and self-contained, but can contain links
# to images and further information (but keep in mind that the description
# must make sense even if those links should stop working.)
# Multiline strings can be written by starting the value with a pipe symbol (|).
    
summary:

${Object.entries(summary).map(([key, value]) => {
    let comment = '';
    switch (key) {
        case 'contact_person':
            comment = '# A person that can be contacted for more information about this dataset.';
            break;
        case 'producer_of_data':
            comment = '# Which entity produced this dataset';
            break;
        case 'data_area':
            comment = '# Which are the data are from. Can be an exact coordinate, a polygon, a town name, a country name, etc.\n# If providing coordinates/polygons, it must be encoded as WKT with an SRID of 4326.';
            break;
        case 'data_type':
            comment = '# Which type of data this is.\n# Must be one or more of:\n#     survey, interviews, mobile network, itsg5, lane markings, signage, physical road infrastructure,\n#     speed/acceleration, video, pictures, gnss, lidar, radar, weather, vehicle probe data, events, other.\n# You may add multiple data types if relevant, separated by a comma.';
            break;
        case 'modi_use_case':
            comment = '# Which of the use cases in MODI this dataset is related to.\n# Must be one of: UCNL, UCGE, UCSE, UCNO, UCCCAM, Other tasks';
            break;
        case 'dataset_size':
            comment = '# An approximate description of the size of this dataset';
            break;
        case 'dataset_example':
            comment = '# A tiny sample of the dataset to show how it looks (if possible).';
            break;
    }
    return `${comment}\n  ${key}: |\n${value.split('\n').map(line => `    ${line}`).join('\n')}`;
}).join('\n\n')}`;


    download(yamlContent, `metadata_${date}.yml`, 'text/yaml');
}

function download(content, filename, contentType) {
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
