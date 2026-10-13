'use server'

import { retrieveRelevantPolicies } from "./retrieve";
import { generateReply } from "./generate";

export async function handleAgentQuery(brandId: string, query: string) {
  // 1. Retrieve
  const retrieval = await retrieveRelevantPolicies(brandId, query);

  if (!retrieval.success || !retrieval.data) {
    return { success: false, error: retrieval.error || "Retrieval failed" };
  }

  // 2. Generate
  const context = retrieval.data.map(chunk => chunk.content);
  return await generateReply(query, context);
}
