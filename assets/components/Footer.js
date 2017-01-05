import React, {Component} from "react";
import resBundle from "i18next-resource-store-loader!../i18n/locales";
import i18n from "../i18n";
import langMap from "../presets/lang";

class Footer extends Component {
    render(){
        const existLangs = Object.keys(resBundle);
        const dropdownItems = existLangs.map((key) =>
            <li key={key}><a href={"?lng=" + key}>{langMap[key]}</a></li>
        );
        const currentLangName = langMap[i18n.language];

        return (
            <div className="container">
                <div className="extra right">
                    <a className="i18n-button dropdown-button" href="#0" data-activates="i18n-dropdown">{currentLangName}</a>
                    <a className="github-link" href="https://github.com/kenanpengyou/dir-tree-noter"></a>
                    <ul id="i18n-dropdown" className="dropdown-content">
                        {dropdownItems}
                    </ul>
                </div>
                <div className="copyright">
                    &copy; 2016 <a href="http://acgtofe.com">Tea Works</a>.
                </div>
            </div>
        );
    }
}

export default Footer;
