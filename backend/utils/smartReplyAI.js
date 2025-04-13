const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * getSmartReplies: Calls OpenAI API to generate smart reply suggestions.
 * @param {string} message - The original message text.
 * @returns {Promise<string[]>} - A promise that resolves to an array of three reply suggestions.
 */
async function getSmartReplies(message) {
    try {
        // Create a prompt that instructs the model to provide three short, relevant replies.
        const prompt = `Suggest three succinct, contextually relevant responses to the following message:\n\n"${message}"\n\nReplies:`;

        const response = await openai.createCompletion({
            model: "text-davinci-003", // You can choose a different model if desired.
            prompt: prompt,
            max_tokens: 60,   // Limit tokens to keep suggestions succinct.
            n: 1,             // We ask for one completion which includes all suggestions.
            temperature: 0.7, // Adjust creativity as needed.
        });

        // Split the returned text into separate suggestions.
        let suggestions = response.data.choices[0].text
            .trim()
            .split("\n")
            .map(s => s.trim())
            .filter(s => s.length > 0);

        // Ensure we return exactly three suggestions.
        if (suggestions.length > 3) {
            suggestions = suggestions.slice(0, 3);
        } else if (suggestions.length < 3) {
            // Fall back to default suggestions if the API returns fewer than three replies.
            suggestions = suggestions.concat(["Thank you.", "I see.", "Let's discuss further."]).slice(0, 3);
        }

        return suggestions;
    } catch (error) {
        console.error("Error in getSmartReplies:", error.response ? error.response.data : error.message);
        // Fallback suggestion set in case of error
        return ["Thank you.", "I see.", "Let's discuss further."];
    }
}

module.exports = { getSmartReplies };
