// Sliding navbar for the mobile view.
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
if (bar) {
    bar.addEventListener('cick', () => {
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('cick', () => {
        nav.classList.remove('active');
    })
}
