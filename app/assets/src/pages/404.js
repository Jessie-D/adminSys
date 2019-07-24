import React from 'react';
let {Link} = require("dva").router;
import DocumentTitle from 'react-document-title';
import Exception from 'ant-design-pro/lib/Exception';
import {title} from './../utils/config';


export default () => (
  <DocumentTitle title={`404 - ${title}`}>
    <Exception type="404" style={{ minHeight: 500, height: '80%' }} linkElement={Link} backText="返回首页"/>
  </DocumentTitle>
);
