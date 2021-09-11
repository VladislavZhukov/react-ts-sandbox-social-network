import React, { ChangeEvent } from "react";

type PropsT = {
  editMode: boolean
  status: string
  updateStatus: (newStatus: string) => void
}

type StateT = {
  editMode: boolean
  status: string
}

class ProfileStatus extends React.Component<PropsT, StateT> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode() {
    this.setState({
      editMode: true,
    });
    //this.state.editMode = true;
    //this.forceUpdate(); use as a last resort =)
  }

  deactivateEditMode = () => {
    this.setState(() => {
      return { editMode: false };
    });
    this.props.updateStatus(this.state.status);
  };

  componentDidUpdate(previousProps: PropsT, previousState: StateT) {
    if (previousProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode.bind(this)}>
              {this.props.status || "------"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
