namespace dotnet_reactapp.Dto;
public class CreateItem
{
    public string? Title { get; set; }
    public int ImageId { get; set; }
    public int Ranking { get; set; }
    public int ItemType { get; set; }
}