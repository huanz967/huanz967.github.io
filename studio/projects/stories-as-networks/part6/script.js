$('.one .onedetails').hide();

$(".one").click(function() {
  $(this).find('.oneinfo').toggle();
  $(this).find('.onedetails').toggle();
})

$('.two .twodetails').hide();

$(".two").click(function() {
  $(this).find('.twoinfo').toggle();
  $(this).find('.twodetails').toggle();
})


$('.three .threedetails').hide();

$(".three").click(function() {
  $(this).find('.threeinfo').toggle();
  $(this).find('.threedetails').toggle();
})


$('.four .fourdetails').hide();

$(".four").click(function() {
  $(this).find('.fourinfo').toggle();
  $(this).find('.fourdetails').toggle();
})


$('.five .fivedetails').hide();

$(".five").click(function() {
  $(this).find('.fiveinfo').toggle();
  $(this).find('.fivedetails').toggle();
})


$('.six .sixdetails').hide();

$(".six").click(function() {
  $(this).find('.sixinfo').toggle();
  $(this).find('.sixdetails').toggle();
})

function oneTop() {
  document.getElementById('one').style.zIndex = 9;
  document.getElementById('zero').style.zIndex = -1;
}

function twoTop() {
  document.getElementById('two').style.zIndex = 9;
  document.getElementById('zero').style.zIndex = -1;
  document.getElementById('one').style.zIndex = -1;
}

function threeTop() {
  document.getElementById('three').style.zIndex = 9;
  document.getElementById('zero').style.zIndex = -1;
  document.getElementById('one').style.zIndex = -1;
  document.getElementById('two').style.zIndex = -1;
}

function fourTop() {
  document.getElementById('four').style.zIndex = 9;
  document.getElementById('zero').style.zIndex = -1;
  document.getElementById('one').style.zIndex = -1;
  document.getElementById('two').style.zIndex = -1;
  document.getElementById('three').style.zIndex = -1;
}

function fiveTop() {
  document.getElementById('five').style.zIndex = 9;
  document.getElementById('zero').style.zIndex = -1;
  document.getElementById('one').style.zIndex = -1;
  document.getElementById('two').style.zIndex = -1;
  document.getElementById('three').style.zIndex = -1;
  document.getElementById('four').style.zIndex = -1;
}

function sixTop() {
  document.getElementById('six').style.zIndex = 9;
  document.getElementById('zero').style.zIndex = -1;
  document.getElementById('one').style.zIndex = -1;
  document.getElementById('two').style.zIndex = -1;
  document.getElementById('three').style.zIndex = -1;
  document.getElementById('four').style.zIndex = -1;
  document.getElementById('five').style.zIndex = -1;
}

function goBack() {
  document.getElementById('zero').style.zIndex = 7;
  document.getElementById('one').style.zIndex = 6;
  document.getElementById('two').style.zIndex = 5;
  document.getElementById('three').style.zIndex = 4;
  document.getElementById('four').style.zIndex = 3;
  document.getElementById('five').style.zIndex = 2;
  document.getElementById('six').style.zIndex = 1;
}

function allBack() {
  document.getElementById('zero').style.zIndex = 7;
  document.getElementById('one').style.zIndex = 6;
  document.getElementById('two').style.zIndex = 5;
  document.getElementById('three').style.zIndex = 4;
  document.getElementById('four').style.zIndex = 3;
  document.getElementById('five').style.zIndex = 2;
  document.getElementById('six').style.zIndex = 1;
}
