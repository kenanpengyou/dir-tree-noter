import React, {Component} from "react";
import {connect} from "react-redux";
import {setDepth} from "../actions";

class OptionsModal extends Component {
    constructor(props) {
        super(props);

        this.handleConfirmClick = this.handleConfirmClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    showModal(){
        $(this.refs.modal).openModal();
    }

    handleConfirmClick(e){

    }

    render(){
        return (
        <div ref="modal" className="modal">
            <div className="modal-content">
                <h5 className="blue-text text-darken-2">配置</h5>
                <div className="input-field">
                    <div className="field-text">缩进类型</div>
                    <div className="option-line">
                        <input className="with-gap" name="indent" type="radio" id="indent_space" defaultChecked />
                        <label htmlFor="indent_space">空格</label>
                    </div>
                    <div className="option-line">
                        <input className="with-gap" name="indent" type="radio" id="indent_tab" />
                        <label htmlFor="indent_tab">Tab</label>
                    </div>
                </div>
                <div className="input-field">
                    <div className="field-text">目录最大深度<strong className="depth-number">{}</strong></div>
                    <div className="field-line">
                        <p className="range-field">
                          <input type="range" min="1" max="10" defaultValue="3" />
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="javascript:" className="modal-action modal-close waves-effect waves-green btn btn-combined" onClick={this.handleConfirmClick}>确定</a>
                <a href="javascript:" className="modal-action waves-effect btn-flat btn-combined" onClick={this.handleResetClick}>重置</a>
            </div>
        </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        isBoxActive: state.upload.isBoxActive
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeDepth: () => dispatch(setDepth(ownProps))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsModal);
