// proxy.js

exports.handler = async function (event, context) {
  try {
    // Forward the request to the target API using fetch
    const url = `https://comfyslothupgrad.netlify.app/api/v1/products${event.path}`;
    const method = event.httpMethod;

    // Only include a body for non-GET requests
    const options = {
      method,
      headers: event.headers,
    };

    if (method !== 'GET') {
      options.body = event.body;
    }

    const response = await fetch(url, options);

    // Check if the response is empty
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();

    // Return the response from the target API
    return {
      statusCode: response.status,
      body: JSON.stringify(responseData),
      headers: response.headers,
    };
  } catch (error) {
    // Handle errors gracefully
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
