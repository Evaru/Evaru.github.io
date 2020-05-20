//active link
$(document).on('click','.header__menu a',function(){
  $('.header__menu a').removeClass('active-link');
  $(this).addClass('active-link');
});

//burger
$(document).on("click",".menu-burger",function () {
  $(this).closest('.header__menu').toggleClass('menu-open');
  $('.header__menu ul').toggleClass('menu-open');
})
$(document).on("click",".menu-open li",function () {
  $(this).closest('.header__menu').toggleClass('menu-open');
  $('.header__menu ul').toggleClass('menu-open');
})