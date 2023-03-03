const corsOptions = {
  origin: '*', // Địa chỉ tên miền được phép truy cập
  optionsSuccessStatus: 200, // Trạng thái trả về khi phân tích cú pháp yêu cầu hoàn tất
  methods: 'GET,PUT,POST,DELETE', // Các phương thức HTTP được phép
  allowedHeaders: 'Content-Type,Authorization', // Các tiêu đề được phép
  preflightContinue: false, // Có tiếp tục tiền xử lý hay không nếu chưa được cấu hình
  maxAge: 86400, // Thời gian sống của bộ nhớ đệm (giây)
};
  
  module.exports = corsOptions;