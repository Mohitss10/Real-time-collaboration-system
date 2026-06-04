const model = require("../config/gemini");

const chatWithAI = async (req, res) => {
  try {
    const {
      projectName,
      projectDescription,
      message,
    } = req.body;

    if (
      !projectName ||
      !projectDescription ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Project name, description and message are required",
      });
    }

    const prompt = `
You are an expert Software Architect, Product Manager and Project Mentor.

PROJECT NAME:
${projectName}

PROJECT DESCRIPTION:
${projectDescription}

Instructions:
- Answer only according to the project.
- Give practical suggestions.
- Help with architecture, features, tasks, APIs and deployment.
- If user asks something unrelated, politely redirect them back to the project.

USER QUESTION:
${message}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "AI Server Error",
    });
  }
};

module.exports = {
  chatWithAI,
};