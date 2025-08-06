const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// OKX 아이콘 URL 패턴
const OKX_ICON_URL_PATTERN =
  "https://www.okx.com/cdn/oksupport/asset/currency/icon/{ticker}.png";

// User-Agent 설정
const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,ko;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  },
};

function readTickersFromJson(filename) {
  try {
    console.log(`📖 티커 목록 읽는 중: ${filename}`);

    if (!fs.existsSync(filename)) {
      throw new Error(`파일이 존재하지 않습니다: ${filename}`);
    }

    const data = fs.readFileSync(filename, "utf8");
    const tickers = JSON.parse(data);

    console.log(`✅ ${tickers.length}개의 티커를 읽었습니다.`);
    return tickers;
  } catch (error) {
    console.error(`❌ 티커 목록 읽기 실패: ${error.message}`);
    throw error;
  }
}

function downloadAndResizeIcon(ticker) {
  return new Promise((resolve, reject) => {
    const url = OKX_ICON_URL_PATTERN.replace("{ticker}", ticker.toLowerCase());
    const dest = `icons/okx/${ticker}.webp`;

    // 디렉토리가 없으면 생성
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // URL에서 프로토콜 확인
    const protocol = url.startsWith("https:") ? https : http;

    console.log(`📥 다운로드 및 리사이징 중: ${ticker}`);

    protocol
      .get(url, options, (res) => {
        if (res.statusCode !== 200) {
          console.error(`❌ ${ticker} 다운로드 실패: HTTP ${res.statusCode}`);
          res.resume();
          reject(new Error(`${ticker}: HTTP ${res.statusCode}`));
          return;
        }

        // 이미지 데이터를 버퍼로 수집
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));

        res.on("end", async () => {
          try {
            const imageBuffer = Buffer.concat(chunks);

            // Sharp로 리사이징 및 WebP 변환
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

            console.log(`✅ ${ticker} 완료 (WebP)`);
            resolve(dest);
          } catch (error) {
            console.error(`❌ ${ticker} 리사이징 실패: ${error.message}`);
            reject(error);
          }
        });
      })
      .on("error", (err) => {
        console.error(`❌ ${ticker} 네트워크 에러: ${err.message}`);
        reject(err);
      });
  });
}

async function downloadAllIcons(tickers, delay = 100) {
  console.log(`🚀 ${tickers.length}개의 아이콘 다운로드 및 리사이징 시작...`);
  console.log(`⏱️  요청 간격: ${delay}ms`);
  console.log(`📁 저장 위치: icons/okx/`);
  console.log(`🖼️  형식: WebP (64x64, 품질 70%)\n`);

  const results = {
    success: [],
    failed: [],
  };

  for (let i = 0; i < tickers.length; i++) {
    const ticker = tickers[i];

    try {
      await downloadAndResizeIcon(ticker);
      results.success.push(ticker);
    } catch (error) {
      results.failed.push({ ticker, error: error.message });
    }

    // 진행률 표시
    const progress = Math.round(((i + 1) / tickers.length) * 100);
    process.stdout.write(
      `\r📊 진행률: ${progress}% (${i + 1}/${tickers.length})`
    );

    // 마지막이 아닌 경우 딜레이
    if (i < tickers.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  console.log("\n"); // 새 줄
  return results;
}

function displayResults(results) {
  console.log("\n" + "=".repeat(60));
  console.log("📊 결과 요약");
  console.log("=".repeat(60));

  console.log(`✅ 성공: ${results.success.length}개`);
  console.log(`❌ 실패: ${results.failed.length}개`);
  console.log(
    `📊 성공률: ${Math.round(
      (results.success.length /
        (results.success.length + results.failed.length)) *
        100
    )}%`
  );

  if (results.failed.length > 0) {
    console.log("\n❌ 실패한 티커들:");
    results.failed.forEach(({ ticker, error }) => {
      console.log(`   ${ticker}: ${error}`);
    });
  }

  console.log("\n✅ 성공한 티커들 (처음 10개):");
  results.success.slice(0, 10).forEach((ticker, index) => {
    console.log(`   ${index + 1}. ${ticker}`);
  });

  if (results.success.length > 10) {
    console.log(`   ... 그리고 ${results.success.length - 10}개 더`);
  }
}

async function main() {
  try {
    console.log("🚀 OKX 아이콘 수집 시작...\n");

    // 1. 티커 목록 읽기
    const tickerFile = "ticker/okx-tickers.json";
    const tickers = readTickersFromJson(tickerFile);

    // 2. 모든 아이콘 다운로드
    const results = await downloadAllIcons(tickers, 100); // 100ms 딜레이

    // 3. 결과 표시
    displayResults(results);

    console.log("\n🎉 모든 작업이 완료되었습니다!");
  } catch (error) {
    console.error("💥 오류:", error.message);
    process.exit(1);
  }
}

// 스크립트가 직접 실행될 때만 main 함수 호출
if (require.main === module) {
  main();
}
