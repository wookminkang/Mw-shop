# 🛍️ Mw-Shop (29CM Clone Project)

Next.js 14 App Router와 Supabase를 활용한 **29CM 클론 커머스 프로젝트**입니다.
유지보수성과 응집도를 높이기 위해 **FSD(Feature-Sliced Design) 아키텍처를 경량화하여 적용**하였습니다.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand (Client Global State)
- **Data Fetching**: TanStack Query (Infinite Scroll & Caching)
- **Architecture**: Modular Architecture (FSD Lite)

---

## 📂 Project Structure (Architecture)

이 프로젝트는 `app` 폴더에 비즈니스 로직을 두지 않고, **`features` 폴더에 도메인별 로직을 응집**시키는 구조를 따릅니다.

### 1. Root Directory

| 폴더명 | 설명 |
| :--- | :--- |
| **`app/`** | **[Routing]** URL 라우팅과 페이지 레이아웃만 담당합니다. 비즈니스 로직은 포함하지 않습니다. |
| **`features/`** | **[Domain Logic]** 상품, 장바구니, 검색 등 핵심 기능(도메인)별로 코드를 모아둔 곳입니다. |
| **`components/`** | **[Shared UI]** 도메인과 무관하게 재사용 가능한 공통 컴포넌트(Header, Footer, Button 등)입니다. |
| **`stores/`** | **[Global State]** UI 전용 전역 상태(검색창 Toggle 등)를 관리합니다. |
| **`utils/`** | **[Helpers]** Supabase 연결 설정 및 유틸리티 함수입니다. |
| **`types/`** | **[Type Definitions]** DB 스키마 및 공통 타입 정의입니다. |

---

### 2. Deep Dive: `features/` (핵심 폴더 상세)

기능별로 **API, Hook, UI(Server/Client)**가 한 폴더에 뭉쳐 있어 유지보수가 용이합니다.

#### 📦 `features/product/` (상품 도메인)
- **`api/`**
  - `getProducts.ts`: [Server] DB에서 초기 데이터(8개)를 가져오는 함수 (SEO용).
  - `getProductsClient.ts`: [Client] 무한 스크롤 시 브라우저에서 추가 데이터를 요청하는 함수.
  - `getProduct.ts`: [Server] 상품 상세 정보를 가져오는 함수.
- **`components/server/`** (RSC: React Server Components)
  - `ProductCard.tsx`: 상품 정보를 보여주는 정적 UI. 상태(State)가 없으므로 서버 컴포넌트로 구현.
  - `ProductList.tsx`: 상품 리스트 레이아웃.
- **`components/client/`** (RCC: React Client Components)
  - `ProductInfiniteList.tsx`: React Query + Intersection Observer를 이용한 무한 스크롤 리스트.
  - `CategoryNav.tsx`: URL Query Parameter를 조작하여 카테고리를 필터링하는 네비게이션.
  - `AddToCartForm.tsx`: 상세 페이지에서 수량 조절 및 장바구니 담기 기능을 수행하는 인터랙티브 컴포넌트.

#### 🛒 `features/cart/` (장바구니 도메인)
- **`store/`**
  - `useCartStore.ts`: Zustand + Persist Middleware를 사용하여 로컬 스토리지에 장바구니 상태 저장.
- **`components/client/`**
  - `CartContent.tsx`: 장바구니 리스트 조회 및 결제 금액 계산 로직.
  - `CartItem.tsx`: 개별 상품 삭제 및 수량 변경 UI.

#### 🔍 `features/search/` (검색 도메인)
- **`components/`**
  - `SearchOverlay.tsx`: 헤더 버튼 클릭 시 전면을 덮으며 나타나는 검색 모달. Supabase `ilike` 쿼리로 실시간 검색 수행.

---

## 🌊 Data Flow (Hybrid Pattern)

**SEO(검색 최적화)**와 **UX(사용자 경험)**를 모두 잡기 위해 **Server Data Fetching**과 **Client Interaction**을 혼합하여 사용합니다.

### 1. 메인 페이지 (List Page) Flow
1.  **Server (SSR)**: `app/page.tsx` 진입 시 `getProducts(limit=8)`를 호출하여 **초기 8개 상품을 HTML에 포함**시킵니다. (SEO 확보)
2.  **Hydration**: 서버에서 가져온 데이터를 `<ProductInfiniteList initialProducts={...} />` props로 전달합니다.
3.  **Client (CSR)**: 사용자가 스크롤을 내리면 `ProductInfiniteList`가 감지하여 `getProductsClient`를 호출, 9번째 상품부터 비동기로 가져옵니다.

### 2. 상세 페이지 (Detail Page) Flow
1.  **Server (SSR)**: `app/product/[id]/page.tsx`에서 `getProductById`를 호출하여 상품 정보를 가져옵니다.
2.  **Rendering**: 상품명, 가격, 설명 등 변하지 않는 정보는 서버에서 HTML로 렌더링합니다.
3.  **Partial CSR**: 수량 조절 버튼이 있는 `<AddToCartForm />` 부분만 클라이언트 컴포넌트로 동작하여 JS 번들 사이즈를 최소화합니다.

---

## ⚡ Key Rules (Convention)

1.  **Server First**: 기본적으로 모든 컴포넌트는 서버 컴포넌트로 작성합니다.
2.  **Client Boundary**: `useState`, `useEffect`, `onClick` 이벤트가 필요한 경우에만 해당 부분을 별도 파일로 분리하여 `"use client"`를 선언합니다.
3.  **Co-location**: 특정 기능에만 쓰이는 컴포넌트는 `components/`가 아닌 `features/` 폴더 내부에 위치시킵니다.
4.  **Supabase Separation**:
    - `utils/supabase/server.ts`: 서버 컴포넌트용 (쿠키 접근 가능)
    - `utils/supabase/client.ts`: 클라이언트 컴포넌트용

---

## 🚀 Getting Started

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정 (.env.local 생성)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 3. 개발 서버 실행
npm run dev