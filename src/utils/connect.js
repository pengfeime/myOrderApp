// 项目中，一个模块下面可能又有很多组件，在每个组件中都要引入相同的actions和reducer过于冗杂，因此封装connector方法
import { connect } from "react-redux"
import actions from "../store/actions"

const mapStateToProps = (state) => {
    // 用alldatas接收reducer方法里返回出来的数据，并挂载到组件的props属性上
    return {alldatas:state}
}

const mapDispatchToProps = actions
export default connect(
    mapStateToProps,
    mapDispatchToProps
)
