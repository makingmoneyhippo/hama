#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${KIPRIS_API_KEY:-}" ]]; then
  key_file="${XDG_CONFIG_HOME:-$HOME/.config}/coupang-ip-check/kipris-api-key"
  if [[ ! -r "$key_file" ]]; then
    printf 'KIPRIS Plus 키 파일이 없습니다. 스킬의 save-api-key.sh를 먼저 실행하세요.\n' >&2
    exit 78
  fi
  KIPRIS_API_KEY="$(< "$key_file")"
  export KIPRIS_API_KEY
fi

if [[ -z "$KIPRIS_API_KEY" ]]; then
  printf 'KIPRIS Plus 키가 비어 있습니다.\n' >&2
  exit 78
fi

skill_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
mcp_dir="${COUPANG_IP_MCP_DIR:-${XDG_DATA_HOME:-$HOME/.local/share}/coupang-ip-check/korean-patent-mcp}"
if [[ -z "${COUPANG_IP_MCP_DIR:-}" && ! -f "$mcp_dir/build/index.js" ]]; then
  # Keep existing workspace installations working without a machine-specific path.
  workspace_mcp_dir="$skill_dir/../../../tools/korean-patent-mcp"
  if [[ -f "$workspace_mcp_dir/build/index.js" ]]; then
    mcp_dir="$workspace_mcp_dir"
  fi
fi
if [[ ! -f "$mcp_dir/build/index.js" ]]; then
  printf '로컬 MCP 빌드가 없습니다: %s/build/index.js\n' "$mcp_dir" >&2
  exit 78
fi

exec node "$mcp_dir/build/index.js"
