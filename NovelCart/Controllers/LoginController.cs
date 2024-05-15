using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NovelCart.Dto;
using NovelCart.Interfaces;
using NovelCart.Models;
using Swashbuckle.AspNetCore.Annotations;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JWTTutorial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        readonly IUserService _userService;
        readonly IConfiguration _config;

        public LoginController(IConfiguration config, IUserService userService)
        {
            _config = config;
            _userService = userService;
        }

        ///<summary>
        /// Login for user.
        /// </summary>
        /// <param name="Username"></param>
        /// <param name="Password"></param>
        /// <returns>JWT token and user details.</returns>
        [HttpPost]
        public async Task<IActionResult> Login(string Username, string Password)
        {
            UserDetailsDto user = await _userService.AuthenticateUser(Username, Password);

            if (user != null)
            {
                var tokenString = _userService.GenrateToken(user);
                return Ok(new
                {
                    Token = tokenString,
                    status = 1
                });
            }

            return Ok(new {status = 0});
        }
    }
}
