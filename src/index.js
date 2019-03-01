import React from 'react'
import ReactDOM from 'react-dom'

class CodeBox extends React.Component 
{
    constructor(props) { 
        super(props);
        this.state = {
            code: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e =>
    {
        this.setState({ code: e.target.value });
        console.log(`AFTER: ${this.state.code}`);
    }

    render() {
        return (
        
        <textarea placeholder="Enter code here" style={{width: '30%', height: '100%'}}
            onChange={this.handleChange}>
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
            codeToRender: Array(3).fill(null),
        };
    }
    
    render() {
        return (<iframe style={{width: '90.5%', height: '100%'}}></iframe>)
    }
}

//Container
class ParentContainer extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {

        };
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
                <CodeBox code="HTML"/> 
                <CodeBox code="CSS"/>
                <CodeBox code="JS"/>
            </div>
            <div style={{height: '25vw'}}>
                <Result />
            </div>    
        </div>
        )
    }
}

ReactDOM.render(<ParentContainer />,document.getElementById('root'));
