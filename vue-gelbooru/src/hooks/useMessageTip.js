import {
  createApp
} from 'vue'
import MessageTip from '../components/MessageTip.vue'

export default function (message, type, duration = 3000) {
  const app = createApp(MessageTip, {
    message
  });
  const div = document.createElement('div');
  document.body.appendChild(div);

  app.mount(div);


}
