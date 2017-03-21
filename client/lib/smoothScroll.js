export default function smoothScroll() {
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      event.preventDefault();

      const hash = this.hash;
      const less = $('.nav') ? $('.nav').height() + 20 : 0;

      const scrollTop = $(hash) ? ($(hash).offset().top - less) : 0;
      console.log( $(hash) );
      $('html, body').animate({ scrollTop }, 800, () => {});

    }
  })

}
