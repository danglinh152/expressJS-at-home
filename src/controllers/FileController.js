const {
  handleUploadImage,
  handleUploadManyImage,
} = require("../services/FileService");

module.exports = {
  uploadAPI: async (req, res) => {
    try {
      const imageName = await handleUploadImage(req.files);

      if (imageName) {
        return res.status(200).json({
          ErrorCode: 0,
          data: imageName,
        });
      } else {
        return res.status(500).json({
          ErrorCode: -1,
          data: null,
        });
      }
    } catch (error) {
      console.error("Upload error >>>", error);
      return res.status(500).json({
        ErrorCode: -1,
        data: null,
      });
    }
  },
  uploadManyAPI: async (req, res) => {
    try {
      const manyImage = await handleUploadManyImage(req.files);

      if (manyImage) {
        return res.status(200).json({
          ErrorCode: 0,
          data: manyImage,
        });
      } else {
        return res.status(500).json({
          ErrorCode: -1,
          data: null,
        });
      }
    } catch (error) {
      console.error("Upload error >>>", error);
      return res.status(500).json({
        ErrorCode: -1,
        data: null,
      });
    }
  },
};
