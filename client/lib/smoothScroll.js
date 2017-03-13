export default function smoothScroll() {
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      event.preventDefault();

      const hash = this.hash;
      const less = $('.nav') ? $('.nav').height() : 0;
      const scrollTop = ($(hash).offset().top - less);
     
      $('html, body').animate({ scrollTop }, 800, () => {});

    }
  })

}