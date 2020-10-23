import React, {Component} from 'react'
import connector from "../../../utils/connect"

import './index.less'

class Message extends Component {
    render() {
        return (
            <div className={'messages'}>
                <div>
                    <span>优惠精选</span>
                    <span>05-16 18:12</span>
                </div>
                <li>
                    <span>您的美食红包已经到账！还有更多专属限量红包，快来领取！海量优惠活动期待您的到来~</span>
                    <span></span>
                </li>
            </div>
        );
    }

    componentDidMount() {
        // 需要给全局更新当前理由
        this.props.getUrl(window.location.pathname)
    }
}

export default connector(Message);
