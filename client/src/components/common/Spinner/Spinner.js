import React from 'react';
import { Spin } from 'antd';

export default function Spinner() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
}
