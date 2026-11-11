# hama

쿠팡 상품의 사입 전에 한국의 디자인권, 특허·실용신안권, 상표권을 조사하는 Codex 스킬입니다. 스킬 이름은 `coupang-ip-check`입니다.

상품 사진·링크·설명·상표명을 단서로 후보를 찾고, 쿠팡에 표시된 판매자명과 공개 상호·대표자명도 KIPRIS의 출원인·권리자 정보와 대조합니다. 확인한 검색 범위, 공식 원문, 남은 불확실성을 함께 보고합니다.

이 도구는 **사입 전 예비 선별**을 돕습니다. 이미지 한 장이나 검색 결과 0건으로 비침해를 확정하지 않습니다. 디자인 도면, 특허 청구항, 상표 지정상품과 권리 상태는 공식 기록으로 확인해야 합니다.

## 구독자용 한 줄 프롬프트

아래 한 줄을 **로컬 파일과 터미널을 사용할 수 있는 Codex 데스크톱/CLI**에 붙여 넣으면 처음 설치와 이후 업데이트에 모두 사용할 수 있습니다.

```text
https://github.com/makingmoneyhippo/hama 의 README 절차에 따라 coupang-ip-check 스킬을 내 PC에 처음이면 설치하고 이미 있으면 로컬 수정과 API 키를 보존하며 최신판으로 업데이트해 줘. 내 운영체제에 맞게 korean-patent-mcp 설치·연결까지 진행하고, KIPRIS Plus 가입·API 신청·키 입력처럼 내가 직접 해야 할 단계만 안내해 줘. 키는 채팅에 받지 말고 내 PC에서만 입력하게 해 줘.
```

이 프롬프트는 Codex가 설치 상태를 확인하도록 요청합니다. KIPRIS Plus 계정 개설·API 활용신청·키 입력은 사용자가 직접 해야 하므로 무인 설치를 뜻하지 않습니다. 일반 ChatGPT 웹·모바일 대화에는 로컬 스킬을 자동 설치할 수 있는 환경이 없을 수 있습니다.

## 직접 설치·업데이트

처음 설치는 스킬 폴더에 Git 저장소를 복제합니다. 같은 경로에 다른 파일이 있으면 먼저 출처와 수정 내용을 확인하세요.

macOS·Linux:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
git clone https://github.com/makingmoneyhippo/hama.git "${CODEX_HOME:-$HOME/.codex}/skills/coupang-ip-check"
```

Windows PowerShell:

```powershell
$codexHome = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME '.codex' }
$skillsDir = Join-Path $codexHome 'skills'
New-Item -ItemType Directory -Force $skillsDir | Out-Null
git clone https://github.com/makingmoneyhippo/hama.git (Join-Path $skillsDir 'coupang-ip-check')
```

업데이트할 때는 설치 폴더가 이 저장소의 Git 복제본이고 작업 파일에 수정이 없는지 확인한 뒤 `git pull --ff-only origin main`을 실행합니다. 다른 방식으로 설치했거나 파일을 수정했다면 백업·차이 확인 없이 덮어쓰지 않습니다. API 키는 스킬 폴더 밖의 사용자 전용 위치에 저장됩니다.

검색에는 [korean-patent-mcp](https://github.com/chrisryugj/korean-patent-mcp)와 개인 KIPRIS Plus API 키가 필요합니다. [MCP와 키 설정](references/mcp-setup.md)에 설치·연결 순서가 있습니다. 키는 이 저장소에 넣지 않습니다.

Codex에서 `$coupang-ip-check`를 호출하고 상품 링크나 사진, 실제 사용할 상표명을 제공하세요. 예: `$coupang-ip-check로 이 쿠팡 상품을 사입하기 전에 디자인·특허·상표 위험을 조사해 줘.`

## 검색 범위와 한계

- MCP는 문자 기반 후보 검색에 사용합니다. 사진 자체의 유사 검색은 MCP 기능이 아닙니다.
- 가능하면 DesignView로 이미지 후보를 찾고, KIPRIS의 전체 도면으로 다시 확인합니다. 이미지 검색을 못 했다면 보고서에 미실시로 적습니다.
- 판매자명 검색은 권리자 후보를 좁히는 단서입니다. 이름이 일치해도 동일인이나 사용 허락 관계가 입증되지는 않습니다.
- 특허·실용신안은 공개된 도면보다 **현재 독립청구항**과 제품 구조를 비교해야 합니다.
- KIPRIS Plus API와 웹 검색의 접근 가능 범위 및 최신성에 따라 결과가 달라질 수 있습니다.

실제 절차는 [SKILL.md](SKILL.md), 권리별 비교 기준은 [rights-review.md](references/rights-review.md)를 참고하세요.

## 라이선스

이 저장소의 스킬 파일은 [MIT License](LICENSE)로 배포합니다. 연결하는 `korean-patent-mcp`는 별도 프로젝트이며 그 프로젝트의 라이선스를 따릅니다.
