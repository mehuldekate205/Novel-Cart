﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NovelCart.Dto
{
    public class OrdersDto
    {
        public string OrderId { get; set; }
        public List<CartItemDto> OrderDetails { get; set; }
        public decimal CartTotal { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
