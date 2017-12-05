import React, { Component } from 'react';
import './App.scss';
import { AutomateForm } from './components/Automate';
import { FieldRenderMap } from './components/Fields';
import { ValidatorMap } from './services/validators';
import signupForm from './data/signupForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      formData: signupForm,
      formDataJson: JSON.stringify(signupForm, null, 2)
    };
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onUpdateForm = this.onUpdateForm.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  onEditorChange(e){
    this.setState({ formDataJson: e.target.value });
  }
  onUpdateForm() {
    try {
      const formData = JSON.parse(this.state.formDataJson);
      if (typeof formData === 'object'){
        this.setState({
          formData: formData,
        })
      }
    } catch (e) {
      console.log(e);
    }
  }
  submit(data){
    this.setState({ successfulOutput: JSON.stringify(data, null, 2)});
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }
  onSubmitClick(e) {
    this.setState({
      submitting: true
    });
    this.clickSubmit().then((result) => {
      this.setState({
        submitting: false,
      });
    }).catch((result) => {
      this.setState({
        submitting: false,
      });
    });
  }
  render() {
    return (
      <div className="container pt-5">
        <h2> React Form Automation</h2>
        <hr />
        <div className="row">
          <div className="col-5">
            <AutomateForm 
              data={this.state.formData}
              renderMap={FieldRenderMap}
              validatorMap={ValidatorMap}
              triggerSubmit={click => this.clickSubmit = click}
              submit={this.submit}
            />
            <div className="text-right">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={this.onSubmitClick}> Submit 
              </button>
            </div>
            {this.state.successfulOutput && (<pre>
              {this.state.successfulOutput}
            </pre>)}
          </div>
          <div className="col-7">
              <label>Form Schema Data:</label>
              <textarea
                rows="30" 
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.8em',
                }}
                onChange={this.onEditorChange}
                value={this.state.formDataJson}
                className="form-control form-control-sm" />
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.onUpdateForm}> Update
                </button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
