using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NovelCart.Dto;
using NovelCart.Interfaces;
using NovelCart.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace NovelCart.DataAccess
{
    public class UserRepository : IUserService
    {
        readonly NovelCartContext _dbContext;
        readonly IConfiguration _config;
        readonly ILogger<UserRepository> _logger;

        public UserRepository(NovelCartContext dbContext, IConfiguration config, ILogger<UserRepository> logger)
        {
            _dbContext = dbContext;
            _config = config;
            _logger = logger;
        }

        public async Task<UserDetailsDto?> AuthenticateUser(string Username, string Password)
        {
            try
            {
                var userDetails = await _dbContext.UserMaster.FirstOrDefaultAsync(
                    u => u.Username == Username && u.Password == Password
                    );

                if (userDetails != null)
                {
                    UserDetailsDto user = new UserDetailsDto();
                    user.UserId = userDetails.UserId;
                    user.Username = userDetails.Username;
                    user.UserTypeId = userDetails.UserTypeId;
                    return user;
                }
                else
                {
                    return null;
                }
            }
            finally
            {
                _logger.LogInformation("Authenticated the user with username: " + Username);
            }
        }

        public async Task<int> RegisterUser(UserMaster userData)
        {
            try
            {
                userData.UserTypeId = 2;
                await _dbContext.UserMaster.AddAsync(userData);
                await _dbContext.SaveChangesAsync();
                return 1;
            }
            catch
            {
                throw;
            }
            finally
            {
                _logger.LogInformation("Registered the user with username:" + userData.Username);
            }
        }

        public async Task<bool> CheckUserAvailabity(string userName)
        {
            try
            {
                string user = (await _dbContext.UserMaster.FirstOrDefaultAsync(x => x.Username == userName))?.ToString();

                if (user != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            finally
            {
                _logger.LogInformation("Checked if username is present or not");
            }
        }

        public async Task<bool> isUserExists(int userId)
        {
            try
            {
                string user = (await _dbContext.UserMaster.FirstOrDefaultAsync(x => x.UserId == userId))?.ToString();

                if (user != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            finally
            {
                _logger.LogInformation("Checked if user is present or not");
            }
        }

        public string GenrateToken(UserDetailsDto userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            string role = "User";
            if (userInfo.UserTypeId == 1) { role = "Admin"; }
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, userInfo.Username),
                new Claim("userid", userInfo.UserId.ToString()),
                new Claim(ClaimTypes.Role, role),
                new Claim("usertype", role),
                new Claim("username", userInfo.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );
            _logger.LogInformation("Generated the JWT token for user with username: " + userInfo.Username);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
