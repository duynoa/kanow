import heic2any from "heic2any";
interface FileWithPath extends File {
    path?: string;
    uri?: string;
}

// hàm chuyển base 64
const previewImage = async (blob: any) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.onload = (e: any) => {
            resolve(e.target.result);
        };
        reader.readAsDataURL(blob);
    });
};

// hàm convert hiện tại sang base64
async function convertImageToBase64(file: FileWithPath) {
    try {
        const preview = await previewImage(file);
        return preview;
    } catch (error) {
        console.error("Conversion error: ", error);
    }
}

// hàm convert heic sang jpg
async function convertHeicToJpg(file: FileWithPath, progressCallback?: (progress: number) => void) {
    try {
        if (typeof window !== "undefined") {
            const blob: any = await heic2any({
                blob: file,
                toType: "image/jpeg",
                quality: 0.5,
            });

            const convertedFile = new File([blob], file.name.replace(/\.heic$/, ".jpg"), {
                type: "image/jpg",
            }) as FileWithPath;

            convertedFile.path = convertedFile.name;

            if (convertedFile) {
                const totalSteps = 5;

                for (let step = 1; step <= totalSteps; step++) {
                    await new Promise((resolve) => setTimeout(resolve, 100)); // Giả lập thời gian xử lý
                    if (progressCallback) {
                        progressCallback(Math.round((step / totalSteps) * 100)); // Cập nhật tiến trình
                    }
                }
            }
            return convertedFile;
        } else {
            console.log("err");
        }
    } catch (error) {
        console.error("Conversion error: ", error);
    }
}

export { convertHeicToJpg, convertImageToBase64 };
