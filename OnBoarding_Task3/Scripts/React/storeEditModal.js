import React, { Component } from "react";
import ReactDOM from "react-dom";




class StoreEditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            validity: true,
            addressValidity: true,
            nameValidity: true,
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
        this.validateStoreName = this.validateStoreName.bind(this);
        this.validateStoreAddress = this.validateStoreAddress.bind(this);
    }

    handleCancelClick(e) {

        $('#lblStoreNameErr').html('');
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

        if ((this.state.addressValidity == true) && (this.state.nameValidity == true)) {

            $('#btnSave').prop('disabled', false);
        }

    }

    validateStoreName(e) {
       

        if (e.target.value == '') {

            $('#btnSave').prop('disabled', true);
            $('#lblStoreNameErr').html("Store name cannot be empty");
            this.setState({ nameValidity: false });
        }
        else if (e.target.value != '') {
            this.setState({ nameValidity: true });
            if (this.state.AddressValidity) {
                $('#btnSave').prop('disabled', false);
            }

            $('#lblStoreNameErr').html('');
        }
    }
    validateStoreAddress(e) {
        if (e.target.value == '') {

            // alert('Store Address is empty');  
            $('#btnSave').prop('disabled', true);
            $('#lblAddressErr').html('Address cannot be empty');
            this.setState({ addressValidity: false });

        }
        else if (e.target.value != '') {
            this.setState({ addressValidity: true });
            // this.setValidity(true);

            $('#lblAddressErr').html('');

            if (this.state.nameValidity) {
                $('#btnSave').prop('disabled', false);
            }
        }
    }







    handleClick(e) {
        alert(this.state.nameValidity + this.state.addressValidity);
      
        if (this.state.nameValidity && this.state.addressValidity) {

            var id = $('#hiddenId').val();
            var name = $('#txtStoreName').val();
            var address = $('#txtStoreAddress').val();


            $.ajax({
                type: "POST",
                url: "/Store/SaveStore?Id=" + id + "&Name=" + name + "&Address=" + address,

                success: function () {


                    window.location.href = "/Store/Store";
                    alert("Store Saved");
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
                <div className='header '  id='modalTitle'> </div>


                <div className='content'>
                    <form className='ui fluid form' >
                        <input type='hidden' id='hiddenId' />
                        <h3>Store Name</ h3>
                        <input type='text' id='txtStoreName' ref='textName' onChange={this.onNameChange} onBlur={this.validateStoreName} />
                        <label className="ui basic red pointing label" id='lblStoreNameErr'></label>
                        <h3>Address</h3>
                        <input type='text' id='txtStoreAddress' ref='txtAddress' onChange={this.onAddressChange} onBlur={this.validateStoreAddress} />
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
export default StoreEditModal