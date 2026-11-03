document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('intro-video');
    
    // پخش خودکار ویدئو به صورت بی‌صدا
    video.muted = true;
    let playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // رفع محدودیت مرورگر برای Autoplay در صورت نیاز به کلیک کاربر
            document.addEventListener('click', function handler() {
                video.muted = true;
                video.play();
                document.removeEventListener('click', handler);
            }, { once: true });
        });
    }

    // رخداد اتمام پخش ویدئو
    video.onended = function() {
        // تاخیر 0.5 ثانیه پس از پایان ویدئو
        setTimeout(() => {
            const formContainer = document.getElementById('form-container');
            formContainer.classList.add('show');
            
            const inputField = document.getElementById('national-id-input');
            if(inputField) inputField.focus();
        }, 500);
    };
});

function checkNationalId() {
    const input = document.getElementById('national-id-input');
    const errorDiv = document.getElementById('error-message');
    const nationalId = input.value.trim();

    errorDiv.innerText = '';

    if (nationalId.length < 10) {
        errorDiv.innerText = "لطفا کدملی را بصورت صحیح وارد کنید";
        return;
    }

    if (guestsData.hasOwnProperty(nationalId)) {
        const guestName = guestsData[nationalId];
        showInvitation(guestName);
    } else {
        errorDiv.innerText = "متاسفانه کدملی وارد شده در لیست مدعوین قرار ندارد.";
    }
}

function showInvitation(name) {
    const pageHome = document.getElementById('page-home');
    const pageInv = document.getElementById('page-invitation');
    const nameOverlay = document.getElementById('guest-name');
    
    pageHome.classList.remove('active');
    pageHome.style.display = 'none';
    
    nameOverlay.innerText = name;
    
    pageInv.classList.add('active');
    pageInv.style.display = 'flex';
}

// تابع بازگشت به صفحه اول و لود مجدد ویدئو
function goBackToHome() {
    const pageHome = document.getElementById('page-home');
    const pageInv = document.getElementById('page-invitation');
    const video = document.getElementById('intro-video');
    const inputField = document.getElementById('national-id-input');
    const errorDiv = document.getElementById('error-message');
    const formContainer = document.getElementById('form-container');

    // پاک کردن فیلد کد ملی و خطاها
    if(inputField) inputField.value = '';
    if(errorDiv) errorDiv.innerText = '';
    
    // پنهان کردن فرم و بازنشانی ویدئو
    formContainer.classList.remove('show');
    
    pageInv.classList.remove('active');
    pageInv.style.display = 'none';
    
    pageHome.classList.add('active');
    pageHome.style.display = 'flex';

    // ریست کردن و پخش مجدد ویدئو از ابتدا
    video.currentTime = 0;
    video.play();
}