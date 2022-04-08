import {
  useThrottleFn,
  useEventListener
} from '@vueuse/core'

function isScroll(el) {
  let overflow = el.style['overflow'];

  if (!overflow) {
    overflow = document.defaultView.getComputedStyle(el)['overflow'];
  }

  return ['auto', 'scroll', 'overlay'].some((v) => v === overflow)
}

function getScrollContainer(el) {
  let parent = el;

  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }

    if (isScroll(parent)) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return parent;
}

function isInContainer(el, container, marginTop = 0) {
  let rect;
  const {
    top,
    left,
    right,
    bottom
  } = el.getBoundingClientRect();
  if (container instanceof Element) {
    rect = container.getBoundingClientRect();
  } else {
    rect = {
      top: 0,
      left: 0,
      bottom: window.innerHeight,
      right: window.innerWidth
    }
  }

  return (
    top - marginTop < rect.bottom &&
    bottom > rect.top &&
    left < rect.right &&
    right > rect.left
  )
}

export default {
  mounted(el, bindings) {
    const {
      top,
      src
    } = bindings.value;

    const container = getScrollContainer(el);

    const loadImageHandler = () => {
      if (isInContainer(el, container, parseInt(top) || 0)) {
        el.setAttribute('src', src);
        stopListener()
      }
    }

    const stopListener = useEventListener(container, 'scroll', useThrottleFn(loadImageHandler))

    setTimeout(loadImageHandler, 50);
  },
}
