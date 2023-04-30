const Doctor = require("../model/Doctor.model");
const getMonthwiseDoctors = async (req, res) => {
  try {
    const results = await Doctor.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%m",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);
    console.log(results);
    res.status(200).json({ results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
module.exports = { getMonthwiseDoctors };
