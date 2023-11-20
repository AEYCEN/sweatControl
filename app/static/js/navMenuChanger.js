function activateMenu(menuId) {
    const menus = document.querySelectorAll('#sc-controls-menu, #sc-weather-menu, #sc-settings-menu');
    menus.forEach(menu => {
        if (menu.id === menuId) {
            menu.style.display = 'grid';
        } else {
            menu.style.display = 'none';
        }
    });

    const buttons = document.querySelectorAll('.sc-nav-button');
    buttons.forEach(button => {
        button.classList.remove('sc-button-active');
    });

    const activeButton = document.querySelector(`[onclick="activateMenu('${menuId}')"]`);
    activeButton.classList.add('sc-button-active');
}