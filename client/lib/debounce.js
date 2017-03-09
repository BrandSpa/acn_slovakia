export default function debounce(fn, delay) {
  let delayed = null;

  return e => {
    if(delayed !== null) clearTimeout(delayed);
    delayed = setTimeout( () => fn(e), delay );
  };
}
