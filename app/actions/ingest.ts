  // 'use server'

  // import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
  // import { prisma } from "@/lib/prisma";

  // export async function ingestPolicy(brandId: string, content: string) {
  //   try {
  //     console.log("Starting local ingestion for brand:", brandId);

  //     // 1. Initialize local embedding model
  //     // 'Xenova/all-MiniLM-L6-v2' is a lightweight, high-performance model
  //     const embeddings = new HuggingFaceInferenceEmbeddings({
  //       model: "Xenova/all-MiniLM-L6-v2",
  //     });

  //     // 2. Turn the text into 384 numbers (MiniLM-L6-v2 outputs 384 dimensions)
  //     const vector = await embeddings.embedQuery(content);
  //     console.log("Vector generated successfully locally");

  //     // 3. Save to database using raw SQL
  //     // WARNING: Our column is set to 1536 in Supabase.
  //     // This model only produces 384 dimensions.
  //     // You MUST update your SQL or column to work with smaller vectors!
  //     await prisma.$executeRaw`
  //       INSERT INTO "Policy" ("id", "brandId", "content", "embedding")
  //       VALUES (gen_random_uuid(), ${brandId}, ${content}, ${vector}::vector)
  //     `;

  //     return { success: true };
  //   } catch (error) {
  //     console.error("INGESTION ERROR:", error);
  //     return { success: false, error: String(error) };
  //   }
  // }
