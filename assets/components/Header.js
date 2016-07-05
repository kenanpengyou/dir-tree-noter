import React, {Component} from "react";
import {connect} from "react-redux";
import {detectDrop, loadingDrop, completeDrop} from "../actions";

class Header extends Component {

    handleDragEnter(e) {
        e.preventDefault();
        this.props.dragOver();
    }
    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragLeave(e) {
        this.props.dragOut();
    }

    handleDrop(e) {
        this.props.loading();
    }

    render() {
        const {isBoxActive} = this.props;
        let boxClass = "drop-box valign-wrapper";
        if(isBoxActive){
            boxClass += " active";
        }
        return (
            <div className="upload-area brown darken-4">
                <div className="container">
                    <h2 className="center-align grey-text text-lighten-2">dir tree noter</h2>
                    <div className="row drop-container">
                        <div className="col s12 m6 l4 offset-m3 offset-l4">
                            <div className={boxClass} onDragEnter={this.handleDragEnter.bind(this)}
                             onDragOver={this.handleDragOver.bind(this)}
                              onDragLeave={this.handleDragLeave.bind(this)}
                               onDrop={this.handleDrop.bind(this)}>
                                <div className="drop-label valign brown-text text-lighten-2">drop your dir here</div>
                            </div>
                        </div>
                    </div>
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

function mapDispatchToProps(dispatch) {
    return {
        dragOver: () => dispatch(detectDrop(true)),
        dragOut: () => dispatch(detectDrop(false)),
        loading: () => dispatch(loadingDrop())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
