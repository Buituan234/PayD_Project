Đây là thư mục chưa các thành phần UI thường xuyên xuất hiện ở các Page
mà không muốn basepage phải gánh lấy nó
Vì khi các page khác extend từ basePage sẽ phải gánh lấy cả thông tin của
phần UI này, và nó cũng gây lặp code ở các page chứa thành phần UI này
Thường là: header/tableUI/modal/footer/...