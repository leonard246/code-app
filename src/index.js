import React from 'react'
import ReactDOM from 'react-dom'

// Child
class CodeWindow extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            code: "",
            lang: this.props.lang,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ code: e.target.value });
        this.props.renderCode(this.state.code, this.state.lang);
    }

    render() {
        return (
        <textarea placeholder={`Enter ${this.state.lang} here`} onChange={this.handleChange} style={{width: '30%', height: '100%'}}>
        </textarea>
    )}
}

// Parent
class Result extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            result: 'Result',
            lang: "-",
        };
        this.renderResult = this.renderResult.bind(this);
    }
    
    // For passing to child
    renderResult(code, language) {
        this.setState({result: code, lang: language});
    }
    
    generateContent = () => {
        // content[0] = HTML, content[1] = CSS, content[2] = JS
        let content = Array(3).fill(""); 

        if(this.state.lang === "HTML")
            content[0] = this.state.result;
        
        if(this.state.lang === "CSS")
            content[1] = this.state.result;

        if(this.state.lang === "JS")
            content[2] = this.state.result;

        return `<!DOCTYPE html>
                <html>
                <head>
                    <style>${content[1]}</style>
                    <script>${content[2]}</script>
                </head>
                <body>
                    ${content[0]}
                </body>
                </html>`
    }

    render() {
        return (
        <div>
            <h1>Enter Code Below</h1>
            <div style={{ height: '15vw'}}>
                <CodeWindow renderCode={this.renderResult.bind(this)} lang={"HTML"}/>
                <CodeWindow renderCode={this.renderResult.bind(this)} lang={"CSS"}/>
                <CodeWindow renderCode={this.renderResult.bind(this)} lang={"JS"}/>
            </div>
            <div style={{height: '25vw'}}>
                <iframe style={{width: '90.5%', height: '100%'}} srcDoc={this.generateContent()}></iframe>
            </div>
        </div>
        )
    }
}

ReactDOM.render(<Result />,document.getElementById('root'));
