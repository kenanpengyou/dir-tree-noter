import React, {Component} from "react";
import {connect} from "react-redux";
import {submitDisplay, setDepthDisplay, setIndentDisplay,
    resetOptionDisplay, restoreDisplay, refreshReader} from "../actions";

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
        this.props.submitDisplay();
        this.props.refreshReader();
    }

    handleRangeChange(e){
        this.props.changeDepthDisplay(+e.target.value);
    }

    handleIndentChange(e){
        this.props.changeIndentDisplay(e.target.value);
    }

    render(){
        const {depth, indent, actualDepth, isComplete} = this.props;
        var depthNote = null;

        if(isComplete && actualDepth !== depth){
            depthNote = (
                <span className="option-note orange-text">← 此项变更需要重新丢入目录以生效</span>
            );
        }

        return (
        <div ref="modal" className="modal">
            <div className="modal-content">
                <h5 className="blue-text text-darken-2">配置</h5>
                <div className="input-field">
                    <div className="field-text"><span className="tooltipped" data-tooltip="目录树代码使用的缩进类型" data-delay="50" data-position="right">缩进类型</span></div>
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
                    <div className="field-text"><span className="tooltipped" data-tooltip="决定读取目录时最多到第几层子目录" data-delay="50" data-position="right">目录读取深度<strong className="depth-number red-text">{depth}</strong></span>{depthNote}</div>
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
        indent: state.option.display.indent,
        actualDepth: state.option.actual.depth,
        isComplete: state.upload.isComplete
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeDepthDisplay: (value) => dispatch(setDepthDisplay(value)),
        changeIndentDisplay: (value) => dispatch(setIndentDisplay(value)),
        submitDisplay: (value) => dispatch(submitDisplay(value)),
        resetOptionDisplay: () => dispatch(resetOptionDisplay()),
        restoreDisplay: () => dispatch(restoreDisplay()),
        refreshReader: () => dispatch(refreshReader())
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
    withRef: true
})(OptionsModal);
