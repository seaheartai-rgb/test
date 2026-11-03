document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('intro-video');
    
    // تلاش برای پخش خودکار به صورت بی‌صدا
    video.muted = true;
    let playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // اگر مرورگر به دلیل سیاست‌های امنیتی autoplay را مسدود کرد، با اولین کلیک کاربر ویدئو پخش شود
            document.addEventListener('click', function handler() {
                video.muted = true;
                video.play();
                document.removeEventListener('click', handler);
            }, { once: true });
        });
    }

    // رخداد اتمام پخش ویدئو
    video.onended = function() {
        // تاخیر 0.5 ثانیه (500 میلی‌ثانیه) پس از پایان ویدئو
        setTimeout(() => {
            const formContainer = document.getElementById('form-container');
            formContainer.classList.add('show');
            
            // فوکوس روی فیلد کد ملی
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