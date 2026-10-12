'use server'

  import { OpenAIEmbeddings } from "@langchain/openai";
  import { prisma } from "@/lib/prisma";

  export async function ingestPolicy(brandId: string, content: string) {
    // 1. Initialize the embedding engine
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // 2. Turn the text into 1536 numbers (the vector)
    const vector = await embeddings.embedQuery(content);

    // 3. Save to Supabase using raw SQL to handle the 'vector' type
    await prisma.$executeRaw`
      INSERT INTO "Policy" ("id", "brandId", "content", "embedding")
      VALUES (gen_random_uuid(), ${brandId}, ${content}, ${vector}::vector)
    `;

    return { success: true };
  }