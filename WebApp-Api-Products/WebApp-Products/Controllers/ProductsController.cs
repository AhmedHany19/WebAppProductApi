using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp_Products.Data;
using WebApp_Products.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp_Products.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]

    public class ProductsController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_context.Products.Include(x=>x.Category).OrderBy(x=>x.Name).ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_context.Products.Include(x => x.Category).FirstOrDefault(x => x.Id == id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Save")]
        public IActionResult Save([FromBody] Product product)
        {
            try
            {
                _context.Products.Add(product);
                _context.SaveChanges();
                return Ok();

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }




        // PUT api/<ProductsController>/5
        [HttpPut("Edit/{id}")]
        public IActionResult Edit(int id, [FromBody] Product product)
        {
            try
            {
                var result= _context.Products.Include(x => x.Category).FirstOrDefault(x => x.Id == id);

                if (result == null)
                    return BadRequest();

                result.Name = product.Name;
                result.CategoryId=product.CategoryId;
                result.Quntity=product.Quntity;
                result.Price=product.Price;
                result.Discount=product.Discount;
                result.Price = product.Price;

                _context.Products.Update(result);
                _context.SaveChanges();
                return Ok(result);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var result = _context.Products.FirstOrDefault(x => x.Id == id);

                if (result == null)
                    return BadRequest();

                _context.Products.Remove(result);
                _context.SaveChanges();
                return Ok();

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
