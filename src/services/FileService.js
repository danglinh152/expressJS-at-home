const path = require("path");

const handleUploadImage = async (file) => {
  if (!file || Object.keys(file).length === 0) {
    return null;
  }

  // The name of the input field (i.e. "image") is used to retrieve the uploaded file
  let image = file.image;

  const originalName = image.name;

  // Find last dot for extension
  const lastDotIndex = originalName.lastIndexOf(".");
  if (lastDotIndex === -1) {
    // No extension found
    filename = originalName;
    ext = "";
  } else {
    filename = originalName.substring(0, lastDotIndex); // e.g. 'photo'
    ext = originalName.substring(lastDotIndex + 1); // e.g. 'jpeg'
  }

  image.name = `${filename}-${Date.now()}.${ext}`;

  let uploadPath = path.resolve(__dirname, "../public/images", image.name);

  try {
    await image.mv(uploadPath);
    return image.name;
  } catch (error) {
    console.log("error >>>", error);
    return null;
  }
};

const handleUploadManyImage = async (files) => {
  if (!files || Object.keys(files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const result = [];

  // The name of the input field (i.e. "image") is used to retrieve the uploaded file
  for (const image of files.images) {
    const originalName = image.name;

    // Find last dot for extension
    const lastDotIndex = originalName.lastIndexOf(".");
    if (lastDotIndex === -1) {
      // No extension found
      filename = originalName;
      ext = "";
    } else {
      filename = originalName.substring(0, lastDotIndex); // e.g. 'photo'
      ext = originalName.substring(lastDotIndex + 1); // e.g. 'jpeg'
    }

    image.name = `${filename}-${Date.now()}.${ext}`;

    let uploadPath = path.resolve(__dirname, "../public/images", image.name);

    try {
      await image.mv(uploadPath);
      result.push(image.name);
    } catch (error) {
      console.log("error >>>", error);
      return null;
    }
  }

  return result;
};

module.exports = { handleUploadImage, handleUploadManyImage };
