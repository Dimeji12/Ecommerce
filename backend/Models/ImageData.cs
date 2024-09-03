using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class ImageData
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public byte[] ImageByte { get; set; }

        public int? ProductId { get; set; }

        public Product? Product { get; set; }
    }
}