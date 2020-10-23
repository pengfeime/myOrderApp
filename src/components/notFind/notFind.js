// import React, {Component} from 'react';
//
// class NotFind extends Component {
//     render() {
//         return (
//             <div>
//                 404页面
//             </div>
//         );
//     }
// }

// export default NotFind;

import React, {Component} from 'react';
import { Result, Button,message } from 'antd';

class NotFind extends Component {
    backHome = () => {
        message.info('即将返回首页',1)
        setTimeout(() => {
            this.props.history.push('/')
        },1000)

    }
    render() {
        return (
            <Result
                status="404" // 结果的状态,决定图标和颜色
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={this.backHome}>Back Home</Button>}    // 操作区
            />
        );
    }
}
export default NotFind;
