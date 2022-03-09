
<template>
  <div class="bpmn">
    <div class="btn">
          <a-button type="default" shape="round" :loading='loading' @click="saveProcess">保存</a-button>
    </div>
    <div class="bpmn-content">
      <div class="canvas" id="canvas" ref="canvas" style="width: 100%; height: 100%;"></div>
      <a-drawer class='gd-drawer' :width="500"  title="属性设置" :placement="placement" :visible="visible" @close="onClose" :mask="false">
        <properties-panel ref="panel" v-show='isBpmn && isProPanel' :business-object="elementBusinessObject" class="process-panel"></properties-panel>
      </a-drawer>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from './customTranslate/camundaDescriptor.json'
import sampleDiagram from './customTranslate/newDiagram'

import customTranslate from './customTranslate/customTranslate'
var customTranslateModule = {
  translate: ['value', customTranslate]
}
import PropertiesPanel from '@/components/bpmn/properties-panel.vue'

import CustomPaletteProvider from "@/components/bpmn/plugins/palette";
import CustomContentPadProvider from "@/components/bpmn/plugins/content-pad";
// style
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

let curElement = null
export default {
  name: 'bpmn',
  components: {
    PropertiesPanel
  },
  props: {
    isProPanel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      bpmnXml: '',
      isBpmn: false,
      loading: false,
      deployLoading: false,
      elementBusinessObject: null,
      visible: false,
      curElementType: ''
    }
  },
  watch: {
    'xml' (val) {
      if (val) {
        this.bpmnXml = val
        this.importXML()
      }
    },
    'curElementType' (val) {
      if (val === 'bpmn:ServiceTask') {
        this.setServiceTask()
      } else if (val === 'bpmn:IntermediateCatchEvent') {
        this.setIntermediateCatchEvent()
      } else if (val === 'bpmn:UserTask') {
        this.setAsyncBefore()
      }
    }
  },
  mounted () {
    this.bpmnXml = this.xml || sampleDiagram.bpmnXml
    this.initModeler()
  },
  methods: {
    initModeler () {
      const canvas = this.$refs.canvas
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        additionalModules: [ // 自定义且与默认扩展包一起使用的模块列表
          propertiesPanelModule,
          propertiesProviderModule,
          // 左侧操作面板
          CustomPaletteProvider,
          CustomContentPadProvider,
          // 汉化包
          customTranslateModule
        ],
        // / 需要用的扩展包
        moddleExtensions: {
          camunda: camundaModdleDescriptor // 扩展节点 定义字段
        }
      })
      this.importXML()
      this.initModels()
    },
    initModels () {
      this.bpmnInstances = Object.assign(this.bpmnInstances, {
        modeler: this.bpmnModeler,
        modeling: this.bpmnModeler.get("modeling"),
        moddle: this.bpmnModeler.get("moddle"),
        eventBus: this.bpmnModeler.get("eventBus"),
        bpmnFactory: this.bpmnModeler.get("bpmnFactory"),
        elementRegistry: this.bpmnModeler.get("elementRegistry"),
        replace: this.bpmnModeler.get("replace"),
        selection: this.bpmnModeler.get("selection")
      });
      this.getActiveElement();
    },
    getActiveElement () {
      // 初始第一个选中元素 bpmn:Process
      this.initFormOnChanged(null);

      // 监听选择事件，修改当前激活的元素以及表单  选中元素变化时，返回新选中的元素对象
      this.bpmnModeler.on("selection.changed", ({ newSelection }) => {
        this.initFormOnChanged(newSelection[0] || null);
      });
      // 元素发生改变并更改完成
      this.bpmnModeler.on("element.changed", ({ element }) => {
        // 保证 修改 "默认流转路径" 类似需要修改多个元素的事件发生的时候，更新表单的元素与原选中元素不一致。
        if (element && element.id === this.elementId) {
          this.initFormOnChanged(element);
        }
      });
    },
    // 初始化数据
    initFormOnChanged (element) {
      this.visible = !!element
      let activatedElement = element;
      if (!activatedElement) {
        activatedElement =
          this.bpmnInstances.elementRegistry.find(el => el.type === "bpmn:Process") ||
          this.bpmnInstances.elementRegistry.find(el => el.type === "bpmn:Collaboration")
      }
      if (!activatedElement) return;
      this.bpmnInstances.bpmnElement = activatedElement;
      this.elementId = activatedElement.id;
      this.curElementType = activatedElement.type;
      curElement = activatedElement;
      this.elementBusinessObject = JSON.parse(JSON.stringify(activatedElement.businessObject));
    },
    importXML () {
      this.bpmnModeler.importXML(this.bpmnXml).then(() => {
        this.isBpmn = true
      })
    },
    // 保存流程
    saveProcess () {
      this.bpmnInstances.modeler.saveXML({ format: true }).then(({ xml }) => {
        console.log(xml)
      });
    },
    onClose () {
      this.visible = false
    },
    // 初始化 服务任务
    setServiceTask () {
      if (curElement) {
        const attrObj = Object.create(null);
        attrObj['delegateExpression'] = '${approveRefuseService}'
        this.bpmnInstances.modeling.updateProperties(curElement, attrObj);
      }
    },
    // 初始化 消息事件 message
    setIntermediateCatchEvent () {
      const bpmnElement = this.bpmnInstances.elementRegistry.find(el => el.type === "bpmn:Process");
      const MessageEventDefinition = curElement.businessObject.eventDefinitions.find(el => el.$type === "bpmn:MessageEventDefinition")
      if (!MessageEventDefinition.messageRef) {
        const baseInfo = JSON.parse(JSON.stringify(bpmnElement.businessObject));
        const id = `gd${(new Date()).getTime()}`
        const newMessage = this.bpmnInstances.moddle.create("bpmn:Message", {
          id: id,
          name: baseInfo.id
        });
        const bpmnRootElements = this.bpmnInstances.modeler.getDefinitions().rootElements;
        bpmnRootElements.push(newMessage) // 添加到根节点
        this.bpmnInstances.modeling.updateModdleProperties(curElement, MessageEventDefinition, {
          messageRef: newMessage
        });
      }
    },
    // 用户任务 结束时间 初始化 异步延续 属性
    setAsyncBefore () {
      if (curElement) {
        const attrObj = Object.create(null);
        attrObj['asyncBefore'] = true
        attrObj['exclusive'] = false
        this.bpmnInstances.modeling.updateProperties(curElement, attrObj);
      }
    }
  },
  beforeUnmount () {
    this.isBpmn = false
  }
}
</script>

<style lang="less">
.bpmn {
  width: 100%;
  height: 100%;
  position: relative;
  .bpmn-content {
    position: relative;
    background-color: white;
    display: inline-flex;
    width: 100%;
    height: 100%;
    flex: 1;
    .canvas {
      flex: 1;
      height: 100%;
      position: relative;
      background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')
        repeat !important;
      div.toggle-mode {
        display: none;
      }
    }
    svg {
      width: 100%;
      height: 100%;
      min-height: 100%;
      overflow: hidden;
    }
  }
}
.djs-popup-body,
.djs-popup-header {
  text-align: left !important;
}
.djs-context-pad.open {
  text-align: left;
}
.gd-input[readonly] {
  background-color: #fff;
  &.gd-pointer {
    cursor: pointer;
  }
  &.gd-notAllowed {
    cursor: not-allowed;
  }
}
.gd-input[disabled] {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.65);
  &.gd-pointer {
    cursor: pointer;
  }
  &.gd-notAllowed {
    cursor: not-allowed;
  }
}
.btn {
  //   position: fixed;
  //   right: 520px;
  position: absolute;
  width: 100%;
  bottom: 50px;
  z-index: 9;
  height: 40px;
  line-height: 40px;
  text-align: center;
  button {
    &:first-child {
      margin-right: 10px;
    }
  }
}
.bpmn-icon-loop-marker {
  display: none !important;
}
.gd-drawer {
  .ant-drawer-body {
    padding: 12px;
  }
}
</style>
