function getScrollInfo(e) {
  const doc = document;
  const htmlScrollTop = doc.documentElement.scrollTop;
  const scrollTop =
    htmlScrollTop === 0 ?
    e.scrollTop :
    doc.documentElement.scrollTop;

  const scrollHeight =
    htmlScrollTop === 0 ?
    e.scrollHeight :
    doc.documentElement.scrollHeight;

  const innerHeight = e.clientHeight;

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

export default function (element, callback, marginBottom = 200, triggerInterval = 200) {
  const eventCb = debounce(() => {
    const {
      scrollTop,
      scrollHeight,
      innerHeight
    } = getScrollInfo(element);

    if (scrollTop + innerHeight >= scrollHeight - marginBottom) {
      callback()
    }
  }, triggerInterval)

  element.addEventListener("scroll", eventCb)
}
