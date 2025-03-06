/* eslint-disable no-undef */
require("dotenv").config();

exports.handler = async (event) => {
  const uuid = event.queryStringParameters.uuid;

  const url = `https://api.hypixel.net/v2/skyblock/profiles?key=${process.env.HYPIXEL_API_KEY}&uuid=${uuid}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Failed to fetch data with error: ${error}`,
      }),
    };
  }
};
