document.addEventListener('DOMContentLoaded', () => {
    let errorMessages = document.querySelector('.error');
    let successMessages = document.querySelector('.success');
    if (errorMessages.innerHTML !== '' || successMessages.innerHTML !== '') {
        setTimeout(() => {
            errorMessages.innerHTML = '';
            successMessages.innerHTML = '';
        }, 3000);
    }
});