import React, { Component } from "react";
import ReactDOM from "react-dom";




class SaleEditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            validity: true,
            

        };
        // The events for the page are registered here
        //Click events for the buttons
        this.handleClick = this.handleClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);

        //On change events for the text boxes
       
    }

    handleCancelClick(e) {
        $("#modalTitle").html("Create Sale");
        $('#hiddenId').val(0);
        $("#selectProductId").select[0];
        $("#selectCustomerId").select[0];
        $("#selectStoreId").select[0];
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        $("#selectDateSale").val(today);
      

      
    }

  


    handleClick(e) {
       

        //This method is used to submit the modal data to the controller 
        //to save or create a new customer

        var Id = $("#hiddenId").val();
        var productId = $("#selectProductId").val();
        var customerId = $("#selectCustomerId").val();
        var storeId = $("#selectStoreId").val();
        var saleDate = $("#selectDateSale").val();

        $.ajax({
            type: "POST",
            url: "/Sales/SaveSale?Id=" + Id + "&ProductId=" + productId + name + "&CustomerId=" + customerId + "&StoreId=" + storeId + "&SaleDate=" + saleDate,

            success: function () {
                alert("Sale details Saved");
                $("#loaderDiv").hide();
                $("#newSalesModal").modal("hide");
                window.location.href = "/Sales/Sales";

            },
            failure: function () {
                alert("Try again");
            }


        })
        

    }
    render() {
        return (
            <div className='ui modal' id='editModal'>
                <div className='header ' id='modalTitle'> </div>


                <div className='content'>
                    <form className='ui fluid form' >
                        <input type='hidden' id='hiddenId' />
                        <label id="lblProductId">Select Product</label>
                        <select id="selectProductId" className="form-control"></select><br/>
                       
                        <label id="lblCustomerId">Select Customer</label>
                        <select id="selectCustomerId" className="form-control"></select><br />

                        <label id="lblStoreId">Select Store</label>
                        <select id="selectStoreId" className="form-control"></select><br />
                        <label id="lblDate">Select Date</label>
                        <input type="date" id="selectDateSale" className="form-control" min="2018-10-01" />
                    </form>
                </div>
                <div className='actions'>
                    <div className='ui cancel button red' onClick={this.handleCancelClick}>Cancel</div>
                    <input type="button" id='btnSave' className='ui  button green' value="Save" onClick={this.handleClick} />

                </div>
            </div>); 
    }
}
export default SaleEditModal