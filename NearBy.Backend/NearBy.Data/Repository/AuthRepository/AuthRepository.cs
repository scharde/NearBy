using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage;
using NearBy.Data.Context;
using NearBy.Data.Context.Entity.User;
using NearBy.Model;
using NearBy.Model.Response;
using System.Threading.Tasks;

namespace NearBy.Data.Repository.AuthRepository
{
    public class AuthRepository : Repository<UserEntity>, IAuthRepository
    {
        private readonly UserManager<IdentityUser> _userManager;
        //private readonly IEmailSender _sender;
        public AuthRepository(UserManager<IdentityUser> userManager, DatabaseContext databaseContext) : base(databaseContext)
        {
            _userManager = userManager;
        }

        public async Task<ResponseModel> CreateUser(UserRegisterModel userRegisterModel)
        {
            using (IDbContextTransaction transaction = _dbContext.Database.BeginTransaction())
            {
                var user = new IdentityUser { UserName = userRegisterModel.Email, Email = userRegisterModel.Email };
                var result = await _userManager.CreateAsync(user, userRegisterModel.Password);
                if (result.Succeeded)
                {
                    ResponseModel userRecordResponseModel = await CreateUserRecord(userRegisterModel, user.Id);
                    if (userRecordResponseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else
                    {
                        transaction.Rollback();
                    }
                    return userRecordResponseModel;
                    //_logger.LogInformation("User created a new account with password.");
                    //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    //var callbackUrl = Url.Page(
                    //    "/Account/ConfirmEmail",
                    //    pageHandler: null,
                    //    values: new { area = "Identity", userId = user.Id, code = code },
                    //    protocol: Request.Scheme);

                    //await _emailSender.SendEmailAsync(Input.Email, "Confirm your email",
                    //    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                    //if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    //{
                    //    return RedirectToPage("RegisterConfirmation",
                    //                          new { email = Input.Email });
                    //}
                    //else
                    //{
                    //    await _signInManager.SignInAsync(user, isPersistent: false);
                    //    return LocalRedirect(returnUrl);
                    //}
                }
            }

            return new ResponseModel
            {
                Status = false,
                Failed = new FailedModel { Message = "Error in User registration" }
            };
        }

        public async Task<ResponseModel> CreateUserRecord(UserRegisterModel userRegisterModel, string aspNetUsersId)
        {
            _dbContext.Users.Add(new UserEntity
            {
                FirstName = userRegisterModel.FirstName,
                LastName = userRegisterModel.LastName,
                Email = userRegisterModel.Email,
                AspNetUsersId = aspNetUsersId,
                PhoneNumber = userRegisterModel.PhoneNumber,
            });
            int result = await _dbContext.SaveChangesAsync();
            if (result > 0)
            {
                return new ResponseModel { Status = true, Success = new SuccessModel { Id = result, Message = "User Registered" } };
            }
            return new ResponseModel { Status = false, Failed = new FailedModel { Message = "Error in User registration" } };

        }
    }
}
