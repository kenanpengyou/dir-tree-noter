import React, {Component} from "react";
import {connect} from "react-redux";
import Preloader from "./Preloader";
import EditorContent from "./EditorContent";

class Editor extends Component {

  componentDidMount() {
  }

  render(){
    const {isLoading} = this.props;
    return (
        <div className="container editor-area">
            <div className="config-container right-align">
                <a className="waves-effect waves-light btn light-blue darken-3" href="#modal1"><i className="material-icons left">settings</i>配置</a>
            </div>
            <div className="content-container">
                <EditorContent />
            </div>
            <div className="download-container center-align">
                <a className="waves-effect waves-light btn-large pink darken-3 z-depth-2"><i className="material-icons left">done</i>下载</a>
            </div>
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
