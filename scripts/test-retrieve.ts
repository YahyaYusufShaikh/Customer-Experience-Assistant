import { Index } from "@langchain/community/utils/cassandra";
import { retrieveRelevantPolicies } from "../app/actions/retrieve";

async function testRetrieval(){
    const brandId = "BRAND_ID_TECHGADGETS";
    const query = "What is your return policy?";
    console.log(`Testing retrieveRelevantPolicies(${brandId} with query, ${query})`);
    const result = await retrieveRelevantPolicies(brandId, query);
    if(result.success){
        console.log(`Success! Result: ${JSON.stringify(result)}`);
        result.data?.forEach((chunk, index) => {
        console.log(`\n--- Chunk ${index + 1} (Distance: ${chunk.distance.toFixed(4)}) ---`);
        console.log(chunk.content);
        })
    }
    else{
        console.log(`Error: ${result.error}`);
    }
}

testRetrieval().catch(console.error);
