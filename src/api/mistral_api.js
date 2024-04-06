export const mistralPostRequest = async (params) => {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer pSGpZ6MlcnIpquyYvIeh0qMxWKevvSSJ`,
    },
    body: JSON.stringify({
      model: "open-mistral-7b",
      messages: [
        {
          role: "user",
          content: `Give a straight and concise  description of the following web site with max 15 words, don't use any intro like "website for.., App that ..." go straight to the functionality  : ${params}`,
        },
      ],
    }),
  });
  return response.json();
};
