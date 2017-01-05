import React, {Component} from "react";
import {connect} from "react-redux";
import {submitDisplay, setDepthDisplay, setIndentDisplay,
    resetOptionDisplay, restoreDisplay, refreshReader} from "../actions";
import i18n from "../i18n";

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
                <span className="option-note orange-text">← {i18n.t("redropToEnforce")}</span>
            );
        }

        return (
        <div ref="modal" className="modal">
            <div className="modal-content">
                <h5 className="blue-text text-darken-2">{i18n.t("config")}</h5>
                <div className="input-field">
                    <div className="field-text"><span className="tooltipped" data-tooltip={i18n.t("tipsForIndentType")} data-delay="50" data-position="right">{i18n.t("indentType")}</span></div>
                    <div className="option-line">
                        <input className="with-gap" name="indent" type="radio" value="space" id="indent_space" checked={indent === 'space'} onChange={this.handleIndentChange} />
                        <label htmlFor="indent_space">{i18n.t("space")}</label>
                    </div>
                    <div className="option-line">
                        <input className="with-gap" name="indent" type="radio" value="tab" id="indent_tab" checked={indent === 'tab'} onChange={this.handleIndentChange} />
                        <label htmlFor="indent_tab">{i18n.t("tab")}</label>
                    </div>
                </div>
                <div className="input-field">
                    <div className="field-text"><span className="tooltipped" data-tooltip={i18n.t("tipsForDepth")} data-delay="50" data-position="right">{i18n.t("analysisDepth")}<strong className="depth-number red-text">{depth}</strong></span>{depthNote}</div>
                    <div className="field-line">
                        <p className="range-field">
                          <input type="range" min="1" max="10" value={depth} onChange={this.handleRangeChange} />
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="javascript:" className="modal-action modal-close waves-effect waves-green btn btn-combined" onClick={this.handleConfirmClick}>{i18n.t("confirm")}</a>
                <a href="javascript:" className="modal-action waves-effect btn-flat btn-combined" onClick={this.handleResetClick}>{i18n.t("reset")}</a>
            </div>
        </div>
        );
    }
}


function mapStateToProps(state) {
    state = state.toJS();
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
