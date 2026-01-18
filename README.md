# publWorklist

퍼블리싱 작업을 체계적으로 관리하고
공통 컴포넌트와 작업 현황을 한눈에 확인하기 위한 퍼블리싱 워크리스트 레포지토리입니다.

---

## 📌 프로젝트 목적

* 퍼블리싱 작업 현황 관리
* 공통 컴포넌트 정리 및 재사용
* 퍼블리싱 규칙 및 가이드 문서화
* 웹접근성(a11y)을 고려한 마크업 기준 확립

---

## 🗂 프로젝트 구조

```
WORKLIST/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│
├── component/
│   ├── button.html
│   ├── form.html
│   ├── tab.html
│   └── ...
│
├── worklist.html
├── README.md
└── .gitignore
```

---

## 📄 파일 / 폴더 설명

| 구분              | 설명                      |
| --------------- | ----------------------- |
| `assets/`       | 공통 리소스 (CSS / JS / 이미지) |
| `component/`    | 퍼블리싱 공통 컴포넌트            |
| `worklist.html` | 퍼블리싱 작업 현황 페이지          |
| `README.md`     | 프로젝트 설명 문서              |
| `.gitignore`    | Git 추적 제외 파일 설정         |

---

## 🎨 퍼블리싱 기준

### ✔ 네이밍 규칙

* 클래스명: `kebab-case`
* 공통 prefix

  * `pub-` : 퍼블리싱 공통
  * `a11y-` : 접근성 전용

### ✔ CSS 작성 규칙

* 공통 스타일은 `assets/css`에서 관리
* 컴포넌트 단위 스타일 분리
* 재사용 가능한 구조 우선

### ✔ JavaScript

* 공통 스크립트는 `assets/js`에서 관리
* DOM 의존 최소화
* 접근성 관련 스크립트 우선 고려

---

## ♿ 웹접근성 (a11y) 기준

* 시맨틱 태그 사용
* 키보드 접근 가능
* `alt`, `aria-*` 속성 필수
* 포커스 스타일 제거 금지
* WCAG 2.1 명도 대비 준수

---

## 🌿 브랜치 전략

| 브랜치         | 용도      |
| ----------- | ------- |
| `main`      | 기준 브랜치  |
| `dev`       | 퍼블리싱 작업 |
| `component` | 컴포넌트 정리 |

---

## 🚀 GitHub Pages

퍼블리싱 결과 확인용 URL

```
https://아이디.github.io/publWorklist/
```

---

## 🛠 사용 방법

```bash
git clone https://github.com/아이디/publWorklist.git
cd publWorklist
```

---

## 📌 참고 사항

* 본 레포지토리는 퍼블리싱 가이드 및 작업 관리 목적입니다.
* 디자인 시안 및 기획 문서는 포함하지 않습니다.

---

## 👤 담당

* Web Publisher : 소미경
* Role : UI / UX · Publishing
