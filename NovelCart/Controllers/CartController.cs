using NovelCart.Dto;
using NovelCart.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NovelCart.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class CartController : ControllerBase
    {
        readonly ICartService _cartService;
        readonly INovelService _novelService;

        public CartController(ICartService cartService, INovelService novelService)
        {
            _cartService = cartService;
            _novelService = novelService;
        }

        /// <summary>
        /// Get the list of items in the shopping cart.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>The list of items in shopping cart.</returns>
        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("GetCartItems/{userId}")]
        public async Task<IActionResult> Get(int userId)
        {
           
                string cartid = await _cartService.GetCartId(userId);
                return Ok(await _novelService.GetNovelsAvailableInCart(cartid));
        }

        /// <summary>
        /// Add a single item into the shopping cart. If the item already exists, increase the quantity by one.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="novelId"></param>
        /// <returns>Count of items in the shopping cart.</returns>
        [HttpPost]
        [Authorize(Roles = "User")]
        [Route("AddNovelToCart/{userId}/{novelId}")]
        public async Task<ActionResult<int>> Post(int userId, int novelId)
        {
            if(await _cartService.AddNovelToCart(userId, novelId) == 0)
            {
                return Ok(await _cartService.GetCartItemCount(userId));
            }
            return NotFound("Wrong input.");
        }

        /// <summary>
        /// Reduces the quantity by one for an item in shopping cart.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="novelId"></param>
        /// <returns>The count of items remaining in shopping cart.</returns>
        [HttpPut]
        [Authorize(Roles = "User")]
        [Route("RemoveOneCartItem/{userId}/{novelId}")]
        public async Task<ActionResult<int>> Put(int userId, int novelId)
        {
            if(await _cartService.RemoveOneCartItem(userId, novelId) == 0)
            {
                return Ok(await _cartService.GetCartItemCount(userId));
            }
            return NotFound("Wrong input.");
        }

        /// <summary>
        /// Delete a single item from the cart.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="novelId"></param>
        /// <returns>The count of items remaining in shopping cart.</returns>
        [HttpDelete]
        [Authorize(Roles = "User")]
        [Route("RemoveCartItem/{userId}/{novelId}")]
        public async Task<ActionResult<int>> Delete(int userId, int novelId)
        {
            if (await _cartService.RemoveCartItem(userId, novelId) == 0)
            {
                return Ok(await _cartService.GetCartItemCount(userId));
            }
            return NotFound("Wrong input.");
            
        }

        /// <summary>
        /// Clear the shopping cart.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>The count of items remaining in shopping cart.</returns>
        [HttpDelete]
        [Authorize(Roles = "User")]
        [Route("ClearCart/{userId}")]
        public async Task<ActionResult<int>> Delete(int userId)
        {
            if(await _cartService.ClearCart(userId) == 0)
            {
                return Ok(0);
            }
            return NotFound("Wrong input.");
        }
    }
}
