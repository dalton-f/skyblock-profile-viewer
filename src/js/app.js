const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.statusText}`,
      );
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Mojang API does not allow client-side requests, so I am using a lighweight and fast alternative found here https://github.com/Electroid/mojang-api
const convertUsernameToUUID = async (username) => {
  const uuid = await fetchData(
    `https://api.ashcon.app/mojang/v2/user/${username}`,
  );

  return uuid;
};

document.addEventListener("DOMContentLoaded", async () => {
  const uuid = await convertUsernameToUUID("NexusOblivion");

  console.log(uuid);
});
