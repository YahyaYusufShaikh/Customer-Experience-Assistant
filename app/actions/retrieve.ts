'use server'

import { prisma } from "@/lib/prisma";
import { OpenAIEmbeddings } from "@langchain/openai";

/**
 * Retrieves the top 3 relevant policy chunks for a given brand and query.
 * Uses semantic vector search to find the most similar content.
 */
export async function retrieveRelevantPolicies(brandId: string, query: string) {
  try {
    // 1. Initialize embedding model (must match the model used in seed.ts)
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
    });

    // 2. Embed the user query
    const queryVector = await embeddings.embedQuery(query);

    // 3. Perform semantic search using pgvector
    // The <=> operator calculates cosine distance (lower distance = higher similarity)
    // We restrict the search to the specific brandId for data isolation.
    const results = await prisma.$queryRaw`
      SELECT "content", ("embedding" <=> ${queryVector}::vector) as distance
      FROM "Policy"
      WHERE "brandId" = ${brandId}
      ORDER BY distance ASC
      LIMIT 3;
    `;

    return {
      success: true,
      data: results as { content: string; distance: number }[]
    };
  } catch (error) {
    console.error("RETRIEVAL ERROR:", error);
    return { success: false, error: "Failed to retrieve relevant information." };
  }
}
