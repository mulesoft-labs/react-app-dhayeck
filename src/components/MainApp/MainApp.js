import React from 'react';

import ApplicationsTable from '../ApplicationsTable';
import MuleSoftHero from '../MuleSoftHero';

import styles from './styles.scss';

class MainApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { applications: [] };
  }

  componentDidMount() {
    const { userToken } = this.props;

    if (!userToken) {
      return;
    }

    const runtimeManagerAppsUrl = '/armui/api/v1/applications';
    const options = {
      method: 'GET',
      headers: new Headers({
        Authorization: userToken,
        'X-ANYPNT-ORG-ID': 'f0c9b011-980e-4928-9430-e60e3a97c043',
        'X-ANYPNT-ENV-ID': 'efca0bb9-44d2-44d0-9104-dc87be00726b',
      }),
    };

    console.log(runtimeManagerAppsUrl);
    fetch(runtimeManagerAppsUrl, options)
      .then(result => result.json())
      .then(result => {
        console.log(result);
        return this.setState({ applications: result.data });
      })
      .catch(console.error)
    ;
  }

  render() {
    const { applications } = this.state;
    return (
      <div className={styles.mainApp}>
        <MuleSoftHero
          message="Welcome to MuleSoft"
        />
        <div className={styles.content}>
          <ApplicationsTable
            applications={applications}
          />
        </div>
      </div>
    );
  }
}

export default MainApp;
