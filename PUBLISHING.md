# Publishing Guide - Rebas UI

## Prerequisites

Before publishing, ensure you have:

1. **npm Account** with access to `@rebas` scope
   - Create account: https://www.npmjs.com/signup
   - Request @rebas organization access or create it

2. **GitHub Repository** access to https://github.com/saberrg/rebasUI

## Publishing Steps

### 1. Push to GitHub

```bash
git push -u origin master
```

If you encounter authentication issues, you may need to use a Personal Access Token (PAT) or SSH key.

### 2. Build the CLI Package

```bash
cd packages/cli
npm install
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### 3. Login to npm

```bash
npm login --scope=@rebas
```

Enter your npm credentials when prompted.

### 4. Publish Package

```bash
# From packages/cli directory
npm publish --access public
```

The `--access public` flag is required for scoped packages.

### 5. Verify Publication

Test that users can install your component:

```bash
# In any React + Tailwind project
npx @rebas/ui@latest list
npx @rebas/ui@latest add header
```

## Updating the Package

When you need to release a new version:

1. **Update version** in `packages/cli/package.json`:
   ```json
   {
     "version": "0.2.0"
   }
   ```

2. **Commit and push** changes:
   ```bash
   git add packages/cli/package.json
   git commit -m "Bump version to 0.2.0"
   git push
   ```

3. **Rebuild and republish**:
   ```bash
   cd packages/cli
   npm run build
   npm publish
   ```

## Local Testing Before Publishing

Test the CLI locally before publishing:

```bash
# Link package locally
cd packages/cli
npm link

# Test in another project
cd /path/to/test-project
npx @rebas/ui list
npx @rebas/ui add header
```

## Common Issues

### 403 Forbidden Error
- **Cause**: No publish rights to @rebas scope
- **Solution**: Get access from @rebas org owner or create the org

### 404 Package Not Found
- **Cause**: @rebas scope doesn't exist
- **Solution**: Create organization at https://www.npmjs.com/org/create

### Version Already Published
- **Cause**: Version number already exists on npm
- **Solution**: Bump version in package.json and try again

### Build Errors
- **Cause**: TypeScript compilation issues
- **Solution**: Fix TypeScript errors before publishing

## Version Numbers

Follow semantic versioning (semver):
- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features, backward compatible
- **Patch** (0.0.1): Bug fixes

## Next Steps

After publishing:

1. **Add npm badge** to README
2. **Create GitHub releases** for versions
3. **Write changelog** documenting changes
4. **Add more components** to the library
5. **Set up automated publishing** via GitHub Actions

