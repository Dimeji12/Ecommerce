using System.Text.Json.Serialization;

namespace backend.Models;

public class OtherImageData
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public byte[] ImageByte { get; set; }
        
    [JsonIgnore]
    public int? ProductId { get; set; }
   [JsonIgnore]
    public Product? Product { get; set; }
}
