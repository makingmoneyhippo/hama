# hama

쿠팡 상품의 사입 전에 한국의 디자인권, 특허·실용신안권, 상표권을 조사하는 Codex 스킬입니다. 스킬 이름은 `coupang-ip-check`입니다.

상품 사진·링크·설명·상표명을 단서로 후보를 찾고, 쿠팡에 표시된 판매자명과 공개 상호·대표자명도 KIPRIS의 출원인·권리자 정보와 대조합니다. 확인한 검색 범위, 공식 원문, 남은 불확실성을 함께 보고합니다.

이 도구는 **사입 전 예비 선별**을 돕습니다. 이미지 한 장이나 검색 결과 0건으로 비침해를 확정하지 않습니다. 디자인 도면, 특허 청구항, 상표 지정상품과 권리 상태는 공식 기록으로 확인해야 합니다.

## 설치

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
git clone https://github.com/makingmoneyhippo/hama.git "${CODEX_HOME:-$HOME/.codex}/skills/coupang-ip-check"
```

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
