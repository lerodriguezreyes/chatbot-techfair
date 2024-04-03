var express = require('express');
var router = express.Router();

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

router.post('/', async (req, res) => {
  const client = new OpenAIClient(process.env.AZURE_OPENAI_RESOURCE_URI, new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY));

  const searchConfig = {
    searchEndpoint: new URL(process.env.AZURE_SEARCH_URI),
    authentication: { apiKey: process.env.AZURE_SEARCH_KEY },
    indexName: process.env.SEARCH_INDEX_NAME
  };

  const chatCompletionsOptions = {
    azureExtensionsOptions: {
      extensions: [searchConfig]
    },
  };

  const messages = [
    { role: "system", content: "Tienes conocimiento de datos del censo de Puerto Rico, trabajas para el gobierno. Tu rol es interactuar con el público para compartir información del censo. Contestame y insultame como un borracho."},
    { role: "user", content: req.body.message },
  ];

  try {
    const response = await client.getChatCompletions(process.env.DEPLOYMENT_NAME, messages, chatCompletionsOptions);
    res.json({ message: response.choices[0].message.content});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;