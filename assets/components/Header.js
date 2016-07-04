import React, {Component} from "react";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBoxActive: false
        };
    }

    handleDrop() {

    }

    handleDragEnter(e) {
        e.preventDefault();
        this.setState({
            isBoxActive: true
        });
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragLeave(e) {
        this.setState({
            isBoxActive: false
        });
    }

    render() {
        const {title} = this.props;
        let boxClass = "drop-box valign-wrapper";
        if(this.state.isBoxActive){
            boxClass += " active";
        }
        return (
            <div className="upload-area brown darken-4">
                <div className="container">
                    <h2 className="center-align grey-text text-lighten-2">dir tree noter</h2>
                    <div className="row drop-container">
                        <div className="col s12 m6 l4 offset-m3 offset-l4">
                            <div className={boxClass} onDragEnter={this.handleDragEnter.bind(this)} onDragOver={this.handleDragOver.bind(this)} onDragLeave={this.handleDragLeave.bind(this)} onDrop={this.handleDrop.bind(this)}>
                                <div className="drop-label valign brown-text text-lighten-2">drop your dir here</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
