import { connect } from 'react-redux'
import RedPillBluePill from '../components/RedPillBluePill'
import { choose } from '../actions'

export default connect(
  state => ({
    result: state.result
  }),
  dispatch => ({
    choose: pill => dispatch(choose(pill))
  })
)(RedPillBluePill)

