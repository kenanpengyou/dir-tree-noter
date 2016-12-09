import React, {Component} from "react";
import Header from "./Header";
import Editor from "./Editor";
import OptionsModal from "./OptionsModal";

class App extends Component {

    constructor(props) {
        super(props);

        this.showOptions = this.showOptions.bind(this);
    }

    showOptions(){
        this.refs.optionsModal.getWrappedInstance().showModal();
    }

    render(){
        return (
            <div className="root-container">
                <Header />
                <Editor handleShowOptions={this.showOptions} />
                <OptionsModal ref="optionsModal"/>
            </div>
        );
    }
}

export default App;
