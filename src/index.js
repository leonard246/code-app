import React from 'react'
import ReactDOM from 'react-dom'

// Child
class CodeWindow extends React.Component 
{
    constructor(props) { 
        super(props);
        this.state = {
            code: "",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        this.setState({ code: e.target.value });
        console.log(`AFTER: ${this.state.code}`);
        
        this.props.renderCode(this.state.code)
    }

    render() {
        return (
        <textarea placeholder={`Enter ${this.props.lang} here`} onChange={this.handleChange} style={{width: '30%', height: '100%'}}>
        </textarea>
    )}
}

// Parent
class Result extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            result: 'RESULT',
        };

        this.renderResult = this.renderResult.bind(this);
    }
    
    renderResult(code)
    {
        // 0=HTML, 1=CSS, 2=JS
        // if(i==0)
        //  return (<div>{"--HTML--"}</div>);

        // if(i==1)
        //     return (<div>--CSS--</div>)

        // if(i==2)
        // return (<div>{"--JS--"}</div>)
        // return <CodeWindow value={ this.state.codeWindows[i] }/>;
        this.setState({result: code});
    }

    render() {
        return (
            <div>
            <div style={{ display: 'inline'}}>
                <div>HTML</div>
                <div>CSS</div>
                <div>JS</div>
            </div>
            <div style={{ height: '15vw'}}>
                <CodeWindow renderCode={this.renderResult.bind(this)} lang={"HTML"}/>
                <CodeWindow renderCode={this.renderResult.bind(this)} lang={"CSS"}/>
                <CodeWindow renderCode={this.renderResult.bind(this)} lang={"Javascript"}/>
            </div>
            <div style={{height: '25vw'}}>
                <textarea style={{width: '90.5%', height: '100%'}}>
                </textarea>
            </div>    
                { this.state.result }
        </div>
        )
    }
}

ReactDOM.render(<Result />,document.getElementById('root'));
