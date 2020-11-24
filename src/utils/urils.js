//функция при нажатии на главную скроллит страницу наверх
export function topScroll () {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -30);
    setTimeout(topScroll, 0);
  }
}