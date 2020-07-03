import React, { useState } from 'react';
import { Typography, Slider, Button } from '@material-ui/core';

export default ({ onMine }) => {
  const [preserveThreshold, setPreserveThreshold] = useState(0.2);
  const [ratioThreshold, setRatioThreshold] = useState(0.05);
  const [utilityRatio, setUtilityRatio] = useState(0.5);
  const [edgeCutoff, setEdgeCutoff] = useState(0.2);
  const [nodeCutoff, setNodeCutoff] = useState(0.1);
  return (
    <div>
      <Typography gutterBottom>
        Preserve threshold
      </Typography>
      <Slider
        value={preserveThreshold}
        onChange={(e, v) => setPreserveThreshold(v)}
        valueLabelDisplay="auto"
        step={0.01}
        min={0}
        max={1}
      />

      <Typography gutterBottom>
        Ratio threshold
      </Typography>
      <Slider
        value={ratioThreshold}
        onChange={(e, v) => setRatioThreshold(v)}
        valueLabelDisplay="auto"
        step={0.01}
        min={0}
        max={1}
      />

      <Typography gutterBottom>
        Utility ratio
      </Typography>
      <Slider
        value={utilityRatio}
        onChange={(e, v) => setUtilityRatio(v)}
        valueLabelDisplay="auto"
        step={0.01}
        min={0}
        max={1}
      />

      <Typography gutterBottom>
        Edge cutoff
      </Typography>
      <Slider
        value={edgeCutoff}
        onChange={(e, v) => setEdgeCutoff(v)}
        valueLabelDisplay="auto"
        step={0.01}
        min={0}
        max={1}
      />

      <Typography gutterBottom>
        Node cutoff
      </Typography>
      <Slider
        value={nodeCutoff}
        onChange={(e, v) => setNodeCutoff(v)}
        valueLabelDisplay="auto"
        step={0.01}
        min={0}
        max={1}
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
