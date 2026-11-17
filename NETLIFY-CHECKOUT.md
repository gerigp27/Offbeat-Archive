# Airtable checkout setup

The checkout posts to /api/orders. netlify/functions/orders.mts now provides this endpoint on Netlify; the Vite development server uses the same validation and Airtable handler.

Destination: Offbeat Archive / Orders (appo2utl89rpnWDki / tblOgDt0EnUANl6dY).
Saved fields: Order ID, Request ID, First Name, Email, Items (design name and ID, color, size, quantity, unit price and line total), Total Cents, Status.

## Required private credential
Create an Airtable personal access token with data.records:read and data.records:write for the Offbeat Archive base only. Add AIRTABLE_TOKEN as a secret Netlify environment variable with Functions scope. Optional AIRTABLE_BASE_ID and AIRTABLE_TABLE_ID override the known destination IDs above.

## Deployment
This update includes a server function. Uploading only dist through Netlify Drop will NOT deploy that function.
From this project folder, after Netlify CLI login:

    npm.cmd run build
    npx.cmd netlify-cli deploy --prod --dir=dist --functions=netlify/functions --site=4b8f87ca-272b-4328-a434-e8577ee9899e

Alternatively connect this project folder as the repository root with netlify.toml for a Git build/deploy. Redeploy after changing runtime environment variables.

## Verification
Run node --test tests/*.test.ts. API tests use a mocked Airtable response and cover saved fields, computed pricing, failed saves, missing credentials, and sequential retries. They do not prove a live connection.
After credential setup and deployment, place a clearly labeled test order on the live website and verify the matching Order ID and all selections in Airtable. No payment is collected.
