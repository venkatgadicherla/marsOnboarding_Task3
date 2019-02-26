using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using OnBoarding_Task3.Models;

namespace OnBoarding_Task3.Controllers
{
    public class SalesController : Controller
    {
        private CustomerDbEntities db = new CustomerDbEntities();
        // GET: Sales
        public ActionResult Sales()
        {
            return View();
        }
        [System.Web.Mvc.HttpGet]
        public JsonResult GetSalesList()
        {
            var SalesList = (from o in db.ProductSolds
                                                    from p in db.Products.Where(x => x.Id==o.ProductId).DefaultIfEmpty()
                                                    from c in db.Customers.Where(x=>x.Id==o.CustomerId).DefaultIfEmpty()
                                                    from s in db.Stores.Where(x=>x.Id==o.StoreId).DefaultIfEmpty()
                             select new {
                                                        Id = o.Id,
                                                        ProductId=o.ProductId,
                                                        ProductName=p.Name,
                                                        CustomerId=o.CustomerId,
                                                        CustomerName=c.Name,
                                                        StoreId=o.StoreId,
                                                        StoreName=s.Name,
                                                        Date=o.Date.ToString()


            }).ToList();

            return Json(SalesList, JsonRequestBehavior.AllowGet);

            
        }

        public JsonResult GetProductList()
        {
            List<ProductViewModel> ProductList = db.Products.Where(x => x.Id > 0).Select(x => new ProductViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price

            }).ToList();
            return Json(ProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStoreList()
        {
            List<StoreViewModel> StoreList = db.Stores.Where(x => x.Id > 0).Select(x => new StoreViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address
            }).ToList();

            return Json(StoreList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCustomerList()
        {
            List<CustomerViewModel> CustomerList = db.Customers.Where(x => x.Id > 0).Select(x => new CustomerViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address
            }).ToList();

            return Json(CustomerList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSaleById(int SalesId)
        {// This method used to get the Customer which is to be edited and to be populated in the Editmodal
            ProductSold SaleToBeedited = db.ProductSolds.Where(x => x.Id == SalesId).SingleOrDefault();
            string value = string.Empty;


            value = JsonConvert.SerializeObject(SaleToBeedited, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });

            return Json(value, JsonRequestBehavior.AllowGet);

        }
        public JsonResult SaveSale(int Id, int ProductId, int CustomerId, int StoreId, DateTime SaleDate)
        {
            //This method is used to save the edited information about the Customer  and to create a new 
            //method
            var result = false;
            if (Id > 0)
            {
                try

                {
                    ProductSold SaleToBeUpdated = db.ProductSolds.SingleOrDefault(x => x.Id == Id);
                    SaleToBeUpdated.ProductId = ProductId;
                    SaleToBeUpdated.CustomerId = CustomerId;
                    SaleToBeUpdated.StoreId = StoreId;
                    SaleToBeUpdated.Date = SaleDate;

                    db.SaveChanges();
                    result = true;
                }
                catch (Exception exp)
                {

                }
            }

            else
            {
                //The following code insersts new record
                try
                {
                    CustomerDbEntities db = new CustomerDbEntities();
                    ProductSold Sale = new ProductSold();
                    Sale.ProductId = ProductId;
                    Sale.CustomerId = CustomerId;
                    Sale.StoreId = StoreId;
                    Sale.Date = SaleDate;
                    db.ProductSolds.Add(Sale);
                    db.SaveChanges();
                    result = true;



                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult DeleteSale(int Id)
        {
            var result = false;
            if (Id > 0)
            {
                try

                {
                    ProductSold SaleToDeleted = db.ProductSolds.SingleOrDefault(x => x.Id == Id);
                    db.ProductSolds.Remove(SaleToDeleted);

                    db.SaveChanges();
                    result = true;
                }
                catch (Exception exp)
                {

                }

            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}