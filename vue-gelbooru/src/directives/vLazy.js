const config = {
  rootMargin: '0px 0px 400px',
  thresholds: 0,
  root: null,
}

const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const target = entry.target
    const src = target.getAttribute('data-src');
    if (src && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
      obs.unobserve(target);
      target.src = src;
      target.removeAttribute('data-src');
    }
  })
}, config);

export default {
  mounted(el) {
    obs.observe(el);
  },
  unmounted(el) {
    obs.unobserve(el);
  }
}
