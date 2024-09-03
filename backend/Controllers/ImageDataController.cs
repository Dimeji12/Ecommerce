using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using backend.Services;
using backend.Util;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageDataController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly ImageDataService _imageDataService;

        public ImageDataController(EcommerceContext context, ImageDataService imageDataService)
        {
            _context = context;
            _imageDataService = imageDataService;
        }

        // GET: api/ImageData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImageData>>> GetImageData()
        {
            return await _context.ImageData.ToListAsync();
        }

        // GET: api/ImageData/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetImageData(int id)
        {
            var image = await _context.ImageData
                .Where(i => i.Id == id)
                .FirstOrDefaultAsync();

            if (image == null)
            {
                return NotFound();
            }

            var decompressedImage = ImageUtil.DecompressImage(image.ImageByte);

            return File(decompressedImage, image.Type);
        }

        // PUT: api/ImageData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<ImageData>> PutImageData(int id, [FromForm] IFormFile file)
        {

            try
            {
                if (file.Length == 0)
                {
                    return BadRequest("No file uploaded.");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return await _imageDataService.UpdateImage(id, file);

        }

        // POST: api/ImageData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ImageData>> PostImageData([FromForm] IFormFile file)
        {

            if (file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }
            return await _imageDataService.SaveImage(file);
        }

        //DELETE: api/ImageData/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImageData(long id)
        {
            var imageData = await _context.ImageData.FindAsync(id);
            if (imageData == null)
            {
                return NotFound();
            }

            var product = await _context.Products
                .Where(p => p.ImgId == id || p.OtherImages.Any(oi => oi.Id == id))
                .FirstOrDefaultAsync();
    
            if (product != null)
            {
                if (product.ImgId == id)
                {
                    product.ImgId = null;
                    product.Img = null;
                }

                product.OtherImages.RemoveAll(oi => oi.Id == id);

                _context.Products.Update(product);
            }

            _context.ImageData.Remove(imageData);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        //Saves the main image for a specific product
        [HttpPost("product/{productId}/main-image")]
        public async Task<ActionResult<ImageData>> SaveMainImageForProduct(int productId, [FromForm] IFormFile file)
        {
            if (file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var imageData = await _imageDataService.SaveMainImageForProduct(productId, file);
            if (imageData == null)
            {
                return NotFound($"Product with ID {productId} not found.");
            }

            return Ok(imageData);
        }

        //Saves other images for a specific product
        [HttpPost("product/{productId}/other-images")]
        public async Task<ActionResult<ImageData>> SaveOtherImageForProduct(int productId, [FromForm] IFormFile file)
        {
            if (file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var imageData = await _imageDataService.SaveOtherImageForProduct(productId, file);
            if (imageData == null)
            {
                return NotFound($"Product with ID {productId} not found.");
            }

            return Ok(imageData);
        }

        // Fetches the main image for a specific product
        [HttpGet("product/{productId}/main-image")]
        public async Task<IActionResult> GetMainImageForProduct(int productId)
        {
            var product = await _context.Products.Include(p => p.Img).FirstOrDefaultAsync(p => p.Id == productId);
            if (product == null || product.Img == null)
            {
                return NotFound($"Product with ID {productId} or main image not found.");
            }

            var image = await _context.ImageData
                .Where(i => i.Id == product.ImgId)
                .FirstOrDefaultAsync();
            
            if (image == null)
            {
                return NotFound();
            }

            var decompressedImage = ImageUtil.DecompressImage(image.ImageByte);

            return File(decompressedImage, image.Type);
        }

        // Fetches the list of other images for a specific product
        [HttpGet("product/{productId}/other-images")]
        public async Task<ActionResult<IEnumerable<OtherImageData>>> GetOtherImagesForProduct(int productId)
        {
            var product = await _context.Products.Include(p => p.OtherImages).FirstOrDefaultAsync(p => p.Id == productId);
            if (product == null)
            {
                return NotFound($"Product with ID {productId} not found.");
            }

            // Decompress each image in the list of other images
            var decompressedImages = product.OtherImages.Select(image => new OtherImageData
            {
                Id = image.Id,
                Name = image.Name,
                Type = image.Type,
                ImageByte = ImageUtil.DecompressImage(image.ImageByte),
                ProductId = image.ProductId
            }).ToList();

            return Ok(decompressedImages);
        }

        private bool ImageDataExists(int id)
        {
            return _context.ImageData.Any(e => e.Id == id);
        }
    }
}
