import '@/plugins/polyfills';
import 'ant-design-vue/dist/antd.less';
import { createApp, App as AppType } from "vue";
import App from './App';
import { setupAntd, setupVxe } from './plugins';
import router, { setupRouter } from './router';
import { getApp, setApp } from './useApp';
// import 'css-doodle';
import './style.less';
// Tailwind
import "@/assets/css/styles.css";

let app: AppType = getApp();

async function bootstrap() {
    if (!app) {
        app = createApp(App);
        app.config.globalProperties.bpmnModeler = {} // bpmn 使用
        app.config.globalProperties.bpmnInstances = {}
        // app
        setApp(app);

        // ui
        setupAntd(app);

        // router
        setupRouter(app);

        setupVxe(app);

        // mount
        await router.isReady().then(() => {

            return new Promise(resolve => resolve(true));
        });
        app.mount('#app', true);
    } else {

        console.log('app is runing...')
    }
}


void bootstrap();
