const multer = require("multer");
const path = require("path");

// 设置 multer 的存储配置
const storage = multer.diskStorage({
    // 决定文件保存到哪个文件夹
    destination: function (req, file, cb) {
        // 参数1是错误信息（这里填 null），参数2是保存路径 "uploads/"
        cb(null, "uploads/");
    },
    // 决定保存后的文件名
    filename: function (req, file, cb) {
        cb(
            null,
            // 生成规则：字段名 + 当前时间戳 + 原始文件后缀名
            // 这样可以防止不同用户上传同名文件导致覆盖（比如大家都传 "image.jpg"）
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

// 文件过滤器：用来检查上传的文件是否符合要求
const checkFileFilter = (req, file, cb) => {
    // 检查文件的 MIME 类型是否以 "image" 开头（比如 image/jpeg, image/png）
    if (file.mimetype.startsWith("image")) {
        // 如果是图片，通过校验
        cb(null, true);
    } else {
        // 如果不是图片，抛出一个错误，并拒绝上传
        cb(new Error("不是图片格式！请仅上传图片文件"));
    }
};

// 导出配置好的 multer 中间件
module.exports = multer({
    storage: storage, // 使用上面定义的存储规则
    fileFilter: checkFileFilter, // 使用上面定义的文件过滤规则
    limits: {
        fileSize: 5 * 1024 * 1024, // 限制文件大小为 5MB（单位是字节）
    },
});