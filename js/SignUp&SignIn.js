// ==================== HỖ TRỢ LOCALSTORAGE ====================
const STORAGE_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

// Lấy danh sách người dùng từ localStorage
function getUsers() {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
}

// Lưu danh sách người dùng
function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Lấy người dùng hiện tại
function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

// Đăng xuất
function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'SignIn.html';
}

// ==================== ĐĂNG KÝ TÀI KHOẢN ====================
function registerAccount(name, email, password) {
    const users = getUsers();

    // Kiểm tra email đã tồn tại chưa
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return { success: false, message: 'Email này đã được đăng ký!' };
    }

    // Tạo tài khoản mới
    const newUser = {
        name: name,
        email: email,
        password: password, // Lưu ý: trong thực tế nên hash password (dùng bcrypt ở backend)
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    // Tự động đăng nhập sau khi đăng ký
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return { success: true, message: 'Đăng ký thành công! Đang chuyển hướng...' };
}

// ==================== ĐĂNG NHẬP ====================
function loginAccount(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        return { success: false, type: 'email', message: 'Email chưa được đăng ký!' };
    }

    if (user.password !== password) {
        return { success: false, type: 'password', message: 'Mật khẩu không đúng!' };
    }

    // Đăng nhập thành công → lưu vào localStorage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
        name: user.name,
        email: user.email
    }));

    return { success: true, message: 'Đăng nhập thành công!' };
}

// ==================== SIGN UP FORM ====================
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('form[action="SignIn.html"], form#signup-form');
    if (!signupForm) return;

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim().toLowerCase() || '';
        const password = document.getElementById('password')?.value || '';

        // Reset lỗi
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        let isValid = true;

        if (!name || name.length < 2) {
            showError('nameError', 'Tên phải có ít nhất 2 ký tự');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('emailError', 'Vui lòng nhập email hợp lệ');
            isValid = false;
        }

        if (!password || password.length < 6) {
            showError('passwordError', 'Mật khẩu phải có ít nhất 6 ký tự');
            isValid = false;
        }

        if (!isValid) return;

        const result = registerAccount(name, email, password);

        if (result.success) {
            alert(result.message);
            setTimeout(() => {
                window.location.href = 'HomepageAccount.html'; // Chuyển thẳng về trang chủ khi đã đăng nhập
            }, 1000);
        } else {
            alert(result.message);
        }
    });
});

// ==================== SIGN IN FORM ====================
document.addEventListener('DOMContentLoaded', function () {
    const signinForm = document.querySelector('form[action="HomepageAccount.html"], form#signin-form');
    if (!signinForm) return;

    signinForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email')?.value.trim().toLowerCase() || '';
        const password = document.getElementById('password')?.value || '';

        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        if (!email || !password) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const result = loginAccount(email, password);

        if (result.success) {
            alert(result.message);
            setTimeout(() => {
                window.location.href = 'HomepageAccount.html';
            }, 800);
        } else {
            if (result.type === 'email') {
                showError('emailError', result.message);
            } else if (result.type === 'password') {
                showError('passwordError', result.message);
            }
        }
    });
});

// ==================== HIỂN THỊ TÊN NGƯỜI DÙNG & ĐĂNG XUẤT ====================
document.addEventListener('DOMContentLoaded', function () {
    const userDisplay = document.getElementById('userNameDisplay');
    const currentUser = getCurrentUser();

    if (userDisplay && currentUser) {
        userDisplay.textContent = currentUser.name;
    } else if (userDisplay) {
        // Nếu không có user mà đang ở trang cần đăng nhập → chuyển về đăng nhập
        if (window.location.pathname.includes('HomepageAccount.html')) {
            window.location.href = 'SignIn.html';
        }
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Bạn có chắc muốn đăng xuất?')) {
                logout();
            }
        });
    }
});

// ==================== HÀM HIỂN THỊ LỖI ====================
function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }
}