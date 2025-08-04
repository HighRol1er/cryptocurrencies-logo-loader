# Crypto CEX Icons 🚀

암호화폐 거래소 아이콘 패키지입니다. Binance, Upbit, Bithumb의 최적화된 WebP 아이콘들을 npm 패키지로 제공합니다.

## 📦 설치

### npm 패키지로 설치 (권장)

```bash
npm install crypto-cex-icons
```

**📊 패키지 정보**

- **이름**: `crypto-cex-icons`
- **버전**: `1.0.0`
- **크기**: ~1.4 MB
- **아이콘 수**: 961개 (Binance: 403개, Upbit: 156개, Bithumb: 402개)
- **형식**: WebP (64x64, 품질 70%)

### 개발용 설치

```bash
# 저장소 클론
git clone https://github.com/HighRol1er/crypto-cex-img-loader.git
cd crypto-cex-img-loader

# 의존성 설치
npm install
```

## 🚀 사용법

### npm 패키지 사용법

```javascript
const cryptoIcons = require("crypto-cex-icons");

// 특정 거래소의 모든 아이콘 목록
const binanceIcons = cryptoIcons.getIcons("binance");
console.log("Binance icons:", binanceIcons);

// 특정 티커의 아이콘 경로
const btcPath = cryptoIcons.getIconPath("binance", "BTC");
console.log("BTC icon path:", btcPath);

// 특정 티커의 아이콘 URL (웹에서 사용)
const btcUrl = cryptoIcons.getIconUrl("binance", "BTC");
console.log("BTC icon URL:", btcUrl);

// 모든 거래소의 모든 아이콘
const allIcons = cryptoIcons.getAllIcons();
console.log("All icons:", allIcons);

// 특정 티커가 어떤 거래소에서 사용 가능한지 확인
const btcAvailability = cryptoIcons.checkTickerAvailability("BTC");
console.log("BTC availability:", btcAvailability);
```

### 웹에서 사용하기

```html
<!-- HTML에서 직접 사용 -->
<img
  src="./node_modules/crypto-cex-icons/icons/binance/BTC.webp"
  alt="Bitcoin"
/>

<!-- 또는 JavaScript로 동적 로드 -->
<script>
  const cryptoIcons = require("crypto-cex-icons");
  const btcUrl = cryptoIcons.getIconUrl("binance", "BTC");
  document.getElementById("btc-icon").src = btcUrl;
</script>
```

### React에서 사용하기

```jsx
import cryptoIcons from "crypto-cex-icons";

function CryptoIcon({ exchange, ticker, size = 32 }) {
  const iconPath = cryptoIcons.getIconPath(exchange, ticker);

  if (!iconPath) {
    return <div>Icon not found</div>;
  }

  return (
    <img src={iconPath} alt={`${ticker} icon`} width={size} height={size} />
  );
}

// 사용 예시
<CryptoIcon exchange="binance" ticker="BTC" size={64} />;
```

## 📚 API 문서

### 함수 목록

#### `getIcons(exchange)`

특정 거래소의 모든 아이콘 목록을 반환합니다.

```javascript
const binanceIcons = cryptoIcons.getIcons("binance");
// ['BTC', 'ETH', 'BNB', ...]
```

**매개변수:**

- `exchange` (string): 거래소 이름 (`'binance'`, `'upbit'`, `'bithumb'`)

**반환값:**

- `string[]`: 아이콘 파일명 배열 (확장자 제외)

#### `getIconPath(exchange, ticker)`

특정 거래소의 특정 티커 아이콘 파일 경로를 반환합니다.

```javascript
const btcPath = cryptoIcons.getIconPath("binance", "BTC");
// '/path/to/node_modules/crypto-cex-icons/icons/binance/BTC.webp'
```

**매개변수:**

- `exchange` (string): 거래소 이름
- `ticker` (string): 티커 심볼 (예: `'BTC'`, `'ETH'`)

**반환값:**

- `string|null`: 아이콘 파일 경로 또는 `null` (존재하지 않는 경우)

#### `getIconUrl(exchange, ticker)`

특정 거래소의 특정 티커 아이콘 URL을 반환합니다 (웹에서 사용).

```javascript
const btcUrl = cryptoIcons.getIconUrl("binance", "BTC");
// './node_modules/crypto-cex-icons/icons/binance/BTC.webp'
```

**매개변수:**

- `exchange` (string): 거래소 이름
- `ticker` (string): 티커 심볼

**반환값:**

- `string|null`: 아이콘 URL 또는 `null` (존재하지 않는 경우)

#### `getAllIcons()`

모든 거래소의 모든 아이콘 목록을 반환합니다.

```javascript
const allIcons = cryptoIcons.getAllIcons();
// {
//   binance: ['BTC', 'ETH', ...],
//   upbit: ['BTC', 'ETH', ...],
//   bithumb: ['BTC', 'ETH', ...]
// }
```

**반환값:**

- `Object`: 거래소별 아이콘 목록

#### `checkTickerAvailability(ticker)`

특정 티커가 모든 거래소에서 사용 가능한지 확인합니다.

```javascript
const btcAvailability = cryptoIcons.checkTickerAvailability("BTC");
// { binance: true, upbit: true, bithumb: true }
```

**매개변수:**

- `ticker` (string): 티커 심볼

**반환값:**

- `Object`: 거래소별 사용 가능 여부

### 상수

#### `EXCHANGES`

지원하는 거래소 목록

```javascript
console.log(cryptoIcons.EXCHANGES);
// ['binance', 'upbit', 'bithumb']
```

#### `ICONS_PATH`

아이콘 파일들의 기본 경로

```javascript
console.log(cryptoIcons.ICONS_PATH);
// '/path/to/node_modules/crypto-cex-icons/icons'
```

#### `EXCHANGE_PATHS`

거래소별 아이콘 경로

```javascript
console.log(cryptoIcons.EXCHANGE_PATHS);
// {
//   binance: '/path/to/icons/binance',
//   upbit: '/path/to/icons/upbit',
//   bithumb: '/path/to/icons/bithumb'
// }
```

### Next.js에서 사용하기

```jsx
import cryptoIcons from "crypto-cex-icons";
import Image from "next/image";

function CryptoIcon({ exchange, ticker, size = 32 }) {
  const iconPath = cryptoIcons.getIconPath(exchange, ticker);

  if (!iconPath) {
    return <div>Icon not found</div>;
  }

  return (
    <Image src={iconPath} alt={`${ticker} icon`} width={size} height={size} />
  );
}
```

### Vue.js에서 사용하기

```vue
<template>
  <img
    v-if="iconPath"
    :src="iconPath"
    :alt="`${ticker} icon`"
    :width="size"
    :height="size"
  />
  <div v-else>Icon not found</div>
</template>

<script>
import cryptoIcons from "crypto-cex-icons";

export default {
  props: {
    exchange: String,
    ticker: String,
    size: {
      type: Number,
      default: 32,
    },
  },
  computed: {
    iconPath() {
      return cryptoIcons.getIconPath(this.exchange, this.ticker);
    },
  },
};
</script>
```

## ✨ 주요 기능

### 🎯 npm 패키지 기능

- 📦 **즉시 사용 가능**: `npm install` 후 바로 사용
- 🔍 **간편한 API**: 직관적인 함수로 아이콘 접근
- 🌐 **다중 프레임워크 지원**: React, Vue, Next.js 등 모든 환경에서 사용
- 📊 **실시간 확인**: 아이콘 존재 여부 및 거래소별 사용 가능성 확인

### 🛠️ 개발 도구 기능

- 🔄 **자동 거래 목록 수집**: 각 거래소 API에서 실시간 거래 목록 가져오기
- 🖼️ **아이콘 다운로드**: 거래소별 아이콘 URL 패턴에 맞춰 자동 다운로드
- 📐 **이미지 최적화**: Sharp를 사용한 64x64 WebP 변환 (품질 70%)
- 🛡️ **에러 처리**: 네트워크 오류, 파일 오류 등 상세한 에러 처리
- 📊 **진행률 표시**: 실시간 진행률 및 결과 요약
- ⏱️ **서버 부하 방지**: 요청 간격 조절로 서버 부하 최소화

## 📦 설치

```bash
# 저장소 클론
git clone https://github.com/hunterjoe/crypto-cex-img-loader.git
cd crypto-cex-img-loader

# 의존성 설치
npm install
```

## 🚀 사용법

### 개별 거래소 실행

#### 🟠 빗썸 (Bithumb)

```bash
# 티커 목록만 수집
npm run bithumb:ticker

# 아이콘만 다운로드
npm run bithumb:icon

# 티커 + 아이콘 모두
npm run bithumb:all
```

#### 🟢 업비트 (Upbit)

```bash
# 티커 목록만 수집
npm run upbit:ticker

# 아이콘만 다운로드
npm run upbit:icon

# 티커 + 아이콘 모두
npm run upbit:all
```

#### 🟡 바이낸스 (Binance)

```bash
# 티커 목록만 수집
npm run binance:ticker

# 아이콘만 다운로드
npm run binance:icon

# 티커 + 아이콘 모두
npm run binance:all
```

### 🌟 모든 거래소 한번에 실행

```bash
npm run fetch:all
```

## 📁 프로젝트 구조

```
crypto-cex-img-loader/
├── fetcher/
│   ├── bithumb-ticker-fetcher.js    # 빗썸 거래 목록 수집
│   ├── bithumb-icon-fetcher.js      # 빗썸 아이콘 다운로드
│   ├── upbit-ticker-fetcher.js      # 업비트 거래 목록 수집
│   ├── upbit-icon-fetcher.js        # 업비트 아이콘 다운로드
│   ├── binance-ticker-fetcher.js    # 바이낸스 거래 목록 수집
│   └── binance-icon-fetcher.js      # 바이낸스 아이콘 다운로드
├── ticker/
│   ├── bithumb-tickers.json         # 빗썸 거래 목록
│   ├── upbit-tickers.json           # 업비트 거래 목록
│   └── binance-tickers.json         # 바이낸스 거래 목록
├── icons/
│   ├── bithumb/                     # 빗썸 아이콘 (WebP)
│   ├── upbit/                       # 업비트 아이콘 (WebP)
│   └── binance/                     # 바이낸스 아이콘 (WebP)
├── package.json                     # npm 패키지 설정
└── README.md                        # 이 파일
```

## 🔧 거래소별 특징

### 🟠 빗썸 (Bithumb)

- **API**: `https://api.bithumb.com/public/ticker/ALL_KRW`
- **아이콘 URL**: `https://content.bithumb.com/resources/img/coin/coin-{MD5_HASH}.png`
- **특징**: MD5 해시를 사용한 아이콘 URL 생성

### 🟢 업비트 (Upbit)

- **API**: `https://api.upbit.com/v1/market/all`
- **아이콘 URL**: `https://static.upbit.com/logos/{ticker}.png`
- **특징**: KRW 마켓만 필터링

### 🟡 바이낸스 (Binance)

- **API**: `https://api.binance.com/api/v3/exchangeInfo`
- **아이콘 URL**: `https://bin.bnbstatic.com/static/assets/logos/{ticker}.png`
- **특징**: USDT 마켓 필터링

## 🖼️ 이미지 처리

### Sharp 설정

- **크기**: 64x64 픽셀
- **형식**: WebP
- **품질**: 70%
- **최적화**: `effort: 6`, `smartSubsample: true`

### 예시 코드

```javascript
await sharp(imageBuffer)
  .resize(64, 64, {
    fit: "cover",
    position: "center",
  })
  .webp({
    quality: 70,
    effort: 6,
    nearLossless: false,
    smartSubsample: true,
  })
  .toFile(dest);
```

## 📊 결과 예시

### 성공적인 실행 결과

```
🚀 빗썸 거래 목록 수집 시작...

📥 빗썸 API에서 거래 목록 가져오는 중...
✅ 403개의 거래쌍을 가져왔습니다.
🔄 데이터 처리 중...
✅ 403개의 KRW 거래쌍을 처리했습니다.

📋 샘플 데이터 (처음 5개):
============================================================
1. BTC
2. ETH
3. ETC
4. XRP
5. BCH

🎉 모든 작업이 완료되었습니다!
```

### 아이콘 다운로드 결과

```
============================================================
📊 다운로드 결과 요약
============================================================
✅ 성공: 402개
❌ 실패: 1개
📁 저장 위치: icons/bithumb/
```

## ⚙️ 커스터마이징

### 요청 간격 조절

각 fetcher 파일에서 `delay` 값을 수정하여 요청 간격을 조절할 수 있습니다:

```javascript
// 200ms 간격 (기본값)
const results = await downloadAllIcons(tickers, 200);

// 100ms 간격 (더 빠름)
const results = await downloadAllIcons(tickers, 100);

// 500ms 간격 (더 안전)
const results = await downloadAllIcons(tickers, 500);
```

### 이미지 품질 조절

Sharp 설정을 수정하여 이미지 품질을 조절할 수 있습니다:

```javascript
.webp({
  quality: 80,        // 품질 증가 (기본: 70)
  effort: 4,          // 압축 속도 조절 (기본: 6)
  nearLossless: true, // 무손실 압축
})
```

## ⚠️ 주의사항

1. **API 제한**: 각 거래소의 API 사용 제한을 확인하세요
2. **서버 부하**: 많은 요청을 보낼 때는 적절한 간격을 두세요
3. **저작권**: 다운로드한 아이콘의 저작권을 확인하세요
4. **네트워크**: 불안정한 네트워크 환경에서는 실패할 수 있습니다

## 🛠️ 기술 스택

- **Node.js**: 런타임 환경
- **Sharp**: 이미지 처리 및 최적화
- **crypto**: MD5 해시 생성 (빗썸용)
- **https**: HTTP 요청 처리

## 🤝 기여

버그 리포트나 기능 제안은 이슈를 통해 해주세요!

### 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👨‍💻 작성자

**Hunter_JOE**

- GitHub: [@HighRol1er](https://github.com/HighRol1er)

---

**즐거운 암호화폐 아이콘 수집! 🚀**
