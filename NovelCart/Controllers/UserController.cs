using NovelCart.Interfaces;
using NovelCart.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Authorization;

namespace NovelCart.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        readonly IUserService _userService;
        readonly ICartService _cartService;

        public UserController(IUserService userService, ICartService cartService)
        {
            _userService = userService;
            _cartService = cartService;
        }

        /// <summary>
        /// Get the count of item in the shopping cart.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>The count of items in shopping cart.</returns>
        [HttpGet]
        [Route("GetCartItemCount")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<int>> Get(int userId)
        {
            int cartItemCount = await _cartService.GetCartItemCount(userId);
            return Ok(cartItemCount);
        }

        /// <summary>
        /// Check the availability of the username
        /// </summary>
        /// <param name="username"></param>
        /// <returns>True or False</returns>
        [HttpGet]
        [Route("ValidateUsername")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> ValidateUserName(string username)
        {
            if(await _userService.CheckUserAvailabity(username))
            {
                return Ok("User is Registred.");
            }
            return NotFound("User is not registered.");
        }

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="userData"></param>
        [HttpPost]
        [Route("RegisterUser")]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] UserMaster userData)
        {
            if(await _userService.RegisterUser(userData) == 1)
            {
                return Ok(new {status =  1});
            }
            return StatusCode(400, new { status = 0 });
        }
    }
}
