import React, {Component} from "react";

class OptionsModal extends Component {
    showModal(){
        $(this.refs.modal).openModal();
    }

    render(){
        return (
        <div ref="modal" className="modal modal-fixed-footer">
            <div className="modal-content">
                <div className="input-field col s12">
                    <select>
                    <option value="1">空格</option>
                    <option value="2">Tab</option>
                    </select>
                    <label>缩进类型</label>
                </div>
            </div>
            <div className="modal-footer">
                <a href="javascript:" className="modal-action modal-close waves-effect waves-green btn">重置</a>
                <a href="javascript:" className="modal-action modal-close waves-effect waves-green btn-float">确定</a>
            </div>
        </div>
        );
    }
}

export default OptionsModal;
