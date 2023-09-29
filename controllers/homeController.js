const Home = require("../models/home");

module.exports = {

    getCounts(req, res) {
        Home.getCounts((err, counts) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error retrieving all data.",
                    error: err,
                });
            }
            return res.status(200).json({
                success: true,
                message: "Counts retrieved successfully.",
                data: counts,
            });
        });
    },
};