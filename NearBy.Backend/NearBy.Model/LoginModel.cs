namespace NearBy.Model
{
    public class LoginModel : BaseModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
