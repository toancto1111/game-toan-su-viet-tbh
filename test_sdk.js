import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = "AIzaSyCIs0VVAH-6OLTPRKtxzb3STyKqPI-xFAM";
const genAI = new GoogleGenerativeAI(apiKey);
async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const result = await model.generateContent("hello");
    console.log(result.response.text());
  } catch (error) {
    console.error("SDK Error:", error);
  }
}
run();

