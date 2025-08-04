declare module "crypto-cex-icons" {
  /**
   * 특정 거래소의 모든 아이콘 목록을 반환합니다.
   * @param exchange - 거래소 이름 ('binance', 'upbit', 'bithumb')
   * @returns 아이콘 파일명 배열 (확장자 제외)
   */
  export function getIcons(exchange: string): string[];

  /**
   * 특정 거래소의 특정 티커 아이콘 파일 경로를 반환합니다.
   * @param exchange - 거래소 이름
   * @param ticker - 티커 심볼 (예: 'BTC', 'ETH')
   * @returns 아이콘 파일 경로 또는 null (존재하지 않는 경우)
   */
  export function getIconPath(exchange: string, ticker: string): string | null;

  /**
   * 특정 거래소의 특정 티커 아이콘 URL을 반환합니다 (웹에서 사용).
   * @param exchange - 거래소 이름
   * @param ticker - 티커 심볼
   * @returns 아이콘 URL 또는 null (존재하지 않는 경우)
   */
  export function getIconUrl(exchange: string, ticker: string): string | null;

  /**
   * 모든 거래소의 모든 아이콘 목록을 반환합니다.
   * @returns 거래소별 아이콘 목록
   */
  export function getAllIcons(): Record<string, string[]>;

  /**
   * 특정 티커가 모든 거래소에서 사용 가능한지 확인합니다.
   * @param ticker - 티커 심볼
   * @returns 거래소별 사용 가능 여부
   */
  export function checkTickerAvailability(ticker: string): Record<string, boolean>;

  /**
   * 지원하는 거래소 목록
   */
  export const EXCHANGES: string[];

  /**
   * 아이콘 파일들의 기본 경로
   */
  export const ICONS_PATH: string;

  /**
   * 거래소별 아이콘 경로
   */
  export const EXCHANGE_PATHS: Record<string, string>;
} 