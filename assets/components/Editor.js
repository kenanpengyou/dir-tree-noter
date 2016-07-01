import React, {Component} from "react";
import Preloader from "./Preloader";

class Editor extends Component {
  render(){
    return (
        <div className="container editor-area">
            <div className="preloader-container valign-wrapper">
              <div className="valign">
                  <Preloader />
              </div>
            </div>
        </div>
    );
  }
}

export default Editor;
