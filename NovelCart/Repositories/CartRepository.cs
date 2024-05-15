using NovelCart.Interfaces;
using NovelCart.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NovelCart.DataAccess
{
    public class CartRepository : ICartService
    {
        readonly NovelCartContext _dbContext;
        readonly ILogger<CartRepository> _logger;

        public CartRepository(NovelCartContext dbContext, ILogger<CartRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<int> AddNovelToCart(int userId, int novelId)
        {
            try
            {
                string cartId = await GetCartId(userId);

                CartItems existingCartItem = await _dbContext.CartItems.FirstOrDefaultAsync(x => x.ProductId == novelId && x.CartId == cartId);

                if (existingCartItem != null)
                {
                    existingCartItem.Quantity += 1;
                    _dbContext.Entry(existingCartItem).State = EntityState.Modified;
                    await _dbContext.SaveChangesAsync();
                }
                else
                {
                    CartItems cartItems = new CartItems
                    {
                        CartId = cartId,
                        ProductId = novelId,
                        Quantity = 1
                    };
                    await _dbContext.CartItems.AddAsync(cartItems);
                    await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch
            {
                return 1;
            }
            finally
            {
                _logger.LogInformation("Added novel to cart");
            }
        }

        public async Task<string> GetCartId(int userId)
        {
            try
            {
                Cart cart = await _dbContext.Cart.FirstOrDefaultAsync(x => x.UserId == userId);

                if (cart != null)
                {
                    return cart.CartId;
                }
                else
                {
                    return await CreateCart(userId);
                }

            }
            catch
            {
                throw;
            }
            finally
            {
                _logger.LogInformation("Got cart Id");
            }
        }

        async Task<string> CreateCart(int userId)
        {
            try
            {
                Cart shoppingCart = new Cart
                {
                    CartId = Guid.NewGuid().ToString(),
                    UserId = userId,
                    DateCreated = DateTime.Now.Date
                };

                await _dbContext.Cart.AddAsync(shoppingCart);
                await _dbContext.SaveChangesAsync();

                return shoppingCart.CartId;
            }
            catch
            {
                throw;
            }
            finally
            {
                _logger.LogInformation("Created cart for user");
            }
        }

        public async Task<int> RemoveCartItem(int userId, int novelId)
        {
            try
            {
                string cartId = await GetCartId(userId);
                CartItems cartItem = await _dbContext.CartItems.FirstOrDefaultAsync(x => x.ProductId == novelId && x.CartId == cartId);

                _dbContext.CartItems.Remove(cartItem);
                await _dbContext.SaveChangesAsync();
                return 0;
            }
            catch
            {
                return 1;
            }
            finally
            {
                _logger.LogInformation("Removed item from cart");
            }
        }

        public async Task<int> RemoveOneCartItem(int userId, int novelId)
        {
            try
            {
                string cartId = await GetCartId(userId);
                CartItems cartItem = await _dbContext.CartItems.FirstOrDefaultAsync(x => x.ProductId == novelId && x.CartId == cartId);

                cartItem.Quantity -= 1;
                _dbContext.Entry(cartItem).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return 0;
            }
            catch
            {
                return 1;
            }
            finally
            {
                _logger.LogInformation("Removed one item from cart");
            }
        }

        public async Task<int> GetCartItemCount(int userId)
        {
            try
            {
                string cartId = await GetCartId(userId);

                if (!string.IsNullOrEmpty(cartId))
                {
                    int cartItemCount = await _dbContext.CartItems.Where(x => x.CartId == cartId).SumAsync(x => x.Quantity);

                    return cartItemCount;
                }
                else
                {
                    return 0;
                }
            }
            catch
            {
                return 0;
            }
            finally
            {
                _logger.LogInformation("Got cart item count");
            }
        }


        public async Task<int> ClearCart(int userId)
        {
            try
            {
                string cartId = await GetCartId(userId);
                List<CartItems> cartItem = await _dbContext.CartItems.Where(x => x.CartId == cartId).ToListAsync();

                if (!string.IsNullOrEmpty(cartId))
                {
                    foreach (CartItems item in cartItem)
                    {
                        _dbContext.CartItems.Remove(item);
                        await _dbContext.SaveChangesAsync();
                    }
                }
                return 0;
            }
            catch
            {
                return 1;
            }
            finally
            {
                _logger.LogInformation("Cleared cart items");
            }
        }

    }
}
