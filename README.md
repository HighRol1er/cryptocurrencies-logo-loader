# Crypto CEX Icons 🚀

암호화폐 거래소 아이콘 패키지입니다. Binance, Upbit, Bithumb의 최적화된 WebP 아이콘들을 npm 패키지로 제공합니다.

### 개발용 설치

```bash
# 저장소 클론
git clone https://github.com/HighRol1er/crypto-cex-img-loader.git
cd crypto-cex-img-loader

# 의존성 설치 (선택사항)
npm install
# 또는
pnpm install
# 또는
yarn install
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

## 🛠️ 기술 스택

- **Node.js**: 런타임 환경
- **Sharp**: 이미지 처리 및 최적화
- **crypto**: MD5 해시 생성 (빗썸용)
- **https**: HTTP 요청 처리

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👨‍💻 작성자

**Hunter_JOE, HighRol1er**

- GitHub: [@HighRol1er](https://github.com/HighRol1er)
