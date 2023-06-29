import {
  failResponse,
  successResponse,
} from "../helperFunctions/responseCreator.js";
// import User from "../models/user.js";
import Report from "../models/report.js";

export const getUserInfo = async (req, res, next) => {
  try {
    const { userInfo } = req || {};

    const reports = await Report.aggregate([
      {
        $match: {
          userId: userInfo._id,
        },
      },
    ]);

    const obj = {
      userInfo,
      totalReports: reports.length,
    };

    return successResponse(res, 200, obj);
  } catch (err) {
    return failResponse(res, err.status, err.message);
  }
};

export const addReport = async (req, res, next) => {
  try {
    const { userInfo } = req || {};

    const {
      total_cholestrol,
      hdl_cholestrol,
      vldl,
      ldl_cholestrol,
      non_hdl_cholestrol,
      triglycerides,
      total_cholestrol_hdl_ratio,
      tg_hdl_ratio,
    } = req.body;

    if (
      !total_cholestrol ||
      !hdl_cholestrol ||
      !vldl ||
      !ldl_cholestrol ||
      !non_hdl_cholestrol ||
      !triglycerides ||
      !total_cholestrol_hdl_ratio ||
      !tg_hdl_ratio
    ) {
      throw {
        status: 400,
        message: "Please provide all the fields",
      };
    }

    const report = await Report.create({
      total_cholestrol,
      hdl_cholestrol,
      vldl,
      ldl_cholestrol,
      non_hdl_cholestrol,
      triglycerides,
      total_cholestrol_hdl_ratio,
      tg_hdl_ratio,
      userId: userInfo._id,
    });

    return successResponse(res, 200, report);
  } catch (err) {
    return failResponse(res, err.status, err.message);
  }
};

export const getAllReports = async (req, res, next) => {
  try {
    const { userInfo } = req || {};

    const reports = await Report.aggregate([
      {
        $match: {
          userId: userInfo._id,
        },
      },
    ]);

    return successResponse(res, 200, reports);
  } catch (err) {
    return failResponse(res, err.status, err.message);
  }
};

export const getReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id);

    return successResponse(res, 200, report);
  } catch (err) {
    return failResponse(res, err.status, err.message);
  }
};

export const updateReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(id);

    const {
      total_cholestrol,
      hdl_cholestrol,
      vldl,
      ldl_cholestrol,
      non_hdl_cholestrol,
      triglycerides,
      total_cholestrol_hdl_ratio,
      tg_hdl_ratio,
    } = req.body || {};

    const report = await Report.findById(id);

    if (!report) {
      throw {
        status: 400,
        message: "Report not found",
      };
    }

    const obj = {
      total_cholestrol: total_cholestrol || report.total_cholestrol,
      hdl_cholestrol: hdl_cholestrol || report.hdl_cholestrol,
      vldl: vldl || report.vldl,
      ldl_cholestrol: ldl_cholestrol || report.ldl_cholestrol,
      non_hdl_cholestrol: non_hdl_cholestrol || report.non_hdl_cholestrol,
      triglycerides: triglycerides || report.triglycerides,
      total_cholestrol_hdl_ratio:
        total_cholestrol_hdl_ratio || report.total_cholestrol_hdl_ratio,
      tg_hdl_ratio: tg_hdl_ratio || report.tg_hdl_ratio,
    };

    const newReport = await Report.updateOne({ _id: id }, obj, {
      new: true,
    });

    return successResponse(res, 200, newReport);
  } catch (err) {
    return failResponse(res, err.status, err.message);
  }
};

export const deleteReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Report.findByIdAndDelete({ _id: id });

    return successResponse(res, 200, "report deleted successfully");
  } catch (err) {
    return failResponse(res, err.status, err.message);
  }
};
