import React, {Component} from "react";
import {connect} from "react-redux";

class EditorContent extends Component {
    render(){
        const {content} = this.props;
        return (
            <div className="editor-content brown lighten-5">
                <pre>
                    <code>
                        {content}
                    </code>
                </pre>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        content: state.editor.content
    };
}

export default connect(mapStateToProps)(EditorContent);
