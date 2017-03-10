
export default function toggleViaCrucisNav() {
  if($('.via-crucis-toggle')) {
     $('.via-crucis-toggle').on('click', e => {
      e.preventDefault();
      $('.via-crucis-nav').toggleClass( "via-crucis-nav--open" );
    })
  }
}