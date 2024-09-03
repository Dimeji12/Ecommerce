using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Controllers;
using backend.Models;
using backend.Util;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
  public class ImageDataRepository(EcommerceContext  context, ILogger<ProductsController> logger)
{
    
    private readonly ILogger _logger = logger;
    private readonly EcommerceContext _context = context;
    
    public async Task<ImageData> SaveImage(IFormFile file)
    {

        byte[] compressedImage;
        

            using var dataStream = new MemoryStream();
            await file.CopyToAsync(dataStream);
        
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                // Compress the image data
                compressedImage = ImageUtil.CompressImage(memoryStream.ToArray());
            }
            
        var imageData = new ImageData
        {
            Name = file.FileName,
            Type = file.ContentType,
            ImageByte = compressedImage
        };

        _context.ImageData.Add(imageData);
        await _context.SaveChangesAsync();

        return imageData;
    }
         
    public async Task<OtherImageData> SaveOtherImage(IFormFile file, Product product)
    {

        byte[] compressedImage;
        

            using var dataStream = new MemoryStream();
            await file.CopyToAsync(dataStream);
        
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                // Compress the image data
                compressedImage = ImageUtil.CompressImage(memoryStream.ToArray());
            }
            
        var imageData = new OtherImageData
        {
            Name = file.FileName,
            Type = file.ContentType,
            ImageByte = compressedImage,
            ProductId = product.Id,
            Product = product
        };


        _context.OtherImageData.Add(imageData);
        await _context.SaveChangesAsync();

        return imageData;
    }
     
    public async Task<ImageData> UpdateImage(int id, IFormFile file)
    {
        
        using var memoryStream = new MemoryStream();
    
        
        await file.CopyToAsync(memoryStream);
    
        
        byte[] imageData = memoryStream.ToArray();
    
        
        var updatedImageData = new ImageData
        {
            Id = id,
            Name = file.FileName,
            Type = file.ContentType,
            ImageByte = imageData
        };

        
        _context.Entry(updatedImageData).State = EntityState.Modified;
    
        
        await _context.SaveChangesAsync();

        return updatedImageData;
    }


    public async Task<byte[]> GetImageAsync(int id)
    {
        var compressedImage = await _context.ImageData
            .Where(i => i.Id == id)
            .Select(i => i.ImageByte)
            .FirstOrDefaultAsync();

        if (compressedImage == null)
            return null; // or throw an exception if you expect the image to always exist

        // Decompress the image data before returning
        return ImageUtil.DecompressImage(compressedImage);

    }

    public async Task<Product> GetProductById(int productId)
    {
        return await _context.Products.Include(p => p.Img).Include(p => p.OtherImages).FirstOrDefaultAsync(p => p.Id == productId);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

}
}