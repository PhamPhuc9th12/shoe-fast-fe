import Instance from "../axios/Instance"

export const upload = async (file) => {
    let formData = new FormData();
    formData.append("file", file);
    return await Instance.post("/api/v1/upload-image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}
