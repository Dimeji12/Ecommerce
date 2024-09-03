using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Util
{
   public static class ImageUtil
{
    public static byte[] CompressImage(byte[] data)
    {
        using (var compressedStream = new MemoryStream())
            
        using (var zipStream = new DeflateStream(compressedStream, CompressionMode.Compress))
        {
            zipStream.Write(data, 0, data.Length);
            zipStream.Close();
            return compressedStream.ToArray();
        }
    }

    public static byte[] DecompressImage(byte[] data)
    {
        using (var compressedStream = new MemoryStream(data))
        using (var zipStream = new DeflateStream(compressedStream, CompressionMode.Decompress))
        using (var resultStream = new MemoryStream())
        {
            zipStream.CopyTo(resultStream);
            return resultStream.ToArray();
        }
    }
}
}