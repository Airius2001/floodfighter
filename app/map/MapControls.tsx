'use client';

import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FiFilter } from 'react-icons/fi';
import { Popover, Switch, Button, Typography, Spin } from 'antd';

const { Text } = Typography;

interface MapControlsProps {
  showCatchments: boolean;
  setShowCatchments: (value: boolean) => void;
  showWaterPoints: boolean;
  setShowWaterPoints: (value: boolean) => void;
}

export default function MapControls({
  showCatchments,
  setShowCatchments,
  showWaterPoints,
  setShowWaterPoints,
}: MapControlsProps) {
  const [open, setOpen] = useState(false);
  const [loadingCatchments, setLoadingCatchments] = useState(false);
  const [loadingWaterPoints, setLoadingWaterPoints] = useState(false);

  const handleCatchmentsChange = async (value: boolean) => {
    setLoadingCatchments(true);
    try {
      await new Promise((res) => setTimeout(res, 300)); // simulate async operation
      setShowCatchments(value);
    } finally {
      setLoadingCatchments(false);
    }
  };

  const handleWaterPointsChange = async (value: boolean) => {
    setLoadingWaterPoints(true);
    try {
      await new Promise((res) => setTimeout(res, 300)); // simulate async operation
      setShowWaterPoints(value);
    } finally {
      setLoadingWaterPoints(false);
    }
  };

  const content = (
    <div style={{ display: 'grid', gap: 12, minWidth: 240 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text strong>Flood Warning Catchments</Text>
        {loadingCatchments ? (
          <Spin size="small" />
        ) : (
          <Switch
            checked={showCatchments}
            onChange={handleCatchmentsChange}
            checkedChildren="On"
            unCheckedChildren="Off"
            style={{ backgroundColor: showCatchments ? '#000' : '#777' }}
          />
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <Text strong>Water Storage Points</Text>
        {loadingWaterPoints ? (
          <Spin size="small" />
        ) : (
          <Switch
            checked={showWaterPoints}
            onChange={handleWaterPointsChange}
            checkedChildren="On"
            unCheckedChildren="Off"
            style={{ backgroundColor: showWaterPoints ? '#000' : '#777' }}
          />
        )}
      </div>
    </div>
  );

  return (
    <div style={{ position: 'absolute', bottom: 40, right: 0, zIndex: 1000 }}>
      <Popover
        content={content}
        title={<Text strong>Map Layers</Text>}
        trigger="click"
        open={open}
        onOpenChange={setOpen}
      >
        <Button
          type="default"
          shape="circle"
          icon={open ? <CgClose color='#fff'/> : <FiFilter color='#fff'/>}
          style={{
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            background: '#000',
            padding:'18px',
            border: '1px solid #000',
          }}
        />
      </Popover>
    </div>
  );
}
