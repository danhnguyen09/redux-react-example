import React, {Component} from 'react';
import Login from './Login';
import Demo from './demo/index';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Demo {...this.props}/>)
    }
}

export default Home;