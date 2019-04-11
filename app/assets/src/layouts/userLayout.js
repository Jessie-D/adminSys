import React, { Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import styles from './userLayout.less';
import { title, company, version, logo, siderMenuTitle } from './../utils/config';


const copyright = <Fragment>Copyright <Icon type="copyright" /> {version} {company}</Fragment>;

class UserLayout extends React.PureComponent {
  getPageTitle () {
    // const { location } = this.props;
    // const { pathname } = location;
    return title;
  }
  render () {
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>{siderMenuTitle}</span>
                </Link>
              </div>
              <div className={styles.desc}>{title}</div>
            </div>
            {this.props.children}
          </div>
          <GlobalFooter   copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

// export default UserLayout;
export default connect((obj) => {
  // console.log(obj);

  return ({
    location: obj.routing.location,
  })
})(UserLayout);
