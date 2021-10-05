//CORE
import { compose } from "redux"
import { connect } from "react-redux"
//TYPES
import { AppStateT } from "../../redux/store-redux"
//COMPONENTS
import Dialogs from "./Dialogs"
//HOC
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
//REDUCER
import { actions } from "../../redux/dialogs-reducer"
import { DialogsDataT, MessageDataT } from "../../types/types"


type MapStateToPropsT = {
  dialogsData: DialogsDataT
  messagesData: MessageDataT
  newMessageText: string
}
type MapDispatchPropsT = {
  actions: {
    addMessage: (newMessageText: string) => void
  }
}


const mapStateToProps = (state: AppStateT): MapStateToPropsT => {
  return {
    dialogsData: state.dialogPage.dialogsData,
    messagesData: state.dialogPage.messagesData,
    newMessageText: state.dialogPage.newMessageText,
  }
}

const mapDispatchToProps: MapDispatchPropsT = {
  actions
}

export default compose(
  connect<MapStateToPropsT, MapDispatchPropsT, {}, AppStateT>(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)
