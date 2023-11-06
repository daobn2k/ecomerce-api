export type TProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXl';

export enum EStatus {
  DEACTIVATE = 'DEACTIVATE', // không bán nữa
  ACTIVE = 'ACTIVE', // đang mở bán
  SOLD_OUT = 'SOLD_OUT', // đã bán hết
}
