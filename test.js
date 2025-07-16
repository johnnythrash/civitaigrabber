const axios = require("axios");

async function fetchModelDetails() {
  const modelId = 1618540;
  const versionId = 1931631;
  const apiKey = process.env.CIVITAI_API_KEY; // Make sure your .env or Doppler is set up

  try {
    const url = `https://civitai.com/api/v1/models/${modelId}/`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(
      "Error fetching model:",
      error.response?.data || error.message
    );
  }
}

fetchModelDetails();
