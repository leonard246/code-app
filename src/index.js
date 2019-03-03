import React from 'react'
import ReactDOM from 'react-dom'

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
            HTMLCode: 'HTML', 
            CSSCode: 'CSS',
            JSCode: 'JS',
        };

        this.renderResult = this.renderResult.bind(this);
    }
    
    // For passing to child
    renderResult(input,lang) {
        if(lang === "HTML")
            this.setState({HTMLCode: input});

        if(lang === "CSS")
            this.setState({CSSCode: input});

        if(lang === "JS")
            this.setState({JSCode: input});
    }
    
    generateContent = () => {
        return `<!DOCTYPE html>
                <html>
                <head>
                    <style>${this.state.CSSCode}</style>
                    <script>${this.state.JSCode}</script>
                </head>
                <body>
                    ${this.state.HTMLCode}
                </body>
                </html>`
    }

    render() {
        return (
        <div>
            <h1>Enter Code Below</h1>
            <div>
                <CodeWindow code={this.state.HTMLCode} lang={"HTML"} renderCode={this.renderResult}/>
                <CodeWindow code={this.state.CSSCode} lang={"CSS"} renderCode={this.renderResult}/>
                <CodeWindow code={this.state.JSCode} lang={"JS"} renderCode={this.renderResult}/>
                <iframe style={{width: '90vw', height: '50vh'}} srcDoc={this.generateContent()}></iframe>
            </div>
        </div>
        )
    }
}

ReactDOM.render(<Result />,document.getElementById('root'));
