using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Util;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OtherImageDataController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public OtherImageDataController(EcommerceContext context)
        {
            _context = context;
        }

        // GET: api/OtherImageData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OtherImageData>>> GetOtherImageData()
        {
            return await _context.OtherImageData.ToListAsync();
        }

        // GET: api/OtherImageData/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOtherImageData(int id)
        {
            var image = await _context.OtherImageData
                .Where(i => i.Id == id)
                .FirstOrDefaultAsync();

            if (image == null)
            {
                return NotFound();
            }

            var decompressedImage = ImageUtil.DecompressImage(image.ImageByte);

            return File(decompressedImage, image.Type);
        }

        // PUT: api/OtherImageData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOtherImageData(int id, OtherImageData otherImageData)
        {
            if (id != otherImageData.Id)
            {
                return BadRequest();
            }

            _context.Entry(otherImageData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OtherImageDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OtherImageData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OtherImageData>> PostOtherImageData(OtherImageData otherImageData)
        {
            _context.OtherImageData.Add(otherImageData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOtherImageData", new { id = otherImageData.Id }, otherImageData);
        }

        // DELETE: api/OtherImageData/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOtherImageData(int id)
        {
            var otherImageData = await _context.OtherImageData.FindAsync(id);
            if (otherImageData == null)
            {
                return NotFound();
            }

            _context.OtherImageData.Remove(otherImageData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OtherImageDataExists(int id)
        {
            return _context.OtherImageData.Any(e => e.Id == id);
        }
    }
}
