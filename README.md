# Browser Extension

Repo lưu trữ các extension trình duyệt do tôi tự viết hoặc được AI hỗ trợ tạo sinh.

## Extensions

### Sudoku WASD

Extension bổ sung phím tắt điều khiển trên [Sudoku.com](https://sudoku.com/).

| Phím | Chức năng |
|---|---|
| `W` | Di chuyển ô được chọn lên trên |
| `A` | Di chuyển sang trái |
| `S` | Di chuyển xuống dưới |
| `D` | Di chuyển sang phải |
| `Space` | Bật/tắt chế độ Notes |

Extension mô phỏng các sự kiện bàn phím mũi tên để tận dụng cơ chế điều hướng có sẵn của Sudoku.com. Phím `Space` kích hoạt sự kiện `mousedown` trên nút Notes.

Các phím tắt không được kích hoạt khi con trỏ đang nằm trong `input`, `textarea` hoặc vùng `contenteditable`.

## Cách sử dụng

### 1. Tải mã nguồn

Clone repository hoặc tải mã nguồn về máy.

```bash
git clone git@github.com:JustRubik/BrowserExt.git
cd BrowserExt/<extension>
```

Nếu đã có mã nguồn trên máy, chỉ cần mở thư mục extension tương ứng.

### 2. Firefox

1. Mở `about:debugging#/runtime/this-firefox`.
2. Chọn **Load Temporary Add-on...**.
3. Chọn file `manifest.json` của extension.
4. Mở [Sudoku.com](https://sudoku.com/) và thử các phím tắt.

Extension được nạp theo cách này chỉ tồn tại tạm thời trong phiên trình duyệt; khi Firefox khởi động lại, có thể cần nạp lại.

### 3. Brave

1. Mở `brave://extensions/`.
2. Bật **Developer mode**.
3. Chọn **Load unpacked**.
4. Chọn thư mục chứa `manifest.json`.
5. Mở hoặc tải lại [Sudoku.com](https://sudoku.com/).

### 4. Microsoft Edge

1. Mở `edge://extensions/`.
2. Bật **Developer mode**.
3. Chọn **Load unpacked**.
4. Chọn thư mục chứa `manifest.json`.
5. Mở hoặc tải lại [Sudoku.com](https://sudoku.com/).

### 5. Cập nhật sau khi sửa mã nguồn

Sau khi sửa `content.js` hoặc các file khác:

- **Firefox:** quay lại `about:debugging`, nhấn **Reload** trên extension.
- **Brave / Edge:** mở trang quản lý extension và nhấn nút **Reload**.
- Tải lại tab Sudoku.com để content script được chạy lại.

## Cấu trúc repository

Cấu trúc cụ thể tùy theo số lượng extension. Ví dụ:

```text
Browser Extension/
├── README.md
└── sudoku-ext/
    ├── manifest.json
    └── content.js
```

Nếu mỗi extension có thư mục riêng, hãy chọn đúng thư mục chứa `manifest.json` khi nạp extension.

## Gỡ lỗi

- Kiểm tra extension đã được bật và đã nạp thành công chưa.
- Tải lại tab Sudoku.com sau khi nạp hoặc cập nhật extension.
- Mở Developer Tools (`F12`) và kiểm tra tab Console nếu phím tắt không hoạt động.
- Kiểm tra `manifest.json`, đặc biệt là `content_scripts.matches`, để bảo đảm extension được chạy trên đúng trang.

## Lưu ý

- Extension được phát triển để sử dụng cá nhân; chưa được đóng gói hoặc phát hành trên các cửa hàng extension.
- Cách hoạt động phụ thuộc vào DOM và cơ chế xử lý sự kiện của Sudoku.com. Nếu website thay đổi cấu trúc hoặc logic nội bộ, extension có thể cần được cập nhật.
- Các extension khác trong repository có thể có cách cài đặt và yêu cầu riêng; xem hướng dẫn tương ứng trong thư mục của từng extension.
