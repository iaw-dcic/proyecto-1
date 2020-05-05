$(document).ready(function() {
add_handlers();
});

function add_handlers() {
  $(".simon_btn").on("click",btn_press);
}

function btn_press() {
  let boton = $(this).attr('id');
  animateCSS("#"+boton,"pulse");

}

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}
