using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace OnBoarding_Task3
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "ProductsList",
               url: "GetProductList",
               defaults: new { controller = "Home", action = "GetProductList" }
           );
         
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Product", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Customerroute",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Customer", action = "Customer", id = UrlParameter.Optional }
            );
            routes.MapRoute(
               name: "Storeroute",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Store", action = "Store", id = UrlParameter.Optional }
           );
            routes.MapRoute(
               name: "Salesroute",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Sales", action = "Sales", id = UrlParameter.Optional }
           );
           
        }
    }
}
