export const successResponse = (
  res,
  status = 200,
  data = "",
  metaData = ""
) => {
  return res.status(status || 200).json({
    status,
    data,
    metaData,
  });
};

export const failResponse = (res, status = 400, data = "") => {
  return res.status(status || 200).json({
    status,
    message: data || "Something went wrong",
  });
};
