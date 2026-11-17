# Default 20-panel detail-page architecture

Treat a panel as one numbered, exportable detail-page image/HTML section. The default is 20 panels, not a fixed number of claims or a reason to repeat imagery. Plan each panel around a distinct buyer question, visual action, or purchase decision. Move panels 1–19 as the product requires; reserve only the final panel for combined product information and size.

| Panel | Default role | Adaptation rule |
|---|---|---|
| 01 | Immediate use/result hero | Show the actual product and the clearest buyer outcome. |
| 02 | Familiar problem or buying trigger | Use a credible everyday context, not a fabricated defect. |
| 03 | Simple answer / before-after | Make the change graspable in two seconds. |
| 04–07 | Primary benefit in action | Vary wide use, hand action, close mechanism, and resulting convenience. Motion belongs where sequence matters. |
| 08–11 | Distinct secondary benefits and use cases | Expand with new buyer questions; do not repeat the hero sentence four times. |
| 12–14 | Evidence, fit, durability claim boundaries, or objection handling | Use newly generated, source-checked detail images; include verified test data or fair comparison only with evidence. Never republish supplier images. |
| 15 | Genuine customer voice when available | Use only attributable same-product reviews. Otherwise substitute a labeled use scenario or FAQ, with no rating or fake quote. |
| 16 | Confirmed brand cue | One compact, product-relevant promise for the SKU's actual brand. No invented origin story, maker claim, award, or factory. |
| 17–19 | Remaining use context and buying decision recap | Resolve fit/compatibility questions and lead naturally into the final product card. |
| **20** | **Combined product information and size** | Show only 브랜드, 제품명, 소재, 색상/옵션, 사이즈, with option images and verified measurements together. |

The ranges above are planning prompts. A product may need a different middle order or more than one review/brand scene when evidence supports it. If the user explicitly changes the total to `T`, put the combined product card at `T`.

For animation allocation, `T` counts these numbered panels, even if one panel contains multiple photos. Assign the user's requested animated WebP count/percentage to specific panel IDs. Distinct animations must add distinct information. Keep the final product card readable and its text accessible in HTML even if a background or product illustration moves.

## Final panel production check

- Before buyer-facing production, confirm the five required fields: brand, final product name, material, all sold colors/options, and size/dimensions per option. Ask for missing facts in one batch; do not substitute a guessed value or start a final page with `확인 필요`.
- Each option shown is an actual sold SKU, not a catalog suggestion. Every option has the correct image, name/color, and dimensions or size chart with units. Clarify what a measurement represents (for example bracelet inner diameter versus total circumference), not just its number.
- Values come from a supplier specification, packaging, measured sample, or another identified source. Never calculate them from image pixels or borrow a different variant's size.
- Fit the option images and five fields on one page. If the table needs more room, make the final panel taller rather than adding a second information panel.

## Separate listing-disclosure check

- Keep the five-field designed panel distinct from the category-specific information required in the actual seller listing. Recheck the current [공정거래위원회 상품정보 제공고시](https://www.law.go.kr/LSW/admRulInfoR.do?admRulSeq=2100000213455) and Coupang's actual category fields before publication.
- Record source-backed origin, manufacturer/importer, certifications, age guidance, use warnings, A/S, and any other applicable fields in a separate ledger and seller form; do not invent them or add them to the five-field designed panel by default.
- Unknown mandatory listing disclosures block a publish-ready claim even if the designed HTML is complete.
