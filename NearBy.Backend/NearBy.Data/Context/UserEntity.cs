namespace NearBy.Data.Context.Entity.User
{
    public class UserEntity : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string CenterCode { get; set; }
        public string CenterName { get; set; }
    }
}
