import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Upload organization logo
 * @param {File} file - The file to upload
 * @returns {Promise<Object>} Upload response with file path
 */
export const uploadLogo = async (file) => {
  try {
    const formData = new FormData();
    formData.append("logo", file);

    const response = await axios.post(
      `${API_URL}/api/v1/upload/logo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(error.response?.data?.message || "Failed to upload logo");
  }
};

/**
 * Upload user avatar
 * @param {File} file - The file to upload
 * @returns {Promise<Object>} Upload response with file path
 */
export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axios.post(
      `${API_URL}/api/v1/upload/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(error.response?.data?.message || "Failed to upload avatar");
  }
};

/**
 * Upload generic image
 * @param {File} file - The file to upload
 * @returns {Promise<Object>} Upload response with file path
 */
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${API_URL}/api/v1/upload/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(error.response?.data?.message || "Failed to upload image");
  }
};

/**
 * Delete uploaded file
 * @param {string} path - The file path to delete
 * @returns {Promise<void>}
 */
export const deleteFile = async (path) => {
  try {
    await axios.delete(`${API_URL}/api/v1/upload/file`, {
      data: { path },
    });
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error(error.response?.data?.message || "Failed to delete file");
  }
};

/**
 * Get full image URL from path
 * @param {string} path - The file path
 * @returns {string} Full URL to the image
 */
export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
};

/**
 * Validate image file
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export const validateImageFile = (
  file,
  options = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ],
  },
) => {
  const errors = [];

  // Check file size
  if (file.size > options.maxSize) {
    errors.push(
      `File size must be less than ${options.maxSize / 1024 / 1024}MB`,
    );
  }

  // Check file type
  if (!options.allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${options.allowedTypes.join(", ")}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Convert file to base64 (for preview)
 * @param {File} file - The file to convert
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
