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

    getPlaceholder() {
        return this.props.lang === "" ?  "HTML" : this.props.lang;
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
    }
    
    // For passing onto CodeWindow
    renderResult(input,lang) {
        if(lang === "HTML")
            this.setState({HTMLCode: input});

        else if(lang === "CSS")
            this.setState({CSSCode: input});

        else if(lang === "JS")
            this.setState({JSCode: input});
    }
    
    changeFramework(e) {
        // Deactivate all frameworks
        this.setState(Object.assign(this.state.Frameworks,{Bootstrap: ""},{UiKit: ""},{Pure: ""},{Materialize: ""},{Skeleton: ""}));
        
        // Activate the relevant framework
        switch(e.target.value) {
            case "BOOTSTRAP":
                this.setState(Object.assign(this.state.Frameworks,{Bootstrap: CONSTANTS.BOOTSTRAP})); break;
            case "UIKIT":
                this.setState(Object.assign(this.state.Frameworks,{UiKit: CONSTANTS.UIKIT})); break;
            case "PURE":
                this.setState(Object.assign(this.state.Frameworks,{Pure: CONSTANTS.PURE})); break;
            case "MATERIALIZE":
                this.setState(Object.assign(this.state.Frameworks,{Materialize: CONSTANTS.MATERIALIZE})); break;
            case "SKELETON":
                this.setState(Object.assign(this.state.Frameworks,{Skeleton: CONSTANTS.SKELETON})); break;
            default:
                // do nothing
        }
    }

    generateContent() {
        return `<!DOCTYPE html>
                <html>
                <head>
                    <style>${this.state.CSSCode}</style>
                    <script>${this.state.JSCode}</script>
                    ${this.state.Frameworks.Bootstrap}
                    ${this.state.Frameworks.UiKit}
                    ${this.state.Frameworks.Pure}
                    ${this.state.Frameworks.Materialize}
                    ${this.state.Frameworks.Skeleton}
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
                <form>
                    <h3 style={{color: "blue"}}>Select a Framework:</h3> 
                    <input type={"radio"} name={"fw"} value={"BOOTSTRAP"} onChange={this.changeFramework}/>Bootstrap
                    <input type={"radio"} name={"fw"} value={"UIKIT"} onChange={this.changeFramework}/>UiKit             
                    <input type={"radio"} name={"fw"} value={"PURE"} onChange={this.changeFramework}/>Pure             
                    <input type={"radio"} name={"fw"} value={"MATERIALIZE"} onChange={this.changeFramework}/>Materialize             
                    <input type={"radio"} name={"fw"} value={"SKELETON"} onChange={this.changeFramework}/>Skeleton
                    <input type={"radio"} name={"fw"} value={"NONE"} onChange={this.changeFramework}/>None
                </form>
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
