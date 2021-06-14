using AutoMapper;
using NearBy.Data.Context.Entity.User;
using NearBy.Model;
using NearBy.Model.User;

namespace NearBy.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserEntity, UserModel>();
            CreateMap<UserRegistrationModel, UserEntity>();

            //CreateMap<QuestionEntity, QuestionModel>().
            //  ForMember(dest => dest.questionOptionModel, source => source.MapFrom(source => source.QuestionOptionEntities.OrderBy(x => x.Code)));

        }
    }
}
