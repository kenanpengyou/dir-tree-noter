import React, {Component} from "react";
import {connect} from "react-redux";
import Preloader from "./Preloader";

class Editor extends Component {
  render(){
    const {isLoading} = this.props;
    return (
        <div className="container editor-area">
            <div className="preloader-container valign-wrapper">
              <div className="valign">
                  { isLoading ? <Preloader /> : null }
              </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        isLoading: state.upload.isLoading
    };
}

export default connect(mapStateToProps)(Editor);
