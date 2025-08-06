const https = require("https");
const fs = require("fs");
const zlib = require("zlib");

// OKX API 엔드포인트
const OKX_API_URL = "https://www.okx.com/api/v5/market/tickers?instType=SPOT";

// User-Agent 설정
const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/json",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
  },
};

function fetchOkxTickers() {
  return new Promise((resolve, reject) => {
    console.log("📥 OKX API에서 거래 목록 가져오는 중...");

    https
      .get(OKX_API_URL, options, (res) => {
        if (res.statusCode !== 200) {
          console.error(`❌ API 요청 실패: HTTP ${res.statusCode}`);
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        console.log(
          `📡 응답 헤더: Content-Encoding = ${res.headers["content-encoding"]}`
        );

        let stream = res;

        // gzip 압축 해제
        if (res.headers["content-encoding"] === "gzip") {
          console.log("🔓 gzip 압축 해제 중...");
          stream = res.pipe(zlib.createGunzip());
        } else if (res.headers["content-encoding"] === "br") {
          console.log("🔓 brotli 압축 해제 중...");
          stream = res.pipe(zlib.createBrotliDecompress());
        }

        let data = "";

        stream.on("data", (chunk) => {
          data += chunk;
        });

        stream.on("end", () => {
          try {
            console.log(`📄 받은 데이터 크기: ${data.length} bytes`);
            console.log(`📄 데이터 미리보기: ${data.substring(0, 200)}...`);

            const response = JSON.parse(data);

            // OKX API 응답 구조 확인
            if (response.code !== "0") {
              throw new Error(`API 오류: ${response.msg}`);
            }

            const tickers = response.data;
            console.log(`✅ ${tickers.length}개의 거래쌍을 가져왔습니다.`);
            resolve(tickers);
          } catch (error) {
            console.error("❌ JSON 파싱 실패:", error.message);
            console.error("📄 받은 데이터:", data.substring(0, 500));
            reject(error);
          }
        });

        stream.on("error", (err) => {
          console.error("❌ 스트림 에러:", err.message);
          reject(err);
        });
      })
      .on("error", (err) => {
        console.error("❌ 네트워크 에러:", err.message);
        reject(err);
      });
  });
}

function processTickers(tickers) {
  console.log("🔄 데이터 처리 중...");

  const processedTickers = tickers
    .map((ticker) => {
      // OKX는 instId가 "BTC-USDT" 형식으로 되어 있음
      // USDT 마켓만 필터링
      if (ticker.instId && ticker.instId.includes("-USDT")) {
        // "BTC-USDT"에서 "BTC" 부분만 추출
        const baseSymbol = ticker.instId.split("-")[0];
        return baseSymbol;
      }
      return null;
    })
    .filter((ticker) => ticker !== null); // null 값 제거

  console.log(`✅ ${processedTickers.length}개의 USDT 거래쌍을 처리했습니다.`);
  return processedTickers;
}

function saveToJson(data, filename) {
  try {
    console.log(`💾 JSON 파일 저장 중: ${filename}`);

    const jsonContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonContent, "utf8");

    console.log(`✅ JSON 파일 저장 완료: ${filename}`);
    console.log(`📁 파일 크기: ${fs.statSync(filename).size} bytes`);

    return filename;
  } catch (error) {
    console.error(`❌ 파일 저장 실패: ${error.message}`);
    throw error;
  }
}

function displaySampleData(data, count = 5) {
  console.log(`\n📋 샘플 데이터 (처음 ${count}개):`);
  console.log("=".repeat(60));

  data.slice(0, count).forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
  console.log("");
}

async function main() {
  try {
    console.log("🚀 OKX 거래 목록 수집 시작...\n");

    // 1. API에서 데이터 가져오기
    const rawTickers = await fetchOkxTickers();

    // 2. 데이터 처리
    const processedTickers = processTickers(rawTickers);

    // 3. JSON 파일로 저장 (ticker 폴더에)
    const filename = "ticker/okx-tickers.json";
    saveToJson(processedTickers, filename);

    // 4. 샘플 데이터 표시
    displaySampleData(processedTickers);

    console.log("🎉 모든 작업이 완료되었습니다!");
  } catch (error) {
    console.error("💥 오류:", error.message);
  }
}

// 실행
main();
