export default {
  bpmnXml: `<?xml version="1.0" encoding="UTF-8"?>
              <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
              xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
              xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              id="Definitions_0wpmp9l" targetNamespace="" exporter="Camunda Modeler" exporterVersion="4.2.0">
                <bpmn:process id="Process_1" name="流程名称" isExecutable="true">
                  <bpmn:startEvent id="Event_05t056c" />
                </bpmn:process>
                <bpmndi:BPMNDiagram id="BPMNDiagram_1">
                  <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
                    <bpmndi:BPMNShape id="Event_05t056c_di" bpmnElement="Event_05t056c">
                      <dc:Bounds x="112" y="202" width="36" height="36" />
                      <bpmndi:BPMNLabel>
                        <dc:Bounds x="127" y="245" width="7" height="14" />
                      </bpmndi:BPMNLabel>
                    </bpmndi:BPMNShape>
                  </bpmndi:BPMNPlane>
                </bpmndi:BPMNDiagram>
              </bpmn:definitions>`
}