using System.Collections.Generic;
using System.Threading.Tasks;
using NovelCart.Dto;
using NovelCart.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace NovelCart.Controllers
{
    
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        /// <summary>
        /// Get the list of all the orders placed by a particular user.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>List of orders placed by user.</returns>
        [HttpGet]
        [Route("OrdersList/{userId}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<List<OrdersDto>>> Get(int userId)
        {
            return Ok(await _orderService.GetOrderList(userId));
        }

        [HttpGet]
        [Route("Orders")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<OrdersDto>>> Get()
        {
            return Ok(await _orderService.GetOrders());
        }
    }
}
