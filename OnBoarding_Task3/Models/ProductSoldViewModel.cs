using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnBoarding_Task3.Models
{
    public class ProductSoldViewModel
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public string Date { get; set; }
    }
}