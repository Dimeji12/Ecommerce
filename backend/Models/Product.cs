using System.Text.Json.Serialization;

namespace backend.Models
{
    using System;
    using System.Collections.Generic;

    public class Product
    {
        public int Id { get; set; }
        public string? ShortName { get; set; }
        public string? Name { get; set; }
        public string? Category { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        
        public string? Description { get; set; }
        public DateTime AddedDate { get; set; }
        public long? ImgId { get; set; }
        [JsonIgnore]
        public ImageData? Img { get; set; }
        
        public List<OtherImageData> OtherImages { get; set; } = new List<OtherImageData>();

        public List<ProductColor>? Colors { get; set; }
        public List<string>? Sizes { get; set; }
        public double Rate { get; set; }
        public int Votes { get; set; }
        public int Quantity { get; set; }
        public int Sold { get; set; }

        public override string ToString()
        {
            var otherImagesString = OtherImages != null ? string.Join(", ", OtherImages) : "None";
            var colorsString = Colors != null ? string.Join(", ", Colors.Select(c => c.ToString())) : "None";
            var sizesString = Sizes != null ? string.Join(", ", Sizes) : "None";

            return $"Product: {Name ?? "N/A"} (ID: {Id}), " +
                   $"ShortName: {ShortName ?? "N/A"}, " +
                   $"Category: {Category ?? "N/A"}, " +
                   $"Price: {Price:C}, Discount: {Discount:P}, " +
                   $"AddedDate: {AddedDate}, " +
                   $"OtherImages: {otherImagesString}, " +
                   $"Colors: {colorsString}, " +
                   $"Sizes: {sizesString}, " +
                   $"Rate: {Rate}, Votes: {Votes}, " +
                   $"Quantity: {Quantity}, Sold: {Sold}";
        }
    }
}