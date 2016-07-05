import React, {Component} from "react";
import {connect} from "react-redux";
import {detectDrop, loadingDrop, completeDrop} from "../actions";

class Header extends Component {
    render() {
        const {
            isBoxActive,
            handleDragEnter, handleDragOver, handleDragLeave, handleDrop
        } = this.props;
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
                            <div className={boxClass} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
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
    const uploadState = state.upload;
    return {
        isBoxActive: uploadState.isBoxActive
    };
}

function mapDispatchToProps(dispatch) {

    return {
        handleDragEnter: (e) => {
            e.preventDefault();
            dispatch(detectDrop(true));
        },
        handleDragOver: (e) => {
            e.preventDefault();
        },
        handleDragLeave: (e) => {
            dispatch(detectDrop(false));
        },
        handleDrop: (e) => {
            
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
