/**
 * Download a YAML file based on the given metadata type
 * 
 * @param {string} metadataType - The type of metadata to be used for generating the YAML file
 * @returns {void}
 */
function downloadYAMLFile(metadataType) {
    // Generate the YAML content based on the metadata type and summary
    const yamlContent = generateFile(metadataType);

    // Set the filename and content type for the downloaded file
    const filename = document.getElementById('filename');
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
 * Upload a YAML file based on the given metadata type
 * 
 * @param {string} metadataType - The type of metadata to be used for generating the YAML file
 * @returns {void}
 */
function uploadYAMLFile(metadataType) {
    // Generate the YAML content based on the metadata type and summary
    const content = generateFile(metadataType);
    const filename = document.getElementById('filename').value;

    const clientId = 'b9de7bfea9e345797983';
    const redirectUri = 'http://localhost:3000/oauth/callback';
    const scope = 'repo';
    const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${filename}`;


      fetch('http://localhost:3000/fileUpload', {
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