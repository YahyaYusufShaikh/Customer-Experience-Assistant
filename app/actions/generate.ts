'use server'


import { ChatOpenAI } from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import { cat } from "@xenova/transformers";
import { context } from "langchain";

export async function generateReply(query: string, retrievedChunks: string[]) {
    try{

        const llm = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        configuration: { baseURL: "https://openrouter.ai/api/v1" },
        model: "openai/gpt-4o-mini", // Or another model of your choice
        temperature: 0.2, // Low temperature for factual consistency
        });

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", `You are a helpful customer support assistant.
          Use the following retrieved company policy information to answer the user's query.

          Strict Rules:
          - If the answer is not explicitly contained in the provided policy information, say: "I'm sorry, I don't have enough
            information to answer that question based on our current policies."
          - Do not try to make up an answer.

          Policy Information:
          {context}`],
        ["user", "{query}"],
        ]);


        const contextStr = retrievedChunks.join("\n\n---\n\n");
        const formattedPrompt = await prompt.format({context: contextStr, query: query});
        const response = await llm.invoke(formattedPrompt);

        return {
            success: true,
            reply: response.content
        }

    }
    catch(error){
        console.error("Generation Error:", error);
        return {
            success: false,
            error: "Failed to reply to the user."
        }
    }
}