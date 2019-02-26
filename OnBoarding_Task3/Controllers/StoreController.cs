using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using OnBoarding_Task3.Models;

namespace OnBoarding_Task3.Controllers
{
    public class StoreController : Controller
    {
        // GET: Store
        private CustomerDbEntities db = new CustomerDbEntities();
        public ActionResult Store()
        {
            return View();
        }
        [System.Web.Mvc.HttpGet]
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
        public JsonResult SaveStore(int Id, string Name, string Address)
        {
            //This method is used to save the edited information about the store  and to create a new 
            //method
            var result = false;
            if (Id > 0)
            {
                try

                {
                    Store StoretoBeUpdated = db.Stores.SingleOrDefault(x => x.Id == Id);
                    StoretoBeUpdated.Name = Name;
                    StoretoBeUpdated.Address = Address;
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
                    Store newStore = new Store();
                    newStore.Name = Name;
                    newStore.Address = Address;
                    db.Stores.Add(newStore);
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
        public JsonResult GetStoreById(int StoreId)
        {// This method used to get the Store which is to be edited and to be populated in the Editmodal
            Store StoreToBeedited = db.Stores.Where(x => x.Id == StoreId).SingleOrDefault();
            string value = string.Empty;
            value = JsonConvert.SerializeObject(StoreToBeedited, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Json(value, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteStore(int StoreId)
        {
            // This method is used to delete a store provided the StoreId as the parameter
            var result = false;
            if (StoreId > 0)
            {
                try

                {
                    var StoretoBeDeleted = db.Stores.SingleOrDefault(x => x.Id == StoreId);
                    if (StoretoBeDeleted != null)
                    {
                        db.Stores.Remove(StoretoBeDeleted);
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