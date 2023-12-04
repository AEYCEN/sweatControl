function toggleMenu() {
    const button = document.querySelector('.sc-nav-button');
    const menu1 = document.querySelector('#sc-controls-menu');
    const menu2 = document.querySelector('#sc-settings-menu');
    const sign1 = document.querySelector('#sc-settingstogglesign1');
    const sign2 = document.querySelector('#sc-settingstogglesign2');

    if (button.classList.contains('sc-button-active')) {
        menu2.style.display = 'none';
        menu1.style.display = 'grid';
        sign1.style.display = 'flex';
        sign2.style.display = 'none';
        button.classList.remove('sc-button-active');
    } else {
        menu1.style.display = 'none';
        menu2.style.display = 'grid';
        sign1.style.display = 'none';
        sign2.style.display = 'flex';
        button.classList.add('sc-button-active');
    }
}