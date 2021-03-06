import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { List } from 'material-ui/List';

import * as actions from './clients.actions';

import TextField from 'material-ui/TextField';

import Divider from 'material-ui/Divider';

import FlatButton from 'material-ui/FlatButton';


import {Card, CardHeader, CardText} from 'material-ui/Card';

import Loader from '../loader/loader.component';


class ClientListExpandable extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    open: false,
  };

  this.handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  this.handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

}
  componentDidMount() {
    this.props.fetchUserClients(this.props.userId)
  }

  render() {

    return (
      <div>
        <br />
          <List>
              <h3 style={{color: "#076", display: "inline-block"}}>Your Clients</h3>
              <FlatButton
                label="New Client"
                primary={true}
                keyboardFocused={false}
                onTouchTap={() => this.props.handleClientView('addClient')}
                style={{float: "right"}}
              />
              {this.props.clients.map( (client, index) => (
                  <Card key={index}>
                    <CardHeader
                      title={`${client.firstName} ${client.lastName}`}
                      subtitle={client.company}
                      //avatar="images/ok-128.jpg"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true} style={{padding: 0}} children={
                    <form id="client-edit-form" onSubmit={(event) => {
                        event.preventDefault()
                        let firstName = event.target.firstName.value
                        let lastName = event.target.lastName.value
                        let company = event.target.company.value
                        let phone = event.target.phone.value
                        let email = event.target.email.value
                        let address = event.target.address.value
                        let clientId = client.clientId
                        let userId = this.props.userId

                        this.props.handleUpdateClient(firstName, lastName, company, phone, email, address, clientId, userId)
                      }}>
                      { this.props.isLoading ? <Loader /> : false }
                        <TextField
                            id={client.firstName}
                            name="firstName"
                            floatingLabelText="First Name"
                            defaultValue={client.firstName}
                            disabled={!this.props.clientEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={client.lastName}
                            name="lastName"
                            floatingLabelText="last Name"
                            defaultValue={client.lastName}
                            disabled={!this.props.clientEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <br />
                        <TextField
                            id={client.company}
                            name="company"
                            floatingLabelText="Company"
                            defaultValue={client.company}
                            disabled={!this.props.clientEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={client.phone}
                            name="phone"
                            floatingLabelText="Phone"
                            defaultValue={client.phone}
                            disabled={!this.props.clientEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <br />
                        <TextField
                            id={client.email}
                            name="email"
                            floatingLabelText="Email"
                            defaultValue={client.email}
                            disabled={!this.props.clientEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            />
                        <TextField
                            id={client.address}
                            name="address"
                            floatingLabelText="Address"
                            defaultValue={client.address}
                            multiLine={true}
                            disabled={!this.props.clientEdit}
                            underlineDisabledStyle={{display: 'none'}}
                            textareaStyle={{marginBottom: -5}}
                            floatingLabelStyle={{left: 0}}
                            />
                            <Divider inset={false} style={{color: "#076", height: 3}} />
                            { this.props.clientEdit ?
                              <div style={{padding: 10}}>
                                <FlatButton
                                  key={`cancel${client.clientId}`}
                                  label="Cancel"
                                  onTouchTap={() => this.props.handleClientEdit()} />
                                <FlatButton
                                  key={`save${client.clientId}`}
                                  type="submit" form="client-edit-form"
                                  label="Save"
                                  style={{color: "#FFF", backgroundColor: "#076"}}
                                />
                                <FlatButton
                                  className="pull-right"
                                  key={`delete${client.clientId}`} label="DELETE" onTouchTap={() => this.props.handleDeleteClient(client.clientId, this.props.userId)}
                                  style={{color: "#FFF", backgroundColor: "#076"}}
                                />
                              </div>
                                :
                              <div style={{padding: 10}}>
                                <FlatButton
                                  key={`edit${client.clientId}`}
                                  label="Edit" style={{color: "#FFF", backgroundColor: "#076"}}
                                  onTouchTap={() => this.props.handleClientEdit()} />
                                </div>
                            }
                        </form>
                    }
                  />
                  <Divider style={{backgroundColor: '#187'}} />
              </Card>
            ))}
          </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        clients: state.clientReducer.clients,
        clientEdit: state.clientReducer.clientEdit,
        userId: state.loginReducer.user.userId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserClients: actions.fetchUserClients,
        handleClientView: actions.handleClientView,
        handleClientEdit: actions.handleClientEdit,
        handleUpdateClient: actions.handleUpdateClient,
        handleDeleteClient: actions.handleDeleteClient,
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientListExpandable);