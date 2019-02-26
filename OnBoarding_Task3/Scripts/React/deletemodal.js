import React, { Component } from 'react';
import HrefButtonConfirmDelete from './deleteFunctionality';




class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            deleteId: this.props.deleteId
        }
        this.setDeleteId = this.setDeleteId.bind(this);
      
    }
    componentDidMount() {
        this.setState({ deleteId: this.props.deleteId });
        
    }
    componentWillReceiveProps() {
        this.setState({ deleteId: this.props.deleteId });
    }
    setDeleteId(_deleteId) {
        this.setState({ deleteId: _deleteId });
    }
    render() {
        debugger;
        
        return (
        
            <div className='ui modal' id='deleteModal'>
                <div className="header color red">Delete {this.props.item}</div>
                
                <div className="content">
                    <p> Are you sure u want delete {this.props.deleteId}</p>
                  
                </div>
                <div className="actions">
                    <div className="ui cancel button red">Cancel</div>
                    <HrefButtonConfirmDelete item={this.props.item} window={this.props.window} deleteurl={this.props.url} Id= {this.props.deleteId} />
                   
                </div>
            </div>

        );
    }
}

export default DeleteModal

