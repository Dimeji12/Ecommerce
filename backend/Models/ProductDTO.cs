namespace backend.Models;

using System;
using System.Collections.Generic;

public class ProductDTO
{
    public string ShortName { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public string Description { get; set; }
    public DateTime AddedDate { get; set; }
    public long ImgId { get; set; }
    public List<OtherImageData> OtherImages { get; set; } = new List<OtherImageData>();
    public List<ProductColor> Colors { get; set; } = new List<ProductColor>();
    public List<string> Sizes { get; set; } = new List<string>();
    public double Rate { get; set; }
    public int Votes { get; set; }
    public int Quantity { get; set; }
    public int Sold { get; set; }
    
    public override string ToString()
    {
        var otherImagesString = OtherImages != null ? string.Join(", ", OtherImages.Select(img => img.ToString())) : "None";
        var colorsString = Colors != null ? string.Join(", ", Colors.Select(c => c.ToString())) : "None";
        var sizesString = Sizes != null ? string.Join(", ", Sizes) : "None";

        return $"ProductDTO: {Name ?? "N/A"} (ShortName: {ShortName ?? "N/A"}, Category: {Category ?? "N/A"}, " +
               $"Price: {Price:C}, Discount: {Discount:P}, AddedDate: {AddedDate}, " +
               $"ImgId: {ImgId}, OtherImages: {otherImagesString}, " +
               $"Colors: {colorsString}, Sizes: {sizesString}, Rate: {Rate}, " +
               $"Votes: {Votes}, Quantity: {Quantity}, Sold: {Sold})";
    }
}

