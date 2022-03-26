const config = {
  rootMargin: '0px 0px 300px 0px',
  thresholds: 0,
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
