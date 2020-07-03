import React from 'react';
import GraphVis from 'react-graph-vis';

const options = {
  // layout: {
  //   hierarchical: true,
  // },
  height: '700px',
  nodes: {
    shape: 'box',
  },
};

const Graph = ({ graph }) => graph && (
  <GraphVis
    graph={{
      nodes: graph.nodes.map(({ significance, ...node }) => ({
        ...node,
        value: significance,
      })),
      edges: graph.edges.map(({ significance, correlation, ...edge }) => ({
        ...edge,
        value: significance,
      })),
    }}
    options={options}
  />
);

Graph.defaultProps = {
  graph: null,
};

export default Graph;
