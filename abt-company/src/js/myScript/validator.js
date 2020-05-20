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
