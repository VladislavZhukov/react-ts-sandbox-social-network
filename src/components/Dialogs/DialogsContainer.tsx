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
import { ComponentType } from "react"

const mapStateToProps = (state: AppStateT): MapStateToPropsT => {
  return {
    dialogsData: state.dialogPage.dialogsData,
    messagesData: state.dialogPage.messagesData,
    newMessageText: state.dialogPage.newMessageText,
  }
}

const mapDispatchToProps: MapDispatchPropsT = {
  addMessage: actions.addMessage
}

export default compose<ComponentType>(
  connect<MapStateToPropsT, MapDispatchPropsT, {}, AppStateT>(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)

type MapStateToPropsT = {
  dialogsData: DialogsDataT
  messagesData: MessageDataT
  newMessageText: string
}
type MapDispatchPropsT = {
  addMessage: (newMessageText: string) => void
}
