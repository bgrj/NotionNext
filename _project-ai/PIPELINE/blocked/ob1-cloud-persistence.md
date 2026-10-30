# Blocked: isolated preview persistence

- Scope: only enable new multi-user cloud persistence after specific authorization and isolation verification.
- Reason: automatic approval rejected creation of a private Vercel Blob store bound to the production project, citing infrastructure, potential usage charges and sensitive-data handling. No store was created. Do not retry the same blocked resource creation through another surface.
- Required input: explicit approval for a dedicated private store restricted to this preview environment, including potential Vercel usage charges; production binding is not requested.
- Prerequisites after authorization: verify project/store scope, existing credentials and production separation without exposing tokens, wire explicit environment variables only for preview, test two real identities and CAS contention, verify deletion/export and failure behavior before enabling real saves.
- Existing implementation: adapter and API are present, disabled by default. Synthetic local demo remains separate from real private APIs.
- Reference: ../../DELIVERABLES/ourbeings.com-1/RELEASE-01.md
