import { retrieveRelevantPolicies } from "../app/actions/retrieve";
  import { generateReply } from "../app/actions/generate";

  async function testEndToEnd() {
    const brandId = "BRAND_ID_FASHIONFLOW";
    const query = "I bought a dress from your website. I want to return it?";

    console.log(`\n--- Starting E2E Test ---`);
    console.log(`Query: ${query}`);

    // 1. Retrieve
    const retrieval = await retrieveRelevantPolicies(brandId, query);
    if (!retrieval.success || !retrieval.data) {
      console.error("Retrieval failed:", retrieval.error);
      return;
    }

    // 2. Extract content from chunks
    const context = retrieval.data.map(chunk => chunk.content);
    console.log(`Retrieved ${context.length} relevant chunks. Generating reply...`);

    // 3. Generate
    const generation = await generateReply(query, context);

    if (generation.success) {
      console.log("\n--- Final AI Reply ---");
      console.log(generation.reply);
    } else {
      console.error("Generation failed:", generation.error);
    }
  }

   testEndToEnd().catch(console.error);