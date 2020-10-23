import React, {Component} from 'react';
import connector from '../../../utils/connect'
class Retrieve extends Component {
    render() {
        return (
            <div>
               找回密码
            </div>
        );
    }

    componentDidMount(){
        // 使用redux全局更新当前url
        this.props.getUrl(window.location.pathname)
    }
}

export default connector(Retrieve);
