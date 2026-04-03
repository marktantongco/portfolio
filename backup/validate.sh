#!/bin/bash
set -e
echo "=== CONSTRAINT VALIDATION ==="
FAIL=0

# ── 1. Banned dependencies ──
for dep in "next" "@react-three" "embla" "recharts" "cmdk" "react-hook-form"; do
  if grep -q "$dep" package.json 2>/dev/null; then
    echo "FAIL: Banned dependency '$dep' found in package.json"
    FAIL=$((FAIL+1))
  fi
done
[ "$FAIL" -eq 0 ] && echo "PASS: No banned dependencies" || true

# ── 2. Required component files ──
MISSING=0
for f in \
  src/components/Hero.tsx src/components/HeroSkeleton.tsx \
  src/components/Navigation.tsx src/components/SideNav.tsx \
  src/components/CommandPalette.tsx src/components/LoadingScreen.tsx \
  src/components/ScrollProgress.tsx src/components/BackgroundEffects.tsx \
  src/components/Identity.tsx src/components/Process.tsx \
  src/components/Proof/Proof.tsx src/components/Proof/Skills.tsx \
  src/components/Proof/InteractiveDemos.tsx src/components/Proof/FeaturedProjects.tsx \
  src/components/Proof/CodeShowcase.tsx src/components/Proof/LiveMetrics.tsx \
  src/components/Proof/Timeline.tsx \
  src/components/Trust.tsx src/components/Thoughts.tsx \
  src/components/ProjectModal.tsx \
  src/components/Contact.tsx src/components/Footer.tsx; do
  [ ! -f "$f" ] && echo "FAIL: Missing $f" && MISSING=$((MISSING+1))
done
[ "$MISSING" -eq 0 ] && echo "PASS: All 22 component files exist" || echo "FAIL: $MISSING component file(s) missing"

# ── 3. Design tokens ──
TOKEN_COUNT=$(grep -c "var(--brutal-" src/styles/globals.css 2>/dev/null || echo 0)
if [ "$TOKEN_COUNT" -ge 12 ]; then
  echo "PASS: $TOKEN_COUNT/12+ color tokens found"
else
  echo "FAIL: Only $TOKEN_COUNT color tokens (need 12+)"; FAIL=$((FAIL+1))
fi

# ── 4. No hardcoded hex in TSX files ──
HEX_COUNT=$(grep -rE '#[0-9a-fA-F]{3,8}' src/components/ src/hooks/ --include='*.tsx' 2>/dev/null | grep -v 'node_modules' | wc -l || echo 0)
if [ "$HEX_COUNT" -eq 0 ]; then
  echo "PASS: No hardcoded hex in TSX files"
else
  echo "FAIL: $HEX_COUNT hardcoded hex value(s) in TSX files"; FAIL=$((FAIL+1))
fi

# ── 5. Semantic HTML ──
for tag in "skip to content" '<main' '<header' '<footer' 'aria-hidden="true"'; do
  if grep -rq "$tag" src/ index.html 2>/dev/null; then
    echo "PASS: Found '$tag'"
  else
    echo "FAIL: Missing '$tag'"; FAIL=$((FAIL+1))
  fi
done

# ── 6. Accessibility ──
if grep -rq "prefers-reduced-motion" src/ 2>/dev/null; then
  echo "PASS: prefers-reduced-motion handled"
else
  echo "FAIL: No prefers-reduced-motion handling"; FAIL=$((FAIL+1))
fi

# ── 7. SEO ──
for meta in "application/ld+json" "og:image" "manifest.json"; do
  if grep -q "$meta" index.html 2>/dev/null; then
    echo "PASS: $meta present"
  else
    echo "FAIL: Missing $meta"; FAIL=$((FAIL+1))
  fi
done

# ── 8. Bundle size (run AFTER npm run build) ──
if [ -d "dist" ]; then
  BUNDLE_KB=$(du -sk dist/ 2>/dev/null | cut -f1)
  if [ -n "$BUNDLE_KB" ] && [ "$BUNDLE_KB" -gt 1536 ]; then
    echo "FAIL: Total bundle ${BUNDLE_KB}KB exceeds 1.5MB budget"; FAIL=$((FAIL+1))
  else
    echo "PASS: Total bundle ${BUNDLE_KB:-?}KB within 1.5MB budget"
  fi
else
  echo "SKIP: dist/ not found (run after build)"
fi

echo ""
echo "=== RESULTS ==="
if [ "$FAIL" -eq 0 ] && [ "$MISSING" -eq 0 ]; then
  echo "ALL CHECKS PASSED"
else
  echo "$((FAIL+MISSING)) FAILURE(S) FOUND"; exit 1
fi
