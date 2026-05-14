import "dotenv/config";
import { createInterface } from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import * as z from "zod";

import sendEmail from "./mail.service.js";
import tavilyService from "./tavily.service.js";

/* ---------------- Tavily Tool ---------------- */

const tavilyTool = tool(
  async ({ query }) => {
    return await tavilyService(query);
  },
  {
    name: "searchInternet",
    description:
      "Search the internet for latest news, current events and real-time information.",
    schema: z.object({
      query: z.string().describe("Search query for internet"),
    }),
  }
);

/* ---------------- Email Tool ---------------- */

const sendEmailTool = tool(
  async ({ to, html, subject }) => {
    return await sendEmail(to, html, subject);
  },
  {
    name: "sendEmail",
    description: "Use this tool to send an email",
    schema: z.object({
      to: z.string().describe("Recipient email address"),
      html: z.string().describe("HTML content of email"),
      subject: z.string().describe("Email subject"),
    }),
  }
);

/* ---------------- Model ---------------- */

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
});

/* ---------------- Agent ---------------- */

const agent = createAgent({
  model,
  tools: [sendEmailTool, tavilyTool],
  systemPrompt: `
You are a helpful AI assistant.

If the user asks about:
- latest news
- current events
- today's information
- recent updates

You MUST use the searchInternet tool to get real-time information.
`,
});

/* ---------------- CLI ---------------- */

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let messages = [];

while (true) {
  const userInput = await rl.question("\x1b[36mYou:\x1b[0m ");

  if (["exit", "quit"].includes(userInput.toLowerCase())) {
    console.log("👋 Goodbye!");
    process.exit(0);
  }

  messages.push(new HumanMessage(userInput));

  const response = await agent.invoke({ messages });

  const aiMessage = response.messages[response.messages.length - 1];

  messages.push(aiMessage);

  console.log(`\x1b[32mAI:\x1b[0m ${aiMessage.content}`);
}