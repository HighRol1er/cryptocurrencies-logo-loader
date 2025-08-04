// 클라이언트 사이드에서도 사용할 수 있도록 조건부 import
let path, fs, ICONS_PATH, EXCHANGE_PATHS;

// Node.js 환경에서만 fs와 path 모듈 로드
if (typeof window === "undefined") {
  path = require("path");
  fs = require("fs");

  // 아이콘 경로 상수
  ICONS_PATH = path.join(__dirname, "icons");

  // 거래소별 아이콘 경로
  EXCHANGE_PATHS = {
    binance: path.join(ICONS_PATH, "binance"),
    upbit: path.join(ICONS_PATH, "upbit"),
    bithumb: path.join(ICONS_PATH, "bithumb"),
  };
} else {
  // 브라우저 환경에서는 상대 경로 사용
  ICONS_PATH = "./icons";
  EXCHANGE_PATHS = {
    binance: "./icons/binance",
    upbit: "./icons/upbit",
    bithumb: "./icons/bithumb",
  };
}

/**
 * 특정 거래소의 모든 아이콘 목록을 가져옵니다
 * @param {string} exchange - 거래소 이름 (binance, upbit, bithumb)
 * @returns {string[]} 아이콘 파일명 배열
 */
function getIcons(exchange) {
  const exchangePath = EXCHANGE_PATHS[exchange.toLowerCase()];
  if (!exchangePath) {
    throw new Error(
      `Unsupported exchange: ${exchange}. Supported exchanges: ${Object.keys(
        EXCHANGE_PATHS
      ).join(", ")}`
    );
  }

  // 브라우저 환경에서는 빈 배열 반환 (파일 시스템 접근 불가)
  if (typeof window !== "undefined") {
    return [];
  }

  if (!fs.existsSync(exchangePath)) {
    return [];
  }

  return fs
    .readdirSync(exchangePath)
    .filter((file) => file.endsWith(".webp"))
    .map((file) => file.replace(".webp", ""));
}

/**
 * 특정 거래소의 특정 티커 아이콘 경로를 가져옵니다
 * @param {string} exchange - 거래소 이름 (binance, upbit, bithumb)
 * @param {string} ticker - 티커 심볼 (예: BTC, ETH)
 * @returns {string|null} 아이콘 파일 경로 또는 null
 */
function getIconPath(exchange, ticker) {
  const exchangePath = EXCHANGE_PATHS[exchange.toLowerCase()];
  if (!exchangePath) {
    throw new Error(
      `Unsupported exchange: ${exchange}. Supported exchanges: ${Object.keys(
        EXCHANGE_PATHS
      ).join(", ")}`
    );
  }

  // 브라우저 환경에서는 상대 경로 반환
  if (typeof window !== "undefined") {
    return `${
      EXCHANGE_PATHS[exchange.toLowerCase()]
    }/${ticker.toUpperCase()}.webp`;
  }

  const iconPath = path.join(exchangePath, `${ticker.toUpperCase()}.webp`);
  return fs.existsSync(iconPath) ? iconPath : null;
}

/**
 * 특정 거래소의 특정 티커 아이콘 URL을 가져옵니다 (웹에서 사용)
 * @param {string} exchange - 거래소 이름 (binance, upbit, bithumb)
 * @param {string} ticker - 티커 심볼 (예: BTC, ETH)
 * @returns {string|null} 아이콘 URL 또는 null
 */
function getIconUrl(exchange, ticker) {
  const iconPath = getIconPath(exchange, ticker);
  if (!iconPath) return null;

  // 브라우저 환경에서는 상대 경로 반환
  if (typeof window !== "undefined") {
    return `./node_modules/crypto-cex-icons/icons/${exchange.toLowerCase()}/${ticker.toUpperCase()}.webp`;
  }

  // npm 패키지에서 상대 경로로 접근
  return `./node_modules/crypto-cex-icons/icons/${exchange.toLowerCase()}/${ticker.toUpperCase()}.webp`;
}

/**
 * 모든 거래소의 모든 아이콘 목록을 가져옵니다
 * @returns {Object} 거래소별 아이콘 목록
 */
function getAllIcons() {
  const result = {};
  for (const exchange of Object.keys(EXCHANGE_PATHS)) {
    result[exchange] = getIcons(exchange);
  }
  return result;
}

/**
 * 특정 티커가 모든 거래소에서 사용 가능한지 확인합니다
 * @param {string} ticker - 티커 심볼 (예: BTC, ETH)
 * @returns {Object} 거래소별 사용 가능 여부
 */
function checkTickerAvailability(ticker) {
  const result = {};
  for (const exchange of Object.keys(EXCHANGE_PATHS)) {
    result[exchange] = getIconPath(exchange, ticker) !== null;
  }
  return result;
}

// 내보내기
module.exports = {
  getIcons,
  getIconPath,
  getIconUrl,
  getAllIcons,
  checkTickerAvailability,
  // 상수들도 내보내기
  EXCHANGES: Object.keys(EXCHANGE_PATHS),
  ICONS_PATH,
  EXCHANGE_PATHS,
};
