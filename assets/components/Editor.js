import React, {Component} from "react";
import {connect} from "react-redux";
import Preloader from "./Preloader";
import EditorContent from "./EditorContent";

class Editor extends Component {

    constructor(props) {
        super(props);

        this.handleOptionsClick = this.handleOptionsClick.bind(this);
    }

    componentDidMount() {
    }

    handleOptionsClick(e) {
        this.props.handleShowOptions();
    }

    render(){
        var {isLoading, isComplete} = this.props;
        var editorMain = null;

        if(isComplete){
            editorMain = (
                <div className="editor-main">
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
        }else{
            editorMain = null;
        }

        return (
            <div className="container editor-area">
                <div className="config-container right-align">
                    <a className="waves-effect waves-light btn light-blue darken-3" onClick={this.handleOptionsClick}><i className="material-icons left">settings</i>配置</a>
                </div>
                { editorMain }
            </div>
        );
        }
    }

function mapStateToProps(state) {
    return {
        isLoading: state.upload.isLoading,
        isComplete: state.upload.isComplete
    };
}

export default connect(mapStateToProps)(Editor);
