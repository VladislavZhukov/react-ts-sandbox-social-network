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
import { addMessage, DialogsDataT, MessageDataT } from "../../redux/dialogs-reducer"


type MapStateToPropsT = {
  dialogsData: DialogsDataT
  messagesData: MessageDataT
  newMessageText: string
}
type MapDispatchPropsT = {
  addMessage: (newMessageText: string) => void
}

const mapStateToProps = (state: AppStateT): MapStateToPropsT => {
  return {
    dialogsData: state.dialogPage.dialogsData,
    messagesData: state.dialogPage.messagesData,
    newMessageText: state.dialogPage.newMessageText,
  }
}

const mapDispatchToProps: MapDispatchPropsT = {
  addMessage
}

export default compose(
  connect<MapStateToPropsT, MapDispatchPropsT, {}, AppStateT>(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)
