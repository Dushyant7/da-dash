import React from 'react';

// import { flexCenter } from '../../Flex';

import ListItem from './ListItem';
// import LocationBar from './LocationBar';
import Toolbar from './Toolbar';
import { Link } from 'react-router';

const style = {
  main: {
    WebkitOverflowScrolling: 'touch',
  },
  list: {
  },
  listItem: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },

  avatarFile: {
    backgroundColor: '#9c27b0',
  },
};

import { Scrollbars } from 'react-custom-scrollbars';

export default class Folder extends React.Component {
  static propTypes = {
    location: React.PropTypes.object,
    search: React.PropTypes.object,
    quickSearch: React.PropTypes.object,
    pathString: React.PropTypes.array.isRequired,
    timeStamp: React.PropTypes.string,
    showAttachment: React.PropTypes.func.isRequired,
    goToPath: React.PropTypes.func.isRequired,
    dashboard: React.PropTypes.bool,
    setSearch: React.PropTypes.func,
  }

  state = {
    height: window.innerHeight,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = (e) => {
    this.setState({ height: window.innerHeight });
  }

  showAttachment = (path) => {
    let url = path.join('/');
    url = `${url}`;
    this.props.showAttachment(url);
  }

  displayStructure = (obj) => {
    if (!obj) return null;
    const params = {
      items: obj,
      goToPath: this.props.goToPath,
      showAttachment: this.showAttachment,
      pathString: this.props.pathString,
    };
    return (<ListItem {...params} />);
  }

  search = () => {
    // console.log(Array.from(this.props.location.keys()).filter(e => e.includes(this.props.search)));
  }
  render() {
    const isDashboard = this.props.dashboard ?
      (
        <div className="bootstrap-border intranet container" style={{ width: '550px' }}>
        <div style={{ fontSize: '24px',
            marginBottom: '12px',
            borderBottomStyle: 'solid',
            borderColor: '#d3d3d3',
            borderWidth: '2px',
            fontColor: '#009ACD',
            fontStyle: 'bold' }}
        >
        <Link to={'intranet'} >
          Intranet
        </Link>
      </div>
      {this.displayStructure(this.props.quickSearch)}
      {this.displayStructure(this.props.search)}
      {this.displayStructure(this.props.location)}
    </div>
      )
      :
      (
        <div>
        <Toolbar
          pathString={this.props.pathString}
          goToPath={this.props.goToPath}
          timeStamp={this.props.timeStamp}
          folders={this.props.location.count() || 0}
          setSearch={this.props.setSearch}
        />
        {this.displayStructure(this.props.quickSearch)}
        {this.displayStructure(this.props.search)}
        {this.displayStructure(this.props.location)}
      </div>
      );
    return (
        <div style={style.main} >
            <Scrollbars style={{ height: this.state.height - 50 }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={400}
            >
              <div style={{ overflowX: 'hidden' }}>
                {isDashboard}
              </div>
            </Scrollbars>
        </div>
    );
  }
}
