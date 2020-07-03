import React, { useState } from 'react';
import { Typography, Slider, Button } from '@material-ui/core';

const ParamSlider = ({ label, value, setter, description }) => (
  <div>
    <Typography gutterBottom>
      {label}
    </Typography>
    <Slider
      value={value}
      onChange={(e, v) => setter(v)}
      valueLabelDisplay="auto"
      step={0.01}
      min={0}
      max={1}
    />
    <Typography variant="caption" paragraph>
      {description}
    </Typography>
  </div>
)

export default ({ onMine }) => {
  const [preserveThreshold, setPreserveThreshold] = useState(0.2);
  const [ratioThreshold, setRatioThreshold] = useState(0.05);
  const [utilityRatio, setUtilityRatio] = useState(0.5);
  const [edgeCutoff, setEdgeCutoff] = useState(0.2);
  const [nodeCutoff, setNodeCutoff] = useState(0.1);
  return (
    <div>
      <ParamSlider
        label="Preserve threshold"
        value={preserveThreshold}
        setter={setPreserveThreshold}
        description="If relative significances of two edges forming a length-2-loop are above this threshold, both are preserved."
      />
      <ParamSlider
        label="Ratio threshold"
        value={ratioThreshold}
        setter={setRatioThreshold}
        description="If offset (difference) between relative significance of concurrent edges is below this threshold, both are removed."
      />
      <ParamSlider
        label="Utility ratio"
        value={utilityRatio}
        setter={setUtilityRatio}
        description="Balances significance and correlation in the utility function used for edge filtering. Larger value gives more importance to significance."
      />
      <ParamSlider
        label="Edge cutoff"
        value={edgeCutoff}
        setter={setEdgeCutoff}
        description="Edges with relative utility below this threshold will be filtered out."
      />
      <ParamSlider
        label="Node cutoff"
        value={nodeCutoff}
        setter={setNodeCutoff}
        description="Nodes with significance below this threshold will be clustered or removed."
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onMine({
          preserveThreshold,
          ratioThreshold,
          utilityRatio,
          edgeCutoff,
          nodeCutoff,
        })}
      >
        Start mining
      </Button>
    </div>
  );
};
