const MindsDBCloud = require("mindsdb-js-sdk").default;

const languageEnglishToFrench = process.env.MINDSDB_LANGUAGE_TRANSLATION_ENGLISH_FRENCH;
const languageFrenchToEnglish = process.env.MINDSDB_LANGUAGE_TRANSLATION_FRENCH_ENGLISH;
const languageSpanishToEnglish = process.env.MINDSDB_LANGUAGE_TRANSLATION_SPANISH_ENGLISH;

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

   async function analyzeLanguageEngToFreTranslation(message, language) {
    let retries = 3; // Maximum number of retries
    while (retries > 0) {
      try {
        const text = `SELECT * FROM ${languageEnglishToFrench} WHERE text='${message}'`;
        console.log("test---->",text)
        const LanguageTranslationResponse = await MindsDBCloud.SQL.runQuery(text);
        console.log("response--->",LanguageTranslationResponse)
        if (!LanguageTranslationResponse.rows) {
          throw new Error("Invalid response from MindsDB");
        }
          return LanguageTranslationResponse;
        
      } catch (error) {
        console.log("Error detecting Language Transaltion:", error);
        retries--;
        if (retries === 0) {
            throw new Error("Maximum number of retries reached");
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      }
    }
  }

  async function analyzeLanguageFreToEngTranslation(message) {
    let retries = 3; // Maximum number of retries
    while (retries > 0) {
      try {
        const text = `SELECT * FROM ${languageFrenchToEnglish} WHERE text='${message}'`;
        console.log("test---->",text)
        const LanguageTranslationResponse = await MindsDBCloud.SQL.runQuery(text);
        console.log("response--->",LanguageTranslationResponse)
        if (!LanguageTranslationResponse.rows) {
          throw new Error("Invalid response from MindsDB");
        }
          return LanguageTranslationResponse;
        
      } catch (error) {
        console.log("Error detecting Language Transaltion:", error);
        retries--;
        if (retries === 0) {
            throw new Error("Maximum number of retries reached");
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      }
    }
  }

  async function analyzeLanguageSpaToEngTranslation(message) {
    let retries = 3; // Maximum number of retries
    while (retries > 0) {
      try {
        const text = `SELECT * FROM ${languageSpanishToEnglish} WHERE text='${message}'`;
        console.log("test---->",text)
        const LanguageTranslationResponse = await MindsDBCloud.SQL.runQuery(text);
        console.log("response--->",LanguageTranslationResponse)
        if (!LanguageTranslationResponse.rows) {
          throw new Error("Invalid response from MindsDB");
        }
          return LanguageTranslationResponse;
        
      } catch (error) {
        console.log("Error detecting Language Transaltion:", error);
        retries--;
        if (retries === 0) {
            throw new Error("Maximum number of retries reached");
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      }
    }
  }

  
  module.exports = { connectToMindsDBCloud,analyzeLanguageEngToFreTranslation,analyzeLanguageFreToEngTranslation,analyzeLanguageSpaToEngTranslation};
  