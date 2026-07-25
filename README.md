# 전북교육청 제도맵

전북특별자치도교육청의 주요 업무를 **9칸 캔버스 + 상태 인식형 업무구조도**로 한 장에 담는 공개/내부용 웹앱입니다.
법령·자치법규(조례·규칙)의 근거부터 실제 업무 흐름까지 하나의 구조도로 읽습니다.

> 이 프로젝트는 [hosungseo/korea100](https://github.com/hosungseo/korea100) (MIT License)를 기반으로,
> 코드는 유지하고 데이터를 전북교육청 업무로 교체한 포크입니다. 원저작권은 LICENSE에 표기되어 있습니다.

## 현재 상태
- 파일럿 제도 1건: **학생맞춤통합지원** (전북특별자치도교육청 조례 제5964호, 2026-03-01 시행)
- 데이터 검증(`validate:data`) 통과
- 제도 데이터: `web/data/institutions/`, 목록: `docs/institutions-100-manifest.json`

## 실행
```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

## 정적 빌드 (GitHub Pages 등 배포용)
```bash
cd web
npm run build      # 결과물: web/out/
```

## 제도 추가
1. `web/data/institutions/{slug}.json` 작성 (기존 파일럿을 템플릿으로)
2. `docs/institutions-100-manifest.json`에 항목 추가 (priority 1..N 연속)
3. `cd web && npm run validate:data` 로 검증
4. `npm run dev` 로 확인

## 데이터 스키마
`docs/data-contract.md` 참고. 각 제도 JSON은 `canvas`(9칸)와 `process`(레인·단계·노드·엣지) 두 층으로 구성됩니다.

## 라이선스
MIT — 원본 korea100의 라이선스를 승계합니다. `LICENSE` 참고.
