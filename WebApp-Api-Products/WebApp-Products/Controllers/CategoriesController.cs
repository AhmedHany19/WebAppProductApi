using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApp_Products.Data;
using WebApp_Products.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp_Products.Controllers
{
    [Route("api/Categories")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }





        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_context.Categories.ToList().OrderBy(x => x.Name));
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
                return Ok(_context.Categories.FirstOrDefault(x => x.Id == id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }      
        }










        [HttpPost("Save")]
        public IActionResult Save([FromBody] Category category )
        {

            try
            {
                _context.Categories.Add(category);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


        }

        [HttpPut("Edit/{id}")] 
        public IActionResult Edit(int id, [FromBody] Category category)
        {

            try
            {
                var result = _context.Categories.FirstOrDefault(x => x.Id == id);
                if (result == null)
                    return BadRequest();

                result.Name=category.Name;
                _context.Update(result);
                _context.SaveChanges();
                return Ok(result);


            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("DeleteCategory/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                var result = _context.Categories.FirstOrDefault(x => x.Id == id);
                if (result == null)
                    return BadRequest();

                _context.Categories.Remove(result);
                _context.SaveChanges();
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }


        }
    }
}
