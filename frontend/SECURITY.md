# Security Notes

## Current Status

### Development Dependencies (2 moderate vulnerabilities)

**Issue:** esbuild <=0.24.2 development server vulnerability  
**Affected:** Local development server only (not production builds)  
**Impact:** Development server may respond to cross-origin requests  
**Mitigation:** 
- Only affects `npm run dev` (development mode)
- Production builds (`npm run build`) are not affected
- Only run development server on trusted networks
- Fix requires Vite 7.x (breaking change) - consider upgrading when stable

**Decision:** Acceptable for development environment. Monitor for updates.

## Production Deployment

For production:
1. Always use `npm run build` to create production bundles
2. Serve the `dist/` folder with a production web server (nginx, Apache, etc.)
3. Never use `npm run dev` in production
4. Keep dependencies updated regularly

## Updating Dependencies

To update to latest compatible versions:
```bash
npm update
```

To check for security issues:
```bash
npm audit
```

To force fix (may introduce breaking changes):
```bash
npm audit fix --force
```

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly.

