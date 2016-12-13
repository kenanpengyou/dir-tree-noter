import React, {Component} from "react";
import {connect} from "react-redux";
import {detectDrop, loadingDrop, finishRead} from "../actions";
import dirReader from "../helpers/dirReader";
import treeify from "../helpers/treeify";

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.lastTrees = null;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.needRefresh && this.props.isComplete &&
             this.props.indentType !== nextProps.indentType){
            this.publishTrees(this.lastTrees, nextProps);
        }
    }

    publishTrees(trees, nextProps){
        const {indentType} = nextProps || this.props;

        if(trees instanceof Object){
            let treeString = treeify.exec(trees, indentType);
            this.props.finish(treeString);
            this.lastTrees = trees;
        }else{

            // todo: i18n
            Materialize.toast("不支持的浏览器", 4000);
            this.props.finish(">_<");
            this.lastTrees = null;
        }
    }

    execReader(dataTransfer) {
        const {maxDepth} = this.props,
        readCallback = function(files, trees){
            this.publishTrees(trees);
        };

        this.props.loading();
        dirReader.exec(dataTransfer, {
            maxDepth,
            onComplete: readCallback.bind(this)
        });
    }

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
        e.preventDefault();
        this.execReader(e.dataTransfer);
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
                            <div className={boxClass} onDragEnter={this.handleDragEnter}
                             onDragOver={this.handleDragOver}
                              onDragLeave={this.handleDragLeave}
                               onDrop={this.handleDrop}>
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
        isBoxActive: state.upload.isBoxActive,
        maxDepth: state.option.actual.depth,
        indentType: state.option.actual.indent,
        needRefresh: state.upload.needRefresh,
        isComplete: state.upload.isComplete
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dragOver: () => dispatch(detectDrop(true)),
        dragOut: () => dispatch(detectDrop(false)),
        loading: () => dispatch(loadingDrop()),
        finish: (output) => dispatch(finishRead(output))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
