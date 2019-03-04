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
            HTMLCode: '', 
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
        <div style={{textAlign: 'center'}}>
            <h1>Enter Code Below</h1>
            <div>
                <FrameworkSelector />
            </div>
                <br />
            <div>
                <CodeWindow code={this.state.HTMLCode} lang={"HTML"} renderCode={this.renderResult}/>
                <CodeWindow code={this.state.CSSCode} lang={"CSS"} renderCode={this.renderResult}/>
                <CodeWindow code={this.state.JSCode} lang={"JS"} renderCode={this.renderResult}/>
                <iframe style={{width: '91vw', height: '100vh'}} srcDoc={this.generateContent()}></iframe>
            </div>
        </div>
        )
    }
}

class FrameworkSelector extends React.Component {
    // checkbox of selections

// Bootstrap 4.3.1
// <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
// <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
// <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>

// UI Kit - 3.0.3
//     <!-- UIkit CSS -->
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/css/uikit.min.css" />
// <!-- UIkit JS -->
// <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit-icons.min.js"></script>

// Pure.css
// <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w" crossorigin="anonymous">

// Materialise 1.0.0
// <!-- Compiled and minified CSS -->
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

// <!-- Compiled and minified JavaScript -->
// <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

// Skeleton 2.0.4
// https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css
// https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css 

render() {
        return (
            <div style={{color: 'midnightblue'}}>Enable CSS Framework: 
                <br/>
                <input type={"checkbox"} value={"Bootstrap"}/>Bootstrap 
                <input type={"checkbox"} value={"UIKit"}/>UI Kit 
                <input type={"checkbox"} value={"PureCSS"}/>Pure.css 
                <input type={"checkbox"} value={"Materialize"}/>Materialize
                <input type={"checkbox"} value={"Skeleton"}/>Skeleton
            </div>
        );
    }
}

ReactDOM.render(<Result />,document.getElementById('root'));
