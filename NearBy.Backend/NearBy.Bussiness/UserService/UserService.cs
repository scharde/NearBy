using AutoMapper;
using NearBy.Data;
using NearBy.Data.Context.Entity.User;
using NearBy.Data.Repository.UserRepository;
using NearBy.Model.User;

namespace NearBy.Bussiness.UserService
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository { get; set; }
        private IMapper _mapper;
        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public UserModel Get(int userId)
        {
            UserEntity userEntity = _userRepository.GetById(userId);
            if (userEntity == null)
                return null;
            return _mapper.Map<UserEntity, UserModel>(userEntity);
        }
    }
}
