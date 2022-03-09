import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent } from 'vue';
import PropertiesPanel from '@/components/bpmn/modeler.vue'
export default defineComponent({
  name: 'App',
  components: {
    PropertiesPanel
  },
  setup() {
    return () => (
      <>
        <a-config-provider locale={zhCN}>
          <div style='height:100vh;'>
            <properties-panel ref='proPanel'></properties-panel>
          </div>
        </a-config-provider>
      </>
    );
  }
});
