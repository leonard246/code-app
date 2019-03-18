import React from 'react'
import ReactDOM from 'react-dom'
import * as CONSTANTS from './constants'

// Child
class CodeWindow extends React.Component {
    constructor(props) { 
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.getPlaceholder = this.getPlaceholder.bind(this);
    }

    handleChange(e) {
        this.props.renderCode(e.target.value, this.props.lang);
    }

    getPlaceholder = () => {
        if(this.props.lang === "")
            return "HTML";
        else
            return this.props.lang;
    }

    render() {
        return ( 
            <textarea
                    placeholder={`Enter ${this.getPlaceholder()} code here`}
                    onChange={this.handleChange}
                    style={{width: `30vw`, height: '15vw'}} />
        );
    }
}

// Parent
class Result extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            HTMLCode: "", // Show nothing in HTML box
            CSSCode: "CSS",
            JSCode: "JS",
            Frameworks: {
                Bootstrap: "", 
                UiKit: "",
                Pure: "",
                Materialize: "",
                Skeleton: "",
            },
        };

        this.renderResult = this.renderResult.bind(this);
        this.changeFramework = this.changeFramework.bind(this);
        this.modifyramework = this.modifyFramework.bind(this);
    }
    
    // For passing onto CodeWindow
    renderResult(input,lang) {
        if(lang === "HTML")
            this.setState({HTMLCode: input});

        if(lang === "CSS")
            this.setState({CSSCode: input});

        if(lang === "JS")
            this.setState({JSCode: input});
    }
    
    changeFramework(e) {
        e.target.checked ? this.modifyFramework("ADD", e.target.value) : this.modifyFramework("REMOVE", e.target.value);
    }

    // helper for changeFramework
    modifyFramework(action, fw) {        
        if(fw === "BOOTSTRAP") {
            action === "ADD" ? this.setState(Object.assign(this.state.Frameworks,{Bootstrap: CONSTANTS.BOOTSTRAP})) : 
            this.setState(Object.assign(this.state.Frameworks,{Bootstrap: ""}));
        }

        if(fw === "UIKIT") {
            action === "ADD" ? this.setState(Object.assign(this.state.Frameworks,{UiKit: CONSTANTS.UIKIT})) : 
            this.setState(Object.assign(this.state.Frameworks,{UiKit: ""}));
        }

        if(fw === "PURE") {
            action === "ADD" ? this.setState(Object.assign(this.state.Frameworks,{Pure: CONSTANTS.PURE})) : 
            this.setState(Object.assign(this.state.Frameworks,{Pure: ""}));
        }

        if(fw === "MATERIALIZE") {
            action === "ADD" ? this.setState(Object.assign(this.state.Frameworks,{Materialize: CONSTANTS.MATERIALIZE})) : 
            this.setState(Object.assign(this.state.Frameworks,{Materialize: ""}));
        }

        if(fw === "SKELETON") {
            action === "ADD" ? this.setState(Object.assign(this.state.Frameworks,{Skeleton: CONSTANTS.SKELETON})) : 
            this.setState(Object.assign(this.state.Frameworks,{Skeleton: ""}));
        }
    }

    generateContent = () => {
        return `<!DOCTYPE html>
                <html>
                <head>
                    <style>${this.state.CSSCode}</style>
                    <script>${this.state.JSCode}</script>
                    ${this.state.Frameworks.Bootstrap}
                </head>
                <body>
                    ${this.state.HTMLCode}
                </body>
                </html>`
    }
    
    render() {
        return (
        <div style={{textAlign: 'center'}}>
            <h1>Enter Code Below</h1>
            <div>
                <input type={"checkbox"} value={"BOOTSTRAP"} onChange={this.changeFramework}/>Bootstrap
                {/* <input type={"checkbox"} value={"UIKIT"} onChange={this.changeFramework}/>UiKit             
                <input type={"checkbox"} value={"PURE"} onChange={this.changeFramework}/>Pure             
                <input type={"checkbox"} value={"MATERIALIZE"} onChange={this.changeFramework}/>Materialize             
                <input type={"checkbox"} value={"SKELETON"} onChange={this.changeFramework}/>Skeleton              */}

            </div>
                <br />
            <div>
                <CodeWindow lang={"HTML"} renderCode={this.renderResult}/>
                <CodeWindow lang={"CSS"} renderCode={this.renderResult}/>
                <CodeWindow lang={"JS"} renderCode={this.renderResult}/>
                <iframe title='ResultWindow' style={{width: '91vw', height: '100vh'}} srcDoc={this.generateContent()}></iframe>
            </div>
        </div>
        )
    }
}

ReactDOM.render(<Result />,document.getElementById('root'));
