// proxy.js

exports.handler = async function (event, context) {
  try {
    // Forward the request to the target API using fetch
    const response = await fetch(`https://storeserver-production-bc7e.up.railway.app${event.path}`, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    });

    // Parse the response JSON
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
