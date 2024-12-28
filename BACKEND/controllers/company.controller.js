import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Please provide the Company Name",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company is already registerd",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company is registerd successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in userId
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "No company is registerd by given user",
        success: false,
      });
    }

    return res.status(200).json({
      message: "companies fetched successfully",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
  }
};

const findCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, website, description, location } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      fileUri.content
    );
    // console.log(name,description,website,location);
    
    const upadteData = {
      name,
      website,
      description,
      location,
      logo: cloudinaryResponse.secure_url,
    };
    const company = await Company.findByIdAndUpdate(req.params.id, upadteData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { registerCompany, findCompanyById, getCompany, updateCompany };
