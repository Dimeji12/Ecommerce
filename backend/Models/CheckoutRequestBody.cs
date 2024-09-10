namespace backend.Models;

public class CheckoutRequestBody
{
    public List<ProductCheckoutInfo> Products { get; set; }
    public CustomerCheckoutInfo Customer { get; set; }
}

public class ProductCheckoutInfo
{
    public int Id { get; set; }
    public string ShortName { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public double Price { get; set; }
    public double Discount { get; set; }
    public string Description { get; set; }
    public DateTime AddedDate { get; set; }
    public int Quantity { get; set; }
}

public class CustomerCheckoutInfo
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string StreetAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string City { get; set; }
}