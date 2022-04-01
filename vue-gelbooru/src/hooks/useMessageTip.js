import {
  createApp
} from 'vue'
import MessageTip from '../components/MessageTip.vue'

const div = document.createElement('div');
document.body.appendChild(div);
let app = null;

export function message(message, type, duration = 3000) {
  if (app) {
    return;
  }

  app = createApp(MessageTip, {
    message,
    duration
  });

  app.mount(div);

  setTimeout(() => {
    app.unmount();
    app = null;
  }, duration + 200)
}

export default {
  install(app) {
    app.config.globalProperties.$message = message;
  },
}
