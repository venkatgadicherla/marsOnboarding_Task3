import React, { Component } from 'react';

class HrefButtonConfirmDelete extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {


        alert( this.props.deleteurl  +this.props.Id);
        var builturl= this.props.deleteurl;
        var id = this.props.Id;
        var redirectWindow = this.props.window;
        var item = this.props.item;


        $.ajax({
            type: "POST",
            url: builturl+id,

            success: function () {
                alert(item+" Deleted");
                window.location.href = redirectWindow;

            },
            failure: function () {
                alert("Try again");
            }

        })

    }
    render() {
        return (

            <div className="ui approve button green" onClick={this.handleClick}>Delete</div>

        );
    }
}
export default HrefButtonConfirmDelete