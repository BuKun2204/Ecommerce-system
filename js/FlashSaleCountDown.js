const CountDownEnd = new Date('2025-12-12T23:59:59').getTime();

function UpdateCountDown() {
    const now = new Date().getTime();
    const KetThuc = CountDownEnd - now;

    if (KetThuc < 0) {
        document.getElementById('countdown').innerHTML = 
            '<span class="text-red-400 text-2xl font-bold">Đã kết thúc</span>';
        return;
    }

    const days = Math.floor(KetThuc / (1000 * 60 * 60 * 24));
    const hours = Math.floor((KetThuc % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((KetThuc % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((KetThuc % (1000 * 60)) / 1000);

    // Hàm để định dạng số với 2 chữ số
    const formatTime = (time) => time.toString().padStart(2, '0');
    // Gán giá trị đã được định dạng vào các phần tử
    document.getElementById('Days').textContent = formatTime(days);
    document.getElementById('Hours').textContent = formatTime(hours);
    document.getElementById('Minutes').textContent = formatTime(minutes);
    document.getElementById('Seconds').textContent = formatTime(seconds);
}

// Gọi hàm lần đầu và sau đó mỗi giây
UpdateCountDown();
setInterval(UpdateCountDown, 1000);