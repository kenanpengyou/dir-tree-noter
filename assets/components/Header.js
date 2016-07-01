import React, {Component} from "react";

class Header extends Component {

    render() {
        const {title} = this.props;
        return (
            <div className="upload-area brown darken-4">
                <div className="container">
                    <h2 className="center-align grey-text text-lighten-2">dir tree noter</h2>
                    <div className="form-container">
                    <form action="#">
                       <div className="file-field input-field">
                         <div className="waves-effect waves-light btn-large">
                           <span><i className="material-icons left">input</i>选择一个目录</span>
                           <input type="file" />
                         </div>
                         <div className="file-path-wrapper">
                           <input className="file-path validate" type="text" />
                         </div>
                       </div>
                     </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
