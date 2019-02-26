import React, { Component } from "react";
import ReactDOM from "react-dom";




class CustomerEditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            validity: true,
            addressValidity: false,
            nameValidity: false,
            name: '',
            address: 0

        };
        // The events for the page are registered here
        //Click events for the buttons
        this.handleClick = this.handleClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);

        //On change events for the text boxes
        this.onNameChange = this.onNameChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);

        //Validation events for the textboxes which are triggred when on blur happens
        this.validateCustomerName = this.validateCustomerName.bind(this);
        this.validateCustomerAddress = this.validateCustomerAddress.bind(this);
    }

    handleCancelClick(e) {

        $('#lblCustomerNameErr').html('');
        $('#lblAddressErr').html('');
    }

    onNameChange(e) {
        this.setState({ nameValidity: true });

        if ((this.state.addressValidity == true) && (this.state.nameValidity == true)) {

            $('#btnSave').prop('disabled', false);
        }

    }
    onAddressChange(e) {

        this.setState({ addressValidity: true });

        if ((this.state.AddressValidity == true) && (this.state.nameValidity == true)) {

            $('#btnSave').prop('disabled', false);
        }

    }

    validateCustomerName(e) {
       

        if (e.target.value == '') {

            $('#btnSave').prop('disabled', true);
            $('#lblCustomerNameErr').html("Customer name cannot be empty");
            this.setState({ nameValidity: false });
        }
        else if (e.target.value != '') {
            this.setState({ nameValidity: true });
            if (this.state.AddressValidity) {
                $('#btnSave').prop('disabled', false);
            }

            $('#lblCustomerNameErr').html('');
        }
    }
    validateCustomerAddress(e) {
        if (e.target.value == '') {
                      
            $('#btnSave').prop('disabled', true);
            $('#lblAddressErr').html('Address cannot be empty');
            this.setState({ addressValidity: false });

        }
        else if (e.target.value != '') {
            this.setState({ addressValidity: true });
     
             $('#lblAddressErr').html('');

            if (this.state.nameValidity) {
                $('#btnSave').prop('disabled', false);
            }
        }
    }







    handleClick(e) {

        if (this.state.nameValidity && this.state.AddressValidity) {

            var id = $('#hiddenId').val();
            var name = $('#txtCustomerName').val();
            var address = $('#txtCustomerAddress').val();


            $.ajax({
                type: "POST",
                url: "/Customer/SaveCustomer?Id=" + id + "&Name=" + name + "&Address=" + address,

                success: function () {


                    window.location.href = "/Customer/Customer";
                    alert("Customer Saved");
                },
                failure: function () {
                    alert("Try again");
                }

            })
        }
        else { alert('Please try again'); }


    }
    render() {
        return (
            <div className='ui modal' id='editModal'>
                <div className='header ' id='modalTitle'> </div>


                <div className='content'>
                    <form className='ui fluid form' >
                        <input type='hidden' id='hiddenId' />
                        <h3>Customer Name</ h3>
                        <input type='text' id='txtCustomerName' name='txtCustomerName' ref='textName' onChange={this.onNameChange} onBlur={this.validateCustomerName} />
                        <label className="ui basic red pointing label" id='lblCustomerNameErr'></label>
                        <h3>Address</h3>
                        <input type='text' id='txtCustomerAddress' ref='txtAddress' onChange={this.onAddressChange} onBlur={this.validateCustomerAddress} />
                        <label className="ui basic red pointing label" id='lblAddressErr'></label>
                    </form>
                </div>
                <div className='actions'>
                    <div className='ui cancel button red' onClick={this.handleCancelClick}>Cancel</div>
                    <input type="button" id='btnSave' className='ui  button green' value="Save" onClick={this.handleClick} />

                </div>
            </div>);
    }
}
export default CustomerEditModal