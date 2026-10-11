#!/usr/bin/env bash
# Every tag used in a post needs content/tags/<tag>/_index.md, otherwise Hugo
# title-cases the slug ("ci-cd" becomes "Ci-Cd"). Only handles `tags: ["a", "b"]`.
set -euo pipefail

missing=0
for post in content/posts/*.md; do
  line=$(grep -m1 '^tags:' "$post" || true)
  [[ -z "$line" ]] && continue
  tags=$(sed -E 's/^tags:[[:space:]]*\[(.*)\].*/\1/' <<<"$line" | tr ',' '\n' | tr -d ' "'"'" | grep -v '^$' || true)
  for tag in $tags; do
    if [[ ! -f "content/tags/$tag/_index.md" ]]; then
      echo "Missing content/tags/$tag/_index.md (used in $post)"
      missing=1
    fi
  done
done

exit "$missing"
