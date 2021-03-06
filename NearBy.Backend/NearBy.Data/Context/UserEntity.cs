namespace NearBy.Data.Context.Entity.User
{
    public class UserEntity : BaseEntity
    {
        public string AspNetUsersId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
