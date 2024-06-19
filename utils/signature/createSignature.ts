import CryptoJS from 'crypto-js';

const createSignature = (data: Record<string, any>, checksumKey: string): string => {
    // Sắp xếp dữ liệu theo thứ tự alphabet
    const sortedData = Object.keys(data).sort().map(key => `${key}=${data[key]}`).join('&');

    // Tạo chữ ký (signature)
    const signature = CryptoJS.HmacSHA256(sortedData, checksumKey).toString(CryptoJS.enc.Hex);

    return signature;
};

export {
    createSignature
}