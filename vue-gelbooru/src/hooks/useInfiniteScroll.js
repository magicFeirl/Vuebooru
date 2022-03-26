function getScrollInfo() {
  const doc = document;

  const scrollTop =
    doc.documentElement.scrollTop === 0 ?
    doc.body.scrollTop :
    doc.documentElement.scrollTop;

  const scrollHeight =
    doc.documentElement.scrollTop === 0 ?
    doc.body.scrollHeight :
    doc.documentElement.scrollHeight;

  const innerHeight = window.innerHeight;

  return {
    scrollTop,
    scrollHeight,
    innerHeight
  }
}

function debounce(callback, interval) {
  let timer = null;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback();
    }, interval);
  }
}

export default function (callback, marginBottom = 200, triggerInterval = 200) {
  const eventCb = debounce(() => {
    const {
      scrollTop,
      scrollHeight,
      innerHeight
    } = getScrollInfo()

    if (scrollTop + innerHeight >= scrollHeight - marginBottom) {
      callback()
    }
  }, triggerInterval)

  document.addEventListener("scroll", eventCb)
}
