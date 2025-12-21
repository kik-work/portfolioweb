import { GoogleAuth } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

async function testToken() {
  const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

  const auth = new GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/ai.generate"],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();
  console.log(token);
}

testToken().catch(console.error);
