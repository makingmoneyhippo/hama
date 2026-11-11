#!/usr/bin/env bash
set -euo pipefail

if [[ ! -t 0 ]]; then
  printf '터미널에서 직접 실행하세요. 키를 명령 인수나 채팅에 입력하지 마세요.\n' >&2
  exit 1
fi

key_dir="${XDG_CONFIG_HOME:-$HOME/.config}/coupang-ip-check"
key_file="$key_dir/kipris-api-key"
umask 077
mkdir -p "$key_dir"
chmod 700 "$key_dir"

IFS= read -r -s -p 'KIPRIS Plus API 키 입력: ' kipris_key
printf '\n' >&2
if [[ -z "$kipris_key" ]]; then
  printf '빈 키는 저장하지 않았습니다.\n' >&2
  exit 1
fi

temp_file="$(mktemp "$key_dir/.kipris-api-key.XXXXXX")"
trap 'rm -f "$temp_file"' EXIT
printf '%s' "$kipris_key" > "$temp_file"
chmod 600 "$temp_file"
mv -f "$temp_file" "$key_file"
unset kipris_key
printf '키를 사용자 전용 파일에 저장했습니다.\n'
