chrome.runtime.onInstalled.addListener(async () => {
  const services = [
    {
      id: 1,
      name: "Calculator",
      url: "https://www.google.com/search?q=calculator",
    },
    {
      id: 2,
      name: "Crypto Market Cap",
      url: "https://coinmarketcap.com/",
    },
    {
      id: 3,
      name: "Currency Converter",
      url: "https://www.google.com/search?q=currency+converter",
    },
    {
      id: 4,
      name: "Unit Converter",
      url: "https://www.google.com/search?q=unit+converter",
    },
    {
      id: 5,
      name: "Google Translate",
      url: "https://translate.google.com",
    },
    {
      id: 6,
      name: "Google Map",
      url: "https://www.google.com/maps",
    },
    {
      id: 7,
      name: "Chat GPT",
      url: "https://chat.openai.com/",
    },
  ];

  const rules = services.map((service, index) => ({
    id: index + 1, // Ensure unique ID for each rule
    priority: 1,
    action: {
      type: "modifyHeaders",
      requestHeaders: [{ header: "Sec-Fetch-Dest", operation: "set", value: "document" }],
      responseHeaders: [
        { operation: "remove", header: "X-Frame-Options" },
        { header: "report-to", operation: "remove" },
        { header: "content-security-policy-report-only", operation: "remove" },
        { header: "content-security-policy", operation: "remove" },
      ],
    },
    condition: {
      urlFilter: new URL(service.url).hostname, // Use hostname to match all paths for each domain
      resourceTypes: ["sub_frame"],
    },
  }));

  // Clear any existing rules and add new ones
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map((rule) => rule.id),
    addRules: rules,
  });
});
