using System.Text;
using System.Text.Json;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class DbInit
{
    private readonly string _productsFilePath = "productsData.json"; // Path to your JSON file
    private readonly EcommerceContext _context;
    private readonly ImageDataService _imageDataService;

    public DbInit(EcommerceContext context, ImageDataService imageDataService)
    {
        _context = context;
        _imageDataService = imageDataService;
        
    }
    
    

    public async Task UploadProducts()
    {
        try
        {
            await DeleteAllProducts();
            
            var jsonData = await File.ReadAllTextAsync(_productsFilePath);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true // This makes the deserialization case-insensitive
            };
            
            // Deserialize JSON data into a list of Product objects
            var products = JsonSerializer.Deserialize<IEnumerable<Product>>(jsonData, options);

            if (products == null || !products.Any())
            {
                Console.WriteLine("No products to add.");
                return;
            }

            foreach (var product in products)
            {
                // You might want to validate each product before adding it
                _context.Products.Add(product);
            }

            await _context.SaveChangesAsync();
            
            await ProcessProductImages();
            await ProcessProductOtherImages();

            Console.WriteLine("Products uploaded successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }

    private async Task ProcessProductImages()
    {
        
        // Fetch all products from the database
        var products = await _context.Products.ToListAsync();

        foreach (var product in products)
        {
            var productId = product.Id;
            var shortName = product.ShortName;

            if (string.IsNullOrEmpty(shortName))
            {
                Console.WriteLine($"Product with ID {productId} has no ShortName. Skipping.");
                continue;
            }

            var productImagesFolder = Path.Combine("ProductImages", shortName);
            if (!Directory.Exists(productImagesFolder))
            {
                Console.WriteLine($"Directory not found for product '{shortName}'. Skipping.");
                continue;
            }

            var imageFiles = Directory.GetFiles(productImagesFolder);
            foreach (var imageFile in imageFiles)
            {
                var fileName = Path.GetFileName(imageFile);
                Console.WriteLine(">>>>>>>>>" + fileName + "Not Contains thum");

                // Skip files that contain "thum" in their name
                if (fileName.Contains("thum", StringComparison.OrdinalIgnoreCase))
                {
                    Console.WriteLine(">>>>>>>>>" + fileName + "Contains thum");
                    continue;
                }

                // Read the file as an IFormFile
                var file = CreateFormFile(imageFile, fileName);

                if (file.Length == 0)
                {
                    Console.WriteLine($"File {fileName} is empty. Skipping.");
                    continue;
                }

                var imageData = await _imageDataService.SaveMainImageForProduct(productId, file);
                if (imageData == null)
                {
                    Console.WriteLine($"Product with ID {productId} not found when saving image {fileName}.");
                }
                else
                {
                    Console.WriteLine($"Image {fileName} saved for product '{shortName}' with ID {productId}.");
                }

                // Assuming you only want to save one image, break after the first valid image is saved
                break;
            }
        }
    }
    
    public async Task ProcessProductOtherImages()
    {
        // Fetch and commit all products to the database
        await _context.SaveChangesAsync();

        // Fetch all products from the database
        var products = await _context.Products.ToListAsync();

        foreach (var product in products)
        {
            var productId = product.Id;
            var shortName = product.ShortName;

            if (string.IsNullOrEmpty(shortName))
            {
                Console.WriteLine($"Product with ID {productId} has no ShortName. Skipping.");
                continue;
            }

            var productImagesFolder = Path.Combine("ProductImages", shortName);
            if (!Directory.Exists(productImagesFolder))
            {
                Console.WriteLine($"Directory not found for product '{shortName}'. Skipping.");
                continue;
            }

            var imageFiles = Directory.GetFiles(productImagesFolder);
            foreach (var imageFile in imageFiles)
            {
                var fileName = Path.GetFileName(imageFile);

                // Skip files that do not contain "thum" in their name
                if (!fileName.Contains("thum", StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                // Read the file as an IFormFile
                var file = CreateFormFile(imageFile, fileName);

                if (file.Length == 0)
                {
                    Console.WriteLine($"File {fileName} is empty. Skipping.");
                    continue;
                }

                var imageData = await _imageDataService.SaveOtherImageForProduct(productId, file);
                if (imageData == null)
                {
                    Console.WriteLine($"Product with ID {productId} not found when saving image {fileName}.");
                }
                else
                {
                    Console.WriteLine($"Thumbnail image {fileName} saved for product '{shortName}' with ID {productId}.");
                }
            }
        }
    }

    private async Task DeleteAllProducts()
    {
        var relatedData = await _context.ProductColors.Where(o => o.Id != null).ToListAsync();
        _context.ProductColors.RemoveRange(relatedData);
        await _context.SaveChangesAsync();

        // Then delete the products
        var products = await _context.Products.ToListAsync();
        if (products == null || !products.Any())
        {
            return;
        }

        _context.Products.RemoveRange(products);
        await _context.SaveChangesAsync();
    }
    
    private IFormFile CreateFormFile(string filePath, string fileName)
    {
        var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
        return new FormFile(fileStream, 0, fileStream.Length, null, fileName)
        {
            Headers = new HeaderDictionary(),
            ContentType = "image/jpeg", // Set the correct content type based on the file extension
            ContentDisposition = $"form-data; name=\"file\"; filename=\"{fileName}\""
        };
    }
}