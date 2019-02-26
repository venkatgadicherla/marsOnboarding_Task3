using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using Newtonsoft.Json;
using OnBoarding_Task3.Models;

namespace OnBoarding_Task3.Controllers
{
    public class HomeController : Controller
    {
        private CustomerDbEntities db = new CustomerDbEntities();

        public JsonResult GetProductById(int ProductId)
        {
            Product model = db.Products.Where(x => x.Id == ProductId).SingleOrDefault();
            string value = string.Empty;
            value = JsonConvert.SerializeObject(model, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Json(value, JsonRequestBehavior.AllowGet);
        }


        [OutputCache(Location = OutputCacheLocation.None)]
        public JsonResult GetProductList()
        {
            List<ProductViewModel> ProdList = db.Products.Where(x => x.Id > 10).Select(x => new ProductViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price
            }).ToList();

            return Json(ProdList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Product()
        {

            return View();
        }


        public JsonResult SaveProduct(int Id, string Name, Decimal Price)
        {
            var result = false;
            if (Id > 0)
            {
                try

                {
                    Product ProducttoBeUpdated = db.Products.SingleOrDefault(x => x.Id == Id);
                    ProducttoBeUpdated.Name = Name;
                    ProducttoBeUpdated.Price = Price;
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

                    // List<Product> list = db.Products.ToList();
                    //ViewBag.DepartmentList = new SelectList(list, "DepartmentId", "DepartmentName");

                    Product P1 = new Product();

                    P1.Name = Name;
                    P1.Price = Price;
                    db.Products.Add(P1);
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

        public JsonResult DeleteProduct(int productId)
        {
            var result = false;
            if (productId > 0)
            {
                try

                {
                    var ProducttoBeDeleted = db.Products.SingleOrDefault(x => x.Id == productId);
                    if (ProducttoBeDeleted != null)
                    {
                        db.Products.Remove(ProducttoBeDeleted);
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
