namespace backend.Models;

public class ProductMapper
{
    public static Product MapToProduct(ProductDTO dto)
    {
        return new Product
        {
            ShortName = dto.ShortName,
            Name = dto.Name,
            Category = dto.Category,
            Price = dto.Price,
            Discount = dto.Discount,
            Description = dto.Description,
            AddedDate = dto.AddedDate,
            OtherImages = dto.OtherImages,
            Colors = dto.Colors,
            Sizes = dto.Sizes,
            Rate = dto.Rate,
            Votes = dto.Votes,
            Quantity = dto.Quantity,
            Sold = dto.Sold
        };
    }
}
