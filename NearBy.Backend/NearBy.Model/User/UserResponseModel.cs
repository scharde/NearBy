using System;

namespace NearBy.Model.User
{
    public class UserResponseModel
    {
        public UserModel UserModel { get; set; }
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}
