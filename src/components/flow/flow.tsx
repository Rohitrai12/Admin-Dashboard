import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
  Panel,
} from "reactflow";

import "reactflow/dist/style.css";
import "./flow.css";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAdd = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      position: { x: 0, y: 0 },
      data: { label: (nodes.length + 1).toString() },
    };
    setNodes((nodes) => nodes.concat(newNode));
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Panel position="top-right">
          <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
            <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
              <ButtonComponent
                cssClass="e-small e-round"
                iconCss="e-btn-sb-icons e-add-icon"
                isPrimary
                onClick={onAdd}
              ></ButtonComponent>
            </div>
          </div>
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default Flow;