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
            },
        };

        this.renderResult = this.renderResult.bind(this);
        this.changeFramework = this.changeFramework.bind(this);
        this.addFramework = this.addFramework.bind(this);
        this.removeFramework = this.removeFramework.bind(this);
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
        e.target.checked ? this.addFramework(e.target.value) : this.removeFramework(e.target.value);
    }

    // helper for changeFramework
    addFramework(fw) {
        if(fw === "BOOTSTRAP") {
            this.setState(Object.assign(this.state.Frameworks,{Bootstrap: CONSTANTS.BOOTSTRAP}));
        }
    }
    
    // helper for changeFramework
    removeFramework(fw) {
        if(fw === "BOOTSTRAP") {
            this.setState(Object.assign(this.state.Frameworks,{Bootstrap: ""}));
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
