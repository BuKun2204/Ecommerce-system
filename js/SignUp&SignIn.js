// ==================== SIGN UP FORM ====================
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('form[action="SignIn.html"], form#signup-form');
    if (!signupForm) return;

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const password = document.getElementById('password')?.value || '';

        // Reset lỗi
        document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));

        let isValid = true;

        // Validate tên
        if (!name || name.length < 2) {
            showError('nameError', 'Tên phải có ít nhất 2 ký tự');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('emailError', 'Email không hợp lệ');
            isValid = false;
        }

        // Validate mật khẩu
        if (!password || password.length < 6) {
            showError('passwordError', 'Mật khẩu phải có ít nhất 6 ký tự');
            isValid = false;
        }

        if (!isValid) return;

        // Đăng ký
        const result = registerAccount(name, email, password);

        if (result.success) {
            alert(result.message);
            setTimeout(() => {
                window.location.href = 'SignIn.html';
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

        const email = document.getElementById('email')?.value.trim() || '';
        const password = document.getElementById('password')?.value || '';

        // Reset lỗi
        document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));

        // Validate cơ bản
        if (!email || !password) {
            alert('Vui lòng nhập đầy đủ email và mật khẩu');
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

// Hàm hỗ trợ hiển thị lỗi
function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }
}

// ==================== HIỂN THỊ TÊN NGƯỜI DÙNG SAU KHI ĐĂNG NHẬP ====================
document.addEventListener('DOMContentLoaded', function () {
    const userDisplay = document.getElementById('userNameDisplay');
    const currentUser = getCurrentUser();

    if (userDisplay && currentUser) {
        userDisplay.textContent = `Xin chào, ${currentUser.name}!`;
    }

    // Nút đăng xuất
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