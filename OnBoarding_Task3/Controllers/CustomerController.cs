using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using OnBoarding_Task3.Models;

namespace OnboardingTask2.OnBoarding_Task3.ModelsControllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        private CustomerDbEntities db = new CustomerDbEntities();
        public ActionResult Customer()
        {
            return View();
        }
        [OutputCache(Location = System.Web.UI.OutputCacheLocation.None)]
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
        public JsonResult SaveCustomer(int Id, string Name, string Address)
        {
            //This method is used to save the edited information about the Customer  and to create a new 
            //method
            var result = false;
            if (Id > 0)
            {
                try

                {
                    Customer CustomertoBeUpdated = db.Customers.SingleOrDefault(x => x.Id == Id);
                    CustomertoBeUpdated.Name = Name;
                    CustomertoBeUpdated.Address = Address;
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
                    Customer newCustomer = new Customer();
                    newCustomer.Name = Name;
                    newCustomer.Address = Address;
                    db.Customers.Add(newCustomer);
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
        public JsonResult GetCustomerById(int CustomerId)
        {// This method used to get the Customer which is to be edited and to be populated in the Editmodal
            Customer CustomerToBeedited = db.Customers.Where(x => x.Id == CustomerId).SingleOrDefault();
            string value = string.Empty;
            if (CustomerToBeedited != null)
            {
                value = JsonConvert.SerializeObject(CustomerToBeedited, Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            }
            return Json(value, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteCustomer(int CustomerId)
        {
            // This method is used to delete a Customer provided the CustomerId as the parameter
            var result = false;
            if (CustomerId > 0)
            {
                try

                {
                    var CustomertoBeDeleted = db.Customers.SingleOrDefault(x => x.Id == CustomerId);
                    if (CustomertoBeDeleted != null)
                    {
                        db.Customers.Remove(CustomertoBeDeleted);
                        db.SaveChanges();
                        result = true;
                    }
                }
                catch (Exception exp)
                {

                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}