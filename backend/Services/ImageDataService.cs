using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repository;

namespace backend.Services
{

    public class ImageDataService(ImageDataRepository imageDataRepository, EcommerceContext context)
    {
        private readonly ImageDataRepository _imageDataRepository = imageDataRepository;
        private readonly EcommerceContext _context = context;

        public async Task<ImageData> SaveImage(IFormFile file)
        {
            return await _imageDataRepository.SaveImage(file);
        }

        public async Task<OtherImageData> SaveOtherImage(IFormFile file, Product product)
        {
            return await _imageDataRepository.SaveOtherImage(file, product);
        }

        public async Task<ImageData> UpdateImage(int id, IFormFile file)
        {
            return await _imageDataRepository.UpdateImage(id, file);
        }

        public async Task<byte[]> GetImageAsync(int id)
        {
            return await _imageDataRepository.GetImageAsync(id);
        }

        public async Task<ImageData> SaveMainImageForProduct(int productId, IFormFile file)
        {
            var product = await _imageDataRepository.GetProductById(productId);
            if (product == null)
            {
                return null;
            }



            var imageData = await _imageDataRepository.SaveImage(file);

            // Assign the image as the main image for the product
            product.Img = imageData;

            await _imageDataRepository.SaveChangesAsync();
            return imageData;
        }

        public async Task<OtherImageData> SaveOtherImageForProduct(int productId, IFormFile file)
        {
            var product = await _imageDataRepository.GetProductById(productId);
            if (product == null)
            {
                return null;
            }

            // Use the existing SaveImage method to handle the compression and saving logic
            var savedImageData = await SaveOtherImage(file, product);

            product.OtherImages.Add(savedImageData);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return savedImageData;
        }


    }
}
