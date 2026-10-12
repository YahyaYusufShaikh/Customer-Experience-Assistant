import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { prisma } from "../lib/prisma";

// import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Note: Ensure OPENAI_API_KEY is in your .env file
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1", // Using OpenRouter
  },
});


async function seedBrands() {
  const brands = [
    { id: "BRAND_ID_TECHGADGETS", name: "TechGadgets" },
    { id: "BRAND_ID_FASHIONFLOW", name: "FashionFlow" },
    { id: "BRAND_ID_HOMECOMFORT", name: "HomeComfort" },
    { id: "BRAND_ID_GOURMETGRUB", name: "GourmetGrub" },
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { id: brand.id },
      update: {},
      create: {
        id: brand.id,
        name: brand.name,
      },
    });
    console.log(`Ensured brand exists: ${brand.name}`);
  }
}

async function seedBrand(brandId: string, filePath: string) {
  const content = fs.readFileSync(path.join(process.cwd(), filePath), "utf-8");

  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
  const chunks = await splitter.splitText(content);

  console.log(`total chunks: ${chunks.length} chunks for ${filePath}`);

  for (const chunk of chunks) {
    const vector = await embeddings.embedQuery(chunk);
    await prisma.$executeRaw`
      INSERT INTO "Policy" ("id", "brandId", "content", "embedding")
      VALUES (gen_random_uuid(), ${brandId}, ${chunk}, ${vector}::vector)
    `;
    console.log(`Inserted chunk for ${filePath}`);
  }
}

// TODO: Replace these IDs with the actual IDs from your Supabase Brand table!
async function main() {
  await seedBrands();
  await seedBrand("BRAND_ID_TECHGADGETS", "data/brand_a.txt");
  await seedBrand("BRAND_ID_FASHIONFLOW", "data/brand_b.txt");
  await seedBrand("BRAND_ID_HOMECOMFORT", "data/brand_c.txt");
  await seedBrand("BRAND_ID_GOURMETGRUB", "data/brand_d.txt");
}

main();
