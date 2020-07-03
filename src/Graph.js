import React from 'react';
import GraphVis from 'react-graph-vis';

const options = {
  height: '700px',
  nodes: {
    shape: 'box',
    margin: 10,
    borderWidth: 0,
    color: {
      background: '#3f51b5',
    },
    font: {
      color: '#fff',
      size: 16,
      face: 'Roboto',
    },
  },
  edges: {
    width: 2,
  }
};

const scaleColor = (q) => {
  const r = 63;
  const g = 81;
  const b = 181;

  return `rgb(${q * r + (1 - q) * 232}, ${q * g + (1 - q) * 234}, ${q * b + (1 - q) * 246})`;
}

const transformGraph = (graph) => {
  const maxNodeSignificance = Math.max(...graph.nodes.map(e => e.significance));
  const nodes = graph.nodes.map(({ significance, ...node }) => {
    const intensity = significance / maxNodeSignificance;
    return {
      ...node,
      color: {
        background: scaleColor(intensity),
      },
      font: {
        color: intensity > 0.5 ? '#fff' : '#000',
      }
    };
  });

  const maxEdgeSignificance = Math.max(...graph.edges.map(e => e.significance));
  const edges = graph.edges.map(({ significance, correlation, ...edge }) => ({
    ...edge,
    color: { opacity: 0.02 + (significance / maxEdgeSignificance) * 0.98 },
    label: `${significance.toFixed(2)}`,
  }));

  return { nodes, edges };
};

const Graph = ({ graph }) => graph && (
  <GraphVis
    graph={transformGraph(graph)}
    options={options}
  />
);

Graph.defaultProps = {
  graph: null,
};

export default React.memo(Graph);
