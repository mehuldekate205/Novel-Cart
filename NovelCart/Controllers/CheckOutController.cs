using NovelCart.Dto;
using NovelCart.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace NovelCart.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CheckOutController : ControllerBase
    {
        readonly IOrderService _orderService;
        readonly ICartService _cartService;
        readonly INovelService _novelService;

        public CheckOutController(IOrderService orderService, ICartService cartService, INovelService novelService)
        {
            _orderService = orderService;
            _cartService = cartService;
            _novelService = novelService;

        }

        /// <summary>
        /// Checkout from shopping cart
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="checkedOutItems"></param>
        /// <returns>The count of items remaining in shopping cart.</returns>
        [HttpPost]
        [Route("{userId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Post(int userId)
        {
            List<CartItemDto> cartItems = await _novelService.GetNovelsAvailableInCart(await _cartService.GetCartId(userId));

            if(await _orderService.CreateOrder(userId, cartItems) == 0)
            {
                if (await _cartService.ClearCart(userId) == 0)
                {
                    return Ok(0);
                }
            }
            return StatusCode(400, 1);
        }
    }
}
