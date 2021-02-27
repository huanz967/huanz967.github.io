$('.one .onedetails').hide();

$(".one").click(function() {
  $(this).find('.oneinfo').toggle();
  $(this).find('.onedetails').toggle();
})
