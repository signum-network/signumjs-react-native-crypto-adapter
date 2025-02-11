#!/bin/bash

VERSION=$1

# Exit on any error
set -e

# Validate required arguments
if [ -z "$VERSION" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 v1.2.3"
    exit 1
fi

# Validate version format
if [[ ! $VERSION =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-.*)?$ ]]; then
    echo "Error: Version must be in format v1.2.3"
    exit 1
fi

# Run build steps
echo "⚙️ Building and testing..."
if ! npm run compile; then
    echo "Build failed"
    exit 1
fi

if ! npm run test; then
    echo "Testing failed"
    exit 1
fi

# Create git tag
echo "🏷️ Creating git tag: $VERSION"
git tag "$VERSION"

# Prompt for OTP
echo -n "Enter npm OTP: "
read -r OTP

# Publish with changeset
echo "🌎Publishing version $VERSION..."
npm publish --otp "$OTP"

git push origin "$VERSION"
echo "🎉 Successfully published $VERSION"

