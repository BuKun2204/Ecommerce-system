// ==================== QUẢN LÝ TÀI KHOẢN (sessionStorage) ====================
function getAccounts() {
    const stored = sessionStorage.getItem('accounts');
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error("Lỗi parse JSON accounts:", e);
        return [];
    }
}

function saveAccounts(accounts) {
    try {
        sessionStorage.setItem('accounts', JSON.stringify(accounts));
    } catch (e) {
        console.error("Không thể lưu accounts:", e);
        alert("Lỗi lưu dữ liệu. Vui lòng thử lại!");
    }
}

// Đăng ký
function registerAccount(name, email, password) {
    const accounts = getAccounts();

    // Kiểm tra email đã tồn tại chưa
    const exists = accounts.some(acc => acc.email.toLowerCase() === email.toLowerCase());
    if (exists) {
        return { success: false, message: 'Email này đã được đăng ký!' };
    }

    // Thêm tài khoản mới
    accounts.push({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password, // Lưu ý: trong thực tế nên hash password (ở đây demo nên để nguyên)
        registeredAt: new Date().toISOString()
    });

    saveAccounts(accounts);
    return { success: true, message: 'Đăng ký thành công! Đang chuyển đến trang đăng nhập...' };
}

// Đăng nhập
function loginAccount(email, password) {
    const accounts = getAccounts();
    const account = accounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());

    if (!account) {
        return { success: false, message: 'Email không tồn tại!', type: 'email' };
    }

    if (account.password !== password) {
        return { success: false, message: 'Mật khẩu không đúng!', type: 'password' };
    }

    // Lưu thông tin người dùng đang đăng nhập
    sessionStorage.setItem('currentUser', JSON.stringify({
        name: account.name,
        email: account.email
    }));

    return {
        success: true,
        message: 'Đăng nhập thành công!',
        user: { name: account.name, email: account.email }
    };
}

// Lấy user hiện tại (dùng cho các trang sau khi đăng nhập)
function getCurrentUser() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Đăng xuất
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'SignIn.html';
}