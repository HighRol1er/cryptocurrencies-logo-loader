// 브라우저 전용 - Node.js 모듈 사용하지 않음
const ICONS_PATH = "./icons";
const EXCHANGE_PATHS = {
  binance: "./icons/binance",
  upbit: "./icons/upbit",
  bithumb: "./icons/bithumb",
};

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
  return [];
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

  // node_modules에서 직접 참조 (Next.js Image 컴포넌트용)
  return `/node_modules/crypto-cex-icons/icons/${exchange.toLowerCase()}/${ticker.toUpperCase()}.webp`;
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

  // node_modules에서 직접 참조 (Next.js Image 컴포넌트용)
  return `/node_modules/crypto-cex-icons/icons/${exchange.toLowerCase()}/${ticker.toUpperCase()}.webp`;
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
