'use client';

import { Button, Popover } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaLocationDot } from 'react-icons/fa6';
import { FiHome, FiMenu } from 'react-icons/fi';
import { GiStrong } from 'react-icons/gi';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { RiShieldCrossLine } from 'react-icons/ri';

export default function MapMenu() {
  const [open, setOpen] = useState(false);

  const content = (
   <div style={panelStyle}>
    <Link href="/" onClick={() => setOpen(false)} style={itemStyle}>
      <FiHome style={{ marginRight: 8 }} /> Home
    </Link>
    <Link href="/check-postcode" onClick={() => setOpen(false)} style={itemStyle}>
      <FaLocationDot  style={{ marginRight: 8 }} /> Check PostCode
    </Link>
    <Link href="/before" onClick={() => setOpen(false)} style={itemStyle}>
      <MdOutlineTipsAndUpdates style={{ marginRight: 8 }} /> Be prepared before flood
    </Link>
    <Link href="/during" onClick={() => setOpen(false)} style={itemStyle}>
      <RiShieldCrossLine style={{ marginRight: 8 }} /> Stay safe during flood
    </Link>
    <Link href="/after" onClick={() => setOpen(false)} style={itemStyle}>
      <GiStrong style={{ marginRight: 8 }} /> Recover stronger after flood
    </Link>
  </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      <Popover
        content={content}
        title={<p style={{ color: '#000', margin: 0 }}>Quick Menu</p>}
        trigger="click"
        open={open}
        onOpenChange={setOpen}
        overlayInnerStyle={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 12,
        }}
      >
        <Button
          type="default"
          shape="circle"
          icon={open ? <CgClose /> : <FiMenu />}
          style={btnStyle}
        />
      </Popover>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: '#111', // dark button
  border: '1px solid #333',
  borderRadius: '50%',
  padding: '18px',
  cursor: 'pointer',
  fontWeight: 700,
  color: '#fff', // white icon
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
};

const panelStyle: React.CSSProperties = {
  marginTop: 8,
  background: '#fff', // white bg
  border: '1px solid #ddd',
  borderRadius: 12,
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  padding: '12px 14px',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  color: '#000',
  width: '100%',
  boxSizing: 'border-box',
};

const itemStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#000', // black text
  fontWeight: 600,
  fontSize: 14,
  padding: '8px 10px',
  borderRadius: 6,
  transition: 'background 0.2s ease',
} as React.CSSProperties;
