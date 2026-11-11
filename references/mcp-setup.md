# KIPRIS Plus와 로컬 MCP 설정

이 스킬은 [chrisryugj/korean-patent-mcp](https://github.com/chrisryugj/korean-patent-mcp)의 문자 검색 도구를 사용한다. 이 MCP는 **사진 입력 유사 검색, 등록 청구항 원문, 상표 지정상품 상세, 권리 유효성 확정**을 제공하지 않는다. 해당 부분은 DesignView와 KIPRIS 공식 기록에서 별도 확인한다.

## 계정과 키

1. [KIPRIS Plus](https://plus.kipris.or.kr/portal/main/contents.do?menuNo=210104)에 개인 또는 단체 회원으로 가입한다. 변리사 자격은 필요하지 않다. 법인 계좌·카드로 유료 결제할 계획이면 단체 회원 안내를 따른다.
2. [OPEN API 상품 목록](https://plus.kipris.or.kr/portal/data/apiClas/List.do)에서 **특허·실용 공개·등록공보**, **디자인 공보**, **상표 출원 속보**의 필요한 검색 기능을 각각 활용신청한다. 벌크 데이터 구매가 아니라 OPEN API 신청을 선택한다. 이 MCP는 `freeSearchInfo`, `getAdvancedSearch`, `trademarkInfoSearchService/getWordSearch`, `designInfoSearchService/getWordSearch` 등을 사용한다. 특허 상세 기능 `getBibliographyDetailInfoSearch`도 제공되면 신청한다. 신청하지 않은 기능은 `resultCode 30` 오류가 날 수 있다. [MCP 원본 안내](https://github.com/chrisryugj/korean-patent-mcp#인증키)
3. `마이페이지 → APIKEY관리`에서 키를 확인한다. 무료 API는 별도 관리자 승인 없이 신청 후 사용할 수 있으며, 무료 호출은 계정 전체 합산 월 1,000회다. 초과하면 차단되며 자동 결제되지 않는다. [가입·신청 안내](https://plus.kipris.or.kr/portal/main/contents.do?menuNo=210104), [무료 API FAQ](https://plus.kipris.or.kr/portal/bbs/Faq_info.do?buttonIndex=&pageIndex=3)

**키를 채팅, 저장소, `.env`, 원격 MCP의 요청별 헤더에 넣지 않는다.** KIPRIS Plus는 계정 고유 키 공유를 금지한다. [공식 FAQ](https://plus.kipris.or.kr/portal/bbs/Faq_info.do?buttonIndex=&pageIndex=9) 아래 스크립트로 사용자 전용 파일에 입력하고 로컬 STDIO 서버만 실행한다.

```bash
bash "${CODEX_HOME:-$HOME/.codex}/skills/coupang-ip-check/scripts/save-api-key.sh"
```

입력 문자는 터미널에 표시되지 않는다. 파일은 `~/.config/coupang-ip-check/kipris-api-key`에 저장되고, 폴더는 본인만 접근하도록 설정된다. 키를 바꾸려면 같은 스크립트를 다시 실행한다.

## MCP 연결

Node.js 20.19 이상을 설치하고, MCP를 로컬에 빌드한다. `build/index.js`가 있어야 한다. 기본 설치 위치는 `${XDG_DATA_HOME:-$HOME/.local/share}/coupang-ip-check/korean-patent-mcp`이며, 다른 위치라면 `COUPANG_IP_MCP_DIR` 환경변수로 지정할 수 있다.

```bash
mcp_dir="${XDG_DATA_HOME:-$HOME/.local/share}/coupang-ip-check/korean-patent-mcp"
mkdir -p "$(dirname "$mcp_dir")"
git clone https://github.com/chrisryugj/korean-patent-mcp.git "$mcp_dir"
npm --prefix "$mcp_dir" ci
npm --prefix "$mcp_dir" run build
```

Codex의 MCP 설정에는 키가 아닌 시작 스크립트 경로만 기록한다.

```bash
codex mcp add korean-patent -- bash "${CODEX_HOME:-$HOME/.codex}/skills/coupang-ip-check/scripts/launch-mcp.sh"
```

연결 후 Codex를 새로 시작하거나 MCP 목록을 새로고침한다. `tools/list`에서 7개 도구가 보이는 것은 연결 확인이며 실제 검색의 성공을 뜻하지 않는다. 실제 검색은 사용자가 키를 저장하고 세 서비스를 신청한 뒤 각각 1건씩 호출해 확인한다. `resultCode 30`이 나오면 KIPRIS Plus에서 해당 기능 신청 여부를 확인한다. 공개 원격 서버의 공용 일일 한도는 실사용에 부족하며 개인 키를 원격 서버에 전달하지 않는다.
