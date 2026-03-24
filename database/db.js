const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB 连接成功");
    } catch (e) {
        console.error("MongoDB 连接失败");
        process.exit(1);
    }
};

module.exports = connectToDB;