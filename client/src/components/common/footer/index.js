import React from 'react';
import 'antd/dist/antd.css';
import './footer.scss';
import { Layout } from 'antd';

const Footer = ({ isLoggedout = false }) => {
  return isLoggedout ? (
    <div className="footer"></div>
  ) : (
    <Layout.Footer style={{ textAlign: 'center' }}>
     Project monitering ©2020 Johny
    </Layout.Footer>
  );
};

export default Footer;
