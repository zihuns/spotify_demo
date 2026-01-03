# Spotify Demo

스포티파이 클론 코딩 프로젝트입니다. Spotify Web API를 활용하여 음악 검색, 플레이리스트 관리 등의 기능을 제공하는 웹 애플리케이션입니다.

개발기간 : 2025.12.20 - 2026.01.03

## 📋 목차

- 개요
- 주요 기능
- 기술 스택
- 프로젝트 구조
- 사용 방법
- 환경 변수 설정

## 🎯 개요

이 프로젝트는 Spotify Web API를 활용하여 실제 Spotify와 유사한 사용자 경험을 제공하는 클론 애플리케이션입니다. 사용자는 음악을 검색하고, 플레이리스트를 조회하며, 새로운 음악을 발견할 수 있습니다.

## ✨ 주요 기능

### 1. 홈페이지

- **새로 발매된 앨범**: 최신 앨범 정보를 카드 형태로 표시
- **트랙**: 랜덤으로 선별된 트랙 목록 제공
- **앨범**: 다양한 앨범을 랜덤으로 추천

### 2. 검색 기능

- **카테고리 검색**: 음악 장르별 카테고리 브라우징
- **키워드 검색**: 실시간 검색 기능으로 아티스트, 앨범, 트랙 검색
- **검색 결과 페이지**: 검색 결과를 상세하게 표시

### 3. 플레이리스트 관리

- **플레이리스트 조회**: 사용자의 플레이리스트 목록 확인
- **플레이리스트 상세**: 플레이리스트 내 트랙 목록 및 정보 표시
- **플레이리스트 생성**: 새로운 플레이리스트 생성 기능
- **무한 스크롤**: 플레이리스트 아이템을 페이지네이션으로 로드

### 4. 인증

- **OAuth 2.0 인증**: Spotify 계정을 통한 로그인
- **토큰 관리**: 자동 토큰 갱신 및 관리

## 🛠 기술 스택

### Frontend

- **React 18.3.1**: UI 라이브러리
- **TypeScript 4.9.5**: 타입 안정성
- **Material-UI (MUI) 7.3.6**: UI 컴포넌트 라이브러리
- **React Router 7.11.0**: 클라이언트 사이드 라우팅
- **React Query (@tanstack/react-query) 5.90.12**: 서버 상태 관리 및 데이터 페칭
- **Axios 1.13.2**: HTTP 클라이언트
- **Emotion**: CSS-in-JS 스타일링

### Build Tools

- **Webpack 5.104.1**: 모듈 번들러
- **Babel**: JavaScript 트랜스파일러
- **React Scripts 5.0.1**: React 개발 도구

### 기타

- **Moment.js 2.30.1**: 날짜/시간 처리
- **React Intersection Observer 10.0.0**: 무한 스크롤 구현

## 📁 프로젝트 구조

```
spotify_demo/
├── public/                 # 정적 파일
├── src/
│   ├── apis/              # API 호출 함수
│   │   ├── albumApi.ts
│   │   ├── authApi.ts
│   │   ├── categoryApi.ts
│   │   ├── playlistApi.ts
│   │   ├── searchApi.ts
│   │   └── userApi.ts
│   ├── common/            # 공통 컴포넌트
│   │   └── components/
│   │       ├── Card.tsx
│   │       ├── ErrorMessage.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── LoginButton.tsx
│   │       └── ...
│   ├── configs/           # 설정 파일
│   │   ├── authConfig.ts
│   │   └── commonConfig.ts
│   ├── hooks/             # Custom Hooks
│   │   ├── useGetTracks.ts
│   │   ├── useCreatePlaylist.ts
│   │   ├── useGetNewReleases.ts
│   │   └── ...
│   ├── layout/            # 레이아웃 컴포넌트
│   │   ├── AppLayout.tsx
│   │   └── components/
│   ├── models/            # TypeScript 타입 정의
│   │   ├── album.ts
│   │   ├── artist.ts
│   │   ├── playlist.ts
│   │   └── ...
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── HomePage/
│   │   ├── SearchPage/
│   │   ├── PlaylistDetailPage/
│   │   └── SearchWithKeywordPage/
│   ├── utils/             # 유틸리티 함수
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── crypto.ts
│   ├── App.tsx            # 메인 App 컴포넌트
│   └── index.tsx          # 진입점
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

## 🚀 사용 방법

### 1. 저장소 클론

```bash
git clone <repository-url>
cd spotify_demo
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 추가합니다:

```env
REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
REACT_APP_SPOTIFY_SECRET_ID=your_client_secret
```

### 4. 개발 서버 실행

```bash
npm start
```

브라우저에서 `http://localhost:8080` (또는 설정된 포트)로 접속합니다.

### 5. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

## 🔐 환경 변수 설정

### Spotify Web API 설정

1. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)에 접속
2. 새 앱 생성
3. 앱의 **Client ID**와 **Client Secret** 확인
4. **Redirect URI** 설정 (예: `http://localhost:8080`)
5. `.env` 파일에 다음 변수 추가:

```env
REACT_APP_SPOTIFY_CLIENT_ID=your_client_id_here
REACT_APP_SPOTIFY_SECRET_ID=your_client_secret_here
```

### 필요한 권한 (Scopes)

- `playlist-read-private`: 비공개 플레이리스트 읽기
- `playlist-modify-public`: 공개 플레이리스트 수정
- `playlist-modify-private`: 비공개 플레이리스트 수정
- `user-read-private`: 사용자 정보 읽기
- `user-read-email`: 사용자 이메일 읽기

## 📝 주요 스크립트

- `npm start`: 개발 서버 실행 (Webpack Dev Server)
- `npm run build`: 프로덕션 빌드
- `npm test`: 테스트 실행

## 🎨 주요 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **무한 스크롤**: 플레이리스트 아이템을 효율적으로 로드
- **에러 핸들링**: 사용자 친화적인 에러 메시지 표시
- **로딩 상태 관리**: React Query를 활용한 효율적인 데이터 페칭
- **타입 안정성**: TypeScript로 타입 안정성 보장

## 📄 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.
