import { convertHeicToJpg, convertImageToBase64 } from "./convertImage";

interface FileWithPath extends File {
    path?: string;
    uri?: string;
}

// hàm kiểm tra ảnh trước đó
function checkFile(defaultImages: any, file: any) {
    if (defaultImages) {
        const defaultImage = defaultImages?.some((item: any) => item?.name === file?.name || item?.path === file?.path);
        return defaultImage;
    }
}

async function changeCheckFileImage(
    file: FileWithPath,
    defaultImages?: any,
    typeConvert?: string,
    progressCallback?: (progress: number) => void
) {
    try {
        // kiểm tra file đã có trước đó hay chưa, defaultImages là mảng ảnh trước đó
        const existFile = checkFile(defaultImages, file);
        if (defaultImages && existFile) {
            return await new Promise(() => {});
        }
        if (!file.type) {
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            file = new File([file], file.name, {
                type: `image/${fileExtension}`,
            });
        }
        // Thêm path nếu cần
        if (!file.path) {
            file.path = file.webkitRelativePath || file.name;
        }

        /// chuyển file hiện tại thành link base64
        if (typeConvert === "base64") {
            return await convertImageToBase64(file);
        }

        if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
            const newFile = await convertHeicToJpg(file, progressCallback);
            // kiểm tra  file heic có hay ko, nếu có thì trả về file conver ko thì trả về file hiện tại
            if (newFile) {
                if (checkFile(defaultImages, newFile)) {
                    return await new Promise(() => {});
                }
                return newFile;
            }

            if (checkFile(defaultImages, file)) {
                return await new Promise(() => {});
            }
            return file;
        }
        if (progressCallback) progressCallback(100);
        // trả về file hiện tại
        return file;
    } catch (error) {
        console.error("Conversion error: ", error);
    }
}
export { changeCheckFileImage };
