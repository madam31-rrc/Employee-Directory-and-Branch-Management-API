## Security configuration

This API uses Helmet and a custom CORS configuration to harden HTTP headers and control allowed cross-origin requests.

### Helmet
enable:
- `x-content-type-options: nosniff` — prevents MIME-sniffing.
- `x-frame-options: DENY` — prevents clickjacking.
- `referrer-policy: no-referrer` — prevents leaking referrer data.
- `strict-transport-security` — (when applicable) forces HTTPS connections.

Content Security Policy (CSP) is disabled for the API (CSP is typically used for web pages). If the API later serves HTML, enable CSP with a restrictive policy.

### CORS
- Allowed origins are configured via `CORS_ORIGINS` env var (comma-separated).
- Browser requests must have an `Origin` header in the whitelist to succeed.
- Server-to-server requests (no `Origin`) are allowed by default.

How to change:
- Edit `.env` → `CORS_ORIGINS` to add allowed domains.
