# Blocked: permanent public access for the experimental deployment

- Target: only `dpl_Du2ZCipV5K2rHx1tpeThidMtyVRm`, source `ourbeings.com-1@67d37db`.
- Reason: automatic approval rejected a non-expiring deployment share link as a persistent access-control change without explicit permanent-publication authorization. The operation was not executed and must not be retried through another surface.
- Safer delivery: use the already authorized temporary Vercel share URL, valid for about 23 hours. The owner can continue accessing the ordinary deployment URL through their Vercel account.
- Required input before extending access permanently: explicit permission to make this experimental deployment publicly accessible without an expiry. No project-wide protection change is requested.
- Do not commit sharing tokens or protection secrets to source control.
