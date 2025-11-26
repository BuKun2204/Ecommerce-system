document.addEventListener('DOMContentLoaded', function () {

    // === 1. Xử lý tăng/giảm số lượng → cập nhật ngay SUBTOTAL (tổng tạm tính) ===
    document.querySelectorAll('.quantity-controller').forEach(controller => {
        const input   = controller.querySelector('input[type="number"]');
        const btnUp   = controller.querySelector('.btn-up');
        const btnDown = controller.querySelector('.btn-down');
        const row     = controller.closest('.cart-item');

        // Tăng
        btnUp.addEventListener('click', () => {
            input.value = (parseInt(input.value) || 1) + 1;
            updateRowAndSubtotal(row);
        });

        // Giảm
        btnDown.addEventListener('click', () => {
            let val = parseInt(input.value) || 1;
            if (val > 1) input.value = val - 1;
            updateRowAndSubtotal(row);
        });

        // Nhập tay
        input.addEventListener('change', () => {
            let val = parseInt(input.value);
            if (isNaN(val) || val < 1) input.value = 1;
            updateRowAndSubtotal(row);
        });
    });

    // === Cập nhật subtotal của 1 dòng + tổng tạm tính (Subtotal) ===
    function updateRowAndSubtotal(row) {
        const price = parseFloat(row.querySelector('.item-price').textContent.replace('$', '').trim());
        const qty   = parseInt(row.querySelector('input[type="number"]').value);
        const subtotal = price * qty;

        // Cập nhật dòng đó
        row.querySelector('.item-subtotal').textContent = '$' + subtotal;

        // Cập nhật ngay Subtotal (tổng tạm tính)
        updateLiveSubtotal();
    }

    // === Cập nhật dòng Subtotal (luôn thay đổi khi bấm ▲/▼) ===
    function updateLiveSubtotal() {
        let tempTotal = 0;
        document.querySelectorAll('.item-subtotal').forEach(el => {
            tempTotal += parseFloat(el.textContent.replace('$', '')) || 0;
        });
        const subtotalEl = document.querySelector('.Subtotal-total-price');
        if (subtotalEl) {
            subtotalEl.textContent = '$' + tempTotal;
        }
    }

    // === CHỈ KHI BẤM "UPDATE CART" MỚI CHUYỂN Subtotal → Total ===
    document.querySelectorAll('.update-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentSubtotal = document.querySelector('.Subtotal-total-price').textContent;
            const totalEl = document.querySelector('.cart-total-price');

            if (totalEl && currentSubtotal) {
                totalEl.textContent = currentSubtotal;

                // Hiệu ứng đẹp: nháy đỏ + phóng to nhẹ
                totalEl.classList.add('text-red-600', 'font-bold', 'scale-110', 'transition-all', 'duration-300');
                setTimeout(() => {
                    totalEl.classList.remove('text-red-600', 'font-bold', 'scale-110');
                }, 600);
            }
        });
    });
    updateLiveSubtotal();
});
