class ImageUploader {
  async upload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
    const result = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    return await result.json();
  }
}

export default ImageUploader;
