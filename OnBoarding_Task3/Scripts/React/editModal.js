import React, { Component } from "react";
import ReactDOM from "react-dom";




class EditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            validity: true, 
            priceValidity: true,
            nameValidity: true,
            name: '',
            price:  0

        };
        // The events for the page are registered here
        //Click events for the buttons
        this.handleClick = this.handleClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);

        //On change events for the text boxes
        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
       
       //Validation events for the textboxes which are triggred when on blur happens
        this.validateProductName = this.validateProductName.bind(this);
        this.validateProductPrice = this.validateProductPrice.bind(this);
    }

    handleCancelClick(e) {
      
        $('#lblProductNameErr').html('');
        $('#lblPriceErr').html('');
    }

    onNameChange(e) {
        this.setState({ nameValidity:true });
                      
        if ((this.state.priceValidity == true) && (this.state.nameValidity == true)) {
          
            $('#btnSave').prop('disabled', false);
        }
        
    }
    onPriceChange(e) {

        this.setState({ priceValidity: true });
                    
        if ((this.state.priceValidity == true) && (this.state.nameValidity == true)) {
           
            $('#btnSave').prop('disabled', false);
        }

    }
    
    validateProductName(e) {
        //alert(e.target.value);
        if (e.target.value == '') {
            
            $('#btnSave').prop('disabled', true);
            $('#lblProductNameErr').html("Product name cannot be empty");
            this.setState({ nameValidity: false });
        }
        else if (e.target.value !='') {
            alert(e.target.value);
            this.setState({ nameValidity: true });
            if (this.state.priceValidity==true) {
                $('#btnSave').prop('disabled', false);
            }
            
            $('#lblProductNameErr').html('');
        }
    }
     validateProductPrice(e) {
         if (e.target.value == '') {

             // alert('product Price is empty');  
             $('#btnSave').prop('disabled', true);
             $('#lblPriceErr').html('Price cannot be empty');
             this.setState({ priceValidity: false });
            
         }
         else if(e.target.value != '') {
             this.setState({ priceValidity: true});
             
                 $('#lblPriceErr').html('');

             if (this.state.nameValidity ==true) {
                 $('#btnSave').prop('disabled', false);
             }
         }
    }
 
   
  

   
   
    
    handleClick(e) {
        alert(this.state.nameValidity + $('#txtProductName').val());
        if (this.state.nameValidity && this.state.priceValidity)
        {

            var id = $('#hiddenId').val();
            var name = $('#txtProductName').val();
            var price = $('#txtProductPrice').val();


            $.ajax({
                type: "POST",
                url: "/Home/SaveProduct?Id=" + id + "&Name=" + name + "&Price=" + price,

                success: function () {
                    window.location.href = "/Home/Product";
                    alert("Product Saved");
                },
                failure: function () {
                    alert("Try again");
                }

            })
        }
          else { alert('try again');}
      
            
    }
    render() {
        return (
            <div className='ui modal' id='editModal'>
                <div className='header ' id='modalTitle'> </div>

              
                <div className='content'>
                    <form className='ui fluid form' >
                        <input type='hidden' id='hiddenId' />
                        <h3>Product Name</ h3>
                        <input type='text' id='txtProductName' ref='textName' onChange={this.onNameChange} onBlur={this.validateProductName} /> 
                        <label className="ui basic red pointing label"  id='lblProductNameErr'></label>
                        <h3>Price</h3>
                        <input type='number' id='txtProductPrice' ref='txtPrice' onChange={this.onPriceChange}  onBlur={this.validateProductPrice} />
                        <label className="ui basic red pointing label" id='lblPriceErr'></label>
                    </form>
                </div>
                <div className='actions'>
                    <div className='ui cancel button red' onClick={this.handleCancelClick}>Cancel</div>
                    <input type="button" id='btnSave' className='ui  button green' value="Save" onClick={this.handleClick} />

                </div>
            </div>);
    }
}
export default EditModal