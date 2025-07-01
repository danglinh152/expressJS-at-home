const { default: mongoose } = require("mongoose");
const Customer = require("../models/Customer");
const { handleUploadImage } = require("../services/FileService");

const getAllCustomers = async (req, res) => {
  const customers = await Customer.find({});
  return res.status(200).json({ ErrorCode: 0, data: customers });
};

const postNewCustomer = async (req, res) => {
  const { name, address, phone, email, description } = req.body;

  const image = await handleUploadImage(req.files);

  // Make sure all fields are present (optional but recommended)
  try {
    const customer = await Customer.create({
      name,
      address,
      phone,
      email,
      image,
      description,
    });

    return res.status(201).json({ ErrorCode: 0, data: customer });
  } catch (error) {
    console.error("Error inserting customer:", error);
    return res
      .status(500)
      .json({ ErrorCode: 1, data: "Internal Server Error" });
  }
};

const postManyNewCustomer = async (req, res) => {
  //   const { name, address, phone, email, description } = req.body;

  //   const image = await handleUploadImage(req.files);

  // Make sure all fields are present (optional but recommended)
  try {
    const customer = await Customer.insertMany(req.body);

    return res.status(201).json({ ErrorCode: 0, data: customer });
  } catch (error) {
    console.error("Error inserting customer:", error);
    return res
      .status(500)
      .json({ ErrorCode: 1, data: "Internal Server Error" });
  }
};

const updateTheCustomer = async (req, res) => {
  const { id, name, address, phone, email, description } = req.body;

  const image = await handleUploadImage(req.files);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ ErrorCode: 1, data: "Invalid customer ID." });
  }
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { name, address, phone, email, image, description },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res
        .status(404)
        .json({ ErrorCode: 1, data: "Customer not found." });
    }

    return res.status(200).json({ ErrorCode: 0, data: updatedCustomer });
  } catch (error) {
    console.error("Error updating customer:", error);
    return res
      .status(500)
      .json({ ErrorCode: 1, data: "Internal Server Error" });
  }
};

const deleteTheCustomer = async (req, res) => {
  const customerId = req.body.customerId;

  if (!customerId) {
    return res
      .status(400)
      .json({ ErrorCode: 1, data: "Customer ID is required." });
  }

  try {
    const deleted = await Customer.deleteById(customerId);
    return res.status(200).json({ ErrorCode: 0, data: deleted });
  } catch (error) {
    console.log("error >>> ", error);
    return res
      .status(500)
      .json({ ErrorCode: -1, data: "Internal Server Error" });
  }
};

const deleteManyCustomers = async (req, res) => {
  const customerIds = req.body;

  // Validate input: should be a non-empty array of ids
  if (!Array.isArray(customerIds) || customerIds.length === 0) {
    return res
      .status(400)
      .json({ ErrorCode: 1, data: "An array of customer IDs is required." });
  }

  try {
    const deleted = await Customer.deleteMany({ _id: { $in: customerIds } });
    return res.status(200).json({ ErrorCode: 0, data: deleted });
  } catch (error) {
    console.log("error >>> ", error);
    return res
      .status(500)
      .json({ ErrorCode: -1, data: "Internal Server Error" });
  }
};

module.exports = {
  getAllCustomers,
  postNewCustomer,
  updateTheCustomer,
  deleteTheCustomer,
  postManyNewCustomer,
  deleteManyCustomers,
};
