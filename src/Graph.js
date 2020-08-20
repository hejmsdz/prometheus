import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { graphlib, render as renderGraph } from 'dagre-d3';

const svgStyle = `
text {
  font-family: 'Roboto';
}

.edgePath path {
  stroke: #333;
  fill: none;
  stroke-width: 1.5px;
}

.edgeLabel text {
  font-size: 0.75rem;
}
`;

const scaleColor = (q) => {
  const r = 63;
  const g = 81;
  const b = 181;

  return `rgb(${q * r + (1 - q) * 232}, ${q * g + (1 - q) * 234}, ${q * b + (1 - q) * 246})`;
}

const transformGraph = ({ nodes, edges }) => {
  const graph = new graphlib.Graph().setGraph({});
  const maxNodeSignificance = Math.max(...nodes.map(n => n.significance));
  nodes.forEach(node => {
    const intensity = node.significance / maxNodeSignificance;
    graph.setNode(`${node.id}`, {
      label: `${node.label} [${node.significance.toFixed(2)}]`,
      rx: 5,
      ry: 5,
      style: `fill: ${scaleColor(intensity)}`,
      labelStyle: `fill: ${intensity > 0.5 ? '#fff' : '#000'}`,
    });
  });

  const maxEdgeSignificance = Math.max(...edges.map(e => e.significance));
  edges.forEach(edge => {
    graph.setEdge(`${edge.from}`, `${edge.to}`, {
      label: `${edge.significance.toFixed(2)}/${edge.correlation.toFixed(2)}`,
      style: `opacity: ${0.05 + (edge.significance / maxEdgeSignificance) * 0.95}`,
    });
  });
  return graph;
};

const initialScale = 1;

const GraphComponent = ({ graph }) => {
  const ref = useRef();

  useEffect(() => {
    if (graph) {
      const svg = d3.select(ref.current);
      svg.selectAll(':not(style)').remove();
      const inner = svg.append('g');
      const g = transformGraph(graph);

      const zoom = d3.zoom().on('zoom', () => inner.attr('transform', d3.event.transform));
      svg.call(zoom);
      
      renderGraph()(inner, g);

      svg.call(zoom.transform, d3.zoomIdentity.translate(
        (ref.current.getBoundingClientRect().width - g.graph().width * initialScale) / 2,
        20
      ).scale(initialScale));
    }
  }, [graph]);

  return (
    <svg style={{ width: '100%', height: '900px' }} ref={ref}>
      <style>{svgStyle}</style>
    </svg>
  );
};

GraphComponent.defaultProps = {
  graph: null,
};

export default React.memo(GraphComponent);
