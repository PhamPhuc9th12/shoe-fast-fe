import Instance from "../../axios/Instance";

export const upload = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    return Instance.post("/api/v1/upload-image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}
