import React, {Component} from "react";
import {connect} from "react-redux";
import {setDepth, setDepthDisplay, setIndent, setIndentDisplay,
    resetOptionDisplay, restoreDisplay} from "../actions";

class OptionsModal extends Component {
    constructor(props) {
        super(props);

        this.handleConfirmClick = this.handleConfirmClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.handleIndentChange = this.handleIndentChange.bind(this);
    }

    componentDidMount() {
        this.modalEl = $(this.refs.modal);
        this.modalEl.modal({
            complete: this.onModalClose.bind(this)
        });
    }

    showModal(){
        this.modalEl.modal("open");
    }

    onModalClose(){
        this.props.restoreDisplay();
    }

    handleResetClick(e){
        this.props.resetOptionDisplay();
    }

    handleConfirmClick(e){
        console.log("[handleConfirmClick]");
    }

    handleRangeChange(e){
        this.props.changeDepthDisplay(e.target.value);
    }

    handleIndentChange(e){
        this.props.changeIndentDisplay(e.target.value);
    }

    render(){
        const {depth, indent} = this.props;

        console.log("[OptionsModal render] indent = ", indent);

        return (
        <div ref="modal" className="modal">
            <div className="modal-content">
                <h5 className="blue-text text-darken-2">配置</h5>
                <div className="input-field">
                    <div className="field-text">缩进类型</div>
                    <div className="option-line">
                        <input className="with-gap" name="indent" type="radio" value="space" id="indent_space" checked={indent === 'space'} onChange={this.handleIndentChange} />
                        <label htmlFor="indent_space">空格</label>
                    </div>
                    <div className="option-line">
                        <input className="with-gap" name="indent" type="radio" value="tab" id="indent_tab" checked={indent === 'tab'} onChange={this.handleIndentChange} />
                        <label htmlFor="indent_tab">Tab</label>
                    </div>
                </div>
                <div className="input-field">
                    <div className="field-text">目录最大深度<strong className="depth-number red-text">{depth}</strong></div>
                    <div className="field-line">
                        <p className="range-field">
                          <input type="range" min="1" max="10" value={depth} onChange={this.handleRangeChange} />
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
        depth: state.option.display.depth,
        indent: state.option.display.indent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeDepthDisplay: (value) => dispatch(setDepthDisplay(value)),
        changeIndentDisplay: (value) => dispatch(setIndentDisplay(value)),
        changeDepth: (value) => dispatch(setDepth(value)),
        changeIndent: (value) => dispatch(setIndent(value)),
        resetOptionDisplay: () => dispatch(resetOptionDisplay()),
        restoreDisplay: () => dispatch(restoreDisplay())
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
    withRef: true
})(OptionsModal);
