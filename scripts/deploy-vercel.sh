#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env.vercel"

if [[ "${BOSS_APPROVED_LEGACY_VERCEL_DEPLOY:-}" != "true" ]]; then
  echo "Refusing legacy Vercel deploy. OCI is the production deploy path for boitoan.com.vn." >&2
  echo "Set BOSS_APPROVED_LEGACY_VERCEL_DEPLOY=true only with explicit Boss/Gal rollback approval." >&2
  exit 64
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE. Create it with: VERCEL_TOKEN=<fresh-token>" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "VERCEL_TOKEN is empty in $ENV_FILE" >&2
  exit 1
fi

vercel --prod --yes --token "$VERCEL_TOKEN"
