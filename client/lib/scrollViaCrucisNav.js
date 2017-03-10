import debounce from 'lodash/debounce';

export default function scrollViaCrucisNav() {
	let onScroll = debounce(() => {
  if($('.via-crucis-nav') && $('.nav') && window.outerHeight <= 767) {
    const $nav = $('.nav');
    const $viaCrucisNav =  $('.via-crucis-nav');
    const $navToggle = $('.via-crucis-toggle');
    let navTop = $nav.offset().top;
    let viaCrucisToggleTop = $navToggle.offset().top; 
    let viaCrucisLeft = $('.via-crucis__left').offset().top;
    console.log('debounce', );

    if(navTop > viaCrucisLeft) {
      $navToggle.addClass('via-crucis-toggle--fixed');
      $viaCrucisNav.addClass('via-crucis-nav--fixed');
    } else {
       $navToggle.removeClass('via-crucis-toggle--fixed');
      $viaCrucisNav.removeClass('via-crucis-nav--fixed');
    }

  }
}, 200);

window.addEventListener('scroll', onScroll);
}
