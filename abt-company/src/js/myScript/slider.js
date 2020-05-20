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
