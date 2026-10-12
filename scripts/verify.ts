
import { prisma } from "../lib/prisma";

async function verify() {
  const count = await prisma.policy.count();
  console.log(`Total policies: ${count}`);

  const policies = await prisma.policy.findMany({
    take: 5,
    include: { brand: true }
  });

  for (const policy of policies) {
    console.log(`- Policy ID: ${policy.id}, Brand: ${policy.brand.name}, Content length: ${policy.content.length}`);
  }
}

verify().catch(console.error);
