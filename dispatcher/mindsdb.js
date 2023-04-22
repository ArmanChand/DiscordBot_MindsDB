const MindsDBCloud = require("mindsdb-js-sdk").default;

const languageModel = process.env.MINDSDB_LANGUAGE_TRANSLATION_MODEL_NAME;

async function connectToMindsDBCloud() {
  try {
    await MindsDBCloud.connect({
      user: process.env.MINDSDB_USER,
      password: process.env.MINDSDB_PASS,
    });
    console.log("Suceesfully connected to MindsDB Cloud");
  } catch (error) {
    console.log("Problem connecting to MindsDB Cloud:", error);
    throw error;
  }
}


   // Endpoint for Language Translation

   async function analyzeLanguageTranslation(message) {
    let retries = 3; // Maximum number of retries
    while (retries > 0) {
      try {
        const text = `SELECT * FROM ${languageModel} WHERE text='${message}'`;
        console.log("test---->",text)
        const LanguageTranslationResponse = await MindsDBCloud.SQL.runQuery(text);
        console.log("response--->",LanguageTranslationResponse)
        if (!LanguageTranslationResponse.rows) {
          throw new Error("Invalid response from MindsDB");
        }
          return LanguageTranslationResponse;
        
      } catch (error) {
        console.log("Error detecting Question and Answer:", error);
        retries--;
        if (retries === 0) {
            throw new Error("Maximum number of retries reached");
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      }
    }
  }

  
  module.exports = { connectToMindsDBCloud,analyzeLanguageTranslation};
  