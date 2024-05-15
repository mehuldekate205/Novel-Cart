using NovelCart.Interfaces;
using NovelCart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NovelCart.Dto;
using Microsoft.EntityFrameworkCore;

namespace NovelCart.DataAccess
{
    public class OrderRepository : IOrderService
    {
        readonly NovelCartContext _dbContext;
        readonly ILogger<OrderRepository> _logger;
        public OrderRepository(NovelCartContext dbContext, ILogger<OrderRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }
        public async Task<int> CreateOrder(int userId, List<CartItemDto> cartItems)
        {
            try
            {
                var orderid = Guid.NewGuid();
                decimal carttotal = 0;
                foreach(var item in cartItems)
                {
                    carttotal += (item.Quantity * (await _dbContext.Novel.FirstOrDefaultAsync(x => x.NovelId == item.Novel.NovelId)).Price);
                }
                CustomerOrders customerOrder = new CustomerOrders
                {
                    OrderId = orderid.ToString(),
                    UserId = userId,
                    DateCreated = DateTime.Now,
                    CartTotal = carttotal
                };
                await _dbContext.CustomerOrders.AddAsync(customerOrder);
                await _dbContext.SaveChangesAsync();

                foreach (CartItemDto order in cartItems)
                {
                    CustomerOrderDetails productDetails = new CustomerOrderDetails
                    {
                        OrderId = orderid.ToString(),
                        ProductId = order.Novel.NovelId,
                        Quantity = order.Quantity,
                        Price = order.Novel.Price
                    };
                    await _dbContext.CustomerOrderDetails.AddAsync(productDetails);
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
                _logger.LogInformation("Created order for the user with id: " + userId);
            }
        }

        public async Task<List<OrdersDto>> GetOrderList(int userId)
        {
            try
            {
                List<OrdersDto> userOrders = new List<OrdersDto>();
                List<string> userOrderId = new List<string>();

                userOrderId = await _dbContext.CustomerOrders.Where(x => x.UserId == userId).Select(x => x.OrderId).ToListAsync();

                foreach (string orderid in userOrderId)
                {
                    CustomerOrders customerOrders = await _dbContext.CustomerOrders.FirstOrDefaultAsync(x => x.OrderId == orderid);
                    OrdersDto order = new OrdersDto
                    {
                        OrderId = orderid,
                        CartTotal = customerOrders.CartTotal,
                        OrderDate = customerOrders.DateCreated
                    };

                    List<CustomerOrderDetails> orderDetail = await _dbContext.CustomerOrderDetails.Where(x => x.OrderId == orderid).ToListAsync();

                    order.OrderDetails = new List<CartItemDto>();

                    foreach (CustomerOrderDetails customerOrder in orderDetail)
                    {
                        CartItemDto item = new CartItemDto();

                        Novel novel = await _dbContext.Novel.FirstOrDefaultAsync(x => x.NovelId == customerOrder.ProductId && customerOrder.OrderId == orderid);

                        item.Novel = novel;
                        item.Quantity = (await _dbContext.CustomerOrderDetails.FirstOrDefaultAsync(x => x.ProductId == customerOrder.ProductId && x.OrderId == orderid)).Quantity;

                        order.OrderDetails.Add(item);
                    }
                    userOrders.Add(order);
                }
                return userOrders.OrderByDescending(x => x.OrderDate).ToList();
            }
            finally
            {
                _logger.LogInformation("Got order details of user with id: " + userId);
            }
        }
        public async Task<List<OrdersDto>> GetOrders()
        {
            try
            {
                List<OrdersDto> userOrders = new List<OrdersDto>();
                List<string> userOrderId = new List<string>();

                userOrderId = await _dbContext.CustomerOrders.Select(x => x.OrderId).ToListAsync();

                foreach (string orderid in userOrderId)
                {
                    CustomerOrders customerOrders = await _dbContext.CustomerOrders.FirstOrDefaultAsync(x => x.OrderId == orderid);
                    OrdersDto order = new OrdersDto
                    {
                        OrderId = orderid,
                        CartTotal = customerOrders.CartTotal,
                        OrderDate = customerOrders.DateCreated
                    };

                    List<CustomerOrderDetails> orderDetail = await _dbContext.CustomerOrderDetails.Where(x => x.OrderId == orderid).ToListAsync();

                    order.OrderDetails = new List<CartItemDto>();

                    foreach (CustomerOrderDetails customerOrder in orderDetail)
                    {
                        CartItemDto item = new CartItemDto();

                        Novel novel = await _dbContext.Novel.FirstOrDefaultAsync(x => x.NovelId == customerOrder.ProductId && customerOrder.OrderId == orderid);

                        item.Novel = novel;
                        item.Quantity = (await _dbContext.CustomerOrderDetails.FirstOrDefaultAsync(x => x.ProductId == customerOrder.ProductId && x.OrderId == orderid)).Quantity;

                        order.OrderDetails.Add(item);
                    }
                    userOrders.Add(order);
                }
                return userOrders.OrderByDescending(x => x.OrderDate).ToList();
            }
            finally
            {
                _logger.LogInformation("Got order details of all user");
            }
        }
    }
}
