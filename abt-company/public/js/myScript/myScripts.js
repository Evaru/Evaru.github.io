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
$(document).ready(function() {
  $(".slider__content").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [{
      breakpoint: 450,
      settings:{
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }],
    focusOnSelect: true,
    prevArrow: $(".prev"),
    nextArrow: $(".next"),
    
  });
});

$(document).ready(function() {
  $("#subscribe").validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Пожалуйста, введите ваше имя"
      },
      email: {
        required: "Пожалуйста, введите ваш email",
        email: "Email должен быть корректным( пример: test@gmail.com )"
      }
    },
    submitHandler: function(form, event) {
      var $name, $dialogWindow;
      $name = $(form)
        .find('input[name="name"]')
        .val();
      $dialogWindow = $(
        '<div class="dialog"><p><span>' +
          $name +
          "</span> спасибо за подписку!</p></div>"
      ).fadeIn(500);
      $($dialogWindow).dialog({
        autoOpen: true,
        modal: true,
        title: "Подписка",
        open: function() {
          setTimeout(function() {
            $($dialogWindow)
              .dialog("close")
              .remove();
          }, 2000);
        }
      });
      event.preventDefault();
      form.reset();
    }
  });
});
