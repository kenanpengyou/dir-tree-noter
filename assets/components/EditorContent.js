import React, {Component} from "react";
import {connect} from "react-redux";

class EditorContent extends Component {
  render(){
    return (
        <div className="editor-content brown lighten-5">
            <pre>
                <code>
                    var obj = {'{'}
                        'myProp: 0'
                        {'}'}

                        'TweenLite.to(obj, 0.2, {'{'}
                        'myProp: 1,''
                        'onUpdate: function() {'{'}
                            'console.log("[update] obj.myProp = ", obj.myProp);''
                        {'}'}
                    {'}'});
                </code>
            </pre>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(EditorContent);
