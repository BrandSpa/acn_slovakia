
export default function toggleViaCrucisNav() {
  if($('.via-crucis-toggle')) {
     $('.via-crucis-toggle').on('click', e => {
      e.preventDefault();
      $('.via-crucis-nav__container').toggleClass( "via-crucis-nav__container--open" );
    })
  }
}