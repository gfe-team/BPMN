import { defineComponent, onMounted, watch, ref } from "vue";

// 引入流程图
import BpmnModeler from "bpmn-js/lib/Modeler";
import BpmnViewer from "bpmn-js/lib/Viewer";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
// // 引入节点属性面板
// import propertiesPanelModule from "bpmn-js-properties-panel";
// import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda"

// // 左侧操作面板
// import CustomPaletteProvider from "@/components/bpmn/plugins/palette";
// import CustomContentPadProvider from "@/components/bpmn/plugins/content-pad";

// // 需要用到的自定义字段
// import camundaModdleDescriptor from './customTranslate/camundaDescriptor.json';


// 汉化包
import customTranslate from './customTranslate/customTranslate'
const customTranslateModule = {
    translate: ['value', customTranslate]
}

import Style from "./style.module.less";

export default defineComponent({
    name: "bpmn",
    props: {
        bpmnCon: {
            required: true,
            default: "",
            type: String
        }
    },
    setup(prop) {
        const spinning = ref(true);
        const timer = ref(null);
        let bpmnModeler;
        watch(() => prop.bpmnCon, () => {
            if (timer.value) window.clearTimeout(timer.value);
            spinning.value = true;
            if (bpmnModeler) bpmnModeler.destroy();
            initModeler()
        })
        const bm = ref();
        const initModeler = () => {
            // 建模，官方文档这里讲的很详细

            bpmnModeler = new BpmnViewer({
                container: "#workFlowCanvas",
                // keyboard: {
                //     bindTo: window
                // },
                // 添加控制板
                // propertiesPanel: {
                //     parent: "#js-properties-panel",
                // },
                additionalModules: [ // 自定义且与默认扩展包一起使用的模块列表
                    // propertiesPanelModule,
                    // propertiesProviderModule,
                    // // 左侧操作面板
                    // CustomPaletteProvider,
                    // CustomContentPadProvider,
                    // 汉化包
                    customTranslateModule
                ],
                // // / 需要用的扩展包
                // moddleExtensions: {
                //     camunda: camundaModdleDescriptor // 扩展节点 定义字段
                // }
            });
            // bpmnModeler
            // const canvas = bpmnModeler.get('canvas')
            // const overlays = bpmnModeler.get('overlays');

            bpmnModeler.importXML(prop.bpmnCon).then(res => {
                timer.value = setTimeout(() => {
                    spinning.value = false;
                }, 500)
                // (window as any).bpmnInstances = {
                //     modeler: bpmnModeler, // bpmnModeler,
                //     // modeling: bpmnModeler.get("modeling"),
                //     moddle: bpmnModeler.get("moddle"),
                //     eventBus: bpmnModeler.get("eventBus"),
                //     bpmnFactory: bpmnModeler.get("bpmnFactory"),
                //     elementRegistry: bpmnModeler.get("elementRegistry"),
                //     replace: bpmnModeler.get("replace"),
                //     selection: bpmnModeler.get("selection")
                // };
            })
        }
        onMounted(() => {
            initModeler();
        })


        return {
            bpmnCons: prop.bpmnCon,
            spinning
        }
    },
    render() {
        return (
            this.bpmnCons && (<div class='bmpn-content'>
                <a-spin class={Style.spin} spinning={this.spinning}>
                    {/* <a-alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                    ></a-alert> */}
                </a-spin>
                <div class={Style['work-flow-canvas']} id="workFlowCanvas"></div>
                {/* <div id="overlay"></div> */}
                <div class="properties-panel-parent" id="js-properties-panel"></div>
            </div>)

        )
    }
})
