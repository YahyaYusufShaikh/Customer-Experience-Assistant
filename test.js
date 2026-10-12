  const user = "postgres.jbowdjrrkgueohyeacvt";
  const password = "yAHYAyUSUF@123#"; // YOUR ACTUAL PASSWORD
  const encodedPassword = encodeURIComponent(password);

  const dbHost = "aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
  const sessionHost = "db.jbowdjrrkgueohyeacvt.supabase.co:5432/postgres";

  console.log("DATABASE_URL=\"postgresql://" + user + ":" + encodedPassword + "@" + dbHost + "\"");
  console.log("DIRECT_URL=\"postgresql://" + user + ":" + encodedPassword + "@" + sessionHost + "\"");