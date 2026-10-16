#!/usr/bin/env bash
# Mabaso Dev & AI — pre-deploy security + quality gate for Notre Gemme.
# Run before every push to main:  npm run security:check
# Exit 0 = all gates passed. Exit 1 = blocked, read the output.

set -euo pipefail

pass() { printf '  \033[0;32m✅ %s\033[0m\n' "$1"; }
fail() { printf '  \033[0;31m❌ FAIL: %s\033[0m\n' "$1"; exit 1; }

SRC_DIRS=(app components lib)

echo "1. TypeScript 'any'"
if grep -rnE ":\s*any\b|as any\b" --include='*.ts' --include='*.tsx' "${SRC_DIRS[@]}"; then
  fail "'any' found — type it properly"
fi
pass "Zero 'any'"

echo "2. console.log in app/components"
if grep -rn "console\.log" app components; then fail "console.log found"; fi
pass "Zero console.log"

echo "3. target=_blank without rel (tabnapping)"
node scripts/check-external-links.mjs "${SRC_DIRS[@]}" \
  || fail "target=_blank without rel=\"noopener noreferrer\""
pass "All external links safe"

echo "4. Hardcoded secrets"
if grep -rnE "sk-[a-zA-Z0-9]{20,}|AIza[a-zA-Z0-9_-]{35}|AKIA[0-9A-Z]{16}" \
  --include='*.ts' --include='*.tsx' --include='*.js' --include='*.mjs' "${SRC_DIRS[@]}"; then
  fail "possible secret in source"
fi
pass "No obvious secrets"

echo "5. .env files not tracked"
if git ls-files | grep -E '(^|/)\.env($|\.local$|\.production$)'; then fail ".env file is tracked"; fi
pass ".env files untracked"

echo "6. Dependency audit"
npm audit --omit=dev --audit-level=high >/dev/null || fail "production dependency has a high/critical advisory"
npm audit --audit-level=critical >/dev/null || fail "dependency has a critical advisory"
pass "No high (prod) / critical (all) advisories"

echo "7. Lint + types"
npm run --silent lint >/dev/null || fail "eslint errors — run npm run lint"
npm run --silent type-check >/dev/null || fail "type errors — run npm run type-check"
pass "Lint + types clean"

echo "8. Production build"
npm run --silent build >/dev/null || fail "build failed — run npm run build"
pass "Build successful"

echo ""
echo "ALL GATES PASSED ✅  — safe to push to main (Vercel deploys automatically)."
