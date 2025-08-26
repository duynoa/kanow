// Homepage API Response Types

export interface IProvinceData {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
  total_car: number;
}

export interface IPartnerData {
  id: number;
  name: string;
  phone: string;
  address: string;
  image: string;
}

export interface IHomepageResponse {
  data: IProvinceData[];
  transaction: any[]; // Có thể định nghĩa chi tiết hơn nếu biết cấu trúc
  partner: IPartnerData[];
}

// Export types để sử dụng trong hooks
export type HomepageDataResponse = IHomepageResponse;
export type ProvinceItem = IProvinceData;
export type PartnerItem = IPartnerData;
