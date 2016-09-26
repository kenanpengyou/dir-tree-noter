import React, {Component} from "react";

class OptionsModal extends Component {
    showModal(){
        $(this.refs.modal).openModal();
    }

    render(){
        return (
        <div ref="modal" className="modal modal-fixed-footer">
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
                    <div className="field-text">目录最大深度</div>
                    <div className="field-line">

                        <p className="range-field">
                          <input type="range" min="1" max="10" defaultValue="3" />
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="javascript:" className="modal-action modal-close waves-effect waves-green btn btn-combined">确定</a>
                <a href="javascript:" className="modal-action waves-effect waves-green btn-flat btn-combined">重置</a>
            </div>
        </div>
        );
    }
}

export default OptionsModal;
