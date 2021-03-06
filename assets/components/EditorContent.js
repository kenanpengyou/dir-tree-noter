import React, {Component} from "react";
import {connect} from "react-redux";

class EditorContent extends Component {

    getContent() {
        return this.props.content;
    }

    render(){
        const {content} = this.props;
        return (
            <div className="editor-content brown lighten-5">
                <pre>
                    <code ref="code">
                        {content}
                    </code>
                </pre>
            </div>
        );
    }
}

function mapStateToProps(state) {
    state = state.toJS();

    return {
        content: state.editor.content
    };
}

export default connect(mapStateToProps, null, null, {
    withRef: true
})(EditorContent);
